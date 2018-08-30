/* global $, send */ "use strict";



initializeTour();



if (window.location.href.search && window.location.href.split("?url=")[1]) { // pre-fill example one if search parameter exists
  const searchParameter = window.location.href.split("?url=")[1];
  fetchMetadata(1, searchParameter);
}



$("body").on("click", "[data-action]", event => {
  event.preventDefault();

  $(".tour").addClass("waiting");

  setTimeout(() => {
    handleExamples(event);
    $(".tour").removeClass("waiting");
  }, 2500); // "rate-limit" to allow example divs time to populate
});

$("body").on("click", ".tour__content__meme__canvas__thumbnail", event => {
  $(".tour__content__meme__canvas__thumbnail").removeClass("selected");

  event.currentTarget.className += " selected";
  updateCanvas(event.currentTarget);
});

$("#fetch-claim-uri").on("keyup", event => {
  const key = event.keyCode ? event.keyCode : event.which;
  if (key === 13 && $("#fetch-claim-uri").val()) fetchMetadata(1, $("#fetch-claim-uri").val());
});

$("body").on("keyup", "#meme-top-line, #meme-bottom-line", () => updateCanvas());



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

function detectLanguageAndUpdate() { // eslint-disable-line
  const compare = (array1, array2) => array2.filter(value => array2.indexOf(value)); // compare two arrays and get match(es)
  const memeLocaleObject = $("#meme-language").children();
  const memeLocales = [];
  const userLocales = [];

  for (const language of navigator.languages) userLocales.push(language);

  for (const key in memeLocaleObject) {
    if (memeLocaleObject[key] && memeLocaleObject[key].value) memeLocales.push(memeLocaleObject[key].value);
  }

  if (
    memeLocales.length &&
    userLocales.length &&
    compare(memeLocales, userLocales).length
  ) $("#meme-language").children(`option[value="${compare(memeLocales, userLocales)[0]}"]`).attr("selected", true);
}

function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function initializeTour() {
  $(".tour").addClass("waiting");
  $("#fetch-claim-uri").val("").focus(); // reset
  $(".tour__sidebar__example:nth-child(1)").addClass("active");

  send(JSON.stringify({
    "message": "landed on tour"
  }));

  setTimeout(() => {
    $(".tour").removeClass("waiting");
  }, 2500);
}



function fetchMetadata(exampleNumber, data) {
  if (!exampleNumber) return;

  switch(exampleNumber) {
    case 1:
      send(JSON.stringify({
        "claim": data,
        "message": "fetch metadata",
        "method": "resolve",
        "example": exampleNumber
      }));

      $("#fetch-claim-uri").val(data);

      $("#tour-results").html(`
        <pre><code class="language-bash">
<span class="token comment"># With the LBRY app/daemon running locally, you can use this in your Terminal</span>
curl --header <span class="token string">"Content-Type: application/json"</span> --data <span class="token string">'{ "method": "resolve", "params": { "uri": "${data}" }}'</span> <span class="token url">http://localhost:5279    </span>
        </code></pre>

        <div class="loader" id="temp-loader"></div>
        <div id="example1-result"></div>
      `);

      $("#tour-loader").hide();
      break;

    case 2:
      send(JSON.stringify({
        "data": data,
        "message": "fetch metadata",
        "method": "publish",
        "example": exampleNumber
      }));

      $("#tour-results").html(`
        <pre><code class="language-bash">
<span class="token comment"># This will be updated soon</span>
        </code></pre>

        <div class="loader" id="temp-loader"></div>
        <div id="example2-result"></div>
      `);

      $("#tour-loader").hide();
      break;

    case 3:
      send(JSON.stringify({
        "claim": data,
        "message": "fetch metadata",
        "method": "wallet_send",
        "example": exampleNumber
      }));

      $("#fetch-claim-uri").val(data);

      $("#tour-results").html(`
        <pre><code class="language-bash">
<span class="token comment"># With the LBRY app/daemon running locally, you can use this in your Terminal</span>
curl --header <span class="token string">"Content-Type: application/json"</span> --data <span class="token string">'{ "method": "wallet_send", "params": { "amount": "0.01", "claim_id": "${data}" }}'</span> <span class="token url">http://localhost:5279    </span>
        </code></pre>

        <div class="loader" id="temp-loader"></div>
        <div id="example3-result"></div>
      `);

      $("#tour-loader").hide();
      break;

    default:
      break;
  }
}

function getMemeInfo() { // TODO: Error handling
  const info = {
    description: $("#meme-description").val(),
    file_path: $("#meme-canvas")[0].toDataURL("image/jpeg", 0.6),
    language: $("#meme-language").val(),
    license: $("#meme-license").val(),
    name: $("#meme-title").val(),
    nsfw: $("#meme-nsfw-flag")[0].checked,
    title: $("#meme-title").val()
  };

  return info;
}

const handleExamples = debounce(event => {
  let exampleNumber;
  const data = event.currentTarget.dataset;

  if (!parseInt($(".tour__sidebar__example.active")[0].dataset.example)) return;
  exampleNumber = parseInt($(".tour__sidebar__example.active")[0].dataset.example);

  switch(data.action) {
    case "choose claim":
      fetchMetadata(exampleNumber, data.claimId);
      break;

    case "execute claim":
      if (!$("#fetch-claim-uri").val()) return;
      fetchMetadata(exampleNumber, $("#fetch-claim-uri").val());
      break;

    case "tour, example 1":
      if ($("#tour-loader").hasClass("tour__content__meme")) {
        $("#tour-loader").removeClass("tour__content__meme").addClass("tour__content__trends");
      }

      $("#fetch-claim-uri").val(""); // reset URL bar
      $("#tour-url button").text("Resolve");
      if ($("#tour-url")[0].style.display === "none") $("#tour-url").show();

      $(".tour__sidebar__example").removeClass("active");
      $(".tour__sidebar__example:nth-child(1)").addClass("active");

      $("#tour-loader").empty().show();
      $("#tour-results").empty().show();

      send(JSON.stringify({
        "message": `request for ${data.action}`
      }));

      break;

    case "tour, example 2":
      if ($("#tour-loader").hasClass("tour__content__trends")) {
        $("#tour-loader").removeClass("tour__content__trends").addClass("tour__content__meme");
      }

      $("#fetch-claim-uri").val(""); // reset URL bar
      $("#tour-url").hide();

      $(".tour__sidebar__example").removeClass("active");
      $(".tour__sidebar__example:nth-child(2)").addClass("active");

      $("#tour-loader").empty().show();
      $("#tour-results").empty().show();

      send(JSON.stringify({
        "message": `request for ${data.action}`
      }));

      break;

    case "tour, example 3":
      if ($("#tour-loader").hasClass("tour__content__meme")) {
        $("#tour-loader").removeClass("tour__content__meme").addClass("tour__content__trends");
      }

      $("#fetch-claim-uri").val(""); // reset URL bar
      $("#tour-url button").text("Tip");
      // $("#tour-url").after("<p>In the LBRY app, you can financially support your favorite creators by donating LBRY Coin (LBC). In this example, we are donating LBC in your stead.</p>");
      if ($("#tour-url")[0].style.display === "none") $("#tour-url").show();

      $(".tour__sidebar__example").removeClass("active");
      $(".tour__sidebar__example:nth-child(3)").addClass("active");

      $("#tour-loader").empty().show();
      $("#tour-results").empty().show();

      send(JSON.stringify({
        "message": `request for ${data.action}`
      }));

      break;

    case "upload image":
      fetchMetadata(exampleNumber, getMemeInfo());
      break;

    default:
      break;
  }
}, 10);

function initCanvas() { // eslint-disable-line
  const canvas = document.getElementById("meme-canvas");
  const canvasWidth = 400;
  const canvasHeight = 300;
  const ctx = canvas.getContext("2d");
  const img = document.getElementById("base-image");

  clearCanvas(canvas);

  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "white";
  ctx.font = "bold 28px Karla";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.strokeText($("#meme-top-line").val().toUpperCase(), canvasWidth / 2, 20);
  ctx.strokeText($("#meme-bottom-line").val().toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
  ctx.fillText($("#meme-top-line").val().toUpperCase(), canvasWidth / 2, 20);
  ctx.fillText($("#meme-bottom-line").val().toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
}

function updateCanvas(imageSource) {
  const canvas = document.getElementById("meme-canvas");
  const canvasWidth = 400;
  const canvasHeight = 300;
  const ctx = canvas.getContext("2d");
  const img = document.getElementById("base-image");

  clearCanvas(canvas);

  if (imageSource) {
    ctx.drawImage(imageSource, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
    img.src = imageSource.src;
  } ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

  ctx.strokeText($("#meme-top-line").val().toUpperCase(), canvasWidth / 2, 20);
  ctx.strokeText($("#meme-bottom-line").val().toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
  ctx.fillText($("#meme-top-line").val().toUpperCase(), canvasWidth / 2, 20);
  ctx.fillText($("#meme-bottom-line").val().toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
}
