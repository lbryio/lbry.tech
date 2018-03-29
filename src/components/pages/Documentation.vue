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

    <p>Documentation will be here.</p>

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
