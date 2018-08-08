"use strict"; require("dotenv").config(); require("date-format-lite");



//  P A C K A G E S

const async = require("async");
const color = require("turbocolor");
const cors = require("cors");
const dedent = require("dedent");

const fastify = require("fastify")({
  logger: {
    level: "warn",
    prettyPrint: process.env.NODE_ENV === "development" ? true : false
  }
});

const local = require("app-root-path").require;
const octokit = require("@octokit/rest")();
const redis = require("redis");
const request = require("request-promise-native");

//  V A R I A B L E S

const fetchMetadata = local("/helpers/fetch-metadata");
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
      logSlackError(
        "\n" +
        "> *REDIS ERROR:* ```" + JSON.parse(JSON.stringify(redisError)) + "```" + "\n" +
        "> _Cause: Someone is trying to run LBRY.tech locally without environment variables OR Heroku is busted_\n"
      )
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
    socket.on("message", data => {
      data = JSON.parse(data);

      switch(data.message) {
        case "fetch metadata":
          fetchMetadata(data, socket);
          break;

        case "landed on homepage":
          generateGitHubFeed(result => {
            socket.send(JSON.stringify({
              "html": result,
              "message": "updated html",
              "selector": "#github-feed"
            }));
          });

          break;

        case "landed on tour":
          generateStep1OfTour(result => {
            socket.send(JSON.stringify({
              "html": result,
              "message": "updated html",
              "selector": "#tour-loader"
            }));
          });

          break;

        case "subscribe":
          newsletterSubscribe(data, socket);
          break;

        default:
          log(data);
          break;
      }
    });

    socket.on("close", () => socket.terminate());
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

      updateGithubFeed(); // TODO: Update `.last-updated` every minute

      displayGitHubFeed(dedent`
        <h3>GitHub</h3>
        <h5 class="last-updated">Last updated: ${new Date().format("YYYY-MM-DD").replace(/-/g, "&middot;")} at ${new Date().add(-4, "hours").format("UTC:H:mm:ss A").toLowerCase()} EST</h5>

        ${renderedEvents.join("")}
      `);
    });
  }
}

function newsletterSubscribe(data, socket) {
  const email = data.email;

  if (!validateEmail(email)) return socket.send(JSON.stringify({
    "html": "Your email is invalid",
    "message": "updated html",
    "selector": "#emailMessage"
  }));

  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: `https://api.lbry.io/list/subscribe?email=${email}`
    }).then(body => {
      if (!body || !JSON.parse(body)) {
        logSlackError(
          "\n" +
          "> *NEWSLETTER ERROR:* ```¯\\_(ツ)_/¯ This should be an unreachable error```" + "\n" +
          `> _Cause: ${email} interacted with the form_\n`
        );

        return resolve(socket.send(JSON.stringify({
          "html": "Something is terribly wrong",
          "message": "updated html",
          "selector": "#emailMessage"
        })));
      }

      body = JSON.parse(body);

      if (!body.success) {
        logSlackError(
          "\n" +
          "> *NEWSLETTER ERROR:* ```" + JSON.parse(JSON.stringify(body.error)) + "```" + "\n" +
          `> _Cause: ${email} interacted with the form_\n`
        );

        return reject(socket.send(JSON.stringify({
          "html": body.error,
          "message": "updated html",
          "selector": "#emailMessage"
        })));
      }

      return resolve(socket.send(JSON.stringify({
        "html": "Thank you! Please confirm subscription in your inbox.",
        "message": "updated html",
        "selector": "#emailMessage"
      })));
    }).catch(welp => {
      if (welp.statusCode === 409) {
        logSlackError(
          "\n" +
          "> *NEWSLETTER ERROR:* ```" + JSON.parse(JSON.stringify(welp.error)) + "```" + "\n" +
          `> _Cause: ${email} interacted with the form_\n`
        );

        return resolve(socket.send(JSON.stringify({
          "html": "You have already subscribed!",
          "message": "updated html",
          "selector": "#emailMessage"
        })));
      }
    });
  });
}

function updateGithubFeed() {
  octokit.activity.getEventsForOrg({
    org: "lbryio",
    per_page: 20,
    page: 1
  }).then(({ data }) => {
    async.eachSeries(data, (item, callback) => {
      const eventString = JSON.stringify(item);

      client.zrank("events", eventString, (err, reply) => {
        if (reply === null) client.zadd("events", item.id, eventString, callback);
        else callback();
      });
    }, () => client.zremrangebyrank("events", 0, -51)); // Keep the latest 50 events
  }).catch(err => {
    logSlackError(
      "\n" +
      "> *GITHUB FEED ERROR:* ```" + JSON.parse(JSON.stringify(err)) + "```" + "\n" +
      "> _Cause: GitHub feed refresh_\n"
    );
  });
}

function validateEmail(email) {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;
  return re.test(String(email));
}



function generateStep1OfTour(displayTrendingContent) {
  return getTrendingContent().then(response => {
    if (!response || !response.success || response.success !== true || !response.data) return "";
    const trendingContentData = response.data;

    const rawContentCollection = [];
    const renderedContentCollection = [];
    for (const data of trendingContentData) rawContentCollection.push(fetchMetadata({ claim: data.url, method: "resolve", step: 1 }));

    Promise.all(rawContentCollection).then(collection => {
      for (const part of collection) {
        if (part.value.stream.metadata.thumbnail) {
          renderedContentCollection.push(`
            <figure class="tour__content__trend">
              <img alt="${part.name}" data-action="choose claim" data-claim-id="${part.name}" src="${part.value.stream.metadata.thumbnail}"/>

              <figcaption data-action="choose claim" data-claim-id="${part.name}">
                ${part.value.stream.metadata.title}
                <span>${part.channel_name}</span>
              </figcaption>
            </figure>
          `);
        }
      }

      displayTrendingContent(renderedContentCollection.join(""));
    });
  });
}

function getTrendingContent() {
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url: "https://api.lbry.io/file/list_trending"
    }, (error, response, body) => {
      if (error) reject(error);
      body = JSON.parse(body);
      resolve(body);
    });
  });
}
