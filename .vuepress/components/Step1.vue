<template>
  <v-container fluid id="step1-page">
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="display-2">Learn the LBRY protocol by examples</h1>
        <p class="subheading">Let's start by getting the associated metadata for <a href="#">a claim</a>.</p>
      </v-flex>
      <v-flex xs12 sm10>
        <v-text-field v-model="address" solo dark prefix="lbry://"></v-text-field>
      </v-flex>
      <v-flex xs12 sm2>
        <v-btn large v-on:click="fetchMetadata" class="mt-0">Execute</v-btn>
      </v-flex>
      <v-flex xs12 v-if="exampleCode != ''">
        <pre v-highlightjs="exampleCode"><code class="bash"></code></pre>
      </v-flex>
      <v-flex xs12 v-if="isLoading">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </v-flex>
      <v-flex xs12 v-if="jsonData">
        <p class="subheading">Success! Here is the response for <strong>lbry://{{ address }}</strong>:</p>
        <pre v-highlightjs="jsonData" class="json-example"><code class="json"></code></pre>
        <v-btn large v-on:click="$router.push('step-2')" class="mt-3">Go to next step</v-btn>
      </v-flex>
      <template v-if="!isLoading && !jsonData">
        <v-flex xs12>
          <p class="subheading">... or select a live example from below</p>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card hover>
            <v-card-media src="https://spee.ch/0654f2e2322ccfefa02a956d252df9ac7611d8b0/placeholder-itsadisaster.jpeg" height="200px" v-on:click="chooseClaim('itsadisaster')">
            </v-card-media>
            <v-card-title v-on:click="chooseClaim('itsadisaster')">
              <div>
                <h4 class="mb-0">It's a Disaster</h4>
                <div class="account">Anonymous</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card hover>
            <v-card-media src="https://spee.ch/b1bd330e048fc22dc7bf941c33dd8245eef492c1/unbubbled.png" height="200px" v-on:click="chooseClaim('unbubbled1-1')">
            </v-card-media>
            <v-card-title v-on:click="chooseClaim('unbubbled1-1')">
              <div>
                <h4 class="mb-0">Unbubbled with Jamie King, Ep1.1 - Bitcoin, Boom or Bust</h4>
                <div class="account">@Unbubbled</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card hover>
            <v-card-media src="https://spee.ch/9880947df41af880bc19724ceddd1cce957a07e2/placeholder-fortninte.jpeg" height="200px" v-on:click="chooseClaim('fortnite-top-stream-moments-nickatnyte')">
            </v-card-media>
            <v-card-title v-on:click="chooseClaim('fortnite-top-stream-moments-nickatnyte')">
              <div>
                <h4 class="mb-0">FORTNITE TOP STREAM MOMENTS - Nickatnyte & GamingwithMolt</h4>
                <div class="account">@nickatnyte</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card hover>
            <v-card-media src="https://spee.ch/a3b8258478ad88954f42f6ac3427eab380720f60/placeholder-lbrymine.png" height="200px" v-on:click="chooseClaim('six')">
            </v-card-media>
            <v-card-title v-on:click="chooseClaim('six')">
              <div>
                <h4 class="mb-0">LBRY Coin (LBC) GPU Miner for AMD and NVIDIA</h4>
                <div class="account">Anonymous</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
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
    }
  },
  name: 'Step1'
}
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
