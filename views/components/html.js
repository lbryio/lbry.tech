"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  E X P O R T

module.exports = exports = (head, body) => (state, emit) => {
  const bodyPromise = Promise.resolve(body(state, emit));
  const headPromise = bodyPromise.then(() => head(state, emit)); // resolve `head` once `body` is resolved

  return html`
    <!DOCTYPE html>
    <html lang="en">
      ${headPromise}
      ${bodyPromise}
    </html>
  `;
};
