<template>

  <v-navigation-drawer clipped app>

    <v-toolbar flat class="transparent">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            {{ this.$page.title }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list dense>
      <v-list-tile v-for="link in this.$page.headers" v-bind:key="link.title" @click="goTo(link.slug)" v-bind:class="['level-' + link.level]">
        <v-list-tile-content>
          <v-list-tile-title>{{ link.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>

</template>

<script>

export default {
  data () {
    return {}
  },
  methods: {
    goTo: function(slug) {
      this.$router.push("#" + slug);
    }
  }
}

</script>

<style>

  .level-3 {
    padding-left: 1.5rem;
  }

  .level-4 {
    padding-left: 3rem;
  }

  .level-5 {
    padding-left: 4.5rem;
  }

</style>