/* global $, document */ "use strict";



document.getElementsByTagName("body")[0].classList.add("glossary");

$("[data-action='toggle glossary sidebar']").on("click", () => { // Toggle sidebar
  $("body").toggleClass("sidebar-closed");
});

$(".component--glossary-toc li a").on("click", event => { // Add hash to URL bar
  const hash = event.currentTarget.href.split("#")[1];
  history.replaceState({}, "", `#${hash}`);
});
