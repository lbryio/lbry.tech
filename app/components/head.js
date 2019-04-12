"use strict";



//  I M P O R T

import html from "choo/html";

//  U T I L

import config from "@root/config";



//  E X P O R T

export default (state, emit) => {
  const newMetadata = state.lbry;
  const description = newMetadata && newMetadata.description ?
    newMetadata.description :
    config.meta.description;

  const title = newMetadata && newMetadata.title ?
    newMetadata.title + " - lbry.tech" :
    "lbry.tech - " + config.meta.tagline;

  if (state.title !== title)
    emit(state.events.DOMTITLECHANGE, title);

  state.page = state.page || { };

  return html`
    <meta charset="utf-8"/>
    <title>${title}</title>

    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="author" content="${config.meta.title}"/>
    <meta name="description" content="${description}"/>
    <meta name="title" content="${config.meta.title}"/>
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"/>

    <!--/ Open Graph /-->
    <meta property="og:title" content="${title}"/>
    <meta property="og:description" content="${description}"/>
    <meta property="og:image" content="${newMetadata && newMetadata["og:image"] ? newMetadata["og:image"] : "/assets/media/images/og-image.png"}"/>
    <meta property="og:image:height" content="${newMetadata && newMetadata["og:image:height"] ? newMetadata["og:image:height"] : 720}"/>
    <meta property="og:image:width" content="${newMetadata && newMetadata["og:image:width"] ? newMetadata["og:image:width"] : 1280}"/>
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="LBRY.tech"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://lbry.tech${state.href}"/>

    <!--/ Social/App Stuff /-->
    <meta name="apple-mobile-web-app-title" content="${config.meta.title}"/>
    <meta name="application-name" content="${config.meta.title}"/>
    <meta name="msapplication-TileColor" content="${config.meta.color}"/>
    <meta name="msapplication-TileImage" content="/assets/apple-touch-icon.png"/>
    <meta name="theme-color" content="${config.meta.color}"/>

    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"/>
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"/>
    <link rel="mask-icon" href="/assets/favicon.svg" color="${config.meta.color}"/>
    <link rel="shortcut icon" href="/assets/favicon.ico"/>
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tonsky/FiraCode@master/distr/fira_code.css"/>
    <link rel="stylesheet" href="/assets/bundle.css"/>

    <script src="/assets/scripts/sockets.js"></script>
  `;
};



//  H E L P E R

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
