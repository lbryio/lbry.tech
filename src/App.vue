<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" clipped app>

      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Link 1</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Link 2</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar clipped-left app>

      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">LBRY.tech</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
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
    return {
      drawer: true
    }
  },
  name: 'App'
}
</script>

<style lang="scss">

pre {
  text-align: left;
  overflow-x: auto;
}

</style>
