"use strict";


//  P A C K A G E

const html = require("choo-async/html");



//  P R O G R A M

function noscript () {
  return () => html`
    <noscript>
      <p>Socii is quite fancy and relies on a bit of JavaScript to do these fancy things.</p>
      <p>Please enable it, if you can.</p>
    </noscript>
  `;
}



//  E X P O R T

module.exports = exports = noscript;
