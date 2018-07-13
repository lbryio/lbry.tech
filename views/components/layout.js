"use strict";



//  P A C K A G E

const html = require("choo-async/html");

//  V A R I A B L E S

const footer = require("../partials/footer");
const navigation = require("../partials/navigation");



//  E X P O R T

module.exports = exports = children => (state, emit) => html`
  <main>
    <noscript>
      <p>LBRY is quite fancy and relies on a bit of JavaScript to do these fancy things.</p>
      <p>Please enable it, if you can.</p>
    </noscript>

    ${navigation(state, emit)}
    ${children(state, emit)}
    ${footer(state, emit)}
  </main>
`;
