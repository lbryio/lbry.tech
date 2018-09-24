"use strict";



//  P A C K A G E S

import html from "choo/html";
import Nanocomponent from "nanocomponent";
import xtend from "xtend";



//  E X P O R T

export default class Navigation extends Nanocomponent {
  constructor() {
    super();

    this.state = {
      active: true,
      links: [
        {
          name: "LBRY.io",
          title: "Escape the techno scene",
          url: "https://lbry.io"
        },
        {
          name: "Overview",
          title: "LBRY overview",
          url: "/overview"
        },
        {
          name: "Tour",
          title: "Take a Tour",
          url: "/tour"
        },
        {
          name: "Resources",
          title: "View LBRY resources",
          url: "/resources"
        },
        {
          name: "Contribute",
          title: "Contribute to LBRY",
          url: "/contribute"
        },
        {
          name: "Build",
          title: "View LBRY resources",
          url: "/build"
        },
        {
          name: "Community",
          title: "Interact with LBRY",
          url: "/community"
        }
      ]
    };

    this.renderLink = this.renderLink.bind(this);
  }

  createElement(props) {
    this.state = xtend(this.state, props);

    return html`
      <nav class="navigation">
        <div class="inner-wrap">
          <a class="navigation__item logo" href="/" title="LBRY homepage">Home</a>
          ${this.state.links.map(this.renderLink)}
        </div>
      </nav>
    `;
  }

  renderLink(props, i, arr) { // eslint-disable-line
    let activeClass;

    if (this.state.href === "/" && props.url === "/") {
      activeClass = true;
    } else if (props.url !== "/" && this.state.href.indexOf(props.url) >= 0) {
      activeClass = true;
    }

    return html`
      <a
        class="navigation__item${activeClass ? " active" : ""}"
        href="${props.url}"
        title="${props.title}"
      >${props.name}</a>
    `;
  }
}
