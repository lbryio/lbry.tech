/* global $, send */ "use strict";



$("#fetch-claim-uri").val(""); // reset
detectLanguageAndUpdate();



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
    [ ] Add copy to explain that the lbry app has to be running in order to follow example
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

send(JSON.stringify({
  "message": "Landed on Tour"
}));
