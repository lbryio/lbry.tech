"use strict"; require("dotenv").config();



//  U T I L S

let Slack;
let slack;

if (typeof process.env.SLACK_WEBHOOK_URL !== "undefined") {
  Slack = require("slack-node");
  slack = new Slack();
  slack.setWebhook(process.env.SLACK_WEBHOOK_URL);
}



//  P R O G R A M

module.exports = exports = text => {
  if (typeof slack === "undefined") return;

  slack.webhook({
    channel: "dottech-errors",
    username: "lbrytech-bot",
    text: text
  }, (err, response) => { // eslint-disable-line
    // do nothing?
  });
};
