"use strict"; require("dotenv").config(); require("date-format-lite");



//  P A C K A G E S

const color = require("turbocolor");
const cors = require("cors");
const dedent = require("dedent");

const fastify = require("fastify")({
  logger: {
    level: "warn",
    prettyPrint: process.env.NODE_ENV === "development" ? true : false
  }
});

const got = require("got");
const html = require("choo-async/html");
const octokit = require("@octokit/rest")();
const redis = require("redis");
const local = require("app-root-path").require;

//  V A R I A B L E S

const github = local("/helpers/github");
const log = console.log; // eslint-disable-line
const logSlackError = local("/helpers/slack");
const relativeDate = local("/modules/relative-date");
let client;

if (typeof process.env.GITHUB_OAUTH_TOKEN !== "undefined") {
  octokit.authenticate({
    type: "oauth",
    token: process.env.GITHUB_OAUTH_TOKEN
  });
} else log(`${color.red("[missing]")} GitHub token`);

if (typeof process.env.REDISCLOUD_URL !== "undefined") {
  client = redis.createClient(process.env.REDISCLOUD_URL);

  client.on("error", redisError => {
    process.env.NODE_ENV === "development" ?
      log(`\n${color.yellow("Unable to connect to Redis client.")}\nYou may be missing an .env file or your connection was reset.`) :
      logSlackError("An error occured with Redis", redisError)
    ;
  });
} else log(`${color.red("[missing]")} Redis client URL`);



//  P R O G R A M

fastify.use(cors());

fastify.register(require("fastify-compress"));
fastify.register(require("fastify-ws"));

fastify.register(require("fastify-helmet"), {
  hidePoweredBy: { setTo: "LBRY" }
});

fastify.register(require("fastify-static"), {
  root: `${__dirname}/public/`,
  prefix: "/assets/"
});

fastify.register(require("choo-ssr/fastify"), {
  app: require("./client"),
  plugins: [
    [ require("choo-bundles/ssr"), {} ]
  ]
});

fastify.ready(err => {
  if (err) throw err;

  fastify.ws.on("connection", socket => {
    socket.send(JSON.stringify({ "message": "welcome" }));

    socket.on("message", data => {
      data = JSON.parse(data);

      switch(data.message) {
        case "landed on homepage":
          generateGitHubFeed(result => {
            socket.send(JSON.stringify({
              "message": "updated html",
              "html": result,
              "selector": "#github-feed"
            }));
          });

          break;

        case "fetch metadata":
          fetchMetadata(data.claim, data.method);
          break;

        default:
          log(data);
          break;
      }
    });

    socket.on("close", () => log("Client disconnected.")); // TODO: Close socket?
  });
});



//  B E G I N

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  process.env.NODE_ENV === "development" ?
    log(`\n— ${color.green("⚡")} ${fastify.server.address().port}\n`) :
    logSlackError(`Server started at port \`${fastify.server.address().port}\``)
  ;
};

start();



//  H E L P E R S

function generateGitHubFeed(displayGitHubFeed) {
  if (typeof process.env.REDISCLOUD_URL !== "undefined") {
    client.zrevrange("events", 0, 9, (err, reply) => {
      if (err) return; // TODO: Render a div with nice error message

      const events = [];
      const renderedEvents = [];

      reply.forEach(item => events.push(JSON.parse(item)));

      for (const event of events) {
        renderedEvents.push(`
          <div class='github-feed__event'>
            <a href="${github.generateUrl("actor", event)}" target="_blank" rel="noopener noreferrer">
              <img src="${event.actor.avatar_url}" class="github-feed__event__avatar" alt=""/>
            </a>

            <p>
              ${github.generateEvent(event)}
              <a href="${github.generateUrl("repo", event)}" title="View this repo on GitHub" target="_blank" rel="noopener noreferrer"><strong>${event.repo.name}</strong></a>
              <em class="github-feed__event__time">${relativeDate(new Date(event.created_at))}</em>
            </p>
          </div>
        `);
      }

      // TODO: Update `.last-updated` every minute

      displayGitHubFeed(dedent`
        <h3>GitHub</h3>
        <h5 class="last-updated">Last updated: ${new Date().format("YYYY-MM-DD at H:mm:ss A").toLowerCase().replace(/-/g, "&middot;")}</h5>

        ${renderedEvents.join("")}
      `);
    });
  }
}



function fetchMetadata(claimAddress, resolveMethod) {
  if (!claimAddress || !resolveMethod)  return;

  const allowedMethods = [
    "publish",
    "resolve",
    "wallet_send"
  ];

  if (!allowedMethods.includes(resolveMethod)) return;

  /*
  component.$http.post("https://lbry.tech/forward", {
    method: "resolve",
    uri: component.address
  }).then(response => {
    component.isLoading = false;
    component.jsonData = JSON.stringify(response.body, null, "  ");
  }).catch(error => {
    component.isLoading = false;
    component.jsonData = JSON.stringify(error, null, "  ");
    log("Error retrieving metadata for a claim:\n", error);
  });
  */

  got.post("https://lbry.tech/forward", {

  });

  return html`
    <pre><code class="bash">
      <span v-html="highlight('bash', exampleCode)"></span>
      # Example code using the daemon
      curl "http://localhost:5279" --data "{ 'method': 'resolve', 'params': { 'uri': '${claimAddress}' } }"
    </code></pre>
  `;
}
