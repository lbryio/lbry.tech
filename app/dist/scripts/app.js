"use strict"; /* global document, history, location, navigator, send, window */



document.addEventListener("DOMContentLoaded", () => {
  scrollToElementOnLoad();

  // Automatically open external links in new tabs
  document.querySelectorAll("a[href^=http]").forEach(anchor => {
    if (anchor.href.indexOf(location.hostname) === -1) {
      anchor.rel = "noopener noreferrer";
      anchor.target = "_blank";
    }
  });
});



// Browsers not Firefox do not yet support `text-orientation` and/or `writing-mode`
if (
  !/Firefox[/\s](\d+\.\d+)/.test(navigator.userAgent) &&
  document.querySelector(".component--glossary-toc-toggle")
) document.querySelector(".component--glossary-toc-toggle").classList.add("noncompliant-fix");



// Smooth scroll
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", event => {
    event.preventDefault();

    const element = event.target.href.split("#").pop()
      .toLowerCase();
    let elementOffset;

    if (document.getElementById(element)) {
      elementOffset = document.getElementById(element).offsetTop - 74;
      window.scroll({ top: elementOffset, behavior: "smooth" });
      history.replaceState({}, "", `#${element}`);    // Add hash to URL bar
    }
  });
});

// Newsletter
document.getElementById("emailAddress").addEventListener("keyup", event => {
  const key = event.keyCode ? event.keyCode : event.which;

  if (key === 13)
    document.querySelector("[data-action='subscribe to newsletter']").click();
});

document.querySelector("[data-action='subscribe to newsletter']").onclick = () => {
  const email = document.getElementById("emailAddress").value.trim();

  if (!validateEmail(email)) {
    document.getElementById("emailMessage").classList.add("error");
    document.getElementById("emailMessage").innerHTML = "Your email address is invalid";
    return;
  }

  document.getElementById("emailMessage").classList.remove("error");

  send(JSON.stringify({
    email: email,
    message: "subscribe"
  }));
};



//  H E L P E R S

function scrollToElementOnLoad() {
  if (window.location.href.includes("#")) {
    setTimeout(() => { // give page time to breathe
      const element = window.location.href.split("#").pop()
        .toLowerCase();
      let elementOffset;

      if (document.getElementById(element)) {
        elementOffset = document.getElementById(element).offsetTop - 74;
        window.scroll({ top: elementOffset, behavior: "smooth" });
      }
    }, 150);
  }
}

function validateEmail(email) {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;

  return emailRegex.test(String(email));
}
