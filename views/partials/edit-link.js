"use strict";



//  P A C K A G E

const html = require("choo-async/html");
const local = require("app-root-path").require;

//  V A R I A B L E

const config = local("/config");



//  P R O G R A M

const editLink = pagePath => {
  let githubUrl = `https://github.com/${config.github.repo}/edit`;

  if (pagePath === "/") githubUrl = `${githubUrl}/master/README.md`;
  else githubUrl = `${githubUrl}/${config.github.docsBranch}${pagePath}.md`; // TODO: Update this to match new site structure

  return html`
    <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" title="${config.github.editLinkText}">${config.github.editLinkText}</a>
  `;
};



//  E X P O R T

module.exports = exports = editLink;
