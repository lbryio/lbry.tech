<template>
  <v-app>

    <v-toolbar clipped-left app scroll-off-screen>

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

    <v-content>

      <v-alert type="error" value="true" id="in-development-alert" class="pt-4 pb-4 ma-0">
        <strong>This website is in beta.</strong> We are actively developing this website to showcase and teach about the LBRY protocol. All things may not work as expected!<br/>This website is open source and you can <a href="https://github.com/lbryio/lbry.tech" target="_blank">contribute to it on Github</a>.</v-alert>
      </v-alert>

      <template v-if="$page.frontmatter.home">

        <hook></hook>

        <v-container fluid>

          <v-layout row wrap>

            <v-flex xs12 xl6 offset-xl3>
        
              <Content custom></Content>

              <edit-link :path="this.$page.path"></edit-link>

              <router-link to="/sitemap.html">Sitemap</router-link>
              
            </v-flex>

          </v-layout>

        </v-container>

      </template>

      <template v-else-if="$page.path == '/whitepaper.html'">

        <Content custom></Content>

      </template>

      <template v-else>

        <v-container>

          <v-layout row wrap>

            <v-flex xs12 xl6 offset-xl3>

              <Sidebar v-if="$page.headers"></Sidebar>

              <Content custom></Content>

              <edit-link :path="this.$page.path"></edit-link>

              <router-link to="/sitemap.html">Sitemap</router-link>
            
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

Vue.use(Vuetify, {
  theme: {
    primary: '#155b4a'
  }
});

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

<style src="../../node_modules/vuetify/dist/vuetify.min.css"></style>

<style lang="scss">

@import '../scss/fonts';

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

</style>
