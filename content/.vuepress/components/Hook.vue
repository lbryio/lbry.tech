<template>
  <div class="hook" id="hook">
    <nav class="hook__navigation" id="hook-navigation">
      <div class="inner-wrap">
        <a href="#" v-on:click.prevent="activeStep = 1" class="hook__navigation__step" v-bind:class="{active: (activeStep==1)}">
          <span class="number">1</span>
          Resolve a claim
        </a>

        <a href="#" v-on:click.prevent="activeStep = 2" class="hook__navigation__step" v-bind:class="{active: (activeStep==2)}">
          <span class="number">2</span>
          Publish content
        </a>

        <a href="#" v-on:click.prevent="activeStep = 3" class="hook__navigation__step" v-bind:class="{active: (activeStep==3)}">
          <span class="number">3</span>
          Support with LBC
        </a>
      </div>
    </nav>

    <Step1 v-if="activeStep == 1"></Step1>
    <Step2 v-if="activeStep == 2"></Step2>
    <Step3 v-if="activeStep == 3"></Step3>

    <aside class="modal" v-model="uploadDialog" v-if="uploadDialog !== false">
      <div class="modal-wrap">
        <template v-if="confirmed">
          <h3>Your image has been published!</h3>
          <p>Check out your content on <a v-bind:href="`https://explorer.lbry.io/tx/${txhash}`" target="_blank" rel="noopener noreferrer">the LBRY blockchain explorer</a>.</p>
          <a href="#" class="__button-black" style="display: inline-block;" v-on:click.prevent="uploadDialog = false">Dismiss this dialog</a>
        </template>

        <template v-else>
          <h3><span class="loader tiny" style="display: inline-block;"></span>&nbsp;Waiting for confirmation...</h3>
          <p>Your image was uploaded to the LBRY network but we are currently waiting for the first confirmation. This should take just a few minutes. In the meantime, go ahead and try the other steps!</p>
        </template>
      </div>
    </aside>
  </div>
</template>

<script>
  import EventBus from "../event-bus";
  import Vue from "vue";

  export default {
    data () {
      return {
        activeStep: 1,
        confirmed: false,
        txhash: "",
        uploadDialog: false
      }
    },

    watch: {
      uploadDialog: function () {
        const component = this;

        if (this.uploadDialog) {
          setTimeout(() => {
            component.confirmed = true; // Simulate confirmation
          }, 10000);
        }
      }
    },

    created () {
      const component = this;

      EventBus.$on("HookFileUploaded", txhash => {
        component.txhash = txhash;
        component.uploadDialog = true;
      });

      EventBus.$on("HookStepUpdate", step => {
        component.activeStep = step;
      });
    },

    name: "Hook"
  };
</script>

<style lang="scss">
  @import "../../../node_modules/highlight.js/styles/monokai-sublime";
  @import "../scss/init/colors";
  @import "../scss/init/extends";
  @import "../scss/init/mixins";
  @import "../scss/partials/animation";
  @import "../scss/partials/modal";
  @import "../scss/pages/page";

  .hook {
    .loader {
      animation: spin 2s linear infinite;
      border-radius: 50%;
      border-style: solid;
      border-top-color: $teal;

      &:not(.small):not(.tiny) {
        width: 4rem; height: 4rem;

        border-width: 6px;
        margin-right: auto;
        margin-left: auto;
      }

      &.small {
        width: 2rem; height: 2rem;
        border-width: 3px;
      }

      &.tiny {
        width: 1rem; height: 1rem;
        border-width: 2px;
      }
    }
  }



  .hook__navigation {
    background-color: $black;
    color: $white;
    font-size: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }

  .hook__navigation__step {
    @media (min-width: 501px) {
      display: inline-block;

      &:not(:last-of-type) {
        margin-right: 1rem;
      }

      span {
        width: 3rem; height: 3rem;

        display: block;
        font-size: 1.25rem;
        line-height: 3rem;
      }
    }

    @media (max-width: 500px) {
      display: block;

      span {
        width: 1rem; height: 1rem;

        display: inline-block;
        font-size: 0.7rem;
        line-height: 0.9rem;
        position: relative;
        top: 2px;
        vertical-align: top;
      }
    }

    &:not(.active) {
      span {
        border-color: rgba($white, 0.1);
      }
    }

    &.active {
      color: $teal;

      span {
        border-color: rgba($teal, 0.3);
      }
    }

    span {
      border: 1px solid;
      border-radius: 50%;
      margin: 0 auto 0.5rem;
    }
  }



  .hook__page {
    @extend .page__content;
  }

  .hook__page__hero {
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba($black, 0.05);

    h1, p {
      text-align: center;
    }
  }

  .hook__page__hero__claim,
  .hook__page__hero__support {
    margin-bottom: 3rem; padding-left: 1rem;

    background-color: $white;
    border: 1px solid rgba($gray, 0.7);
    font-size: 1rem;

    @media (min-width: 501px) {
      margin-right: auto;
      margin-left: auto;
      width: 80%;
    }

    &::after {
      @include clearfix;
    }

    input, a {
      line-height: 3rem;
    }

    span {
      color: rgba($black, 0.3);
    }

    a {
      border-left: 1px solid rgba($gray, 0.7);
      color: $white;
      float: right;
      position: relative;
      text-align: center;
      transition: all 0.2s;
      width: 6rem;

      &::after {
        width: calc(100% + 2px); height: calc(100% + 2px);
        top: -1px; left: -1px;

        border: 1px solid;
        content: "";
        position: absolute;
        transition: inherit;
      }

      &:not(:hover) {
        background-color: $black;

        &::after {
          border-color: $black;
        }
      }

      &:hover {
        background-color: $teal;

        &::after {
          border-color: $teal;
        }
      }
    }
  }

  .hook__page__hero__claim input {
    width: calc(100% - 10rem);
  }

  .hook__page__hero__support {
    input[type=number] {
      width: 3rem;
    }

    input[type=text] {
      width: calc(100% - 11.5rem);
    }

    span {
      line-height: 3rem;
    }

    a {
      margin-left: 0.5rem;
    }
  }



  .hook__page__content::after {
    @include clearfix;
  }

  .hook__page__content__card {
    margin-bottom: 1rem; padding: 1rem;
    cursor: pointer;

    img {
      margin-bottom: 0.5rem;
    }

    @media (min-width: 501px) {
      float: left;
      vertical-align: top;
      width: 50%;
    }

    @media (max-width: 500px) {
      width: 100%;
    }
  }

  .hook__page__content__meme {
    margin-bottom: 2rem;
    padding-right: 1rem;
    padding-left: 1rem;

    @media (min-width: 701px) {
      width: 50%;
    }

    @media (max-width: 700px) {
      width: 100%;
    }

    canvas {
      width: 100%; height: 100%;

      background-color: rgba($teal, 0.3);
      margin-bottom: 1rem;
    }

    h2.__metadata {
      margin-top: 3rem;
    }

    fieldset {
      border: none;

      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
    }

    label {
      color: rgba($black, 0.3);
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.05rem;
      margin-bottom: 0.025rem;
      text-transform: uppercase;
      width: 100%;
    }

    input:not([type="checkbox"]):not([type="submit"]),
    select,
    textarea {
      @media (min-width: 901px) {
        font-size: 1.25rem;
      }

      @media (max-width: 900px) {
        font-size: 1.05rem;
      }
    }

    input {
      &:not([type="checkbox"]):not([type="file"]):not([type="submit"]) {
        border-bottom: 2px solid;
        padding-bottom: 0.15rem;
        transition: all 0.2s;
        width: 100%;
      }

      &:not([type="file"]):not([type="submit"]) {
        &:not(:hover):not(:active) {
          border-color: $black;
        }

        &:hover,
        &:active {
          border-color: $teal;
        }
      }

      &[type="checkbox"] {
        width: 1.25rem; height: 1.25rem;

        border: 2px solid;
        margin-right: 0.5rem;
        position: relative;
        top: 0.35rem;

        &::after {
          width: 100%; height: 100%;

          content: "✓";
          font-size: 1.5rem;
          line-height: 1rem;
          position: absolute;
        }

        &:not(:checked)::after {
          color: transparent;
        }

        &:checked::after {
          color: $teal;
        }
      }
    }

    select,
    textarea {
      border-bottom: 2px solid;
      width: 100%;

      &:not(:hover):not(:active) {
        border-color: $black;
      }

      &:hover,
      &:active {
        border-color: $teal;
      }
    }

    select {
      background-image: url("../media/svg/down.svg");
      background-position: 99% center;
      background-repeat: no-repeat;
      background-size: 1rem;
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }
  }

  .hook__page__content__meme__thumbnail {
    width: 5rem; height: 5rem;

    border-style: solid;
    border-width: 2px;
    margin-bottom: 1rem;
    object-fit: contain;
    object-position: center;

    &:not(:last-of-type) {
      margin-right: 1rem;
    }

    &:not(.selected) {
      border-color: transparent;
    }

    &.selected {
      border-color: black;
    }
  }

  .hook__page__content__meme__uploader {
    @extend .__button-black;
    text-align: center;
    width: 11rem;

    > div:first-of-type {
      width: 100%; height: 100%;
      top: 0; left: 0;

      position: absolute;
    }

    input {
      top: 0; left: 0;
      bottom: 0; right: 0;

      cursor: pointer;
      opacity: 0;
      position: absolute;
      width: 100%;
      z-index: 10;
    }
  }
</style>
