/* global $, send */ "use strict";



initializeTour();



if (window.location.href.search && window.location.href.split("?url=")[1]) { // pre-fill Tour if search parameter exists
  const searchParameter = window.location.href.split("?url=")[1];
  fetchMetadata(1, searchParameter);
}



$("body").on("click", "[data-action]", event => {
  event.preventDefault();
  const data = event.currentTarget.dataset;

  switch(data.action) {
    case "choose claim":
      fetchMetadata(1, data.claimId);
      break;

    case "execute claim":
      if (!$("#fetch-claim-uri").val()) return;
      fetchMetadata(1, $("#fetch-claim-uri").val());
      break;

    case "tour, step 1":
      $(".tour__sidebar__step").removeClass("active");
      $(".tour__sidebar__step:nth-child(1)").addClass("active");

      $("#tour-loader").show();
      $("#tour-results").hide();

      /*
      $("#step1-page").show();
      $("#step2-page").hide();
      $("#step3-page").hide();
      */
      break;

    case "tour, step 2":
      $(".tour__sidebar__step").removeClass("active");
      $(".tour__sidebar__step:nth-child(2)").addClass("active");

      /*
      $("#step1-page").hide();
      $("#step2-page").show();
      $(".hook__page__content__meme__thumbnail").click(); // preload canvas
      $("#step3-page").hide();
      */
      break;

    case "tour, step 3":
      $(".tour__sidebar__step").removeClass("active");
      $(".tour__sidebar__step:nth-child(3)").addClass("active");

      /*
      $("#step1-page").hide();
      $("#step2-page").hide();
      $("#step3-page").show();
      */
      break;

    case "upload image":
      fetchMetadata(2, getMemeInfo());
      break;

    default:
      break;
  }
});

$("body").on("click", ".hook__page__content__meme__thumbnail", event => {
  $(".hook__page__content__meme__thumbnail").removeClass("selected");

  event.currentTarget.className += " selected";
  updateCanvas(event.currentTarget);
});

$("#fetch-claim-uri").on("keyup", function (e) {
  const key = e.keyCode ? e.keyCode : e.which;
  if (key === 13 && $("#fetch-claim-uri").val()) fetchMetadata(1, $("#fetch-claim-uri").val());
});

$("#meme-top-line, #meme-bottom-line").on("keyup", () => updateCanvas());



//  H E L P E R S

function detectLanguageAndUpdate() {
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

function initializeTour() {
  $("#fetch-claim-uri").val("").focus(); // reset
  $(".tour__sidebar__step:nth-child(1)").addClass("active");

  send(JSON.stringify({
    "message": "landed on tour"
  }));

  /*
    TODO:
    - Account for someone wanting to make multiple resolves
  */

  // detectLanguageAndUpdate();
  // initCanvas();
}



function fetchMetadata(stepNumber, data) {
  if (!stepNumber) return;

  switch(stepNumber) {
    case 1:
      send(JSON.stringify({
        "claim": data,
        "message": "fetch metadata",
        "method": "resolve",
        "step": stepNumber
      }));

      if (!$("#fetch-claim-uri").val()) $("#fetch-claim-uri").val(data);

      $("#tour-results").html(`
        <pre><code class="language-bash">
<span class="token comment"># If you have the LBRY desktop app, you can run this in your Terminal</span>
curl "http://localhost:5279" --data "{ 'method': 'resolve', 'params': { 'uri': '${data}' } }"
        </code></pre>

        <div class="loader" id="temp-loader"></div>
        <div id="step1-result"></div>
      `);

      $("#tour-loader").hide();
      break;

    case 2:
      send(JSON.stringify({
        "data": data,
        "message": "fetch metadata",
        "method": "publish",
        "step": stepNumber
      }));

      break;

    default:
      break;
  }
}

function getMemeInfo() { // TODO: Error handling
  const info = {};

  info.description = $("#meme-description").val();
  info.file_path = $("#meme-canvas")[0].toDataURL("image/jpeg", 0.6);
  info.language = $("#meme-language").val();
  info.license = $("#meme-license").val();
  info.name = $("#meme-title").val();
  info.nsfw = $("#meme-nsfw-flag")[0].checked;
  info.title = $("#meme-title").val();

  return info;
}



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

function initCanvas() {
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
