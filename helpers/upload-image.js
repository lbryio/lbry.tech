"use strict";



//  P A C K A G E

const request = require("request-promise-native");



//  E X P O R T

module.exports = exports = imageSource => new Promise((resolve, reject) => {
  request({
    body: imageSource,
    headers: {
      "Content-Type": "text/plain"
    },
    method: "PUT",
    qs: {
      access_token: process.env.LBRY_DAEMON_ACCESS_TOKEN
    },
    url: "http://daemon.lbry.tech/images.php"
  }, (error, response, body) => {
    if (error) reject(error);
    body = JSON.parse(body);
    resolve(body);
  });
});
