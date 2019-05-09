"use strict"; /* global document, Jets, window */



// Initiate search functionality
const contentTag = window.location.pathname.split("/").pop() === "sdk" ?
  ".api-toc__section" :
  "#toc";

let jets = new Jets({
  contentTag,
  searchTag: "#input-search"
});

// Reset search on page load
document.getElementById("input-search").value = "";

// Activate search
document.getElementById("input-search").addEventListener("keyup", () => {
  if (document.getElementById("input-search").value)
    document.querySelector(".api-toc__search-clear").classList.add("active");
  else
    document.querySelector(".api-toc__search-clear").classList.remove("active");
});

// Cancel search
document.querySelector(".api-toc__search-clear").addEventListener("click", () => {
  document.getElementById("input-search").value = "";
  document.querySelector(".api-toc__search-clear").classList.remove("active");

  jets.destroy();
  reinitJets();
});



// Code toggles
handleApiLanguageToggles("cli");
handleApiLanguageToggles("curl");
handleApiLanguageToggles("lbrynet");
handleApiLanguageToggles("python");



//  H E L P E R S

function handleApiLanguageToggles(language) {
  if (!document.getElementById(`toggle-${language}`))
    return;

  document.getElementById(`toggle-${language}`).addEventListener("click", () => {
    const codeExamples = document.querySelectorAll(`[data-api-example-type="${language}"]`);
    const examples = document.querySelectorAll("[data-api-example-type]");
    const toggles = document.querySelectorAll("*[id^='toggle-']");

    examples.forEach(example => example.classList.remove("active"));
    codeExamples.forEach(example => example.classList.add("active"));
    toggles.forEach(example => example.classList.remove("active"));

    document.getElementById(`toggle-${language}`).classList.add("active");
  });
}

function reinitJets() {
  jets = new Jets({
    contentTag,
    searchTag: "#input-search"
  });

  document.getElementById("input-search").focus();
}
