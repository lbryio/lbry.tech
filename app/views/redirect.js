"use strict";



//  P A C K A G E S

import fs from "graceful-fs";
import html from "choo/html";
import fm from "front-matter";
import { require as local } from "app-root-path";
import raw from "choo/html/raw";

//  U T I L S

const markdown = local("/app/components/markdown");
const redirect404 = local("/app/modules/redirect-404");



//  E X P O R T

module.exports = exports = (state, emit) => { // eslint-disable-line
  const partialPath = state.route === "resources/*" ? `resources/${state.params.wildcard}` : state.params.wildcard;
  const path = `./documents/${partialPath}.md`;

  if (!fs.existsSync(path)) {
    return redirect404(state);
  }

  const markdownFile = fs.readFileSync(path, "utf-8");
  const markdownFileDetails = fm(markdownFile);

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

  // below should be refactored into components
  let pageScript = "";

  if (partialPath === "glossary") pageScript = "<script>" + fs.readFileSync("./app/components/client/glossary-scripts.js", "utf-8") + "</script>";
  if (partialPath === "overview") pageScript = "<script>" + fs.readFileSync("./app/components/client/ecosystem-scripts.js", "utf-8") + "</script>";
  if (partialPath === "playground") pageScript = "<script>" + fs.readFileSync("./app/components/client/playground-scripts.js", "utf-8") + "</script>";

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
          ${markdown(path)}
          ${raw(pageScript)}
        </div>
      </section>
    </article>
  `;
};
