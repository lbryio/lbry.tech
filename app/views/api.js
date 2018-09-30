"use strict";



//  P A C K A G E S

import asyncHtml from "choo-async/html";
import dedent from "dedent";
import fs from "graceful-fs";

const fetch = require("make-fetch-happen").defaults({ cacheManager: "./cache" });

/*
module.exports = exports = state => parseApiFile(state.params.wildcard).then(response => asyncHtml`
  <div class="api__header">
      I am a walrus.
  </div>
  <div class="__slate">
    <aside class="api__toc">
      <div class="api__toc__search">
        <input class="api__toc__search__field" id="input-search" placeholder="Search" type="search"/>
        <div class="api__toc__search__clear" id="clear-search" title="Clear search query">&times;</div>
        <ul class="api__toc__search__results"></ul>
      </div>

      <ul class="api__toc__items" id="toc" role="navigation">${createApiSidebar(response)}</ul>
    </aside>

    <section class="api__content" id="toc-content">${createApiContent(response)}</section>
  </div>
  <script src="/assets/scripts/plugins/jets.js"></script>
  <script src="/assets/scripts/api.js"></script>
`);
 */

module.exports = exports = state => parseApiFile(state.params.wildcard).then(response => {
  /*
  state.lbry = {
    description: "This is the API page for LBRY.tech",
    "og:image": "/assets/media/images/carlsagan2.jpg",
    "og:image:height": 300,
    "og:image:width": 400
  };
  */

  return asyncHtml`
    <div class="__slate">
      <aside class="api__toc">
        <div class="api__toc__search">
          <input class="api__toc__search__field" id="input-search" placeholder="Search" type="search"/>
          <div class="api__toc__search__clear" id="clear-search" title="Clear search query">&times;</div>
          <ul class="api__toc__search__results"></ul>
        </div>

        <ul class="api__toc__items" id="toc" role="navigation">${raw(createApiSidebar(response).join(""))}</ul>
      </aside>

      <section class="api__content" id="toc-content">${raw(createApiContent(response).join(""))}</section>
    </div>

    <script src="/assets/scripts/plugins/jets.js"></script>
    ${raw(apiScripts)}
  `;
});




//  H E L P E R S

function createApiContent(apiDetails) {
  const apiContent = [];

  for (const apiDetail of apiDetails) {
    let apiDetailsReturns = "";
    if (apiDetail.returns) apiDetailsReturns = JSON.parse(JSON.stringify(apiDetail.returns));

    apiContent.push(`
      <div class="api__content__body">
        <h2 id="${apiDetail.name}">${apiDetail.name}</h2>
        <p>${apiDetail.description}</p>

        ${apiDetail.arguments.length ? `<h3>Arguments</h3><ul class="api__content__body__arguments">${renderArguments(apiDetail.arguments).join("")}</ul>` : ""}

        <h3>Returns</h3>
        <pre><code>${dedent(apiDetailsReturns)}</code></pre>
      </div>

      <div class="api__content__example">
        <pre><code>// example(s) for ${apiDetail.name} to come later</code></pre>
      </div>
    `);
  }

  return apiContent;
}

function createApiSidebar(apiDetails) {
  const apiSidebar = [];

  for (const apiDetail of apiDetails) {
    apiSidebar.push(`
      <li class="api__toc__item">
        <a href="#${apiDetail.name}" title="Go to ${apiDetail.name} section">
          ${apiDetail.name}
        </a>
      </li>
    `);
  }

  return apiSidebar;
}

function parseApiFile(urlSlug) {
  let apiFileLink;

  //checks below are related to rate limits, both URLs should return the same content
  if (urlSlug === "sdk") apiFileLink = process.env.NODE_ENV === "development" ?
    "https://rawgit.com/lbryio/lbry/master/docs/api.json" :
    "https://cdn.rawgit.com/lbryio/lbry/master/docs/api.json"
  ;

  if (urlSlug === "blockchain") apiFileLink = process.env.NODE_ENV === "development" ?
    "https://rawgit.com/lbryio/lbrycrd/add_api_docs_scripts/contrib/devtools/generated/api_v1.json" :
    "https://cdn.rawgit.com/lbryio/lbrycrd/add_api_docs_scripts/contrib/devtools/generated/api_v1.json"
  ;

  if (!apiFileLink) return Promise.reject(new Error("Failed to fetch API docs")); // TODO: Error handling

  return fetch(apiFileLink).then(() => fetch(apiFileLink, {
    cache: "no-cache" // forces a conditional request
  })).then(res => res.json().then(body => body)); // res.status 304 = cache validated
}

function renderArguments(args) {
  const argumentContent = [];

  for (const arg of args) {
    argumentContent.push(`
      <li class="api__content__body__argument">
        <div class="left">
          <strong>${arg.name}</strong><br/>
          ${arg.is_required === true ? "" : "<span>optional</span>" }<span>${arg.type}</span>
        </div>

        <div class="right">${typeof arg.description === "string" ? arg.description.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""}</div>
      </li>
    `);
  }

  return argumentContent;
}
