"use strict";
import messageSlack from "./slack";
const request = require("request");



const addSupport = function() {};

const publish = function() {};

const resolve = function(urls) {
  return new Promise(function(resolve, reject) {
    const options = {
      method: "POST",
      url: "https://api.na-backend.odysee.com/api/v1/proxy",
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
        return reject(new Error("DAEMON ERROR: resolve"));
      }

      if (Object.prototype.hasOwnProperty.call(daemonResponse, "error")) {
        messageSlack({
          message: "```" + daemonResponse.error + "```",
          title: "DAEMON ERROR: resolve"
        });
        return reject(new Error("DAEMON ERROR: resolve"));
      } else
        return resolve(daemonResponse.result);
    });
  });
};

const getTrending = function() {
  return new Promise(function(resolve, reject) {
    const options = {
      method: "POST",
      url: "https://api.na-backend.odysee.com/api/v1/proxy",
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
              not_tags: ["porn", "porno", "nsfw", "mature", "xxx", "sex", "creampie", "blowjob", "handjob", "vagina", "boobs", "big boobs", "big dick", "pussy", "cumshot", "anal", "hard fucking", "ass", "fuck", "hentai"],
              order_by: ["trending_group", "trending_mixed"]
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
        return reject(new Error("DAEMON ERROR: trending"));
      }

      if (Object.prototype.hasOwnProperty.call(daemonResponse, "error")) {
        messageSlack({
          message: "```" + daemonResponse.error + "```",
          title: "DAEMON ERROR: trending"
        });
        return reject(JSON.stringify(daemonResponse));
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
