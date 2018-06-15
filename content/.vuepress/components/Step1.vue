<template>
  <section class="hook__page" id="step1-page">

    <header class="hook__page__hero">
      <div class="inner-wrap">
        <h1>Learn the LBRY protocol by examples</h1>
        <p>Let's start by getting the associated metadata for <a href="#">a claim</a>.</p>

        <div class="hook__page__hero__claim">
          <span>lbry://</span><input type="text" v-model="address" placeholder=" Claim URI goes here"/>
          <a href="#" v-on:click="fetchMetadata" class="button">Execute</a>
        </div>
      </div>
    </header>

    <div class="xs12" v-if="exampleCode != ''">
      <pre><code class="bash"><span v-html="highlight('bash',exampleCode)"></span></code></pre>
    </div>

    <div class="xs12" v-if="isLoading">
      <div class="loader"></div>
    </div>

    <div class="xs12" v-if="jsonData">
      <p>Success! Here is the response for <strong>lbry://{{ address }}</strong>:</p>
      <pre><code class="json"><span v-html="highlight('json',jsonData)"></span></code></pre>
      <a href="#" class="__button-black" v-on:click="goTo(2)">Go to next step</a>
    </div>

    <template v-if="!isLoading && !jsonData">
      <aside class="hook__page__content">
        <div class="inner-wrap">
          <p style="text-align: center;">&hellip;or select a live example from below</p>

          <div class="hook__page__content__card">
            <img src="https://spee.ch/0654f2e2322ccfefa02a956d252df9ac7611d8b0/placeholder-itsadisaster.jpeg" v-on:click="chooseClaim('itsadisaster')">

            <div v-on:click="chooseClaim('itsadisaster')">
              <h4>It's a Disaster</h4>
              <p class="account">Anonymous</p>
            </div>
          </div>

          <div class="hook__page__content__card">
            <img src="https://spee.ch/b1bd330e048fc22dc7bf941c33dd8245eef492c1/unbubbled.png" v-on:click="chooseClaim('unbubbled1-1')">

            <div v-on:click="chooseClaim('unbubbled1-1')">
              <h4>Unbubbled with Jamie King, Ep1.1 &mdash; Bitcoin, Boom or Bust</h4>
              <p class="account">@Unbubbled</p>
            </div>
          </div>

          <div class="hook__page__content__card">
            <img src="https://spee.ch/9880947df41af880bc19724ceddd1cce957a07e2/placeholder-fortninte.jpeg" v-on:click="chooseClaim('fortnite-top-stream-moments-nickatnyte')">

            <div v-on:click="chooseClaim('fortnite-top-stream-moments-nickatnyte')">
              <h4>FORTNITE TOP STREAM MOMENTS &mdash; Nickatnyte &amp; GamingwithMolt</h4>
              <p class="account">@nickatnyte</p>
            </div>
          </div>

          <div class="hook__page__content__card">
            <img src="https://spee.ch/a3b8258478ad88954f42f6ac3427eab380720f60/placeholder-lbrymine.png" v-on:click="chooseClaim('six')">

            <div v-on:click="chooseClaim('six')">
              <h4>LBRY Coin (LBC) GPU Miner for AMD and NVIDIA</h4>
              <p class="account">Anonymous</p>
            </div>
          </div>
        </div>
      </aside>
    </template>

  </section>
</template>

<script>
import EventBus from '../event-bus';
import hljs from 'highlight.js';

export default {
  data () {
    return {
      address: '',
      jsonData: '',
      isLoading: false,
      exampleCode: ''
    }
  },
  mounted () {

    hljs.configure({
      languages: ['bash', 'json']
    });

  },
  methods: {
    fetchMetadata () {
      var component = this;
      component.jsonData = '';
      component.isLoading = true;
      component.exampleCode = '# Example code using the daemon\ncurl \'http://localhost:5279\' --data \'{"method":"resolve","params":{"uri":"' + this.address + '"}}\'';
      this.$http.post('https://lbry.tech/forward', {
        method: 'resolve',
        uri: this.address
      }).then(function(response) {
        component.isLoading = false;
        component.jsonData = JSON.stringify(response.body, null, '  ');
      });
    },
    chooseClaim (address) {
      var component = this;
      component.address = address;
      component.fetchMetadata();
    },
    goTo (page) {
      EventBus.$emit('HookStepUpdate', page);
    },
    highlight (language, text) {
      return hljs.highlight(language, text).value;
    }
  },
  name: 'Step1'
};
</script>

<style lang="scss">
</style>
