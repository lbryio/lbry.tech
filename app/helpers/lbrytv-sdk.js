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

      if (Object.prototype.hasOwnProperty.call(daemonResponse,"error")) {
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
  return;
};

export default {
  addSupport,
  publish,
  resolve,
  getTrending
};
