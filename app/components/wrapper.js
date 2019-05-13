"use strict";



//  I M P O R T

import asyncHtml from "choo-async/html";

//  U T I L S

import config from "~root/config";
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
