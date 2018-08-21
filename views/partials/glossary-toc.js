"use strict";



//  V A R I A B L E S

const headerRegex = /###.+/g;
const numberRegex = /^[0-9]/g;



//  E X P O R T

module.exports = exports = (state, emit, markdown) => {
  const collectionOfTocElements = [];
  const tocElements = markdown.match(headerRegex);

  for (const item of tocElements) collectionOfTocElements.push(`
    <li><a href="${slugify(item)}" title="Go to '${item.replace(/### /g, "")}'">${item.replace(/### /g, "")}</a></li>
  `);

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
