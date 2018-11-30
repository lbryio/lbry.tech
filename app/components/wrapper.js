"use strict";



//  I M P O R T

import asyncHtml from "choo-async/html";

//  U T I L S

import footer from "./footer";
import navigation from "./navigation";



//  E X P O R T

export default children => (state, emit) => {
  return asyncHtml`
    <main>
      <noscript>
        <p>LBRY is quite fancy and relies on a bit of JavaScript to do these fancy things.</p>
        <p>Please enable it, if you can.</p>
      </noscript>

      ${navigation(state.href)}
      <aside class="flashes" id="flash-container"></aside>
      ${children.default(state, emit)}
      ${footer(state, emit)}
    </main>
  `;
};
