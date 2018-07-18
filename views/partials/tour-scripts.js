/* global $, send */ "use strict";



$("#fetch-claim-uri").val(""); // reset



$("[data-action]").on("click", event => {
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

    default:
      break;
  }
});



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
  # Example code using the daemon
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
