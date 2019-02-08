"use strict";



//  I M P O R T

import html from "choo/html";

//  U T I L

const links = {
  community: {
    name: "Community",
    title: "Interact with LBRY",
    url: "/community"
  },
  overview: {
    name: "Overview",
    title: "LBRY overview",
    url: "/overview"
  },
  playground: {
    name: "Playground",
    title: "Experience LBRY",
    url: "/playground"
  },
  resources: {
    name: "Resources",
    title: "View LBRY resources",
    url: "/resources"
  }
};



//  E X P O R T

export default currentUrl => html`
  <a class="header__link logo" href="/" title="LBRY homepage">Home</a>

  <a
    class="header__link"
    href="${(process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://lbry.io")}"
    title="Escape the techno scene"
  >LBRY.io</a>

  <drawer-navigation>
    <drawer-section>
      <drawer-title>
        ${renderLink(currentUrl, links.overview)}
      </drawer-title>
    </drawer-section>

    <drawer-section>
      <drawer-title>
        ${renderLink(currentUrl, links.playground)}
      </drawer-title>
    </drawer-section>

    <drawer-section>
      <drawer-title>
        ${renderLink(currentUrl, links.resources)}
      </drawer-title>

      <drawer-wrap>
        <drawer-children>
          <drawer-child>
            <a href="/glossary">
              <strong>LBRY Glossary</strong>
              <span>Get familiar with LBRY and blockchain related terms</span>
            </a>
          </drawer-child>

          <drawer-child>
            <a href="/spec">
              <strong>LBRY Specification</strong>
              <span>Read the formal specification for LBRY</span>
            </a>
          </drawer-child>

          <drawer-child>
            <a href="/api/sdk">
              <strong>SDK APIs</strong>
              <span>Method signatures and examples for lbry-sdk</span>
            </a>
          </drawer-child>

          <drawer-child>
            <a href="/api/blockchain">
              <strong>Blockchain APIs</strong>
              <span>Method signatures and examples for lbrycrd</span>
            </a>
          </drawer-child>
        </drawer-children>
      </drawer-wrap>
    </drawer-section>

    <drawer-section>
      <drawer-title>
        ${renderLink(currentUrl, links.community)}
      </drawer-title>

      <drawer-wrap>
        <drawer-children>
          <drawer-child>
            <a href="https://lbry.fund">
              <strong>Fund a Project</strong>
              <span>How to to get some LBC for your latest idea or project</span>
            </a>
          </drawer-child>

          <drawer-child>
            <a href="https://lbry.io/join-us">
              <strong>Join Us</strong>
              <span>Work with the LBRY team</span>
            </a>
          </drawer-child>
        </drawer-children>
      </drawer-wrap>
    </drawer-section>
  </drawer-navigation>
`;



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
      ${activeClass ? "class=active" : ""}
      href="${link.url}"
      title="${link.title}"
    >${link.name}</a>
  `;
}
