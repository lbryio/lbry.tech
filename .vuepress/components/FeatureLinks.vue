<template>

  <ul class="feature-links">
    <li v-for="featureLink in this.$page.frontmatter.featureLinks">
      <a :href="featureLink.href">{{ featureLink.title }}</a>
      <div v-if="featureLink.details">{{ featureLink.details }}</div>

      <figure>
        <img v-if="featureLink.image" src="featureLink.image" alt="featureLink.title"/>
      </figure>
    </li>
  </ul>

</template>



<style lang="scss">
  @import "../scss/init/colors";
  @import "../scss/init/mixins";
</style>
