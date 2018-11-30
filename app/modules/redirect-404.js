"use strict";



//  I M P O R T

import html from "choo/html";

//  U T I L S

import page404 from "../views/404";
import redirects from "../data/redirects.json";



//  E X P O R T

export default state => {
  const redirectUrl = redirects[state.href];

  if (redirectUrl) {
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
            <p>Redirecting you to <strong>${redirectUrl}</strong></p>
          </div>
        </section>
      </article>

      <script>
        setTimeout(() => {
          window.location.href = "${redirectUrl}";
        }, 2000);
      </script>
    `;
  }

  return page404();
};
