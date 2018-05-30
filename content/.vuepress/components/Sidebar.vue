<template>

  <div id="sidebar">

    <h2>{{ this.$page.title }}</h2>

    <a v-for="link in this.$page.headers" v-bind:key="link.title" @click="goTo(link.slug)" v-bind:class="['level-' + link.level]">{{ link.title }}</a>

  </div>

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