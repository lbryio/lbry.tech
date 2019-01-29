"use strict";



//  U T I L

import linkGrid from "./link-grid";



//  E X P O R T

export default () => linkGrid([{
  description: "Read the formal specification for LBRY.",
  destination: "/spec",
  label: "Study the Spec",
  title: "LBRY Specification"
}, {
  description: "Can you code, design, write or test? Join us!",
  destination: "/contribute",
  label: "Read the Guide",
  title: "Contributor's Guide"
}, {
  description: "Method signatures and examples for lbry-sdk, the most common way to build on LBRY.",
  destination: "/api/sdk",
  label: "SDK APIs",
  title: "SDK APIs"
}, {
  description: "Method signatures and examples for lbrycrd, the LBRY blockchain.",
  destination: "/api/blockchain",
  label: "Blockchain APIs",
  title: "Blockchain APIs"
}]);
