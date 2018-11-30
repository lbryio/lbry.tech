"use strict"; /* global document */



// Add page-specific styling
document.querySelector("body").classList.add("glossary");

// Toggle sidebar
document.querySelector("[data-action='toggle glossary sidebar']").onclick = () => {
  document.querySelector("body").classList.toggle("sidebar-closed");
};
