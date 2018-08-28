"use strict";



//  P A C K A G E

import html from "choo/html";
import { require as local } from "app-root-path";

//  V A R I A B L E S

const config = local("/config");
let title = "";



//  E X P O R T

module.exports = exports = (state, emit) => {
  /*
  let pageTitle = "";

  if (state.route && state.route !== "/" && state.route !== "*") pageTitle = state.route.charAt(0).toUpperCase() + state.route.slice(1);
  if (state.params.wildcard) pageTitle = state.params.wildcard.charAt(0).toUpperCase() + state.params.wildcard.slice(1);

  if (pageTitle === "Api") pageTitle = "API";

  <title>${pageTitle.length ? pageTitle + " | " : ""}${config.meta.title} &middot; ${config.meta.tagline}</title>
  */

  if (state.route !== "/" && state.params.wildcard) title = `${state.params.wildcard.capitalize()} ∙ LBRY ∙ ${config.meta.tagline}`;
  else title = `LBRY ∙ ${config.meta.tagline}`;

  if (state.title !== title) emit(state.events.DOMTITLECHANGE, title);
  state.page = state.page || { };

  // TODO:
  // - Support custom metadata (descriptions and whatnot)
  // - Update og:url with current URL

  return html`
    <meta charset="utf-8"/>
    <title>${title}</title>

    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="author" content="${config.meta.title}"/>
    <meta name="description" content="${config.meta.description}"/>
    <meta name="keywords" content=""/>
    <meta name="title" content="${config.meta.title}"/>
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"/>

    <!--/ Open Graph /-->
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="${config.meta.title}"/>
    <meta property="og:url" content=""/>
    <meta property="og:site_name" content="${config.meta.title}"/>
    <meta property="og:image" content="/assets/images/apple-touch-icon.png"/>
    <meta property="og:locale" content="en_US"/>

    <!--/ Social/App Stuff /-->
    <meta name="apple-mobile-web-app-title" content="${config.meta.title}"/>
    <meta name="application-name" content="${config.meta.title}"/>
    <meta name="msapplication-TileColor" content="${config.meta.color}"/>
    <meta name="msapplication-TileImage" content="/assets/images/apple-touch-icon.png"/>
    <meta name="theme-color" content="${config.meta.color}"/>

    <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png"/>
    <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml"/>
    <link rel="mask-icon" href="/assets/images/favicon.svg" color="${config.meta.color}"/>
    <link rel="shortcut icon" href="/assets/favicon.ico"/>

    <link href="/assets/bundle.css" rel="stylesheet"/>

    <!--/ <script src="/assets/bundle.js"></script> /-->
    <script src="/assets/scripts/vendor/zepto.js"></script>

    <script>const ws = new WebSocket(location.origin.replace(/^http/, "ws"));</script>
    <script src="/assets/scripts/sockets.js"></script>
  `;

  // state.route === "api" || state.route === "api/*" ? <script src="/assets/scripts/plugins/jets.js"></script> : ""
};



//  H E L P E R

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
