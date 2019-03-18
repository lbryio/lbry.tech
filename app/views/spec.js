"use strict";



//  I M P O R T

import html from "choo/html";



//  E X P O R T

export default state => {
  state.hideFooter = true;
  state.lbry = {
    title: "LBRY Specification",
    description: "A detailed specification of the LBRY protocol. Learn exactly what LBRY is and how it works!"
  };

  return html`
    <frame-viewer>
      <iframe id="spec"></iframe>
    </frame-viewer>

    <script>
      const specDomain = "https://spec.lbry.com";
      const spec = document.getElementById("spec");
      spec.src = specDomain + window.location.hash;

      document.querySelector("body").style["overflow-y"] = "hidden";

      window.addEventListener("message", event => {
        if (event.origin !== specDomain || event.source !== spec.contentWindow) // security
          return;

        const url = window.location.href.substr(0, window.location.href.lastIndexOf("#"));
        history.replaceState(null, null, url + "#" + event.data);
      });
    </script>
  `;
};
