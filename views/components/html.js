"use strict";



//  P A C K A G E

const h = require("choo-async/html");



//  P R O G R A M

function html(head, body) {
  return (state, emit) => {
    const bodyPromise = Promise.resolve(body(state, emit));
    const headPromise = bodyPromise.then(() => head(state, emit)); // resolve `head` once `body` is resolved

    return h`
      <!DOCTYPE html>
      <html lang="en">
        ${headPromise}
        ${bodyPromise}
      </html>
    `;
  };
}



//  E X P O R T

module.exports = exports = html;
