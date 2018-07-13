"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  E X P O R T

module.exports = exports = err => html`
  <article class="page" itemtype="http://schema.org/BlogPosting">
    <header class="page__header">
      <div class="page__header-wrap">
        <div class="inner-wrap">
          <h1 class="page__header__title" itemprop="name headline">Error</h1>
        </div>
      </div>
    </header>

    <section class="page__content" itemprop="articleBody">
      <div class="inner-wrap">
        <pre>${err.stack}</pre>
      </div>
    </section>
  </article>
`;
