"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  P R O G R A M

function error () {
  return err => () => html`
    <div>
      <h2>An error has occured</h2>
      <pre>${err.stack}</pre>
    </div>
  `;
}



//  E X P O R T

module.exports = exports = error;
