<template>
  <div id="step1-page">
    <div class="xs12">
      <h1>Learn the LBRY protocol by examples</h1>
      <p>Let's start by getting the associated metadata for <a href="#">a claim</a>.</p>
    </div>
    <div class="xs12 sm10">
      lbry://<input type="text" v-model="address" />
    </div>
    <div class="xs12 sm2">
      <a href="#" class="__button-black" v-on:click="fetchMetadata">Execute</a>
    </div>
    <div class="xs12" v-if="exampleCode != ''">
      <pre v-highlightjs="exampleCode"><code class="bash"></code></pre>
    </div>
    <div class="xs12" v-if="isLoading">
      <div class="loader"></div>
    </div>
    <div class="xs12" v-if="jsonData">
      <p>Success! Here is the response for <strong>lbry://{{ address }}</strong>:</p>
      <pre v-highlightjs="jsonData" class="json-example"><code class="json"></code></pre>
      <a href="#" class="__button-black" v-on:click="goTo(2)">Go to next step</a>
    </div>
    <template v-if="!isLoading && !jsonData">
      <div class="xs12">
        <p>... or select a live example from below</p>
      </div>
      <div class="card">
        <img src="https://spee.ch/0654f2e2322ccfefa02a956d252df9ac7611d8b0/placeholder-itsadisaster.jpeg" v-on:click="chooseClaim('itsadisaster')">
        <div v-on:click="chooseClaim('itsadisaster')">
          <h4>It's a Disaster</h4>
          <div class="account">Anonymous</div>
        </div>
      </div>
      <div class="card">
        <img src="https://spee.ch/b1bd330e048fc22dc7bf941c33dd8245eef492c1/unbubbled.png" v-on:click="chooseClaim('unbubbled1-1')">
        <div v-on:click="chooseClaim('unbubbled1-1')">
          <h4>Unbubbled with Jamie King, Ep1.1 - Bitcoin, Boom or Bust</h4>
          <div class="account">@Unbubbled</div>
        </div>
      </div>
      <div class="card">
        <img src="https://spee.ch/9880947df41af880bc19724ceddd1cce957a07e2/placeholder-fortninte.jpeg" v-on:click="chooseClaim('fortnite-top-stream-moments-nickatnyte')">
        <div v-on:click="chooseClaim('fortnite-top-stream-moments-nickatnyte')">
          <h4>FORTNITE TOP STREAM MOMENTS - Nickatnyte & GamingwithMolt</h4>
          <div class="account">@nickatnyte</div>
        </div>
      </div>
      <div class="card">
        <img src="https://spee.ch/a3b8258478ad88954f42f6ac3427eab380720f60/placeholder-lbrymine.png" v-on:click="chooseClaim('six')">
        <div v-on:click="chooseClaim('six')">
          <h4>LBRY Coin (LBC) GPU Miner for AMD and NVIDIA</h4>
          <div class="account">Anonymous</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import EventBus from '../event-bus';

export default {
  data () {
    return {
      address: 'Claim URI goes here',
      jsonData: '',
      isLoading: false,
      exampleCode: ''
    }
  },
  methods: {
    fetchMetadata () {
      var component = this;
      component.jsonData = '';
      component.isLoading = true;
      component.exampleCode = '# Example code using the daemon\ncurl \'http://localhost:5279\' --data \'{"method":"resolve","params":{"uri":"' + this.address + '"}}\'';
      this.$http.get('//beta.lbry.tech/forward?method=resolve&uri=' + this.address).then(function(response) {
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
    }
  },
  name: 'Step1'
};
</script>

<style lang="scss">

@import '../scss/variables';

#step1-page {
  .card {
    .card__title {
      height: 9rem;
      h4 {
        text-align: left;
        font-size: 1rem;
      }
      .account {
        color: $primary-color;
        text-align: left;
      }
    }
  }
  .btn {
    background-color: $primary-color;
    border-color: $primary-color;
    color: white;
  }
}


</style>
