<template>

  <ul class="feature-links">
    <li v-for="featureLink in this.$page.frontmatter.featureLinks" class="feature-link">
      <div>
        <a :href="featureLink.href" class="feature-link__title">{{ featureLink.title }}</a>
        <div v-if="featureLink.details" class="feature-link__details">{{ featureLink.details }}</div>
      </div>

      <figure class="feature-link__background">
        <img v-if="featureLink.image" :src="featureLink.image" :alt="featureLink.title"/>
      </figure>
    </li>
  </ul>

</template>



<style lang="scss">
  @import "../scss/init/colors";
  @import "../scss/init/mixins";
  @import "../scss/components/feature-links";
</style>
