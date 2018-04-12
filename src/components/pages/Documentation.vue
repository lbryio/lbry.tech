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

    <edit-link url="https://github.com/lbryio/lbry.tech/blob/master/src/components/pages/Documentation.vue"></edit-link>

    </v-container>

  </div>

</template>

<script>

import EditLink from '@/components/partials/EditLink'

export default {
  components: {
    'edit-link': EditLink
  },
  data () {
    return {
    }
  },
  name: 'Documentation'
}
</script>

<style lang="scss">

</style>
