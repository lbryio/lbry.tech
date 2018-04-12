<template>
  <div class="edit-link mt-3">
    <v-divider></v-divider>
    <p class="mt-2"><a v-bind:href="url" target="_blank" class="grey--text text--darken-1">Edit this page on Github</a></p>
  </div>
</template>

<script>
export default {
  props: ['url'],
  data () {
    return {
    }
  },
  name: 'EditLink'
}
</script>

<style lang="scss">

  

</style>