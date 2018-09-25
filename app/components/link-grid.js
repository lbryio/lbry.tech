"use strict";

import html from "choo/html";

function returnLinkTemplate(title, description, destination, label) {
  return `
    <li class="link-grid__link">
     <p class="link-grid__title"><strong>${title}</strong></p>
     <p class="link-grid__description">${description}</p>
     <a class="link-grid__cta" href="${destination}">${label}</a>
    </li>
  `;
}

export default (links) => {
  const renderedLinks = links.map((link) => returnLinkTemplate(link.title, link.description, link.destination, link.label));
  return html`
    <ul class="link-grid">
      ${renderedLinks}
    </ul>
  `;
}
