/* global $, document */ "use strict";



document.getElementsByTagName("body")[0].classList.add("glossary");

$("[data-action='toggle glossary sidebar']").on("click", () => { // Toggle sidebar
  $("body").toggleClass("sidebar-closed");
});
