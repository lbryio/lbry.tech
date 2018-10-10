"use strict";



//  P A C K A G E S

import html from "choo/html";
import { require as local } from "app-root-path";

//  U T I L

const config = local("/config");



//  E X P O R T

export default pagePath => {
  let githubUrl = `https://github.com/${config.github.repo}/edit/${config.github.branch}`;

  switch(pagePath) {
    case "":
      githubUrl = `${githubUrl}/app/views/home.js`;
      break;

    case "/api":
      githubUrl = `${githubUrl}/app/views/api.js`;
      break;

    case "/api/blockchain":
      githubUrl = "https://github.com/lbryio/lbrycrd/blob/add_api_docs_scripts/contrib/devtools/generated/api_v1.json";
      break;

    case "/api/sdk":
      githubUrl = "https://github.com/lbryio/lbry/blob/master/docs/api.json";
      break;

    default:
      githubUrl = `${githubUrl}/documents${pagePath}.md`;
      break;
  }

  return html`
    <a
      href="${githubUrl}"
      rel="noopener noreferrer"
      target="_blank"
      title="${config.github.linkText}"
    >${config.github.linkText}</a>
  `;
};
