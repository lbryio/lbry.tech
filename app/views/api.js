"use strict";



//  I M P O R T S

import asyncHtml from "choo-async/html";
import dedent from "dedent";
import got from "got";

//  U T I L S

import headerBlockchain from "~component/api/header-blockchain";
import headerSdk from "~component/api/header-sdk";
import redirects from "~data/redirects.json";

const blockchainApi = "https://raw.githubusercontent.com/lbryio/lbrycrd/master/contrib/devtools/generated/api_v1.json";
const cache = new Map();
const sdkApi = "https://raw.githubusercontent.com/lbryio/lbry-sdk/master/lbry/docs/api.json";



//  E X P O R T

export default async(state) => {
  // below is evil, I just inherited it -- Jeremy
  const apilabel = state.params.wildcard === "sdk" ?
    "SDK" :
    state.params.wildcard.charAt(0).toLocaleUpperCase() + state.params.wildcard.substring(1);

  state.lbry = {
    title: apilabel + " API Documentation",
    description: "See API documentation, signatures, and sample calls for the LBRY " + apilabel + " APIs."
  };

  try {
    const apiResponse = await parseApiFile(state.params.wildcard);

    return asyncHtml`
      <div class="__slate">
        <aside class="api-toc">
          <div class="api-toc__search">
            <input class="api-toc__search-field" id="input-search" placeholder="Search" type="search"/>
            <div class="api-toc__search-clear" id="clear-search" title="Clear search query">&times;</div>
            <ul class="api-toc__search-results"></ul>
          </div>

          <ul class="api-toc__commands" id="toc" role="navigation">
            ${apilabel === "SDK" ? createSdkSidebar(apiResponse) : createApiSidebar(apiResponse)}
          </ul>
        </aside>
        <section class="api-content">
          <div class="api-documentation" id="toc-content">
            <div></div>
            <nav class="api-content__items">
              ${renderToggles(apilabel === "SDK")}
            </nav>

            ${createApiHeader(state.params.wildcard)}
            ${apilabel === "SDK" ? createSdkContent(apiResponse) : createApiContent(apiResponse)}
          </div>
        </section>
      </div>

      <script src="/assets/scripts/plugins/jets.js"></script>
      <script src="/assets/scripts/api.js"></script>

      <script>
        if (window.location.pathname === "/api/blockchain")
          document.getElementById("toggle-cli").click();
        else
          document.getElementById("toggle-curl").click();
      </script>
    `;
  }

  catch(error) {
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

  apiDetails.forEach(apiDetail => {
    let apiDetailsReturns = "";

    if (apiDetail.returns)
      apiDetailsReturns = JSON.parse(JSON.stringify(apiDetail.returns));

    apiContent.push(`
      <div class="api-content__body">
        <h2 id="${apiDetail.name}">${apiDetail.name}</h2>
        <p>${apiDetail.description}</p>

        ${apiDetail.arguments.length ? `<h3>Arguments</h3><ul class="api-content__body-arguments">${renderArguments(apiDetail.arguments).join("")}</ul>` : ""}
        ${apiDetail.returns ? `<h3>Returns</h3><pre><code>${dedent(apiDetailsReturns)}</code></pre>` : ""}
      </div>

      <div class="api-content__example">
        ${apiDetail.examples && apiDetail.examples.length ? renderExamples(apiDetail.examples).join("") : `<pre><code>// example(s) for ${apiDetail.name} to come later</code></pre>`}
      </div>
    `);
  });

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

  apiDetails.forEach(apiDetail => {
    apiSidebar.push(`
      <li class="api-toc__command">
        <a href="#${apiDetail.name}" title="Go to ${apiDetail.name} section">
          ${apiDetail.name}
        </a>
      </li>
    `);
  });

  return apiSidebar;
}

function createSdkContent(apiDetails) {
  const apiContent = [];
  const sectionTitles = Object.keys(apiDetails);

  sectionTitles.forEach(title => {
    const commands = apiDetails[title].commands;
    const description = apiDetails[title].doc;

    apiContent.push(
      commands.length ?
        commands.map(command => createSdkContentSections(title, description, command)).join("") :
        ""
    );
  });

  return apiContent;
}

function createSdkContentSections(sectionTitle, sectionDescription, sectionDetails) {
  return `
    <div class="api-content__body">
      <h2 id="${sectionDetails.name}">${sectionDetails.name}</h2>
      <p>${sectionDetails.description}</p>

      <h3>Arguments</h3>
      <ul class="api-content__body-arguments">
        ${renderArguments(sectionDetails.arguments).join("")}
      </ul>

      <h3>Returns</h3>
      <pre><code>${renderReturns(sectionDetails.returns)}</code></pre>
    </div>

    <div class="api-content__example">
      ${renderExamples(sectionDetails.examples).join("")}
    </div>
  `;
}

function createSdkSidebar(apiDetails) {
  const sectionTitles = Object.keys(apiDetails);
  const apiSidebar = [];

  sectionTitles.forEach(title => {
    const commands = apiDetails[title].commands;

    apiSidebar.push(`
      <ul class="api-toc__section">
        <li class="api-toc__title">${title}</li>
        ${(commands.map(command => `<li class="api-toc__command"><a href="#${command.name}" title="Go to ${command.name} section">${command.name}</a></li>`)).join("")}
      </ul>
    `);
  });

  return apiSidebar;
}

async function parseApiFile(urlSlug) {
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

  if (!apiFileLink)
    return Promise.reject(new Error("Failed to fetch API docs"));

  const response = await got(apiFileLink, { cache, json: true });

  try {
    return response.body;
  } catch(error) {
    return "Issue loading API documentation";
  }
}

function renderArguments(args) {
  const argumentContent = [];

  if (!args || args.length === 0)
    return argumentContent;

  args.forEach(arg => {
    argumentContent.push(`
      <li class="api-content__body-argument">
        <div class="left">
          <strong>${arg.name}</strong><br/>
          ${arg.is_required === true ? "" : "<span>optional</span>" }<span>${arg.type}</span>
        </div>

        <div class="right">${typeof arg.description === "string" ? arg.description.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""}</div>
      </li>
    `);
  });

  return argumentContent;
}

function renderExamples(args) {
  const exampleContent = [];

  if (!args || args.length === 0) {
    exampleContent.push("<pre><code>// example(s) to come later</code></pre>");
    return exampleContent;
  }

  args.forEach(arg => {
    exampleContent.push(`
      ${arg.title ? `<h3>${arg.title}</h3><br/>` : ""}
      ${arg.cli ? `<pre data-api-example-type="cli"><code>${arg.cli}</code></pre>` : ""}
      ${arg.curl ? `<pre data-api-example-type="curl"><code>${arg.curl}</code></pre>` : ""}
      ${arg.lbrynet ? `<pre data-api-example-type="lbrynet"><code>${arg.lbrynet}</code></pre>` : ""}
      ${arg.python ? `<pre data-api-example-type="python"><code>${arg.python}</code></pre>` : ""}

      ${arg.output ? `
        <h3>Output</h3><br/>
        <pre><code>${arg.output}</code></pre>
        <hr/>
      ` : ""}
    `);
  });

  return exampleContent;
}

function renderReturns(args) {
  let returnContent = [];

  if (!args || args.length === 0)
    return returnContent;

  returnContent = dedent(JSON.parse(JSON.stringify(args)));
  return returnContent;
}

function renderToggles(onSdkPage) {
  return [
    "<button class='api-content__item menu' id='toggle-menu'>menu</button>",
    !onSdkPage ? "<button class='api-content__item' id='toggle-cli' type='button'>cli</button>" : "",
    "<button class='api-content__item' id='toggle-curl' type='button'>curl</button>",
    onSdkPage ? "<button class='api-content__item' id='toggle-lbrynet' type='button'>lbrynet</button>" : "",
    onSdkPage ? "<button class='api-content__item' id='toggle-python' type='button'>python</button>" : ""
  ];
}
