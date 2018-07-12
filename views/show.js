"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  P R O G R A M

const show = app => async (state, emit) => {
  const page = require(`${__dirname}/pages/${state.params.page}.js`);
  if (page) return html`${page(state, emit)(app)}`;

  /*
  else {
    return html`
      <section>
        <h2>404</h2>
        <p>The page you are looking for does not exist.</p>
      </section>
    `;
  }
  */
};



//  E X P O R T

module.exports = exports = show;
