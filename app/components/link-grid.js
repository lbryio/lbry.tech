"use strict";

import html from "choo/html";

function returnLinkTemplate(title, description, destination, label) {
  return `
    <li class="home__feature">
     <p class="home__feature__title"><strong>${title}</strong></p>
     <p class="home__feature__description">${description}</p>
     <a class="home__feature__cta" href="${destination}">${label}</a>
    </li>
  `;
}

export default (links) => {
  const renderedLinks = links.map((link) => returnLinkTemplate(link.title, link.description, link.destination, link.label));
  return html`
    <ul class="home__features">
      ${renderedLinks.join("\n")}
    </ul>
  `;
}
