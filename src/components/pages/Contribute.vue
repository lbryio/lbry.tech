<template>

  <v-container>

    <v-layout row wrap>

      <v-flex xs12 xl6 offset-xl3>

        <h1 class="display-1">
          <p>How to Contribute</p>
        </h1>

      </v-flex>

    </v-layout>

    <edit-link url="https://github.com/lbryio/lbry.tech/blob/master/src/components/pages/Contribute.vue"></edit-link>

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
  name: 'Contribute'
}
</script>

<style lang="scss">

</style>
