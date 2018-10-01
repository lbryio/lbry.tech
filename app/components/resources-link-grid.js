"use strict";

import linkGrid from "./link-grid";

export default () => {
  return linkGrid([{
    title: "Whitepaper",
    description: "Read the formal specification for LBRY.",
    destination: "/whitepaper",
    label: "Study the Paper"
  }, {
    title: "Contributor's Guide",
    description: "Can you code, design, write or test? Join us!",
    destination: "/contribute",
    label: "Read the Guide"
  }, {
    title: "SDK APIs",
    description: "Method signatures and examples for lbry-sdk, the most common way to build on LBRY.",
    destination: "/api/sdk",
    label: "SDK APIs"
  }, {
    title: "Blockchain APIs",
    description: "Method signatures and examples for lbrycrd, the LBRY blockchain.",
    destination: "/api/blockchain",
    label: "Blockchain APIs"
  }]);
};
