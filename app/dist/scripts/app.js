/* global $, location, send, window */ "use strict";



$(function () {
  scrollToElementOnLoad();

  $("a[href^=http]").each(function () { // Automatically open external links in new tabs
    if (this.href.indexOf(location.hostname) === -1) {
      $(this).attr("target", "_blank");
    }
  });
});



// Browsers not Firefox do not yet support `text-orientation` and/or `writing-mode`
if (!/Firefox[/\s](\d+\.\d+)/.test(navigator.userAgent))
  document.querySelector(".component--glossary-toc-toggle").classList.add("noncompliant-fix");



if ( // Toggle beta message
  localStorage.getItem("hide lbry alert") &&
  localStorage.getItem("hide lbry alert") === "true" // cannot set Booleans for some reason
) document.querySelector("#alert-beta").style.display = "none";

document.querySelector("#close-alert").onclick = function () {
  localStorage.setItem("hide lbry alert", true);
  document.querySelector("#alert-beta").style.display = "none";
};



//  Smooth scroll

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

//  Newsletter

$("[data-action='subscribe to newsletter']").on("click", () => {
  const email = $("#emailAddress").val();
  if (!validateEmail(email)) return;

  send(JSON.stringify({
    "email": email,
    "message": "subscribe"
  }));
});



//  H E L P E R S

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

function validateEmail(email) {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;
  return re.test(String(email));
}
