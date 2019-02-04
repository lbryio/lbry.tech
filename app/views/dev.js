"use strict";



//  I M P O R T

import html from "choo/html";



//  E X P O R T

export default () => html`
  <article class="page" itemtype="http://schema.org/BlogPosting">
    <header class="page__header">
      <div class="page__header-wrap">
        <div class="inner-wrap">
          <h1 class="page__header__title" itemprop="name headline">Developer Program</h1>
        </div>
      </div>
    </header>

    <section class="page__content page__markup" itemprop="articleBody">
      <div class="inner-wrap">
        <p>When developing for LBRY, having LBC (LBRY credits) makes it easier to develop applications and interface with our APIs.</p>
        <p>To qualify for free LBC you must:</p>

        <ul>
          <li>have a GitHub account, and</li>
          <li>have a public PR (pull request) in the past year</li>
        </ul>

        <p>If this sounds like you, <a href="#" class="no-smooth" id="get-started">get started here</a>!</p>

        <p><small>
          If you have not downloaded our SDK yet, <a href="">you should</a> and generate a wallet address so we know where to send your LBC!
        </small></p>
      </div>
    </section>
  </article>
`;
