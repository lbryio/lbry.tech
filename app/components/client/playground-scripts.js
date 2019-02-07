"use strict"; /* global document, navigator, send, window */



initializePlayground();



// pre-fill example one if search parameter exists
if (window.location.href.search && window.location.href.split("?url=")[1]) {
  const searchParameter = window.location.href.split("?url=")[1];
  fetchMetadata(1, searchParameter); // eslint-disable-line padding-line-between-statements
}



document.querySelector("body").addEventListener("click", event => {
  if (event.target.dataset.action) {
    event.preventDefault();
    document.querySelector(".playground").classList.add("waiting");
    handleExamples(event.target);
  }

  if (
    event.target.classList &&
    event.target.classList[0] === "playground-content__meme__canvas__thumbnail"
  ) {
    for (const thumbnail of document.querySelectorAll(".playground-content__meme__canvas__thumbnail"))
      thumbnail.classList.remove("selected");

    event.target.classList.add("selected");
    updateCanvas(event.target);
  }
});

document.getElementById("fetch-claim-uri").addEventListener("keyup", event => {
  const key = event.keyCode ?
    event.keyCode :
    event.which;

  switch(true) {
    case document.querySelector("[data-example='1']").classList.contains("active"):
      if (
        key === 13 &&
        document.getElementById("fetch-claim-uri").value.length > 0
      ) fetchMetadata(1, document.getElementById("fetch-claim-uri").value);
      break;

    case document.querySelector("[data-example='3']").classList.contains("active"):
      if (
        key === 13 &&
        document.getElementById("fetch-claim-uri").value.length > 0
      ) fetchMetadata(3, document.getElementById("fetch-claim-uri").value);
      break;

    default:
      break;
  }
});

document.querySelector("body").addEventListener("keyup", event => {
  if (
    event.target.id === "meme-top-line" ||
    event.target.id === "meme-bottom-line"
  ) updateCanvas();
});



//  H E L P E R S

function clearCanvas(canvas) {
  const ctx = canvas.getContext("2d");

  ctx.save();
  ctx.globalCompositeOperation = "copy";
  ctx.strokeStyle = "transparent";
  ctx.beginPath();
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.restore();
}

function detectLanguageAndUpdate() { // eslint-disable-line no-unused-vars
  const compare = (array1, array2) => array2.filter(value => array2.indexOf(value)); // compare two arrays and get match(es)
  const memeLocaleObject = document.getElementById("meme-language").children;
  const memeLocales = [];
  const userLocales = [];

  for (const language of navigator.languages)
    userLocales.push(language);

  for (const key in memeLocaleObject) {
    if (memeLocaleObject[key] && memeLocaleObject[key].value)
      memeLocales.push(memeLocaleObject[key].value);
  }

  if (
    memeLocales.length &&
    userLocales.length &&
    compare(memeLocales, userLocales).length
  ) document.querySelector(`option[value="${compare(memeLocales, userLocales)[0]}"]`).setAttribute("selected", true);
}

function debounce(func, wait, immediate) {
  let timeout;

  return function() {
    const context = this;
    const args = arguments;

    const later = () => {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow)
      func.apply(context, args);
  };
}

function initializePlayground() {
  document.querySelector(".playground").classList.add("waiting");
  document.querySelector("#fetch-claim-uri").value = "";
  document.querySelector("#fetch-claim-uri").focus();
  document.querySelector(".playground-navigation__example:nth-child(1)").classList.add("active");

  send({
    message: "landed on playground"
  });

  setTimeout(() => {
    document.querySelector(".playground-navigation__example:nth-child(1)").click();
  }, 300);
}

function fetchMetadata(exampleNumber, data) {
  if (!exampleNumber)
    return;

  switch(exampleNumber) {
    case 1:
      send({
        claim: data,
        message: "fetch metadata",
        method: "resolve",
        example: exampleNumber
      });

      document.getElementById("fetch-claim-uri").value = data;
      document.getElementById("playground-results").innerHTML = playgroundResponseForExample1(data);
      document.getElementById("playground-loader").style.display = "none";
      break;

    case 2:
      send({
        data: data,
        message: "fetch metadata",
        method: "publish",
        example: exampleNumber
      });

      document.getElementById("playground-results").innerHTML = playgroundResponseForExample2(getMemeInfo());
      document.getElementById("playground-loader").style.display = "none";
      break;

    case 3:
      send({
        claim: data,
        message: "fetch metadata",
        method: "claim_tip",
        example: exampleNumber
      });

      document.getElementById("fetch-claim-uri").value = data;
      document.getElementById("playground-results").innerHTML = playgroundResponseForExample3(data);
      document.getElementById("playground-loader").style.display = "none";
      break;

    default:
      break;
  }
}

function getMemeInfo() { // TODO: Error handling
  return {
    description: document.getElementById("meme-description").value,
    file_path: document.getElementById("meme-canvas").toDataURL("image/jpeg", 0.6),
    language: document.getElementById("meme-language").value,
    license: document.getElementById("meme-license").value,
    name: document.getElementById("meme-title").value,
    nsfw: document.getElementById("meme-nsfw-flag").checked,
    title: document.getElementById("meme-title").value
  };
}

function playgroundResponseForExample1(source) {
  return `
    <pre><code class="language-bash"><span class="token comment"># With the LBRY app/daemon running locally, you can use this in your Terminal</span>
curl --header <span class="token string">"Content-Type: application/json"</span> --data <span class="token string">'{ "method": "resolve", "params": { "uri": "${source}" }}'</span> <span class="token url">http://localhost:5279    </span>
</code></pre>

    <div class="loader" id="temp-loader"></div>
    <div id="example1-result"></div>
  `;
}

function playgroundResponseForExample2(source) {
  return `
    <pre><code class="language-bash"><span class="token comment"># With the LBRY app/daemon running locally, you can use this in your Terminal</span>
curl --header <span class="token string">"Content-Type: application/json"</span> --data <span class="token string">'{ "method": "publish", "params": { "name": "${source.name}", "file_path": "ABSOLUTE_PATH_TO_MEDIA_ON_YOUR_COMPUTER", "bid": "0.001", "metadata": { "description": "${source.description}", "title": "${source.title}", "language": "${source.language}", "license": "${source.license}", "nsfw": ${source.nsfw} }}}'</span> <span class="token url">http://localhost:5279    </span>
</code></pre>

    <div class="loader" id="temp-loader"></div>
    <div id="example2-result"></div>
  `;
}

function playgroundResponseForExample3(source) {
  document.querySelector("[data-action='execute claim']").disabled = true;

  return `
    <pre><code class="language-bash"><span class="token comment"># With the LBRY app/daemon running locally, you can use this in your Terminal</span>
curl --header <span class="token string">"Content-Type: application/json"</span> --data <span class="token string">'{ "method": "claim_tip", "params": { "amount": "0.001", "claim_id": "${source}" }}'</span> <span class="token url">http://localhost:5279    </span>
</code></pre>

    <div class="loader" id="temp-loader"></div>
    <div id="example3-result"></div>
  `;
}

const handleExamples = debounce(event => {
  let exampleNumber;
  const data = event.dataset;

  if (!parseInt(document.querySelector(".playground-navigation__example.active").dataset.example)) return;
  exampleNumber = parseInt(document.querySelector(".playground-navigation__example.active").dataset.example);

  switch(data.action) {
    case "choose claim":
      fetchMetadata(exampleNumber, data.claimId);

      if (document.querySelector(".playground-navigation__example:nth-child(3)").classList.contains("active"))
        document.getElementById("fetch-claim-uri").value = event.dataset.name + "#" + event.dataset.claimId;

      break;

    case "execute claim":
      if (!document.getElementById("fetch-claim-uri").value.length > 0) return;
      fetchMetadata(exampleNumber, document.getElementById("fetch-claim-uri").value);
      break;

    case "playground, example 1":
      if (document.getElementById("playground-loader").classList.contains("playground-content__meme")) {
        document.getElementById("playground-loader").classList.remove("playground-content__meme");
        document.getElementById("playground-loader").classList.add("playground-content__trends");
      }

      document.getElementById("fetch-claim-uri").value = ""; // reset URL bar
      document.querySelector("#playground-url button").textContent = "Resolve";

      if (document.getElementById("playground-url").style.display === "none")
        document.getElementById("playground-url").removeAttribute("style");

      for (const example of document.querySelectorAll(".playground-navigation__example"))
        example.classList.remove("active");

      document.querySelector(".playground-navigation__example:nth-child(1)").classList.add("active");

      document.getElementById("playground-loader").innerHTML = "";
      document.getElementById("playground-results").innerHTML = "";

      document.getElementById("playground-loader").removeAttribute("style");
      document.getElementById("playground-results").removeAttribute("style");

      send({
        message: `request for ${data.action}`
      });

      break;

    case "playground, example 2":
      if (document.getElementById("playground-loader").classList.contains("playground-content__trends")) {
        document.getElementById("playground-loader").classList.remove("playground-content__trends");
        document.getElementById("playground-loader").classList.add("playground-content__meme");
      }

      document.getElementById("fetch-claim-uri").value = ""; // reset URL bar
      document.getElementById("playground-url").style.display = "none";

      for (const example of document.querySelectorAll(".playground-navigation__example"))
        example.classList.remove("active");

      document.querySelector(".playground-navigation__example:nth-child(2)").classList.add("active");

      document.getElementById("playground-loader").innerHTML = "";
      document.getElementById("playground-results").innerHTML = "";

      document.getElementById("playground-loader").removeAttribute("style");
      document.getElementById("playground-results").removeAttribute("style");

      send({
        message: `request for ${data.action}`
      });

      break;

    case "playground, example 3":
      if (document.getElementById("playground-loader").classList.contains("playground-content__meme")) {
        document.getElementById("playground-loader").classList.remove("playground-content__meme");
        document.getElementById("playground-loader").classList.add("playground-content__trends");
      }

      document.getElementById("fetch-claim-uri").value = ""; // reset URL bar
      document.querySelector("#playground-url button").textContent = "Tip";

      if (document.getElementById("playground-url").style.display === "none")
        document.getElementById("playground-url").removeAttribute("style");

      for (const example of document.querySelectorAll(".playground-navigation__example"))
        example.classList.remove("active");

      document.querySelector(".playground-navigation__example:nth-child(3)").classList.add("active");

      document.getElementById("playground-loader").innerHTML = "";
      document.getElementById("playground-results").innerHTML = "";

      document.getElementById("playground-loader").removeAttribute("style");
      document.getElementById("playground-results").removeAttribute("style");

      send({
        message: `request for ${data.action}`
      });

      break;

    case "upload image":
      fetchMetadata(exampleNumber, getMemeInfo());
      break;

    default:
      break;
  }
}, 10);

function initCanvas() { // eslint-disable-line no-unused-vars
  const canvas = document.getElementById("meme-canvas");
  const canvasHeight = 600;
  const canvasWidth = 800;
  const ctx = canvas.getContext("2d");
  const img = document.getElementById("base-image");

  clearCanvas(canvas);

  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "white";
  ctx.font = "bold 48px 'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
  // ctx.font = "bold 48px Arial";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  positionCanvasText(ctx, canvasHeight, canvasWidth);
}

function positionCanvasText(canvas, height, width) {
  canvas.strokeText(document.getElementById("meme-top-line").value.toUpperCase(), width / 2, 40);
  canvas.fillText(document.getElementById("meme-top-line").value.toUpperCase(), width / 2, 40);

  canvas.strokeText(document.getElementById("meme-bottom-line").value.toUpperCase(), width / 2, (height - 80));
  canvas.fillText(document.getElementById("meme-bottom-line").value.toUpperCase(), width / 2, (height - 80));
}

function updateCanvas(imageSource) {
  const canvas = document.getElementById("meme-canvas");
  const canvasHeight = 600;
  const canvasWidth = 800;
  const ctx = canvas.getContext("2d");
  const img = document.getElementById("base-image");

  clearCanvas(canvas);

  if (imageSource) {
    ctx.drawImage(imageSource, 0, 0, canvasWidth, canvasHeight);
    img.src = imageSource.src;
  } else {
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  }

  positionCanvasText(ctx, canvasHeight, canvasWidth);
}
