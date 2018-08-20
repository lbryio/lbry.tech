"use strict";



//  P A C K A G E

const request = require("request-promise-native");



//  E X P O R T

module.exports = exports = publishMetadata => new Promise((resolve, reject) => request({ // eslint-disable-line
  body: {
    authorization: process.env.LBRY_DAEMON_ACCESS_TOKEN,
    metadata: publishMetadata
  },
  json: true,
  method: "PUT",
  url: `${process.env.NODE_ENV === "development" ? "http://localhost:5200/publish" : "https://daemon.lbry.tech/publish" }`
}, (error, response, body) => {
  if (error) resolve(error);
  resolve(body);
}));
