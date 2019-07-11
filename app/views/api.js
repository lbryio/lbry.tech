"use strict";



//  I M P O R T S

import asyncHtml from "choo-async/html";
import dedent from "dedent";
import got from "got";
import Octokit from "@octokit/rest";

//  U T I L S

import headerBlockchain from "~component/api/header-blockchain";
import headerSdk from "~component/api/header-sdk";
import redirects from "~data/redirects.json";

const cache = new Map();
const filePathBlockchain = "/contrib/devtools/generated/api_v1.json";
const filePathSdk = "/lbry/docs/api.json";
const rawGitHubBase = "https://raw.githubusercontent.com/lbryio/";

if (!process.env.GITHUB_OAUTH_TOKEN) // No point in rendering this page
  throw new Error("Missing GitHub token");

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_OAUTH_TOKEN}`
});



//  E X P O R T

export default async(state) => {
  const { tag } = state;
  const { wildcard } = state.params;

  const repository = wildcard === "sdk" ?
    "lbry-sdk" :
    "lbrycrd";

  state.lbry = {
    title: tag ? tag + " API Documentation" : "API Documentation",
    description: "See API documentation, signatures, and sample calls for the LBRY APIs."
  };

  const tags = await getTags(repository);
  const currentTag = tag && tag.length ? tag : tags[0];

  try {
    const apiResponse = await parseApiFile({ repo: repository, tag: currentTag });

    return asyncHtml`
      <div class="__slate">
        <aside class="api-toc">
          <select class="api-toc__select" onchange="changeDocumentationVersion(value);">
            ${renderVersionSelector(wildcard, tags, tag)}
          </select>

          <div class="api-toc__search">
            <input class="api-toc__search-field" id="input-search" placeholder="Search" type="search"/>
            <div class="api-toc__search-clear" id="clear-search" title="Clear search query">&times;</div>
            <ul class="api-toc__search-results"></ul>
          </div>

          <ul class="api-toc__commands" id="toc" role="navigation">
            ${wildcard === "sdk" ? createSdkSidebar(apiResponse) : createApiSidebar(apiResponse)}
          </ul>
        </aside>

        <section class="api-content">
          <div class="api-documentation" id="toc-content">
            <div></div>

            <nav class="api-content__items">
              ${renderCodeLanguageToggles(wildcard)}
            </nav>

            ${createApiHeader(wildcard, currentTag)}
            ${wildcard === "sdk" ? createSdkContent(apiResponse) : createApiContent(apiResponse)}
          </div>
        </section>

        <script src="/assets/scripts/plugins/jets.js"></script>
        <script src="/assets/scripts/api.js"></script>

        <script>
          initializeApiFunctionality();

          if (window.location.pathname === "/api/blockchain")
            document.getElementById("toggle-cli").click();
          else
            document.getElementById("toggle-curl").click();
        </script>
      </div>
    `;
  } catch(error) {
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

function createApiHeader(slug, apiVersion) {
  switch(slug) {
    case "blockchain":
      return headerBlockchain(apiVersion);

    case "sdk":
      return headerSdk(apiVersion);

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

async function getTags(repositoryName) {
  const { data } = await octokit.repos.listTags({
    owner: "lbryio",
    repo: repositoryName
  });

  const tags = [];

  // NOTE:
  // The versioning in our repos do not make sense so extra
  // exclusion code is needed to make this work.
  //
  // Documentation is only available after specific versions.

  switch(true) {
    case repositoryName === "lbry-sdk":
      data.forEach(tag => {
        if (
          tag.name >= "v0.38.0" &&
          tag.name !== "v0.38.0rc7" &&
          tag.name !== "v0.38.0rc6" &&
          tag.name !== "v0.38.0rc5" &&
          tag.name !== "v0.38.0rc4" &&
          tag.name !== "v0.38.0rc3" &&
          tag.name !== "v0.38.0rc2" &&
          tag.name !== "v0.38.0rc1"
        ) tags.push(tag.name);
      });
      break;

    case repositoryName === "lbrycrd":
      data.forEach(tag => {
        if (
          tag.name >= "v0.17.1.0" &&
          tag.name !== "v0.3.16" &&
          tag.name !== "v0.3.15" &&
          tag.name !== "v0.3-osx" &&
          tag.name !== "v0.2-alpha"
        ) tags.push(tag.name);
      });
      break;

    default:
      break;
  }

  return tags;
}

async function parseApiFile({ repo, tag }) {
  let apiFileLink = `${rawGitHubBase}${repo}/${tag}`;

  switch(true) {
    case (repo === "lbrycrd"):
      apiFileLink = `${apiFileLink}${filePathBlockchain}`;
      break;

    case (repo === "lbry-sdk"):
      apiFileLink = `${apiFileLink}${filePathSdk}`;
      break;

    default:
      return Promise.reject(new Error("Failed to fetch API docs"));
  }

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
          ${arg.is_required === true ? "" : "<span>optional</span>"}<span>${arg.type}</span>
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

function renderVersionSelector(pageSlug, versions, desiredTag) {
  const options = [
    "<option disabled>Select a version</option>"
  ];

  let optionIndex = 0;

  versions.forEach(version => {
    optionIndex++;
    let selectedOption = false;

    if (desiredTag && desiredTag === version)
      selectedOption = true;
    else if (optionIndex === 1)
      selectedOption = true;

    options.push(
      `<option value="${pageSlug}-${version}"${selectedOption ? " selected" : ""}>${version}</option>`
    );
  });

  return options;
}

function renderCodeLanguageToggles(pageSlug) {
  const onSdkPage = pageSlug === "sdk";

  return [
    "<button class='api-content__item menu' id='toggle-menu'>menu</button>",
    !onSdkPage ? "<button class='api-content__item' id='toggle-cli' type='button'>cli</button>" : "",
    "<button class='api-content__item' id='toggle-curl' type='button'>curl</button>",
    onSdkPage ? "<button class='api-content__item' id='toggle-lbrynet' type='button'>lbrynet</button>" : "",
    onSdkPage ? "<button class='api-content__item' id='toggle-python' type='button'>python</button>" : ""
  ];
}
