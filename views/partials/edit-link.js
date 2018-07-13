"use strict";



//  P A C K A G E

const html = require("choo-async/html");
const local = require("app-root-path").require;

//  V A R I A B L E

const config = local("/config");



//  P R O G R A M

const editLink = pagePath => {
  let githubUrl = `https://github.com/${config.github.repo}/edit/${config.github.branch}`;

  switch(pagePath) {
    case "":
      githubUrl = `${githubUrl}/views/pages/home.js`;
      break;

    case  "/resources":
      githubUrl = `${githubUrl}/views/pages/resources.js`;
      break;

    default:
      githubUrl = `${githubUrl}/documents${pagePath}.md`;
      break;
  }

  return html`
    <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" title="${config.github.linkText}">${config.github.linkText}</a>
  `;
};



//  E X P O R T

module.exports = exports = editLink;
