"use strict";



document.addEventListener("DOMContentLoaded", () => {
  initializeWebSocketConnection();
  setInterval(checkWebSocketConnection, 5000);
});



let ws = null;

function checkWebSocketConnection() {
  if (!ws || ws.readyState === 3) initializeWebSocketConnection();
}

function initializeWebSocketConnection() {
  ws = new WebSocket(location.origin.replace(/^http/, "ws"));

  ws.onopen = () => {
    console.log("WebSocket connection established"); // eslint-disable-line
  };

  ws.onmessage = socket => {
    const data = JSON.parse(socket.data);

    switch (true) {
      case data.message === "updated html":
        document.querySelector(data.selector).innerHTML = data.html;
        document.getElementById("emailAddress").value = "";
        document.getElementById("emailMessage").innerHTML = "";

        // `data.example` is added when updating HTML.
        // This is when the results of an example are sent to the client.
        if (data.example) {
          if (!document.querySelector(`[data-example="${data.example}"`).classList.contains("completed")) {
            document.getElementById("tour-example-description").classList.remove("success");
          }

          document.querySelector(`[data-example="${data.example}"`).classList.add("completed");
          document.getElementById("tour-example-description").classList.add("success");

          document.getElementById("tour-example-description").innerHTML =
            document.querySelector(`[data-example="${data.example}"`).dataset.success;
        }

        // If `data.example` isn't found, reset the description area.
        else {
          document.getElementById("tour-example-description").classList.remove("success");

          document.getElementById("tour-example-description").innerHTML =
            document.querySelector(".tour__navigation__example.active").dataset.description;
        }

        if (document.getElementById("temp-loader"))
          document.getElementById("temp-loader").style.display = "none";

        document.querySelector(".tour").classList.remove("waiting");
        break;

      case data.message === "notification": // TODO: Make work with appending so multiple notifications can be sent
        document.getElementById("flash-container").innerHTML =
          `<div class="flash active${data.type ? " " + data.type : ""}">${data.details}</div>`;

        setTimeout(() => {
          document.getElementById("flash-container").innerHTML = "";
        }, 2100);

        break;

      default:
        console.log(data); // eslint-disable-line
        break;
    }
  };

  ws.onclose = () => {
    console.log("WebSocket connection lost"); // eslint-disable-line
    checkWebSocketConnection(); // reconnect now
  };
}

function send(msg) { // eslint-disable-line
  socketReady(ws, () => ws.send(msg));
}

function socketReady(socket, callback) {
  setTimeout(() => {
    if (socket && socket.readyState === 1) {
      if (callback !== undefined) callback();
      return;
    }

    return socketReady(socket, callback);
  }, 5);
}
