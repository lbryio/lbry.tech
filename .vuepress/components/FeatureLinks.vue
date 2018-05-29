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

  .feature-links {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(320px,1fr));
    list-style-type: none;
    padding-top: 0.5rem;
  }

  .feature-link {
    width: 320px; min-height: 135px;

    background-color: $white;
    border: 1px solid rgba($black, 0.1);
    border-radius: 3px;
    display: inline-block;
    position: relative;
    transition: box-shadow 0.2s;
    vertical-align: top;

    > div:first-of-type {
      top: 85px; left: 5%;

      position: relative;
      text-align: center;
      width: 90%;
      z-index: 1;
    }

    &:not(:hover) {
      .feature-link__background {
        filter: brightness(0.5);
      }
    }

    &:hover {
      box-shadow: 0 0 15px rgba($black, 0.15);

      .feature-link__title {
        color: $teal;
      }
    }
  }

  .feature-link__title {
    background-color: $white;
    border: 1px solid rgba(gray, 0.1);
    box-shadow: 0 2px 5px rgba($black, 0.025);
    border-radius: 3px;
    box-decoration-break: clone;
    display: inline;
    font-size: 1rem;
    line-height: 1.7;
    padding: 0.25rem 0.5rem;
    transition: color 0.2s;
    position: relative;
  }

  .feature-link__background {
    width: calc(100% + 2px); height: 100px;
    top: -1px; left: -1px;

    background-color: $teal;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    transition: filter 0.2s;
    overflow: hidden;
    position: absolute;
    z-index: 0;

    img {
      width: 100%; height: 100%;

      object-fit: cover;
      object-position: center;
    }
  }
</style>
