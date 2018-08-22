/* global $, document */ "use strict";



/**
 * Add page-specific styling
 */

document.getElementsByTagName("body")[0].classList.add("glossary");

/**
 * Toggle sidebar
 */

$("[data-action='toggle glossary sidebar']").on("click", () => {
  $("body").toggleClass("sidebar-closed");
});

/**
 * Add hash to URL bar when sidebar links are clicked
 */

$(".component--glossary-toc li a").on("click", event => {
  const hash = event.currentTarget.href.split("#")[1];
  history.replaceState({}, "", `#${hash}`);
});
