"use strict";

import { require as local } from "app-root-path";

const markdown = local("/app/components/markdown").default;

export default () => `
  <div class="ecosystem__module lbry">
    <span class="__close" data-action="close">&times;</span>

    <h2 class="__title">
      <span data-action="open" data-target="lbry">
        Data Network
        <em>What makes the LBRY blockchain useful.</em>
      </span>

      <div>
        <span><a href="https://github.com/lbryio/lbry">lbrysdk</a></span>
        <span><a href="https://github.com/lbryio/types">lbryschema</a></span>
      </div>
    </h2>
    
    <div class="ecosystem__module__details">
      ${markdown("./documents/partials/overview/lbrysdk.md")}
    </div>
  </div>
`;
