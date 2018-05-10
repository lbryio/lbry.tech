<template>
  <div id="hook">
    <div id="hook-navigation">
      <div class="step">
        <a href="#" v-on:click="activeStep = 1" v-bind:class="{active: (activeStep==1)}">
          <span class="number">1</span>
          Resolve a claim
        </a>
      </div>
      <div class="step">
        <a href="#" v-on:click="activeStep = 2" v-bind:class="{active: (activeStep==2)}">
          <span class="number">2</span>
          Publish content
        </a>
      </div>
      <div class="step">
        <a href="#" v-on:click="activeStep = 3" v-bind:class="{active: (activeStep==3)}">
          <span class="number">3</span>
          Support with LBC
        </a>
      </div>
    </div>
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
        <h3><div class="loader small"></div>&nbsp;Waiting for confirmations...</h3>
        <p>Your image was uploaded to the LBRY network but we are currently waiting for the first confirmation. This should take just a few minutes. In the mean time, go ahead and try the other steps!</p>
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

@import '../scss/variables';

@import '../../node_modules/highlight.js/styles/monokai-sublime';

.dialog__content {
  align-items: flex-end !important;
  justify-content: right !important;
}

#hook {
  background: url(https://lbry.io/img/youtube/hero@2x.jpg) no-repeat center center;
  background-size: cover;
  text-align: center;
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    color: white;
    text-shadow: 0px 0px 1rem rgba(0,0,0,0.5);
    a {
      color: white;
    }
  }
  input[type='text'] {
    background: white;
    padding: 0.5rem 0.5rem;
  }
  pre {
    text-align: left;
  }
  .flex {
    margin-bottom: 2rem;
  }
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    &.small {
      border: 4px solid #f3f3f3; /* Light grey */
      border-top: 4px solid #3498db; /* Blue */
      width: 30px;
      height: 30px;
    }
  }
  .card {
    width: 20%;
    display: inline-block;
    vertical-align: top;
    background: white;
    box-shadow: 0 0 5px 5px rgba(0,0,0,0.2);
    margin: 0 2.5%;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 6rem;
      object-fit: cover;
    }
    h4, .account {
      text-align: left;
      color: black;
      padding: 0.5rem 0.5rem;
      text-shadow: none;
    }
  }
  .modal {
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 25rem;
    background: white;
    text-align: left;
    padding: 1rem;
    h3, p, p > a {
      color: black;
      text-shadow: none;
    }
  }
}

#hook-navigation {
  .step {
    width: 30%;
    float: left;
    margin: 0 1.5%;
    background: black;
    padding: 0.5rem 0;
    a {
      color: white;
    }
  }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>
