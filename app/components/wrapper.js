"use strict";



//  P A C K A G E

import html from "choo/html";

//  V A R I A B L E S

import footer from "./footer";
import Navigation from "./navigation";

const navigation = new Navigation();



//  E X P O R T

module.exports = exports = children => (state, emit) => {
  return html`
    <main>
      <noscript>
        <p>LBRY is quite fancy and relies on a bit of JavaScript to do these fancy things.</p>
        <p>Please enable it, if you can.</p>
      </noscript>

      ${navigation.render({ href: state.href || "/" })}
      <aside class="flashes" id="flash-container"></aside>
      ${children(state, emit)}
      ${footer(state, emit)}
    </main>
  `;
};
