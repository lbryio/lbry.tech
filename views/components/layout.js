"use strict";



//  P A C K A G E

const html = require("choo-async/html");

//  V A R I A B L E S

const footer = require("../partials/footer");
const navigation = require("../partials/navigation");



//  P R O G R A M

const layout = children => (state, emit) => html`
  <main>
    ${navigation(state, emit)}
    ${children(state, emit)}
    ${footer(state, emit)}
  </main>
`;



//  E X P O R T

module.exports = exports = layout;
