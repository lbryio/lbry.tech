"use strict";



//  P A C K A G E S

import decamelize from "decamelize";
import exists from "fs-exists-sync";
import fm from "front-matter";
import fs from "graceful-fs";
import html from "choo/html";
import path from "path";
import { require as local } from "app-root-path";
import redirects from "../data/redirects.json";
import redirect from "../modules/redirect";
import Page404 from "./404.js";
import raw from "choo/html/raw";

//  V A R I A B L E S

const numberRegex = /^[0-9]/g;

const md = require("markdown-it")({
  html: true,
  typographer: true
}).use(local("app/modules/markdown-it-sup"))
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
  });

//  E X P O R T

module.exports = exports = (state, emit) => { // eslint-disable-line
  let path;

  if (state.route === "resources/*") path = `resources/${state.params.wildcard}`;
  else path = state.params.wildcard;

  if (!fs.existsSync(`./documents/${path}.md`)) {
    const redirectUrl = redirects[path] || redirects["/" + path];
    if (redirectUrl) {
      redirect(redirectUrl);
    } else {
      return Page404();
    }
  }

  const markdownFile = fs.readFileSync(`./documents/${path}.md`, "utf-8");
  const markdownFileDetails = fm(markdownFile);
  const renderedMarkdown = md.render(markdownFileDetails.body);
  const updatedMarkdown = wikiFinder(partialFinder(renderedMarkdown));

  if (markdownFileDetails.attributes.meta) {
    const customMetadata = {};

    for (const key in markdownFileDetails.attributes.meta) {
      if (markdownFileDetails.attributes.meta.hasOwnProperty(key)) {
        customMetadata[Object.keys(markdownFileDetails.attributes.meta[key])[0]] =
          markdownFileDetails.attributes.meta[key][Object.keys(markdownFileDetails.attributes.meta[key])[0]];
      }
    }

    state.lbry = customMetadata;
  }

  let pageScript = "";
  if (path === "glossary") pageScript = "<script>" + fs.readFileSync("./app/components/client/glossary-scripts.js", "utf-8") + "</script>";
  if (path === "overview") pageScript = "<script>" + fs.readFileSync("./app/components/client/ecosystem-scripts.js", "utf-8") + "</script>";
  if (path === "playground") pageScript = "<script>" + fs.readFileSync("./app/components/client/tour-scripts.js", "utf-8") + "</script>";

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
          <div class="page__markup">${raw(updatedMarkdown)}</div>
          ${raw(pageScript)}
        </div>
      </section>
    </article>
  `;
};



//  H E L P E R S

function partialFinder(markdownBody) {
  const regexToFindPartials = /<\w+ ?\/>/g;
  const partials = markdownBody.match(regexToFindPartials);

  if (!partials) return markdownBody;

  for (const partial of partials) {
    const filename = decamelize(partial, "-").replace("<", "").replace("/>", "").trim();
    const fileExistsTest = exists(`./app/components/${filename}.js`); // `local` results in error if used here and file !exist

    if (!fileExistsTest) {
      markdownBody = markdownBody.replace(partial, "");
    } else {
      const partialFunction = require(path.join(__dirname, "..", `./components/${filename}.js`));

      if (filename === "glossary-toc") markdownBody = markdownBody.replace(partial, partialFunction);
      else markdownBody = markdownBody.replace(partial, `</div>${partialFunction.default()}<div class="page__markup">`);
    }
  }

  return markdownBody;
}


function wikiFinder(markdownBody) {
  return markdownBody.replace(/\[\[([\w\s/-]+)\]\]/g, (match, p1) => {
    const label = p1.trim(),
      href = encodeURI("/glossary#" + label.replace(/\s+/g, "-"));

    return label ?
      `<a href="${href}" class="link--glossary">${label}</a>` :
      match.input;
  }
  );
}
