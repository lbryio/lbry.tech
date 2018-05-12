<template>
  <main>
    <nav class="navigation">
      <div class="inner-wrap">
        <router-link class="navigation__item" to="/" title="Go back home">LBRY</router-link>
        <router-link class="navigation__item" to="/overview.html" title="TBD">Overview</router-link>
        <router-link class="navigation__item" to="/documentation.html" title="TBD">Documentation</router-link>
        <router-link class="navigation__item" to="/contribute.html" title="TBD">Contribute</router-link>
        <router-link class="navigation__item" to="/develop.html" title="TBD">Develop</router-link>
        <router-link class="navigation__item" to="/resources" title="TBD">Resources</router-link>
      </div>
    </nav>

    <template v-if="$page.frontmatter.home">
      <div>
        <section class="home hero">
          <div>
            <h2>
              LBRY is a free, open, and community-run digital marketplace.<br/>
              Build the future of content freedom.
            </h2>
          </div>
        </section>

        <section class="home features">
          <ul class="home__features">
            <li class="home__feature">
              <p class="home__feature__title"><strong>New to LBRY?</strong></p>
              <p class="home__feature__description">Learn how LBRY works in 3 easy steps</p>
              <a class="home__feature__cta" href="/hook.html">Check it out</a>
            </li>

            <li class="home__feature">
              <p class="home__feature__title"><strong>Want to contribute?</strong></p>
              <p class="home__feature__description">Start exploring our API and help make LBRY better</p>
              <a class="home__feature__cta" href="">Jump in</a>
            </li>
          </ul>
        </section>

        <section class="home intro">
          <div class="inner-wrap">
            <h3>Intro/Overview</h3>
            <p>What if anyone in the world could publish a piece of digital content, anyone else in the world could access it, for free or for payment, and that entire system worked end-to-end without any centralized authority or point of control?</p>

            <p>That's the idea behind LBRY. To create a market for accessing and publishing information that is global, decentralized, robust, optimal and complete.</p>

            <a class="cta" href="">Learn more</a>
          </div>
        </section>

        <section class="home docs">
          <div class="inner-wrap">
            <h3>Documentation</h3>
            <p>LBRY has enough moving parts to warrant comprehensive documentation. Whether you are interested in learning the technical details of our technology stack or you want to integrate LBRY into your life, you will find everything you need in our docs.</p>

            <a class="cta" href="">Go deeper</a>
          </div>
        </section>

        <section class="home contribute">
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

        <section class="home develop">
          <div class="inner-wrap">
            <h3>Development</h3>
            <p>Like a bit of documentation but would prefer to jump in and make your mark on the blockchain? Perhaps add cats to it?</p>

            <a class="cta" href="">Learn the LBRY API</a>
          </div>
        </section>

        <section class="home community">
          <div class="inner-wrap">
            <h3>Community</h3>
            <p>Hang out with us! We have a vibrant community of lbryians and would be <em>delighted</em> if you joined us.</p>

            <ul>
              <li><a href="//discord.gg/YjYbwhS">Discord</a></li>
              <li><a href="//www.reddit.com/r/lbry">Reddit</a></li>
              <li><a href="//chat.lbry.io">Slack</a></li>
            </ul>
          </div>
        </section>
      </div>
    </template>

    <template v-else-if="$page.path == '/hook.html'">
      <Content></Content>
    </template>

    <template v-else-if="$page.path == '/whitepaper.html'">
      <Content custom></Content>
    </template>

    <template v-else>
      <div>
        <article class="page" itemtype="http://schema.org/BlogPosting">
          <header class="page__header">
            <div class="page__header-wrap">
              <div class="inner-wrap">
                <h2 class="page__header__title" itemprop="name headline">{{ $page.title }}</h2>
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

    <section class="home alert">
      <div class="inner-wrap">
        <strong>This website is in beta.</strong> We are actively developing this website to showcase and teach about the LBRY protocol. All things may not work as expected!<br/>This website is open source and you can <a href="https://github.com/lbryio/lbry.tech" target="_blank">contribute to it on Github</a>.
      </div>
    </section>

    <footer class="footer">
      <div class="inner-wrap">
        <ul>
          <li>
            <a href="//lbry.io" title="Rediscover content freedom">← LBRY.io</a> |
            <edit-link :path="this.$page.path"></edit-link>
          </li>

          <li><a href="">Get</a></li>
          <li><a href="">Learn</a></li>
          <li><a href="">News</a></li>
          <li><a href="">Chat</a></li>
          <li><a href="">GitHub</a></li>
          <li><a href="/sitemap.html">Sitemap</a></li>

          <li>MIT Licensed</li>
        </ul>
      </div>
    </footer>
  </main>
</template>

<script>

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'

Vue.use(VueResource)
Vue.use(VueMoment)

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
    this.currentMetaTags = []
    const updateMeta = () => {
      document.title = this.$title
      document.documentElement.lang = this.$lang
      const meta = [
        {
          name: 'description',
          content: this.$description
        },
        ...(this.$page.frontmatter.meta || [])
      ]
      this.currentMetaTags = updateMetaTags(meta, this.currentMetaTags)
    }
    this.$watch('$page', updateMeta)
    updateMeta()
  },
  beforeDestroy () {
    updateMetaTags(null, this.currentMetaTags)
  }
}

function updateMetaTags (meta, current) {
  if (current) {
    current.forEach(c => {
      document.head.removeChild(c)
    })
  }
  if (meta) {
    return meta.map(m => {
      const tag = document.createElement('meta')
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key])
      })
      document.head.appendChild(tag)
      return tag
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
  @import "../scss/partials/navigation";
  @import "../scss/partials/footer";
</style>
