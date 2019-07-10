"use strict"; /* global document, history, location, send, window */



document.addEventListener("DOMContentLoaded", () => {
  scrollToElementOnLoad();
  initializeSmoothScroll();

  // Automatically open external links in new tabs
  document.querySelectorAll("a[href^=http]").forEach(anchor => {
    if (anchor.href.indexOf(location.hostname) === -1) {
      anchor.rel = "noopener noreferrer";
      anchor.target = "_blank";
    }
  });
});



// Menu toggle for Glossary
if (
  window.innerWidth <= 800 &&
  window.location.pathname.split("/").pop() === "glossary"
) {
  document.querySelector(".page__header__title").insertAdjacentHTML("afterbegin", "<button id='toggle-menu'>Menu</button>");

  document.getElementById("toggle-menu").addEventListener("click", () => {
    document.querySelector(".component--glossary-toc").classList.toggle("active");
    document.querySelector("body").classList.toggle("disable-scrolling");
  });

  // Handle menu toggle when clicking on commands
  document.querySelectorAll(".component--glossary-toc a").forEach(keyword => {
    keyword.addEventListener("click", () => {
      document.querySelector("body").classList.remove("disable-scrolling");
      document.querySelector(".component--glossary-toc").classList.remove("active");
    });
  });
}



function initializeSmoothScroll() {
  // Smooth scroll
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    if (anchor.classList.contains("no-smooth")) // Ignore smooth scroll functionality
      return;

    anchor.addEventListener("click", event => {
      event.preventDefault();

      const element = event.target.href.split("#").pop()
        .toLowerCase();
      let elementOffset;

      if (document.getElementById(element)) {
        elementOffset = document.getElementById(element).offsetTop - 150;
        window.scroll({ top: elementOffset, behavior: "smooth" });
        history.pushState({}, "", `#${element}`); // Add hash to URL bar
      }
    });
  });
}

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

  send({
    email: email,
    message: "subscribe"
  });
};



//  H E L P E R S

function runScriptsInDynamicallyInsertedHTML(element, elementHTML) { // eslint-disable-line no-unused-vars
  element.innerHTML = elementHTML;

  Array.from(element.querySelectorAll("script")).forEach(oldScript => {
    const newScript = document.createElement("script");

    Array.from(oldScript.attributes)
      .forEach(attr => newScript.setAttribute(attr.name, attr.value));

    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

function scrollToElementOnLoad() {
  if (window.location.href.includes("#")) {
    setTimeout(() => { // give page time to breathe
      const element = window.location.href.split("#").pop()
        .toLowerCase();
      let elementOffset;

      if (document.getElementById(element)) {
        elementOffset = document.getElementById(element).offsetTop - 150;
        window.scroll({ top: elementOffset, behavior: "smooth" });
      }
    }, 150);
  }
}

function validateEmail(email) {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;
  return emailRegex.test(String(email)); // eslint-disable-line padding-line-between-statements
}
