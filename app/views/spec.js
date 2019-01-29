"use strict";



//  I M P O R T

import html from "choo/html";



//  E X P O R T

export default state => {
  state.hideFooter = true;

  return html`
    <div style="width: 100%; height: calc(100vh - 4rem)">
      <iframe id="spec" style="width: 100%; height: 100%;"></iframe>
    </div>

    <script>
      const specDomain = "https://spec.lbry.io";
      const spec = document.getElementById("spec");
      spec.src = specDomain + window.location.hash;

      window.addEventListener("message", event => {
        if (event.origin !== specDomain || event.source !== spec.contentWindow) // security
          return;

        const url = window.location.href.substr(0, window.location.href.lastIndexOf("#"));
        history.replaceState(null, null, url + "#" + event.data);
      });
    </script>
  `;
};
