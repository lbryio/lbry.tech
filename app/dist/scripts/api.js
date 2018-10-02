/* global Jets */ "use strict";



// Initiate search functionality
let jets = new Jets({
  contentTag: "#toc",
  searchTag: "#input-search"
});

// Reset search on page load
document.getElementById("input-search").value = "";

// Activate search
document.getElementById("input-search").addEventListener("keyup", () => {
  if (document.getElementById("input-search").value)
    document.querySelector(".api__toc__search__clear").classList.add("active");

  else
    document.querySelector(".api__toc__search__clear").classList.remove("active");
});

// Cancel search
document.querySelector(".api__toc__search__clear").addEventListener("click", () => {
  document.getElementById("input-search").value = "";
  document.querySelector(".api__toc__search__clear").classList.remove("active");
  jets.destroy();
  reinitJets();
});



//  H E L P E R

function reinitJets() {
  jets = new Jets({
    contentTag: "#toc",
    searchTag: "#input-search"
  });

  document.getElementById("input-search").focus();
}
