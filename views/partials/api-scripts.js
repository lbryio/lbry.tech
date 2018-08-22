/* global $, Jets */ "use strict";



/**
 * Initiate search functionality
 */

let jets = new Jets({
  contentTag: "#toc",
  searchTag: "#input-search"
});

/**
 * Reset search on page load
 */

$("#input-search")[0].value = "";

/**
 * Activate search
 */

$("#input-search").on("keyup", () => {
  if ($("#input-search").val()) $(".api__toc__search__clear").addClass("active");
  else $(".api__toc__search__clear").removeClass("active");
});

/**
 * Cancel search
 */

$(".api__toc__search__clear").on("click", () => {
  $("#input-search")[0].value = "";
  $(".api__toc__search__clear").removeClass("active");
  jets.destroy();
  reinitJets();
});

/**
 * Add hash to URL bar when sidebar links are clicked
 */

$(".api__toc__item a").on("click", event => {
  const hash = event.currentTarget.href.split("#")[1];
  history.replaceState({}, "", `#${hash}`);
});



//  H E L P E R

/**
 * Reinitialize search functionality
 */

function reinitJets() {
  jets = new Jets({
    contentTag: "#toc",
    searchTag: "#input-search"
  });

  $("#input-search").focus();
}
