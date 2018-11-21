"use strict";



//  P A C K A G E

const got = require("got");

//  U T I L

const queryUrl = `${process.env.NODE_ENV === "development" ? "http://localhost:5200/publish" : `https://${process.env.DAEMON_URL}/publish`}`;



//  E X P O R T

module.exports = exports = async(publishMetadata) => {
  const options = {
    body: {
      authorization: process.env.LBRY_DAEMON_ACCESS_TOKEN,
      metadata: publishMetadata
    },
    json: true,
    method: "PUT"
  };

  try {
    const response = await got(queryUrl, options);
    return response.body; // eslint-disable-line padding-line-between-statements
  } catch (error) {
    return error;
  }
};
