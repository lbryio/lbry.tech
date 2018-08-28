"use strict";



//  P A C K A G E S

import html from "choo/html";
import { require as local } from "app-root-path";

//  V A R I A B L E

const config = local("/config");



//  E X P O R T

export default function (pagePath) {
  let githubUrl = `https://github.com/${config.github.repo}/edit/${config.github.branch}`;

  switch(pagePath) {
    case "":
      githubUrl = `${githubUrl}/views/pages/home.js`;
      break;

    case "/resources":
      githubUrl = `${githubUrl}/views/pages/resources.js`;
      break;

    case "/tour":
      githubUrl = `${githubUrl}/views/partials/tour.js`;
      break;

    default:
      githubUrl = `${githubUrl}/documents${pagePath}.md`;
      break;
  }

  return html`
    <a
      href="${githubUrl}"
      target="_blank"
      rel="noopener noreferrer"
      title="${config.github.linkText}"
    >${config.github.linkText}</a>
  `;
}
