"use strict";



//  P A C K A G E S

const decamelize = require("decamelize");
const dedent = require("dedent");
const exists = require("fs-exists-sync");
const fm = require("front-matter");
const fs = require("graceful-fs");
const html = require("choo-async/html");
const local = require("app-root-path").require;
const md = require("markdown-it")({
  html: true,
  typographer: true
}).use(require("markdown-it-sup"));
const raw = require("nanohtml/raw");



//  P R O G R A M

const page = () => async (state, emit) => { // eslint-disable-line
  const path = state.params.wildcard;

  if (!fs.existsSync(`${__dirname}/${path}.md`)) {
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
            <p>This page does not exist</p>
          </div>
        </section>
      </article>
    `;
  }

  const markdownFile = fs.readFileSync(`${__dirname}/${path}.md`, "utf-8");
  const markdownFileDetails = fm(markdownFile);
  const renderedMarkdown = md.render(partialFinder(markdownFileDetails.body));

  let ecosystemScripts = "";
  if (path === "overview") ecosystemScripts = "<script>" + fs.readFileSync("./views/partials/ecosystem-scripts.js", "utf-8") + "</script>";

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
          ${raw(ecosystemScripts)}
        </div>
      </section>
    </article>
  `;
};



//  H E L P E R

function partialFinder(markdownBody) {
  const regexToFindPartials = /<\w+\/>/g;
  const partials = markdownBody.match(regexToFindPartials);

  if (!partials) return;

  for (const partial of partials) {
    const filename = decamelize(partial, "-").replace("<", "").replace("/>", "");
    const fileExistsTest = exists(`./views/partials/${filename}.js`); // `local` results in error if used here and file !exist

    if (fileExistsTest) {
      const something = local(`/views/partials/${filename}.js`);

      if (filename === "ecosystem") {
        const Ecosystem = new something;
        markdownBody = markdownBody.replace(partial, Ecosystem.render());
        // console.log(new something);
      }

      else markdownBody = markdownBody.replace(partial, something);
    }
  }

  return dedent(markdownBody); // partials get rendered as code snippets w/o `dedent`
}



//  E X P O R T

module.exports = exports = page;
