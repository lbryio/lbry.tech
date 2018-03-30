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
