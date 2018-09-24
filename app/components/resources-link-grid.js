"use strict";

import linkGrid from "./link-grid"

export default () => {
  return linkGrid([{
    title: "Whitepaper",
    description: "It's a white paper",
    destination: "/whitepaper",
    label: "Read"
  }, {
    title: "Blockchain Docs",
    description: "Learn how to talk to blockchain real good",
    destination: "/api/blockchain",
    label: "Blockchain API"
  }, {
    title: "LBRYnet docs",
    description: "Learn wtf this is",
    destination: "/api/protocol",
    label: "SDK API LOL"
  }]);
}
