<template>
  <v-container fluid grid-list-md text-xs-center id="hook">
    <v-layout row wrap id="hook-navigation">
      <v-flex xs4>
        <a href="#" v-on:click="activeStep = 1" v-bind:class="{active: (activeStep==1)}">
          <v-btn color="grey lighten-1" fab>1</v-btn>
          Resolve a claim
        </a>
      </v-flex>
      <v-flex xs4>
        <a href="#" v-on:click="activeStep = 2" v-bind:class="{active: (activeStep==2)}">
          <v-btn color="grey lighten-1" fab>2</v-btn>
          Publish content
        </a>
      </v-flex>
      <v-flex xs4>
        <a href="#" v-on:click="activeStep = 3" v-bind:class="{active: (activeStep==3)}">
          <v-btn color="grey lighten-1" fab>3</v-btn>
          Support with LBC
        </a>
      </v-flex>
    </v-layout>
    <Step1 v-if="activeStep == 1"></Step1>
    <Step2 v-if="activeStep == 2"></Step2>
    <Step3 v-if="activeStep == 3"></Step3>
    <v-dialog v-model="uploadDialog" hide-overlay persistent width="30rem">
      <v-card>
        <template v-if="confirmed">
          <v-card-title class="headline">Your image has been published!</v-card-title>
          <v-card-text><a v-bind:href="'https://explorer.lbry.io/tx/' + txhash" target="_blank">Check out your content on the LBRY blockchain explorer</a></v-card-text>
          <v-card-actions>
            <v-btn v-on:click="uploadDialog = false" flat>Dismiss this dialog</v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <v-card-title class="headline"><v-progress-circular indeterminate color="primary"></v-progress-circular>&nbsp;Waiting for confirmations...</v-card-title>
          <v-card-text>Your image was uploaded to the LBRY network but we are currently waiting for the first confirmation. This should take just a few minutes. In the mean time, go ahead and try the other steps!</v-card-text>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
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
}
</script>

<style lang="scss">

@import '../scss/variables';

@import '../../node_modules/highlight.js/styles/monokai-sublime';

.dialog__content {
  align-items: flex-end !important;
  justify-content: right !important;
}

#hook {
  background: url(https://lbry.io/img/youtube/hero@2x.jpg) no-repeat center center;
  background-size: cover;
  color: $text-color;
  .display-2,
  .subheading {
    color: white;
    text-shadow: 0px 0px 1rem rgba(0,0,0,0.5);
    a {
      color: white;
    }
  }
  .flex {
    margin-bottom: 2rem;
  }
}

#hook-navigation {
  margin-bottom: 1.5rem;
  a {
    text-decoration: none;
    color: $text-color;
  }
  .active {
    font-weight: bold;
    .btn {
      background: $primary-color !important;
      color: white !important;
    }
  }
}

</style>
