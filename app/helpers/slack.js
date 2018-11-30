"use strict";



//  I M P O R T

import { IncomingWebhook } from "@slack/client";

//  U T I L S

require("dotenv").config();

const environmentMessage = process.env.NODE_ENV === "development" ?
  "\n_— in DEVELOPMENT_" :
  "\n_— in PRODUCTION_";

const slackUrl = process.env.SLACK_WEBHOOK_URL || "";
const slackWebhook = new IncomingWebhook(slackUrl);



//  P R O G R A M

export default ({ message, pretext, title }) => {
  if (!slackUrl) return;
  pretext = pretext + environmentMessage;

  slackWebhook.send({
    attachments: [{
      mrkdwn_in: [
        "text",
        "pretext"
      ],
      pretext: pretext || "",
      text: message || "",
      title: title || ""
    }]
  }, (error, response) => { // eslint-disable-line no-unused-vars
    if (error) console.log(error); // eslint-disable-line no-console
  });
};
