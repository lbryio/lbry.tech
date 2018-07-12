"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  P R O G R A M

const navigation = (state, emit) => { // eslint-disable-line
  const renderedNavigationItems = navigationItems.map(navigationItem => {
    return `<a class="navigation__item${state.href === navigationItem.url ? " active" : ""}" href="${navigationItem.url}" title="${navigationItem.title}">${navigationItem.name}</a>`;
  });

  return html`
    <nav class="navigation">
      <div class="inner-wrap">
        <a class="navigation__item logo" href="/" title="LBRY homepage">Home</a>
        <!--/ <a class="navigation__item menu" href="#" data-action="toggle menu" title="Toggle menu">Menu</a> /-->

        <!--/ <div class="navigation-wrap"> /-->
        ${renderedNavigationItems}
        <!--/ </div> /-->
      </div>
    </nav>

    <script>
      $("[data-action='toggle menu']").on("click", function (e) {
        e.preventDefault();
        $(".navigation-wrap").toggleClass("active");
      });
    </script>
  `;
};

const navigationItems = [
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

module.exports = exports = navigation;
