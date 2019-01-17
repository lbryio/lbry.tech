"use strict";

import { require as local } from "app-root-path";

const markdown = local("/app/components/markdown").default;

export default () => `
  <div class="ecosystem__module applications">
    <span class="__close" data-action="close">&times;</span>

    <h2 class="__title">
      <span data-action="open" data-target="applications">
        Applications
        <em>Desktop clients, mobile apps, websites and ∞ more</em>
      </span>

      <div>
        <span><a href="https://github.com/lbryio/lbry-android" title="Android app repo">android</a></span>
        <span><a href="https://github.com/lbryio/lbry-desktop" title="Desktop app repo">desktop</a></span>
        <span><a href="https://github.com/lbryio/spee.ch" title="spee.ch repo">spee.ch</a></span>
      </div>
    </h2>

    <div class="ecosystem__module__details">
      ${markdown("./documents/partials/overview/applications.md")}
    </div>
  </div>
`;
