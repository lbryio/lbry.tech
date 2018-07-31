"use strict";



//  P A C K A G E S

const html = require("choo-async/html");
const local = require("app-root-path").require;

//  V A R I A B L E

const config = local("/config");



//  E X P O R T

module.exports = exports = () => async (state) => {
  let pageTitle = "";

  if (state.route && state.route !== "/" && state.route !== "*") pageTitle = state.route.charAt(0).toUpperCase() + state.route.slice(1);
  if (state.params.wildcard) pageTitle = state.params.wildcard.charAt(0).toUpperCase() + state.params.wildcard.slice(1);

  if (pageTitle === "Api") pageTitle = "API";

  return html`${[
    html`<meta charset="utf-8"/>`,
    html`<title>${pageTitle.length ? pageTitle + " | " : ""}${config.meta.title} &middot; ${config.meta.tagline}</title>`,

    html`<meta name="apple-mobile-web-app-capable" content="yes"/>`,
    html`<meta name="author" content="${config.meta.title}"/>`,
    html`<meta name="description" content="${config.meta.description}"/>`,
    html`<meta name="title" content="${config.meta.tagline}"/>`,
    html`<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"/>`,

    // Open Graph
    html`<meta property="og:type" content="website"/>`,
    html`<meta property="og:title" content="${config.meta.title}"/>`,
    html`<meta property="og:url" content="url"/>`,
    html`<meta property="og:site_name" content="${config.meta.title}"/>`,
    html`<meta property="og:image" content="/assets/apple-touch-icon.png"/>`,
    html`<meta property="og:locale" content="en_US"/>`,

    // Social/App Stuff
    html`<meta name="apple-mobile-web-app-title" content="${config.meta.title}"/>`,
    html`<meta name="application-name" content="${config.meta.title}"/>`,
    html`<meta name="msapplication-TileColor" content="${config.meta.color}"/>`,
    html`<meta name="msapplication-TileImage" content="/assets/apple-touch-icon.png"/>`,
    html`<meta name="theme-color" content="${config.meta.color}"/>`,
    html`<meta name="socii:site" content="∴ ${config.meta.name}"/>`,

    html`<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"/>`,
    html`<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"/>`,
    html`<link rel="mask-icon" href="/assets/favicon.svg" color="${config.meta.color}"/>`,
    html`<link rel="stylesheet" href="/assets/css/style.css"/>`,

    html`<script src="/assets/scripts/vendor/zepto.js"></script>`,
    html`<script>const ws = new WebSocket(location.origin.replace(/^http/, "ws"));</script>`,
    html`<script src="/assets/scripts/sockets.js"></script>`
  ]}`;
};
