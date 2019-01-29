"use strict";



//  U T I L

import markdown from "@component/markdown";



//  E X P O R T

export default () => `
  <div class="ecosystem__submodule reflector">
    <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="reflector">reflector</h3>

    <div class="ecosystem__submodule__description">
      <div class="ecosystem__submodule__markdown">
        ${markdown("./documents/partials/overview/reflector.md")}
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
