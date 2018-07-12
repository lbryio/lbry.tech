/* global $, location, window */ "use strict";



$(function () {

  scrollToElementOnLoad();

  $("a[href^=http]").each(function () { // Automatically open external links in new tabs
    if (this.href.indexOf(location.hostname) === -1) {
      $(this).attr("target", "_blank");
    }
  });

});



if ( // Toggle beta message
  localStorage.getItem("hide lbry alert") &&
  localStorage.getItem("hide lbry alert") === "true" // cannot set Booleans for some reason
) document.querySelector("#alert-beta").style.display = "none";

document.querySelector("#close-alert").onclick = function () {
  localStorage.setItem("hide lbry alert", true);
  document.querySelector("#alert-beta").style.display = "none";
};

document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const element = this.href.split("#").pop();
    let elementOffset;

    if (document.getElementById(element)) {
      elementOffset = document.getElementById(element).offsetTop - 74;
      window.scroll({ top: elementOffset, behavior: "smooth" });
    }
  });
});

function scrollToElementOnLoad() {
  if (window.location.href.includes("#")) {
    setTimeout(() => { // give page time to breathe
      const element = window.location.href.split("#").pop();
      let elementOffset;

      if (document.getElementById(element)) {
        elementOffset = document.getElementById(element).offsetTop - 74;
        window.scroll({ top: elementOffset, behavior: "smooth" });
      }
    }, 150);
  }
}
