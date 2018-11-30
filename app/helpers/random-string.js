"use strict";



//  N A T I V E

import crypto from "crypto";



//  E X P O R T

export default len => {
  if (!Number.isFinite(len)) throw new TypeError("Expected a finite number");
  return crypto.randomBytes(Math.ceil(len / 2)).toString("hex")
    .slice(0, len);
};
