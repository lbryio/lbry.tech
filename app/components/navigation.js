"use strict";



//  I M P O R T

import html from "choo/html";



//  E X P O R T

export default currentUrl => {
  const links = [
    {
      name: "LBRY.com",
      title: "Escape the techno scene",
      url: process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://lbry.com"
    },
    {
      name: "Overview",
      title: "LBRY overview",
      url: "/overview"
    },
    {
      name: "Playground",
      title: "Experience LBRY",
      url: "/playground"
    },
    {
      name: "Resources",
      title: "View LBRY resources",
      url: "/resources"
    },
    {
      name: "Community",
      title: "Interact with LBRY",
      url: "/community"
    }
  ];

  return html`
    <nav class="navigation">
      <div class="inner-wrap">
        <a class="navigation__item logo" href="/" title="LBRY homepage">Home</a>
        ${links.map(link => renderLink(currentUrl, link))}
      </div>
    </nav>
  `;
};



//  H E L P E R

function renderLink(href, link) {
  let activeClass;

  switch(true) {
    case (link.url !== "/" && href.indexOf(link.url) >= 0):
      activeClass = true;
      break;

    default:
      activeClass = false;
      break;
  }

  return html`
    <a
      class="navigation__item${activeClass ? " active" : ""}"
      href="${link.url}"
      title="${link.title}"
    >${link.name}</a>
  `;
}
