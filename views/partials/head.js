"use strict";



//  P A C K A G E S

const html = require("choo-async/html");



//  P R O G R A M

function head () {
  return () => html`${[
    html`<meta charset="utf-8"/>`,
    html`<title>LBRY &middot; tagline</title>`,

    html`<meta name="apple-mobile-web-app-capable" content="yes"/>`,
    html`<meta name="author" content="tagline}"/>`,
    html`<meta name="description" content="description}"/>`,
    html`<meta name="title" content="tagline}"/>`,
    html`<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"/>`,

    // Open Graph
    html`<meta property="og:type" content="website"/>`,
    html`<meta property="og:title" content="name}"/>`,
    html`<meta property="og:url" content="url}"/>`,
    html`<meta property="og:site_name" content="name}"/>`,
    html`<meta property="og:image" content="/assets/apple-touch-icon.png"/>`,
    html`<meta property="og:locale" content="en_US"/>`,

    // Social/App Stuff
    html`<meta name="apple-mobile-web-app-title" content="name}"/>`,
    html`<meta name="application-name" content="name}"/>`,
    html`<meta name="msapplication-TileColor" content="#111"/>`,
    html`<meta name="msapplication-TileImage" content="/assets/apple-touch-icon.png"/>`,
    html`<meta name="theme-color" content="#111"/>`,
    html`<meta name="socii:site" content="∴ name}"/>`,

    html`<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"/>`,
    html`<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"/>`,
    html`<link rel="mask-icon" href="/assets/favicon.svg" color="#111"/>`,
    html`<link rel="stylesheet" href="/assets/css/style.css"/>`,

    html`<script src="/assets/scripts/vendor/zepto.js"></script>`,
    html`<script>const ws = new WebSocket(location.origin.replace(/^http/, "ws"));</script>`,
    html`<script src="/assets/scripts/sockets.js"></script>`
  ]}`;
}



//  E X P O R T

module.exports = exports = head;
