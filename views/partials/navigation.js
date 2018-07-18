"use strict";



//  P A C K A G E

const html = require("choo-async/html");

//  V A R I A B L E

const navigationItems = [
  {
    url: "https://lbry.io",
    name: "LBRY.io",
    title: "Escape the techno scene"
  },
  {
    url: "/overview",
    name: "Overview",
    title: "LBRY overview"
  },
  {
    url: "/resources",
    name: "Resources",
    title: "View LBRY resources"
  },
  {
    url: "/contribute",
    name: "Contribute",
    title: "Contribute to LBRY"
  },
  {
    url: "/build",
    name: "Build",
    title: "View LBRY resources"
  },
  {
    url: "/community",
    name: "Community",
    title: "Interact with LBRY"
  }
];



//  E X P O R T

module.exports = exports = state => {
  const renderedNavigationItems = navigationItems.map(navigationItem => `<a class="navigation__item${state.href === navigationItem.url ? " active" : ""}" href="${navigationItem.url}" title="${navigationItem.title}">${navigationItem.name}</a>`);

  return html`
    <nav class="navigation">
      <div class="inner-wrap">
        <a class="navigation__item logo" href="/" title="LBRY homepage">Home</a>
        ${renderedNavigationItems}
      </div>
    </nav>
  `;
};
