"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  E X P O R T

module.exports = exports = () => async () => html`
  <article class="page" itemtype="http://schema.org/BlogPosting">
    <header class="page__header">
      <div class="page__header-wrap">
        <div class="inner-wrap">
          <h1 class="page__header__title" itemprop="name headline">Resources</h1>
        </div>
      </div>
    </header>

    <section class="page__content" itemprop="articleBody">
      <div class="inner-wrap">
        <h2>Whitepaper</h2>
        <h4>LBRY: A Decentralized Digital Content Marketplace</h4>
        <p>Some info here about the whitepaper and <a href="/whitepaper.html">a link</a>.</p>

        <h2>API Specification</h2>
        <h4>All of our APIs, in one place</h4>

        <h3>chainquery</h3>
        <ul>
          <li><a href="https://github.com/lbryio/chainquery">Codebase</a></li>
          <li><a href="">OpenAPI signature</a></li>
        </ul>

        <h3>lbry</h3>
        <ul>
          <li><a href="https://lbry.io/api">Codebase</a></li>
          <li><a href="/resources/lbry.html">OpenAPI signature</a></li>
        </ul>

        <h3>lbrycrd</h3>
        <ul>
          <li><a href="https://github.com/lbryio/lbrycrd">Codebase</a></li>
          <li><a href="/resources/lbrycrd.html">OpenAPI signature</a></li>
        </ul>

        <h3>Lighthouse</h3>
        <ul>
          <li><a href="https://lbryio.github.io/lighthouse">Codebase</a></li>
          <li><a href="">OpenAPI signature</a></li>
        </ul>

        <h2>The Front Desk</h2>
        <h4>Latest news and musings from the LBRY team</h4>

        <ul class="blog-posts">
          <li class="blog-post">
            <a class="blog-post__title" href="https://lbry.io/news/we-are-hiring-our-boss">We're Hiring Our Boss</a>
            <div class="blog-post__meta">
              <span class="blog-post__meta__date">2018/05/11</span>
              <span class="blog-post__meta__author">Samuel Bryan</span>
            </div>
          </li>

          <li class="blog-post">
            <a class="blog-post__title" href="https://lbry.io/news/lbry-development-community-update-apr-2018">Development and Community Update April 2018</a>
            <div class="blog-post__meta">
              <span class="blog-post__meta__date">2018/05/04</span>
              <span class="blog-post__meta__author">Samuel Bryan</span>
            </div>
          </li>

          <li class="blog-post">
            <a class="blog-post__title" href="https://lbry.io/news/imineblocks">Hey, mine your own business!</a>
            <div class="blog-post__meta">
              <span class="blog-post__meta__date">2018/04/05</span>
              <span class="blog-post__meta__author">Reilly Smith</span>
            </div>
          </li>

          <li class="blog-post">
            <a class="blog-post__title" href="https://lbry.io/news/lbry-development-community-update-mar-2018">Development and Community Update March 2018</a>
            <div class="blog-post__meta">
              <span class="blog-post__meta__date">2018/04/03</span>
              <span class="blog-post__meta__author">Tom Zarebczan</span>
            </div>
          </li>

          <li class="blog-post">
            <a class="blog-post__title" href="https://lbry.io/news/if-you-still-havent-found-what-youre-searching-for">If you still haven't found what you're searching for...</a>
            <div class="blog-post__meta">
              <span class="blog-post__meta__date">2018/03/22</span>
              <span class="blog-post__meta__author">Brinck Slattery</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </article>

  <script>
    // TODO: make this happen in components/layout
    document.getElementsByTagName("body")[0].classList.add("resources"); // documentation
  </script>
`;

// TODO: Make blog post section dynamic. It should be grabbing the latest posts automatically
