<template>
  <v-app>

    <v-toolbar clipped-left app scroll-off-screen>

      <v-toolbar-title class="align-center">
        <span class="title"><router-link to="/">LBRY.tech</router-link></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/overview">Overview</v-btn>
        <v-btn flat to="/documentation">Documentation</v-btn>
        <v-btn flat to="/contribute">How to Contribute</v-btn>
        <v-btn flat to="/develop">How to Develop</v-btn>
        <v-btn flat to="/resources">Resources</v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <v-content>

      <v-alert type="error" value="true" id="in-development-alert" class="pt-5 pb-5 ma-0">
        <strong>This website is in beta.</strong> We are actively developing this website to showcase and teach about the LBRY protocol. All things may not work as expected!<br/>This website is open source and you can <a href="https://github.com/lbryio/lbry.tech" target="_blank">contribute to it on Github</a>.</v-alert>
      </v-alert>

      <router-view></router-view>

    </v-content>

  </v-app>
</template>

<script>

export default {
  data () {
    return {}
  },
  name: 'App'
}
</script>

<style lang="scss">

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

.toolbar__title {
  a {
    text-decoration: none;
    &:hover {
      color: black;
    }
  }
}

</style>
