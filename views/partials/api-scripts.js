/* global $, Jets */ "use strict";



let jets = new Jets({
  searchTag: "#input-search",
  contentTag: "#toc"
});



$("#input-search")[0].value = ""; // reset on page load

$("#input-search").on("keyup", () => {
  if ($("#input-search").val()) $(".api__toc__search__clear").addClass("active");
  else $(".api__toc__search__clear").removeClass("active");
});

$(".api__toc__search__clear").on("click", () => {
  $("#input-search")[0].value = "";
  $(".api__toc__search__clear").removeClass("active");
  jets.destroy();
  reinitJets();
});



//  H E L P E R

function reinitJets() {
  jets = new Jets({
    searchTag: "#input-search",
    contentTag: "#toc"
  });

  $("#input-search").focus();
}
