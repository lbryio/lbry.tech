"use strict";



//  I M P O R T

import html from "choo/html";

//  U T I L

import config from "~root/config";



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
      githubUrl = "https://github.com/lbryio/lbrycrd/blob/master/contrib/devtools/generated/api_v1.json";
      break;

    case "/api/sdk":
      githubUrl = "https://github.com/lbryio/lbry-sdk/blob/master/docs/api.json";
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
