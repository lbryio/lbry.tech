<template>

  <div class="component--mission-statement">
    <strong class="component--mission-statement__title">Mission Statement</strong>

    To create a market for accessing and publishing information<sup>1</sup> that is global<sup>2</sup>, decentralized<sup>3</sup>, robust<sup>4</sup>, optimal<sup>5</sup> and complete<sup>6</sup>.
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
