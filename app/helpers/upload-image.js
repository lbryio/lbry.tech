"use strict";



//  I M P O R T

import got from "got";

//  U T I L

const queryUrl = process.env.NODE_ENV === "development" ?
  "http://localhost:5200/image" :
  `https://${process.env.DAEMON_URL}/image`;



//  E X P O R T

export default async(imageSource) => {
  const options = {
    body: {
      authorization: process.env.LBRY_DAEMON_ACCESS_TOKEN,
      image: imageSource
    },
    json: true
  };

  try {
    const response = await got.post(queryUrl, options);
    return response.body; // eslint-disable-line padding-line-between-statements
  } catch (error) {
    return error;
  }
};
