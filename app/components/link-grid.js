"use strict";



//  P A C K A G E

import html from "choo/html";



//  E X P O R T

export default (links) => {
  const renderedLinks = links.map((link) => returnLinkTemplate(link.title, link.description, link.destination, link.label));
  return html`
    <ul class="link-grid">
      ${renderedLinks}
    </ul>
  `;
};



//  H E L P E R

function returnLinkTemplate(title, description, destination, label) {
  return `
    <li class="link-grid__link">
     <p class="link-grid__title"><strong>${title}</strong></p>
     <p class="link-grid__description">${description}</p>
     <a class="link-grid__cta" href="${destination}">${label}</a>
    </li>
  `;
}
