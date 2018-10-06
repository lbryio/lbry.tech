"use strict";



//  P A C K A G E

const crypto = require("crypto");



//  E X P O R T

module.exports = exports = len => {
  if (!Number.isFinite(len)) throw new TypeError("Expected a finite number");
  return crypto.randomBytes(Math.ceil(len / 2)).toString("hex")
    .slice(0, len);
};
