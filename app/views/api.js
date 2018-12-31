"use strict";



//  I M P O R T S

import asyncHtml from "choo-async/html";
import dedent from "dedent";

//  U T I L S

import headerBlockchain from "../components/api/header-blockchain";
import headerSdk from "../components/api/header-sdk";
import redirects from "../data/redirects.json";

const blockchainApi = "https://cdn.jsdelivr.net/gh/lbryio/lbrycrd@master/contrib/devtools/generated/api_v1.json";
const fetch = require("make-fetch-happen").defaults({ cacheManager: "./cache" });
const sdkApi = "https://cdn.jsdelivr.net/gh/lbryio/lbry@master/docs/api.json";



//  E X P O R T

export default async(state) => {
  // How to set custom metadata for this page
  // state.lbry = {
  //   description: "This is the API page for LBRY.tech",
  //   "og:image": "/assets/media/images/carlsagan2.jpg",
  //   "og:image:height": 300,
  //   "og:image:width": 400
  // };

  try {
    const apiResponse = await parseApiFile(state.params.wildcard);

    return asyncHtml`
      <div class="__slate">
        <aside class="api__toc">
          <div class="api__toc__search">
            <input class="api__toc__search__field" id="input-search" placeholder="Search" type="search"/>
            <div class="api__toc__search__clear" id="clear-search" title="Clear search query">&times;</div>
            <ul class="api__toc__search__results"></ul>
          </div>

          <ul class="api__toc__items" id="toc" role="navigation">${createApiSidebar(apiResponse)}</ul>
        </aside>
        <section class="api__content">
          ${createApiHeader(state.params.wildcard)}
          <div class="api__documentation" id="toc-content">
            ${createApiContent(apiResponse)}
          </div>
        </section>
      </div>

      <script src="/assets/scripts/plugins/jets.js"></script>
      <script src="/assets/scripts/api.js"></script>
    `;
  }

  catch (error) {
    const redirectUrl = redirects[state.href];

    return asyncHtml`
      <article class="page" itemtype="http://schema.org/BlogPosting">
        <header class="page__header">
          <div class="page__header-wrap">
            <div class="inner-wrap">
              <h1 class="page__header__title" itemprop="name headline">404</h1>
            </div>
          </div>
        </header>

        <section class="page__content page__markup" itemprop="articleBody">
          <div class="inner-wrap">
            <p>Redirecting you to <strong>${redirectUrl}</strong></p>
          </div>
        </section>
      </article>

      <script>
        setTimeout(() => {
          window.location.href = "${redirectUrl}";
        }, 2000);
      </script>
    `;
  }
};



//  H E L P E R S

function createApiContent(apiDetails) {
  const apiContent = [];

  for (const apiDetail of apiDetails) {
    let apiDetailsReturns = "";

    if (apiDetail.returns)
      apiDetailsReturns = JSON.parse(JSON.stringify(apiDetail.returns));

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

function createApiHeader(slug) {
  switch(slug) {
    case "blockchain":
      return headerBlockchain();

    case "sdk":
      return headerSdk();

    default:
      break;
  }
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

  switch(true) {
    case (urlSlug === "blockchain"):
      apiFileLink = blockchainApi;
      break;

    case (urlSlug === "sdk"):
      apiFileLink = sdkApi;
      break;

    default:
      break;
  }

  if (!apiFileLink) return Promise.reject(new Error("Failed to fetch API docs"));

  return fetch(apiFileLink)
    .then(res => {
      return res.json();
    })
    .then(() => {
      return fetch(apiFileLink, {
        cache: "no-cache" // forces a conditional request
      });
    })
    .then(res => {
      return res.json().then(body => body);
    });
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
