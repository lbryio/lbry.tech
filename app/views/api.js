"use strict";



//  P A C K A G E S

import dedent from "dedent";
import fs from "graceful-fs";
import html from "choo/html";
import raw from "choo/html/raw";

const fetch = require("make-fetch-happen").defaults({ cacheManager: "./cache" });

//  V A R I A B L E

const apiScripts = "<script>" + fs.readFileSync("./app/views/partials/api-scripts.js", "utf-8") + "</script>";



//  E X P O R T

module.exports = exports = state => {
  return generate(state.params.wildcard).then(response => {
    // console.log(response);
    return html`${response}`;
  });
  // generate(state.params.wildcard, response => html`${response}`);
};



/*
module.exports = exports = () => state => {
  console.log(state);
  parseApiFile(state.params.wildcard).then(response => {
    return html`
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

      ${raw(apiScripts)}
    `;
  });
};
*/

function generate(stuff, callback) {
  /*
  parseApiFile(stuff).then(response => {
    const test = `
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

      ${raw(apiScripts)}
    `;

    return callback(test);
  });
  */

  return new Promise((resolve, reject) => { // eslint-disable-line
    parseApiFile(stuff).then(response => {
      const test = `
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

        ${raw(apiScripts)}
      `;

      return resolve(test);
    });
  });

  /*
  Promise.all([parseApiFile(stuff)]).then(response => {
    response = response[0];

    const test = `
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

      ${raw(apiScripts)}
    `;

    return callback(test);
  });
  */
}

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

  if (!urlSlug || urlSlug === "api" || urlSlug === "protocol") apiFileLink = process.env.NODE_ENV === "development" ?
    "https://rawgit.com/lbryio/lbry/master/docs/api.json" :
    "https://cdn.rawgit.com/lbryio/lbry/5b3103e4/docs/api.json"
  ;

  if (urlSlug === "blockchain") apiFileLink = process.env.NODE_ENV === "development" ?
    "https://rawgit.com/lbryio/lbrycrd/add_api_docs_scripts/contrib/devtools/generated/api_v1.json" :
    "https://cdn.rawgit.com/lbryio/lbrycrd/add_api_docs_scripts/contrib/devtools/generated/api_v1.json"
  ;

  if (!apiFileLink) return; // TODO: Error handling

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
