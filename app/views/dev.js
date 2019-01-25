"use strict";



//  I M P O R T

import html from "choo/html";



//  E X P O R T

export default () => html`
  <article class="page" itemtype="http://schema.org/BlogPosting">
    <header class="page__header">
      <div class="page__header-wrap">
        <div class="inner-wrap">
          <h1 class="page__header__title" itemprop="name headline">Dev Program</h1>
        </div>
      </div>
    </header>

    <section class="page__content" itemprop="articleBody">
      <div class="inner-wrap">
        <p>...</p>
      </div>
    </section>
  </article>
`;
