"use strict";
const request = require("request");

import messageSlack from "./slack";


let addSupport = function() {
  return;
};

let publish = function() {
  return;
};

let resolve = function(urls) {
  return new Promise(function(resolve, reject) {
    let options = {
      method: "POST",
      url: "https://api.lbry.tv/api/proxy",
      headers:
        {
          "Content-Type": "application/json"
        },
      body: {
        method: "resolve",
        params: { urls: urls }
      },
      json: true
    };

    request(options, function(error, response, daemonResponse) {
      if (error) {
        messageSlack({
          message: "```" + error + "```",
          title: "DAEMON ERROR: resolve"
        });
        return reject("DAEMON ERROR: resolve");
      }

      if (Object.prototype.hasOwnProperty.call(daemonResponse, "error")) {
        messageSlack({
          message: "```" + daemonResponse.error + "```",
          title: "DAEMON ERROR: resolve"
        });
        return reject("DAEMON ERROR: resolve");
      } else
        return resolve(daemonResponse.result);

    });
  });
};

let getTrending = function() {
  return new Promise(function(resolve, reject) {
    let options = {
      method: "POST",
      url: "https://api.lbry.tv/api/proxy",
      headers:
        {
          "Content-Type": "application/json"
        },
      body:
        {
          method: "claim_search",
          params:
            {
              page_size: 20,
              page: 1,
              no_totals: true,
              any_tags:
                ["art",
                  "automotive",
                  "blockchain",
                  "comedy",
                  "economics",
                  "education",
                  "gaming",
                  "music",
                  "news",
                  "science",
                  "sports",
                  "technology"],
              channel_ids: [],
              not_channel_ids: [],
              not_tags: ["porn", "nsfw", "mature", "xxx"],
              order_by: ["trending_global", "trending_mixed"]
            }
        },
      json: true
    };

    request(options, function(error, response, daemonResponse) {
      if (error) {
        messageSlack({
          message: "```" + error + "```",
          title: "DAEMON ERROR: trending"
        });
        return reject("DAEMON ERROR: trending");
      }

      if (Object.prototype.hasOwnProperty.call(daemonResponse, "error")) {
        messageSlack({
          message: "```" + daemonResponse.error + "```",
          title: "DAEMON ERROR: trending"
        });
        return reject("DAEMON ERROR: trending");
      } else
        return resolve(daemonResponse.result.items);

    });
  });
};

export default {
  addSupport,
  publish,
  resolve,
  getTrending
};
