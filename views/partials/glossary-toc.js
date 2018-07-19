"use strict";



//  E X P O R T

module.exports = exports = (state, emit, markdown) => {
  const headerRegex = /###.+/g;
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
  return stringToSlugify
    .toLowerCase()
    .replace(/ \/ /g, "-")
    .replace(/\s/g, "-")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/,/g, "")
    .replace(/###-/g, "#");
}
