"use strict";

import html from "choo/html";

export default () => {
  return html`
    <div class="api__header page__markup">
      <h1>lbrycrd APIs</h1>
      <p>
        Methods and signatures provided by the <a href="/glossary#lbrycrd">lbrycrd</a> blockchain daemon are documented below. 
        To build, download, or run lbrycrd, see the project <a href="https://github.com/lbryio/lbrycrd/blob/master/README.md">README</a>.
        </p>
    </div>
  `;
};
