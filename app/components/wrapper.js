"use strict";



//  I M P O R T

import asyncHtml from "choo-async/html";

//  U T I L S

import footer from "./footer";
import navigation from "./navigation";



//  E X P O R T

export default children => (state, emit) => {
  return asyncHtml`
    <header class="header">
      <div class="inner-wrap">
        ${navigation(state.href)}
      </div>
    </header>

    <main>
      <noscript>
        <p>LBRY is quite fancy and relies on a bit of JavaScript to do these fancy things.</p>
        <p>Please enable it, if you can.</p>
      </noscript>

      <aside class="flashes" id="flash-container"></aside>
      ${children.default(state, emit)}
    </main>

    ${footer(state, emit)}
  `;
};
