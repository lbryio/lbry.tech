"use strict";



//  I M P O R T S

import html from "choo/html";
import { require as local } from "app-root-path";

//  U T I L S

import editLink from "./edit-link";
import emailSubscribe from "./email-subscribe";

const config = local("/config");



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
            <a href="//${process.env.NODE_ENV === "development" ? "localhost:8000" : "lbry.io"}" title="Rediscover content freedom">← LBRY.io</a> |
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

    <script>
      (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
       })(window,document,"script","https://www.google-analytics.com/analytics.js","ga");

       ga("create", "${config.ga}", "auto");
       ga("send", "pageview");
    </script>
  `;
};
