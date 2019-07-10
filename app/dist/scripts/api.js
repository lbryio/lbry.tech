"use strict"; /* global document, Jets, send, window */



// NOTE:
// We declare `contentTag` and `jets` with `var` here so
// when a visitor toggles the API page version, they are
// not incorrectly declared multiple times via `let || const`

// Initiate search functionality
if (!contentTag)
  var contentTag;

contentTag = window.location.pathname.split("/").pop() === "sdk" ?
  ".api-toc__section" :
  "#toc";

if (!jets)
  var jets;

jets = new Jets({
  contentTag,
  searchTag: "#input-search"
});



//  H E L P E R S

function changeDocumentationVersion(desiredVersion) { // eslint-disable-line no-unused-vars
  send({
    message: "view different documentation version",
    version: desiredVersion
  });
}

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

function initializeApiFunctionality() { // eslint-disable-line no-unused-vars
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

  // Handle menu toggle for mobile
  if (document.getElementById("toggle-menu")) {
    document.getElementById("toggle-menu").addEventListener("click", () => {
      document.querySelector("body").classList.toggle("disable-scrolling");
      document.querySelector(".api-toc").classList.toggle("active");
    });

    // Handle menu toggle when clicking on commands
    document.querySelectorAll(".api-toc__command a").forEach(command => {
      command.addEventListener("click", () => {
        document.querySelector("body").classList.remove("disable-scrolling");
        document.querySelector(".api-toc").classList.remove("active");
      });
    });
  }

  // Code toggles
  handleApiLanguageToggles("cli");
  handleApiLanguageToggles("curl");
  handleApiLanguageToggles("lbrynet");
  handleApiLanguageToggles("python");
}

function reinitJets() {
  jets = new Jets({
    contentTag,
    searchTag: "#input-search"
  });

  document.getElementById("input-search").focus();
}
