"use strict"; /* global document, send */



document.getElementById("get-started").addEventListener("click", event => {
  event.preventDefault();

  send({
    message: "auth me with github"
  });
});
