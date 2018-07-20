"use strict";



//  V A R I A B L E S

const headerRegex = /###.+/g;
const numberRegex = /^[0-9]/g;



//  E X P O R T

module.exports = exports = (state, emit, markdown) => {
  const tocElements = markdown.match(headerRegex);
  const collectionOfTocElements = [];

  for (const item of tocElements) collectionOfTocElements.push(`<li><a href="${slugify(item)}" title="">${item.replace(/### /g, "")}</a></li>`);

  return `
    <ul class="component--glossary-toc">
      ${collectionOfTocElements.join("")}
    </ul>
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
