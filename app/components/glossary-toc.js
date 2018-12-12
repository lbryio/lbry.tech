"use strict";



//  U T I L S

const idRegex = /(".*")/g;
const numberRegex = /^[0-9]/g;
const renderedHeaderRegex = /(<h\d\sid.*h\d>)/g;
const titleRegex = /(>.*<)/g;



//  E X P O R T

export default (state, emit, markdown) => {
  const collectionOfTocElements = [];
  const tocElements = markdown.match(renderedHeaderRegex);

  for (const item of tocElements) {
    const id = item.match(idRegex)[0].replace(/"/g, "");
    const title = item.match(titleRegex)[0].replace(">", "").replace("<", "");

    collectionOfTocElements.push(`
      <li>
        <a href="${slugify(id)}" title="Go to '${title}'">${title}</a>
      </li>
    `);
  }

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
