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

    <div class="modal" v-model="uploadDialog" v-if="uploadDialog != false">
      <template v-if="confirmed">
        <h3>Your image has been published!</h3>
        <p><a v-bind:href="'https://explorer.lbry.io/tx/' + txhash" target="_blank">Check out your content on the LBRY blockchain explorer</a></p>
        <a href="#" class="__button-black" v-on:click="uploadDialog = false">Dismiss this dialog</a>
      </template>

      <template v-else>
        <h3><div class="loader small"></div>&nbsp;Waiting for confirmation...</h3>
        <p>Your image was uploaded to the LBRY network but we are currently waiting for the first confirmation. This should take just a few minutes. In the meantime, go ahead and try the other steps!</p>
      </template>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'

import EventBus from '../event-bus';

Vue.use(VueHighlightJS)

export default {
  data () {
    return {
      uploadDialog: false,
      txhash: '',
      confirmed: false,
      activeStep: 1
    }
  },
  watch: {
    uploadDialog: function() {
      var component = this;
      if(this.uploadDialog) {
        // Simulate confirmation
        setTimeout(function() {
          component.confirmed = true;
        }, 10000)
      }
    }
  },
  created () {
    var component = this;
    EventBus.$on('HookFileUploaded', function(txhash) {
      component.txhash = txhash;
      component.uploadDialog = true;
    });
    EventBus.$on('HookStepUpdate', function(step) {
      component.activeStep = step;
    });
  },
  name: 'Hook'
};
</script>

<style lang="scss">
  @import "../../node_modules/highlight.js/styles/monokai-sublime";
  @import "../scss/init/colors";
  @import "../scss/init/extends";
  @import "../scss/init/mixins";
  @import "../scss/pages/page";
  @import "../scss/pages/hook";
</style>
