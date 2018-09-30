"use strict";

import linkGrid from "./link-grid"

export default () => {
  return linkGrid([{
    title: "Whitepaper",
    description: "It's a white paper",
    destination: "/whitepaper",
    label: "Read"
  }]) + linkGrid([ {
    title: "LBRY SDK APIs",
    description: "The LBRY SDK is the simplest way to start building with LBRY.",
    destination: "/api/protocol",
    label: "LBRY SDK API"
  }, {
    title: "Blockchain Docs",
    description: "Learn how to talk to blockchain real good",
    destination: "/api/blockchain",
    label: "Blockchain API"
  }]);
}
