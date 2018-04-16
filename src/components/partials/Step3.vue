<template>
  <v-container fluid id="step3-page">
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="display-2">Support your favorite content creators with LBRY</h1>
        <p class="subheading">Send LBRY coins to claim addresses and the owner will receive it in their wallet.</p>
        <p>To send LBC to someone, you need either their wallet address or claim ID.<br/>
        You can get claim ID's by using resolve method in <router-link to="/">the first step</router-link><br/>
        Or you can use the examples below.</p>
      </v-flex>
      <v-flex xs12 sm8>
        <v-text-field v-model="claimId" solo dark></v-text-field>
      </v-flex>
      <v-flex xs12 sm2>
        <v-tooltip bottom>
          <v-text-field v-model="amount" solo dark suffix="LBC" disabled hint="Hardcoded" slot="activator"></v-text-field>
          <span>You can set this value to any amount of LBC in your wallet, but for demonstration purposes we have hardcoded it to 0.01</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs12 sm2>
        <v-btn large v-on:click="send" class="mt-0">Execute</v-btn>
      </v-flex>
      <v-flex xs12 v-if="exampleCode != ''">
        <pre v-highlightjs="exampleCode"><code class="bash"></code></pre>
      </v-flex>
      <v-flex xs12 v-if="isLoading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-flex>
      <v-flex xs12 v-if="jsonData">
        <p class="subheading">Success! Here is the response:</p>
        <pre v-highlightjs="jsonData" class="json-example"><code class="json"></code></pre>
      </v-flex>
      <template v-if="!isLoading && !jsonData">
        <v-flex xs12>
          <p class="subheading">Click on below claims to support them!</p>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card hover>
            <v-card-media src="https://spee.ch/0654f2e2322ccfefa02a956d252df9ac7611d8b0/placeholder-itsadisaster.jpeg" height="200px" v-on:click="chooseClaim('fbdcd44a97810522d23d5f1335b8ca04be9d776c')">
            </v-card-media>
            <v-card-title v-on:click="chooseClaim('fbdcd44a97810522d23d5f1335b8ca04be9d776c')">
              <div>
                <h4 class="mb-0">It's a Disaster</h4>
                <div class="account">Anonymous</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card hover>
            <v-card-media src="https://spee.ch/b1bd330e048fc22dc7bf941c33dd8245eef492c1/unbubbled.png" height="200px" v-on:click="chooseClaim('de7f7fa33e8d879b2bae7238d2bdf827a39f9301')">
            </v-card-media>
            <v-card-title v-on:click="chooseClaim('de7f7fa33e8d879b2bae7238d2bdf827a39f9301')">
              <div>
                <h4 class="mb-0">Unbubbled with Jamie King, Ep1.1 - Bitcoin, Boom or Bust</h4>
                <div class="account">@Unbubbled</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card hover>
            <v-card-media src="https://spee.ch/9880947df41af880bc19724ceddd1cce957a07e2/placeholder-fortninte.jpeg" height="200px" v-on:click="chooseClaim('5b7c7a202201033d99e1be2930d290c127c0f4fe')">
            </v-card-media>
            <v-card-title v-on:click="chooseClaim('5b7c7a202201033d99e1be2930d290c127c0f4fe')">
              <div>
                <h4 class="mb-0">FORTNITE TOP STREAM MOMENTS - Nickatnyte & GamingwithMolt</h4>
                <div class="account">@nickatnyte</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3>
          <v-card hover>
            <v-card-media src="https://spee.ch/a3b8258478ad88954f42f6ac3427eab380720f60/placeholder-lbrymine.png" height="200px" v-on:click="chooseClaim('a1372cf5523885f5923237bfe522f02f5f054362')">
            </v-card-media>
            <v-card-title v-on:click="chooseClaim('a1372cf5523885f5923237bfe522f02f5f054362')">
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
      claimId: 'Claim ID goes here',
      amount: 0.01,
      exampleCode: '',
      isLoading: false,
      jsonData: ''
    }
  },
  methods: {
    send: function() {
      var component = this;
      component.jsonData = '';
      component.isLoading = true;
      component.exampleCode = '# Example code using the daemon\ncurl \'http://localhost:5279\' --data \'{"method":"wallet_send","params":{"claim_id":"' + this.address + '","amount":' + this.amount + '}}\'';
      this.$http.get('//beta.lbry.tech/forward?method=wallet_send&claim_id=' + this.address + '&amount=' + this.amount).then(function(response) {
        component.isLoading = false;
        component.jsonData = JSON.stringify(response.body, null, '  ');
      });
    },
    chooseClaim (address) {
      var component = this;
      component.address = address;
      component.send();
    }
  },
  name: 'Step3'
}
</script>

<style lang="scss">

@import '../../scss/variables';

#step3-page {
  .card {
    .card__title {
      height: 9rem;
      h4 {
        text-align: left;
        font-size: 1.2rem;
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
