<template>

  <div>

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

    <v-container>

      <v-layout row wrap>

        <v-flex xs12 xl6 offset-xl3>

          <h1 class="display-1">
            <p>Documentation lives here!</p>
          </h1>

        </v-flex>

      </v-layout>

    </v-container>

  </div>

</template>

<script>

export default {
  data () {
    return {
    }
  },
  name: 'Documentation'
}
</script>

<style lang="scss">

</style>
