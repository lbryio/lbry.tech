"use strict";

import markdown from "../markdown";

export default () => `
  <div class="ecosystem__submodule chainquery">
    <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="chainquery">chainquery</h3>

    <div class="ecosystem__submodule__description">
      <div class="ecosystem__submodule__markdown">
        ${markdown("./documents/partials/overview/chainquery.md")}
      </div>
      
      <ul class="__parents">
        <li class="__parent green" data-action="open" data-target="applications">Applications</li>
        <li class="__parent red" data-action="open" data-target="lbrycrd">Blockchain</li>
        <li class="__parent blue" data-action="open" data-target="lbry">Data Network</li>
        <li class="__close" data-action="close">&times;</li>
      </ul>
    </div>
  </div>
`;
