/* global $, send */ "use strict";



$("#fetch-claim-uri").val(""); // reset



$("[data-action]").on("click", event => {
  event.preventDefault();
  const data = event.currentTarget.dataset;

  switch(data.action) {
    case "fetch metadata":
      if (!$("#fetch-claim-uri").val()) return;

      send(JSON.stringify({
        "claim": $("#fetch-claim-uri").val(),
        "message": "fetch metadata",
        "method": "resolve"
      }));

      $("#step1-placeholder").html("<div class=\"loader\"></div>");
      $("#step1-selections").hide();

      break;

    case "choose claim":
      console.log(data.claimId);
      break;

    default:
      break;
  }
});

send(JSON.stringify({
  "message": "Landed on Tour"
}));
