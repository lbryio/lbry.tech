"use strict";



//  V A R I A B L E S

const idRegex = /(".*")/g;
const numberRegex = /^[0-9]/g;
const renderedHeaderRegex = /(<h\d\sid.*h\d>)/g;
const titleRegex = /(>.*<)/g;



//  E X P O R T

module.exports = exports = (state, emit, markdown) => {
  const collectionOfTocElements = [];
  const tocElements = markdown.match(renderedHeaderRegex);

  for (const item of tocElements) {
    const id = item.match(idRegex)[0].replace(/"/g, "");
    const title = item.match(titleRegex)[0].replace(">", "").replace("<", "");

    collectionOfTocElements.push(`
      <li><a href="${slugify(id)}" title="Go to '${title}'">${title}</a></li>
    `);
  }

  return `
    <ul class="component--glossary-toc">
      ${collectionOfTocElements.join("")}
    </ul>
 <button class="component--glossary-toc-toggle" data-action="toggle glossary sidebar" type="button">Toggle</button>
  `;
};



//  H E L P E R

function slugify(stringToSlugify) {
  let finalString = stringToSlugify
    .toLowerCase()
    .replace(/###\s/g, "")
    .replace(/\s\/\s/g, "-")
    .replace(/\s/g, "-")
    .replace(/%/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/,/g, "");

  if (finalString.match(numberRegex)) finalString = `_${finalString}`;
  return `#${finalString}`;
}
