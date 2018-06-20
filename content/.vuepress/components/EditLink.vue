<template>
  <a v-bind:href="githubUrl" target="_blank" rel="noopener noreferrer" title="Edit this page on GitHub">Edit this page on GitHub</a>
</template>

<script>
  export default {
    props: ["path"],

    data () {
      return {
        githubUrl: ""
      }
    },

    methods: {
      updateUrl () {
        this.githubUrl = `https://github.com/${this.$site.themeConfig.repo}/edit/${this.$site.themeConfig.docsBranch}`;

        if (this.$page.path === "/") this.githubUrl = `${this.githubUrl}/README.md`;
        else this.githubUrl = `${this.githubUrl}${this.$page.path.replace(".html", ".md")}`;
      }
    },

    created () {
      this.updateUrl();
    },

    watch: {
      path () {
        this.updateUrl();
      }
    },

    name: "EditLink"
  }
</script>
