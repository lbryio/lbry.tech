/* global $, send */ "use strict";



$("#fetch-claim-uri").val(""); // reset

detectLanguageAndUpdate();
initCanvas();



$("body").on("click", "[data-action]", event => {
  event.preventDefault();
  const data = event.currentTarget.dataset;

  switch(data.action) {
    case "fetch metadata":
      if (!$("#fetch-claim-uri").val()) return;
      fetchMetadata($("#fetch-claim-uri").val());
      break;

    case "choose claim":
      fetchMetadata(data.claimId);
      break;

    case "tour, step one":
      $(".hook__navigation__step").removeClass("active");
      $(".hook__navigation__step:nth-child(1)").addClass("active");

      $("#step1-page").show();
      $("#step2-page").hide();
      $("#step3-page").hide();
      break;

    case "tour, step two":
      $(".hook__navigation__step").removeClass("active");
      $(".hook__navigation__step:nth-child(2)").addClass("active");

      $("#step1-page").hide();
      $("#step2-page").show();
      $(".hook__page__content__meme__thumbnail").click();
      $("#step3-page").hide();
      break;

    case "tour, step three":
      $(".hook__navigation__step").removeClass("active");
      $(".hook__navigation__step:nth-child(3)").addClass("active");

      $("#step1-page").hide();
      $("#step2-page").hide();
      $("#step3-page").show();
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

function fetchMetadata(metadataId) {
  send(JSON.stringify({
    "claim": metadataId,
    "message": "fetch metadata",
    "method": "resolve"
  }));

  if (!$("#fetch-claim-uri").val()) $("#fetch-claim-uri").val(metadataId);

  /**
    TODO:
    [ ] Style code with highlightjs
    [✓] Add copy to explain that the lbry app has to be running in order to follow example
  */

  $("#step1-placeholder").html(`
<pre><code class="bash">
  # The LBRY app must be running on your computer for this example to work
  curl "http://localhost:5279" --data "{ 'method': 'resolve', 'params': { 'uri': '${metadataId}' } }"
</code></pre>

<div class="loader" id="temp-loader"></div>
<div id="step1-result"></div>
  `);

  $("#step1-selections").hide();
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



send(JSON.stringify({ // TODO: Remove this
  "message": "Landed on Tour"
}));
