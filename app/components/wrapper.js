"use strict";



//  P A C K A G E S

import asyncHtml from "choo-async/html";
import { require as local } from "app-root-path";

//  U T I L S

const footer = local("/app/components/footer").default;
const navigation = local("/app/components/navigation").default;



//  E X P O R T

export default children => (state, emit) => asyncHtml`
  <main>
    <noscript>
      <p>LBRY is quite fancy and relies on a bit of JavaScript to do these fancy things.</p>
      <p>Please enable it, if you can.</p>
    </noscript>

    ${navigation(state.href)}
    <aside class="flashes" id="flash-container"></aside>
    ${children(state, emit)}
    ${footer(state, emit)}
  </main>
`;
