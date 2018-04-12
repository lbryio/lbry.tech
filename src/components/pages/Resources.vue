<template>

  <v-container>

    <v-layout row wrap>

      <v-flex xs12 xl6 offset-xl3>

        <h1 class="display-1">
          <p>Important Resources</p>
        </h1>

        <p>
          <ul>
            <li><a href="https://discord.gg/YjYbwhS" target="_blank">Discord</a></li>
            <li><a href="https://chat.lbry.io/" target="_blank">Slack</a></li>
            <li><a href="https://www.reddit.com/r/lbry/" target="_blank">Reddit</a></li>
          </ul>
        </p>

      </v-flex>

    </v-layout>

    <edit-link url="https://github.com/lbryio/lbry.tech/blob/master/src/components/pages/Resources.vue"></edit-link>

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
  name: 'Resources'
}
</script>

<style lang="scss">

</style>
