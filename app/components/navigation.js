"use strict";



//  I M P O R T

import html from "choo/html";



//  E X P O R T

export default currentUrl => {
  const links = [
    {
      name: "LBRY.io",
      title: "Escape the techno scene",
      url: process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://lbry.io"
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
      url: "/resources",
      children: [
        {
          name: "Blockchain API",
          title: "Reference for the LBRY blockchain API",
          url: "/api/blockchain"
        },
        {
          name: "SDK API",
          title: "Reference for the SDK API",
          url: "/api/sdk"
        }
      ]
    },
    {
      name: "Community",
      title: "Interact with LBRY",
      url: "/community"
    }
  ];

  return html`
    <nav class="navigation">
      <ul class="inner-wrap">
        <li class="navigation__item logo">
          <a href="/" title="LBRY homepage">Home</a>
        </li>
        ${links.map(link => renderLink(currentUrl, link))}
      </ul>
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

  if (link.children) {
    const links = [];

    links.push(html`
      <li class="navigation__item parent${activeClass ? " active" : ""}">
        <a
          href="${link.url}"
          title="${link.title}"
        >${link.name}</a>
        <ul>
    `);

    for (const child of link.children) {
      links.push(html`
        <li>
          <a
            href="${child.url}"
            title="${child.title}"
          >${child.name}</a>
        </li>
      `);
    }

    links.push(html`
        </ul>
      </li>
    `);

    return links.join("");
  }

  else {
    return html`
      <li class="navigation__item${activeClass ? " active" : ""}">
        <a
          href="${link.url}"
          title="${link.title}"
        >${link.name}</a>
      </li>
    `;
  }
}
