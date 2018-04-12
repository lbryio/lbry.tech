<template>

  <v-container>

    <v-layout row wrap>

      <v-flex xs12 xl6 offset-xl3>

        <h1 class="display-1">
          <p>Development resources and guides</p>
        </h1>

      </v-flex>

    </v-layout>

    <edit-link url="https://github.com/lbryio/lbry.tech/blob/master/src/components/pages/Develop.vue"></edit-link>

  </v-container>

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
  name: 'Develop'
}
</script>

<style lang="scss">

</style>
