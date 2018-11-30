"use strict";



//  P A C K A G E

import { require as local } from "app-root-path";

//  U T I L

const markdown = local("/app/components/markdown").default;



//  E X P O R T

export default () => `
  <div class="ecosystem__module lbrycrd">
    <span class="__close" data-action="close">&times;</span>

    <h2 class="__title">
      <span data-action="open" data-target="lbrycrd">
        Blockchain
        <em>The foundation of the LBRY protocol</em>
      </span>

      <div>
        <span><a href="https://github.com/lbryio/lbrycrd" title="lbrycrd repo">lbrycrd</a></span>
      </div>
    </h2>

    <div class="ecosystem__module__details">
      ${markdown("./documents/partials/lbrycrd.md")}
    </div>
  </div>
`;
