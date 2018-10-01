"use strict";



//  P A C K A G E

import html from "choo/html";



//  E X P O R T

module.exports = exports = () => html`
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
        <p>The requested page could not be found. Here is the image located at <a href="https://lbry.tech/playground" title="Check out the meme creator at the Playground">lbry://404</a> to console you.</p>
        <img alt="lbry://404" src="https://spee.ch/404.png"/>
        <p>Think something should be here? Let us know by <a href="/contribute#raising-issues" title="Check out our documentation to learn how to raise issues">raising an issue</a>.</p>
      </div>
    </section>
  </article>
`;
