<template>
  <div class="component--mission-statement">
    <strong class="component--mission-statement__title">Mission Statement</strong>

    To create a market for accessing and publishing
    information<a href="#footnote-1"><sup>1</sup></a>
    that is global<a href="#footnote-2"><sup>2</sup></a>,
    decentralized<a href="#footnote-3"><sup>3</sup></a>,
    robust<a href="#footnote-4"><sup>4</sup></a>,
    optimal<a href="#footnote-5"><sup>5</sup></a> and
    complete<a href="#footnote-6"><sup>6</sup></a>.
  </div>
</template>

<style lang="scss">
  @import "../scss/init/colors";

  .component--mission-statement {
    margin-bottom: 1.5rem; padding: 1rem 1rem 1rem 1.25rem;

    background-color: rgba($teal, 0.1);
    border-left: 0.5rem solid $teal;
    line-height: 1.55;
    position: relative;

    a {
      background-image: none;
    }

    @media (min-width: 901px) {
      font-size: 1.25rem;
    }

    @media (max-width: 900px) {
      font-size: 1.05rem;
    }
  }

  .component--mission-statement__title {
    color: $teal;
    display: block;
    letter-spacing: 0.025rem;
    text-transform: uppercase;
  }
</style>
