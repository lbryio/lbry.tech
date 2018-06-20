<template>
  <ul id="sitemap">
    <li v-for="route in routes">
      <router-link v-bind:to="route.path" :title="'Visit lbry.tech' + route.path">{{ route.path }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data: function() {
    var routes = [];
    this.$router.options.routes.forEach(function(item) {
      if(item.path != "/" && item.path != "*") {
        routes.push(item);
      }
    });
    return {
      routes: routes
    }
  },
  name: 'Sitemap'
};
</script>
