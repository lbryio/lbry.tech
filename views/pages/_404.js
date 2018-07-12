"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  P R O G R A M

//  eslint-disable-next-line
const missing = () => async (state, emit) => html`
  <section class="ancillary inner-wrap">
    <h2>404</h2>
    <p>This page does not exist</p>
  </section>
`;



//  E X P O R T

module.exports = exports = missing;
