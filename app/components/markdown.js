"use strict";



//  I M P O R T S

import decamelize from "decamelize";
import exists from "fs-exists-sync";
import fm from "front-matter";
import fs from "graceful-fs";
import html from "choo/html";
import path from "path";
import raw from "choo/html/raw";
import { require as local } from "app-root-path";

//  U T I L S

const numberRegex = /^[0-9]/g;
const md = require("markdown-it")({
  html: true,
  typographer: true
}).use(local("/app/modules/markdown-it-sup"))
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

export default path => {
  const markdownFile = fs.readFileSync(path, "utf-8");
  const markdownFileDetails = fm(markdownFile);
  const renderedMarkdown = md.render(markdownFileDetails.body);
  const updatedMarkdown = wikiFinder(partialFinder(renderedMarkdown));

  return html`
    ${raw(updatedMarkdown)}
  `;
};



//  H E L P E R S

function partialFinder(markdownBody) {
  const regexToFindPartials = /<\w+ ?\/>/g;
  const partials = markdownBody.match(regexToFindPartials);

  if (partials) {
    for (const partial of partials) {
      const filename = decamelize(partial, "-").replace("<", "")
        .replace("/>", "")
        .trim();
      const fileExistsTest = exists(`./app/components/${filename}.js`);

      if (!fileExistsTest)
        markdownBody = markdownBody.replace(partial, "");

      else {
        const partialFunction = require(path.join(__dirname, "..", `./components/${filename}.js`));

        if (filename === "glossary-toc") markdownBody = markdownBody.replace(partial, partialFunction.default);
        else markdownBody = markdownBody.replace(partial, `</div>${partialFunction.default()}<div class="page__markup">`);
      }
    }
  }

  return ("<div class=\"page__markup\">" + markdownBody + "</div>").replace(/<div class="page__markup">\s*<\/div>/, "");
}

function wikiFinder(markdownBody) {
  return markdownBody.replace(/\[\[([\w\s/-]+)\]\]/g, (match, p1) => {
    const label = p1.trim();
    const url = encodeURI("/glossary#" + label.replace(/\s+/g, "-"));

    return label ?
      `<a class="link--glossary" href="${url}">${label}</a>` :
      match.input;
  });
}
