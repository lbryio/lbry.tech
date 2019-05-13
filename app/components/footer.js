"use strict";



//  I M P O R T

import html from "choo/html";

//  U T I L S

import editLink from "./edit-link";
import emailSubscribe from "./email-subscribe";



//  E X P O R T

export default state => {
  if (state.hideFooter)
    return "";

  return html`
    <section class="email-subscribe-container">
      ${emailSubscribe()}
    </section>

    <footer class="footer">
      <div class="inner-wrap">
        <ul>
          <li>
            <a href="//${process.env.NODE_ENV === "development" ? "localhost:8000" : "lbry.com"}" title="Rediscover content freedom">← LBRY.com</a> |
            ${editLink(state.href)}
          </li>

          <li><a href="/overview" title="LBRY overview">Overview</a></li>
          <li><a href="/playground" title="Play with LBRY">Playground</a></li>
          <li><a href="/resources" title="View LBRY resources">Resources</a></li>
          <li><a href="/community" title="Hang with LBRY">Community</a></li>
        </ul>
      </div>
    </footer>

    <script src="/assets/scripts/app.js"></script>
  `;
};
