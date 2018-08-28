"use strict";



//  P A C K A G E

const request = require("request-promise-native");



//  E X P O R T

module.exports = exports = imageSource => new Promise((resolve, reject) => { // eslint-disable-line
  return request({
    body: {
      authorization: process.env.LBRY_DAEMON_ACCESS_TOKEN,
      image: imageSource
    },
    json: true,
    method: "POST",
    url: `${process.env.NODE_ENV === "development" ? "http://localhost:5200/image" : "https://daemon.lbry.tech/image" }`
  }, (error, response, body) => {
    if (error) resolve(error);
    resolve(body);
  });
});
