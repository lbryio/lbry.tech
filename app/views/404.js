"use strict";

import html from "choo/html";

export default () => {
  return html`
    <article class="page" itemtype="http://schema.org/BlogPosting">
      <header class="page__header">
        <div class="page__header-wrap">
          <div class="inner-wrap">
            <h1 class="page__header__title" itemprop="name headline">404</h1>
          </div>
        </div>
      </header>

      <section class="page__content page__markup" itemprop="articleBody">
        <div class="inner-wrap">
          <p>The requested page could not be found. Here is the image located at <a href="https://lbry.tech/playground">lbry://404</a> to console you.</p>
          <img src="https://spee.ch/404.png" title="lbry://404" />
          <p>Think something should be here? Let us know by <a href="/contribute#raising-issues">raising an issue</a>.</p>
        </div>
      </section>
    </article>
  `;
};

