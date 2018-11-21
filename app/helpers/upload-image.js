"use strict";



//  P A C K A G E

const got = require("got");

//  U T I L

const queryUrl = `${process.env.NODE_ENV === "development" ? "http://localhost:5200/image" : `https://${process.env.DAEMON_URL}/image` }`;



//  E X P O R T

module.exports = exports = async(imageSource) => {
  const options = {
    body: {
      authorization: process.env.LBRY_DAEMON_ACCESS_TOKEN,
      image: imageSource
    },
    json: true,
    method: "POST"
  };

  try {
    const response = await got(queryUrl, options);
    return response.body; // eslint-disable-line padding-line-between-statements
  } catch (error) {
    return error;
  }
};
