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

const html = require("choo-async/html");
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
          generateTrendingContent(1, result => {
            socket.send(JSON.stringify({
              "html": result,
              "message": "updated html",
              "selector": "#tour-loader"
            }));
          });

          break;

        case "request for tour, example 1":
          generateTrendingContent(1, result => {
            socket.send(JSON.stringify({
              "html": result,
              "message": "updated html",
              "selector": "#tour-loader"
            }));
          });

          break;

        case "request for tour, example 2":
          generateMemeCreator(socket);
          break;

        /*
        case "request for tour, example 3":
          generateTrendingContent(3, result => {
            socket.send(JSON.stringify({
              "html": result,
              "message": "updated html",
              "selector": "#tour-loader"
            }));
          });

          break;
        */

        case "subscribe":
          newsletterSubscribe(data, socket);
          break;

        default:
          log(data);
          break;
      }
    });

    socket.on("close", () => {
      // console.log(socket);
      return socket.terminate();
    });
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

function generateMemeCreator(socket) {
  const images = [
    {
      alt: "Carl Sagan",
      src: "/assets/media/images/carlsagan2.jpg"
    },
    {
      alt: "Doge",
      src: "/assets/media/images/doge-meme.jpg"
    },
    {
      alt: "LBRY Logo With Green Background",
      src: "/assets/media/images/lbry-green.png"
    }
  ];

  const memePlaceholderData = {
    bottomLine: {
      placeholder: "Top line",
      value: "that I made"
    },
    description: {
      placeholder: "Description",
      value: "Check out this image I published to LBRY via lbry.tech"
    },
    topLine: {
      placeholder: "Top line",
      value: "This is an example meme"
    },
    title: {
      placeholder: "Title",
      value: "Dank Meme Supreme da Cheese"
    }
  };

  const renderedImages = [];

  for (const image of images) {
    renderedImages.push(`<img alt="${image.alt}" class="tour__content__meme__canvas__thumbnail" src="${image.src}"/>`);
  }

  const memeCreator = html`
    <div class="tour__content__meme__canvas">
      <img alt="Base image for LBRY meme creator" id="base-image" style="height: 0; visibility: hidden;"/>
      <canvas id="meme-canvas" height="300" width="400">Unfortunately, it looks like canvas is <strong>not supported</strong> in your browser</canvas>

      ${renderedImages}
    </div>

    <form class="tour__content__meme__editor">
      <h2>Image Text</h2>

      <fieldset>
        <label for="meme-top-line">Top line</label>
        <input id="meme-top-line" name="meme-top-line" placeholder="${memePlaceholderData.topLine.placeholder}" spellcheck="false" type="text" value="${memePlaceholderData.topLine.value}" required/>
      </fieldset>

      <fieldset>
        <label for="meme-bottom-line">Bottom line</label>
        <input id="meme-bottom-line" name="meme-bottom-line" placeholder="${memePlaceholderData.bottomLine.placeholder}" spellcheck="false" type="text" value="${memePlaceholderData.bottomLine.value}" required/>
      </fieldset>

      <h2 class="__metadata">Metadata</h2>

      <fieldset>
        <label for="meme-title">Title</label>
        <input id="meme-title" name="meme-title" placeholder="${memePlaceholderData.title.placeholder}" spellcheck="false" type="text" value="${memePlaceholderData.title.value}" required/>
      </fieldset>

      <fieldset>
        <label for="meme-description">Description</label>
        <textarea id="meme-description" name="meme-description" placeholder="${memePlaceholderData.description.placeholder}" spellcheck="false" type="text" required>${memePlaceholderData.description.value}</textarea>
      </fieldset>

      <fieldset>
        <label for="meme-language">Language</label>
        <select id="meme-language" name="meme-language">
          <option value="ar">Arabic</option>
          <option value="zh">Chinese (Mandarin)</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="jp">Japanese</option>
          <option value="ru">Russian</option>
          <option value="es">Spanish</option>
          <option value="">Not specified</option>
        </select>
      </fieldset>

      <fieldset>
        <label for="meme-license">License</label>
        <select id="meme-license" name="meme-license" required>
          <option value="Public Domain">Public Domain</option>
          <option value="Creative Commons Attribution 4.0 International">Creative Commons Attribution 4.0 International</option>
          <option value="Creative Commons Attribution-ShareAlike 4.0 International">Creative Commons Attribution-ShareAlike 4.0 International</option>
          <option value="Creative Commons Attribution-NoDerivatives 4.0 International">Creative Commons Attribution-NoDerivatives 4.0 International</option>
          <option value="Creative Commons Attribution-NonCommercial 4.0 International">Creative Commons Attribution-NonCommercial 4.0 International</option>
          <option value="Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</option>
          <option value="Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International</option>
          <option value="None">None</option>
        </select>
      </fieldset>

      <fieldset>
        <label><input id="meme-nsfw-flag" name="nsfw" type="checkbox"/>NSFW</label>
      </fieldset>

      <fieldset>
        <button data-action="upload image" class="__button-black" type="button">Submit</button>
      </fieldset>
    </form>

    <script>
      detectLanguageAndUpdate();
      initCanvas();

      setTimeout(() => {
        $(".tour__content__meme__canvas__thumbnail").click();
      }, 100);
    </script>
  `;

  return socket.send(JSON.stringify({
    "html": memeCreator,
    "message": "updated html",
    "selector": "#tour-loader"
  }));
}

function generateTrendingContent(exampleNumber, displayTrendingContent) {
  return getTrendingContent().then(response => {
    if (!response || !response.success || response.success !== true || !response.data) return "";

    const rawContentCollection = [];
    const renderedContentCollection = [];
    const trendingContentData = response.data;

    for (const data of trendingContentData) {
      rawContentCollection.push(fetchMetadata({ claim: data.url, method: "resolve", example: exampleNumber }));
    }

    Promise.all(rawContentCollection).then(collection => {
      for (const part of collection) {
        if (!part.value.stream.metadata.nsfw && part.value.stream.metadata.thumbnail) {
          renderedContentCollection.push(`
            <figure class="tour__content__trend">
              <img alt="${part.name}" data-action="choose claim" data-claim-id="${exampleNumber === 1 ? part.name : part.claim_id}" src="${part.value.stream.metadata.thumbnail}"/>

              <figcaption data-action="choose claim" data-claim-id="${exampleNumber === 1 ? part.name : part.claim_id}">
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
  return new Promise((resolve, reject) => { // eslint-disable-line
    request({
      method: "GET",
      url: "https://api.lbry.io/file/list_trending"
    }, (error, response, body) => {
      if (error || !JSON.parse(body)) resolve("Issue fetching content"); // error
      body = JSON.parse(body);
      resolve(body);
    });
  });
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
