<template>
  <v-app>

    <!--/
    <v-toolbar>
      <v-toolbar-title class="align-center">
        <span class="title"><router-link to="/">LBRY.tech</router-link></span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/overview.html">Overview</v-btn>
        <v-btn flat to="/documentation.html">Documentation</v-btn>
        <v-btn flat to="/contribute.html">How to Contribute</v-btn>
        <v-btn flat to="/develop.html">How to Develop</v-btn>
        <v-btn flat to="/resources/">Resources</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    /-->

    <nav class="navigation">
      <div class="inner-wrap">
        <a class="navigation__item" href="/" title="Go back home">LBRY</a>
        <a class="navigation__item" href="/overview.html" title="TBD">Overview</a>
        <a class="navigation__item" href="/documentation.html" title="TBD">Documentation</a>
        <a class="navigation__item" href="/contribute.html" title="TBD">Contribute</a>
        <a class="navigation__item" href="/develop.html" title="TBD">Develop</a>
        <a class="navigation__item" href="/resources" title="TBD">Resources</a>
      </div>
    </nav>

    <v-content>
      <!--/
      <v-alert type="error" value="true" id="in-development-alert">
        <strong>This website is in beta.</strong> We are actively developing this website to showcase and teach about the LBRY protocol. All things may not work as expected!<br/>This website is open source and you can <a href="https://github.com/lbryio/lbry.tech" target="_blank">contribute to it on Github</a>.</v-alert>
      </v-alert>
      /-->

      <template v-if="$page.frontmatter.home">
        <section class="home hero">
          <!--/ <h1 class="home__heading">LBRY Technology</h1> /-->
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
              <a class="home__feature__cta" href="">Check it out</a>
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
            <p>Text and such</p>
          </div>
        </section>

        <section class="home contribute">
          <div class="inner-wrap">
            <h3>Contribute</h3>
            <p>Interested in progressing content freedom? Awesome! No matter your experience or skill level, <strong>you</strong> can make a difference.</p>

            <ul>
              <li>Raising Issues</li>
              <li>Coding</li>
              <li>Creative</li>
              <li>Translating</li>
              <li>Testing</li>
            </ul>
          </div>
        </section>

        <section class="home develop">
          <div class="inner-wrap">
            <h3>Development</h3>
            <p>Text and such</p>
          </div>
        </section>

        <section class="home community">
          <div class="inner-wrap">
            <h3>Community</h3>
            <p>Text and such</p>
          </div>
        </section>

        <!--/ <hook></hook> /-->

        <!--/
        <v-container fluid>
          <v-layout row wrap>
            <v-flex>
              <Content custom></Content>
              <edit-link :path="this.$page.path"></edit-link>
            </v-flex>
          </v-layout>
        </v-container>
        /-->
      </template>

      <template v-else-if="$page.path == '/whitepaper.html'">
        <Content custom></Content>
      </template>

      <template v-else>
        <v-container>
          <v-layout>
            <v-flex>
              <Sidebar v-if="$page.headers"></Sidebar>
              <Content custom></Content>
              <edit-link :path="this.$page.path"></edit-link>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </v-content>

  </v-app>
</template>

<script>

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import VueHighlightJS from 'vue-highlightjs'

Vue.use(Vuetify);
Vue.use(VueResource)
Vue.use(VueHighlightJS)

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

<!--/ <style src="../../node_modules/vuetify/dist/vuetify.min.css"></style> /-->

<style lang="scss">
  @import "../scss/type/karla";
  @import "../scss/init/colors";
  @import "../scss/init/base";
  @import "../scss/init/extends";
  @import "../scss/init/mixins";
  @import "../scss/layout";
  @import "../scss/pages/home";
  @import "../scss/partials/navigation";

  /*
  html {
    font-size: 16px;
  }

  pre {
    text-align: left;
    overflow-x: auto;
  }

  img {
    max-width: 100%;
  }

  .content.custom {
    display: block;
  }

  .toolbar__title {
    a {
      text-decoration: none;
      &:hover {
        color: black;
      }
    }
  }

  #in-development-alert {
    a {
      color: white;
    }
  }
  */
</style>
