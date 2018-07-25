"use strict";



//  P A C K A G E S

const decamelize = require("decamelize");
const dedent = require("dedent");
const exists = require("fs-exists-sync");
const fm = require("front-matter");
const fs = require("graceful-fs");
const html = require("choo-async/html");
const local = require("app-root-path").require;
const numberRegex = /^[0-9]/g;

const md = require("markdown-it")({
  html: true,
  typographer: true
}).use(local("modules/markdown-it-sup"))
  .use(require("markdown-it-anchor"), {
    slugify: stringToSlugify => {
      let finalString = stringToSlugify
        .toLowerCase()
        .replace(/\s\/\s/g, "-")
        .replace(/\s/g, "-")
        .replace(/%/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/,/g, "");

      if (finalString.match(numberRegex)) finalString = `_${finalString}`;
      return finalString;
    }
  })
  .use(require("markdown-it-wikilinks")({
    makeAllLinksAbsolute: true,
    baseURL: "/glossary#",
    uriSuffix: "",
    htmlAttributes: {
      class: "wikilink"
    }
  }));

const raw = require("nanohtml/raw");



//  E X P O R T

module.exports = exports = () => async state => {
  const path = state.params.wildcard;

  if (!fs.existsSync(`./documents/${path}.md`)) {
    return html`
      <article class="page" itemtype="http://schema.org/BlogPosting">
        <header class="page__header">
          <div class="page__header-wrap">
            <div class="inner-wrap">
              <h1 class="page__header__title" itemprop="name headline">404</h1>
            </div>
          </div>
        </header>

        <section class="page__content" itemprop="articleBody">
          <div class="inner-wrap">
            <p>The page you are looking for does not exist.</p>
          </div>
        </section>
      </article>
    `;
  }

  const markdownFile = fs.readFileSync(`./documents/${path}.md`, "utf-8");
  const markdownFileDetails = fm(markdownFile);
  const renderedMarkdown = md.render(partialFinder(markdownFileDetails.body));

  let pageScript = "";
  if (path === "overview") pageScript = "<script>" + fs.readFileSync("./views/partials/ecosystem-scripts.js", "utf-8") + "</script>";
  if (path === "glossary") pageScript = "<script>" + fs.readFileSync("./views/partials/glossary-scripts.js", "utf-8") + "</script>";

  return html`
    <article class="page" itemtype="http://schema.org/BlogPosting">
      <header class="page__header">
        <div class="page__header-wrap">
          <div class="inner-wrap">
            <h1 class="page__header__title" itemprop="name headline">${markdownFileDetails.attributes.title}</h1>
          </div>
        </div>
      </header>

      <section class="page__content" itemprop="articleBody">
        <div class="inner-wrap">
          ${raw(renderedMarkdown)}
          ${raw(pageScript)}
        </div>
      </section>
    </article>
  `;
};



//  H E L P E R

function partialFinder(markdownBody) {
  const regexToFindPartials = /<\w+\/>/g;
  const partials = markdownBody.match(regexToFindPartials);

  if (!partials) return markdownBody;

  for (const partial of partials) {
    const filename = decamelize(partial, "-").replace("<", "").replace("/>", "");
    const fileExistsTest = exists(`./views/partials/${filename}.js`); // `local` results in error if used here and file !exist

    if (fileExistsTest) {
      const partialFunction = local(`/views/partials/${filename}.js`);

      if (filename === "ecosystem") {
        const Ecosystem = new partialFunction;
        markdownBody = markdownBody.replace(partial, Ecosystem.render());
      }

      else markdownBody = markdownBody.replace(partial, partialFunction);
    }
  }

  return dedent(markdownBody); // partials get rendered as code snippets w/o `dedent`
}
