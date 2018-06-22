<template>
  <main v-bind:class="{
    'api': $page.frontmatter.api,
    'contributing': $page.frontmatter.contributing,
    'documentation': $page.frontmatter.documentation,
    'home': $page.frontmatter.home
  }">
    <nav class="navigation">
      <div class="inner-wrap">
        <router-link class="navigation__item" to="/" title="Go back home">LBRY</router-link>

        <router-link class="navigation__item" to="/overview/" title="LBRY overview">Overview</router-link>
        <router-link class="navigation__item" to="/resources/" title="View LBRY resources">Resources</router-link>
        <router-link class="navigation__item" to="/contribute/" title="Contribute to LBRY">Contribute</router-link>
        <router-link class="navigation__item" to="/build/" title="View LBRY resources">Build</router-link>
        <router-link class="navigation__item" to="/community/" title="Interact with LBRY">Community</router-link>
      </div>
    </nav>

    <template v-if="$page.frontmatter.home">
      <div>
        <section class="hero">
          <div>
            <h1>
              LBRY is a free, open, and community-run digital marketplace.<br/>
              Build the future of content freedom.
            </h1>
          </div>
        </section>

        <section class="features">
          <ul class="home__features">
            <li class="home__feature">
              <p class="home__feature__title"><strong>New to LBRY?</strong></p>
              <p class="home__feature__description">Learn how LBRY works in 3 easy steps</p>
              <router-link class="home__feature__cta" to="tour.html">Take the Tour</router-link>
            </li>

            <li class="home__feature">
              <p class="home__feature__title"><strong>Want to contribute?</strong></p>
              <p class="home__feature__description">Help make LBRY better!</p>
              <a class="home__feature__cta" href="/contribute/">Explore our repos</a>
            </li>
          </ul>
        </section>

        <section class="intro">
          <div class="inner-wrap">
            <h3>Intro/Overview</h3>
            <p>What if anyone in the world could publish a piece of digital content, anyone else in the world could access it, for free or for payment, and that entire system worked end-to-end without any centralized authority or point of control?</p>

            <p>That's the idea behind LBRY. To create a market for accessing and publishing information that is global, decentralized, robust, optimal and complete.</p>

            <a class="cta" href="/overview/">Learn more about our mission</a>
          </div>
        </section>

        <section class="docs">
          <div class="inner-wrap">
            <h3>Documentation</h3>
            <p>LBRY has enough moving parts to warrant comprehensive documentation. Whether you are interested in learning the technical details of our technology stack or you want to integrate LBRY into your life, you will find everything you need in our docs.</p>

            <a class="cta" href="/resources/">Explore our documentation</a>
          </div>
        </section>

        <GithubFeed></GithubFeed>

        <section class="contribute">
          <div class="inner-wrap">
            <h3>Contribute</h3>
            <p>Interested in progressing content freedom? Awesome! No matter your experience or skill level, <strong>you</strong> can make a difference.</p>

            <ul>
              <li><a href="">Raising Issues</a></li>
              <li><a href="">Coding</a></li>
              <li><a href="">Creative</a></li>
              <li><a href="">Translating</a></li>
              <li><a href="">Testing</a></li>
            </ul>
          </div>
        </section>

        <section class="develop">
          <div class="inner-wrap">
            <h3>Development</h3>
            <p>Like a bit of documentation but would prefer to jump in and make your mark on the blockchain? Perhaps add cats to it?</p>

            <a class="cta" href="">Learn the LBRY API</a>
          </div>
        </section>

        <section class="community">
          <div class="inner-wrap">
            <h3>Community</h3>
            <p>Hang out with us! We have a vibrant community of lbryians and would be <em>delighted</em> if you joined us.</p>

            <ul>
              <li><a href="//chat.lbry.io">Discord</a></li>
              <li><a href="//www.reddit.com/r/lbry">Reddit</a></li>
              <!--/ <li><a href="//">StackOverflow</a></li> /-->
            </ul>
          </div>
        </section>
      </div>
    </template>

    <template v-else-if="$page.frontmatter.documentation">
      <div>
        <article class="page" itemtype="http://schema.org/BlogPosting">
          <header class="page__header">
            <div class="page__header-wrap">
              <div class="inner-wrap">
                <h1 class="page__header__title" itemprop="name headline">{{ $page.title }}</h1>
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
      </div>
    </template>

    <template v-else-if="$page.frontmatter.api">
      <Content></Content>
    </template>

    <template v-else-if="$page.path === '/tour.html'">
      <Content></Content>
    </template>

    <template v-else-if="$page.path === '/whitepaper.html'">
      <Content></Content>
    </template>

    <template v-else>
      <div>
        <article class="page" itemtype="http://schema.org/BlogPosting">
          <header class="page__header">
            <div class="page__header-wrap">
              <div class="inner-wrap">
                <h1 class="page__header__title" itemprop="name headline">{{ $page.title }}</h1>
              </div>
            </div>
          </header>

          <section class="page__content" itemprop="articleBody">
            <div class="inner-wrap">
              <Content></Content>
            </div>
          </section>
        </article>
      </div>
    </template>

    <section class="email-subscribe-container">
      <EmailSubscribe></EmailSubscribe>
    </section>

    <section class="alert" id="alert-beta">
      <div class="inner-wrap">
        <p>
          <strong>This website is in beta and under heavy development.</strong>
          All information should be considered incomplete and possibly incorrect and things may not work as expected.
        </p>

        <br/>

        <p>
          Please do not share or link this site publicly while this message is here. This website is open source and you can <a href="https://github.com/lbryio/lbry.tech" target="_blank" rel="noopener noreferrer">contribute to it on Github</a>.
        </p>

        <button id="close-alert">&times;</button>
      </div>
    </section>

    <footer class="footer">
      <div class="inner-wrap">
        <ul>
          <li>
            <a href="//lbry.io" title="Rediscover content freedom">← LBRY.io</a> |
            <edit-link :path="this.$page.path"></edit-link>
          </li>

          <li><router-link to="/overview/" title="LBRY overview">Overview</router-link></li>
          <li><router-link to="/resources/" title="View LBRY resources">Resources</router-link></li>
          <li><router-link to="/contribute/" title="Contribute to LBRY">Contribute</router-link></li>
          <li><router-link to="/community/" title="Interact with LBRY">Community</router-link></li>
          <li><a href="/sitemap.html">Sitemap</a></li>
        </ul>
      </div>
    </footer>
  </main>
</template>

<script>
  import Vue from "vue";
  import VueResource from "vue-resource";
  import VueMoment from "vue-moment";

  Vue.use(VueResource);
  Vue.use(VueMoment);

  export default {
    data () {
      return {
      }
    },

    created () {
      if (this.$ssrContext) {
        this.$ssrContext.title = this.$title
        this.$ssrContext.lang = this.$lang
        this.$ssrContext.description = this.$page.description || this.$description
      }
    },

    mounted () {
      // update title / meta tags
      this.currentMetaTags = [];

      const updateMeta = () => {
        document.title = this.$title
        document.documentElement.lang = this.$lang

        const meta = [
          {
            name: "description",
            content: this.$description
          },
          ...(this.$page.frontmatter.meta || [])
        ];

        this.currentMetaTags = updateMetaTags(meta, this.currentMetaTags);
      };

      this.$watch("$page", updateMeta);
      updateMeta();

      if ( // Toggle beta message
        localStorage.getItem("hide lbry alert") &&
        localStorage.getItem("hide lbry alert") === "true" // cannot set Booleans for some reason
      ) document.querySelector("#alert-beta").style.display = "none";

      document.querySelector("#close-alert").onclick = function () {
        localStorage.setItem("hide lbry alert", true);
        document.querySelector("#alert-beta").style.display = "none";
      };
    },

    beforeDestroy () {
      updateMetaTags(null, this.currentMetaTags)
    }
  }

  function updateMetaTags (meta, current) {
    if (current) current.forEach(c => document.head.removeChild(c));

    if (meta) {
      return meta.map(m => {
        const tag = document.createElement('meta')

        Object.keys(m).forEach(key => {
          tag.setAttribute(key, m[key])
        });

        document.head.appendChild(tag);
        return tag;
      })
    }
  }
</script>

<style lang="scss">
  @import "../scss/type/karla";
  @import "../scss/init/colors";
  @import "../scss/init/base";
  @import "../scss/init/extends";
  @import "../scss/init/mixins";
  @import "../scss/layout";
  @import "../scss/pages/home";
  @import "../scss/pages/page";
  @import "../scss/pages/contributing";
  @import "../scss/pages/documentation";
  @import "../scss/partials/navigation";
  @import "../scss/partials/footer";
</style>
