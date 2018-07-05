"use strict"; require("dotenv").config();



//  P A C K A G E S

const async = require("async");
const bodyParser = require("body-parser");
const cors = require("cors");
const CronJob = require("cron").CronJob;
const express = require("express");
const fs = require("graceful-fs");
const octokit = require("@octokit/rest")();
const redis = require("redis");
const request = require("request");
const serveStatic = require("serve-static");
const sslRedirect = require("heroku-ssl-redirect");



//  V A R I A B L E S

const app = express();
const jsonParser = bodyParser.json();
const port = process.env.PORT || 8080;
const redisClient = redis.createClient(process.env.REDISCLOUD_URL);
const textParser = bodyParser.text({ limit: "256kb" });

let Slack;
let slack;

if (typeof process.env.GITHUB_OAUTH_TOKEN !== "undefined") {
  octokit.authenticate({
    type: "oauth",
    token: process.env.GITHUB_OAUTH_TOKEN
  });
}

if (typeof process.env.SLACK_WEBHOOK_URL !== "undefined") {
  Slack = require("slack-node");
  slack = new Slack();
  slack.setWebhook(process.env.SLACK_WEBHOOK_URL);
}



//  P R O G R A M

app.listen(port);
app.use(sslRedirect());
app.use(serveStatic(`${__dirname}/content/.vuepress/dist`));
app.use(cors());



app.get("/github-feed", (req, res) => {
  redisClient.zrevrange("events", 0, 9, (err, reply) => {
    const events = [];

    reply.forEach(item => events.push(JSON.parse(item)));
    res.json(events);
  });
});

app.get("/*", (req, res) => {
  if (fs.existsSync(`${__dirname}/content/.vuepress/dist${req.path}.html`)) {
    res.redirect(`${req.path}.html`);
  } else {
    res.status(404);
    res.send("Not found");
  }
});



app.post("/forward", jsonParser, (req, res) => {
  const allowedMethods = ["wallet_send", "resolve", "publish"];

  if (typeof req.body.method === "undefined") return;

  if (allowedMethods.includes(req.body.method)) {
    if (req.body.method === "wallet_send") {
      req.body.amount = 0.01; // Hardcode the wallet_send amount

      const allowedClaims = [ // Whitelist claim ids
        "fbdcd44a97810522d23d5f1335b8ca04be9d776c",
        "de7f7fa33e8d879b2bae7238d2bdf827a39f9301",
        "5b7c7a202201033d99e1be2930d290c127c0f4fe",
        "a1372cf5523885f5923237bfe522f02f5f054362"
      ];

      if (!allowedClaims.includes(req.body.claim_id)) res.json({});
    }

    if (req.body.method === "publish") {
      req.body.bid = 0.001; // Hardcode the publish amount

      // Fix the internal image path in daemon
      req.body.file_path = process.env.LBRY_DAEMON_IMAGES_PATH + req.body.file_path;
    }

    req.body.access_token = process.env.LBRY_DAEMON_ACCESS_TOKEN;

    request({
      url: "http://daemon.lbry.tech",
      qs: req.body
    }, (error, response, body) => {
      body = JSON.parse(body);
      if (typeof body.error !== "undefined") logSlackError("ERROR: Got error from daemon:\n", "```" + JSON.stringify(body.error) + "```");
      res.json(body);
    });
  }
});

app.post("/upload-image", textParser, (req, res) => {
  request({
    method: "PUT",
    url: "http://daemon.lbry.tech/images.php",
    headers: {
      "Content-Type": "text/plain"
    },
    qs: {
      access_token: process.env.LBRY_DAEMON_ACCESS_TOKEN
    },
    body: req.body,
  }, (error, response, body) => {
    body = JSON.parse(body);
    res.json(body);
  });
});



//  H E L P E R S

logSlackError(`Server started at port \`${port}\``);

function updateGithubFeed() {
  octokit.activity.getEventsForOrg({
    org: "lbryio",
    per_page: 20,
    page: 1
  }).then(({ data }) => {
    async.eachSeries(data, (item, callback) => {
      const eventString = JSON.stringify(item);

      redisClient.zrank("events", eventString, (err, reply) => {
        if (reply === null) redisClient.zadd("events", item.id, eventString, callback);
        else callback();
      });
    }, () => {
      // Keep the latest 50 events
      redisClient.zremrangebyrank("events", 0, -51);
    });
  }).catch(err => {
    logSlackError("ERROR: Unable to update Github feed:\n", "```" + JSON.stringify(err) + "```");
  });
}

function logSlackError(text) {
  if (typeof slack === "undefined") return;

  slack.webhook({
    channel: "dottech-errors",
    username: "lbrytech-bot",
    text: text
  }, (err, response) => { // eslint-disable-line
    // do nothing?
  });
}

// Update Github feed every minute
new CronJob("0 * * * * *", updateGithubFeed, null, true, "America/Los_Angeles");



//  E X P O R T

module.exports = exports = app;
