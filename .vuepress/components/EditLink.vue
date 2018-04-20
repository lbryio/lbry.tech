<template>
  <div class="edit-link mt-3">
    <v-divider></v-divider>
    <p class="mt-2"><a v-bind:href="githubUrl" target="_blank" class="grey--text text--darken-1">Edit this page on Github</a></p>
  </div>
</template>

<script>
export default {
  props: ['path'],
  data () {
    return {
      githubUrl: ''
    }
  },
  name: 'EditLink',
  methods: {
    updateUrl () {
      this.githubUrl = 'https://github.com/'+ this.$site.themeConfig.repo + '/edit/' + this.$site.themeConfig.docsBranch;

      if(this.$page.path == '/') {
        this.githubUrl = this.githubUrl + '/README.md';
      } else {
        this.githubUrl = this.githubUrl + this.$page.path.replace('.html', '.md');
      }
    }
  },
  created () {
    this.updateUrl();
  },
  watch: {
    path () {
      this.updateUrl();
    }
  }
}
</script>