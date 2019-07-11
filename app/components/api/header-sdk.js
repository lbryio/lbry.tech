"use strict";



//  I M P O R T

import html from "choo/html";



//  E X P O R T

export default version => html`
  <div class="api-content__body">
    <h2>lbry-sdk ${version}</h2>
    <p>Methods and signatures provided by the <a href="/glossary#lbry-sdk">lbry-sdk</a> daemon are documented below. To build, download, or run the daemon, see the project <a href="https://github.com/lbryio/lbry-sdk/blob/master/README.md">README</a>.</p>
  </div>

  <div class="api-content__intro">
    <p>You can find the repo for this API on GitHub:</p>
    <pre><code>https://github.com/lbryio/lbry-sdk</code></pre>
  </div>
`;
