<template>
  <section class="hook__page" id="step3-page">
    <header class="hook__page__hero">
      <div class="inner-wrap">
        <h1>Support your favorite content creators with LBRY</h1>
        <p>Send LBRY coins to claim addresses and the owner will receive it in their wallet.</p>
        <p>To send LBC to someone, you need either their wallet address or claim ID. You can get claim IDs by using the resolve method in <a href="#" v-on:click.prevent.stop="goTo(1)" title="Go back to step one">the first step</a>, or you can use the examples below.</p>

        <div class="hook__page__hero__support">
          <input type="text" v-model="claimId" placeholder="Claim ID goes here"/>
          <input type="number" v-model="amount" disabled title="You can set this value to any amount of LBC in your wallet, but for demonstration purposes we have hardcoded it to 0.01"/><span>LBC</span>
          <a href="#" v-on:click.prevent="send" class="button" title="Execute claim">Execute</a>
        </div>
      </div>
    </header>

    <div class="hook__page__content inner-wrap" v-if="exampleCode !== ''">
      <pre><code class="bash"><span v-html="highlight('bash', exampleCode)"></span></code></pre>
    </div>

    <div class="hook__page__content inner-wrap" v-if="isLoading">
      <div class="loader"></div>
    </div>

    <div class="hook__page__content inner-wrap" v-if="jsonData">
      <p style="text-align: center;">Success! Here is the response:</p>
      <pre><code class="json"><span v-html="highlight('json', jsonData)"></span></code></pre>
    </div>

    <template v-if="!isLoading && !jsonData">
      <aside class="hook__page__content">
        <div class="inner-wrap">
          <p style="text-align: center;">Click on any of the claims below to support them!</p>

          <div class="hook__page__content__card">
            <img src="https://spee.ch/0654f2e2322ccfefa02a956d252df9ac7611d8b0/placeholder-itsadisaster.jpeg" v-on:click="chooseClaim('fbdcd44a97810522d23d5f1335b8ca04be9d776c')" alt=""/>

            <div v-on:click="chooseClaim('fbdcd44a97810522d23d5f1335b8ca04be9d776c')">
              <h4>It's a Disaster</h4>
              <p class="account">Anonymous</p>
            </div>
          </div>

          <div class="hook__page__content__card">
            <img src="https://spee.ch/b1bd330e048fc22dc7bf941c33dd8245eef492c1/unbubbled.png" v-on:click="chooseClaim('de7f7fa33e8d879b2bae7238d2bdf827a39f9301')" alt=""/>

            <div v-on:click="chooseClaim('de7f7fa33e8d879b2bae7238d2bdf827a39f9301')">
              <h4>Unbubbled with Jamie King, Ep1.1 &mdash; Bitcoin, Boom or Bust</h4>
              <p class="account">@Unbubbled</p>
            </div>
          </div>

          <div class="hook__page__content__card">
            <img src="https://spee.ch/9880947df41af880bc19724ceddd1cce957a07e2/placeholder-fortninte.jpeg" v-on:click="chooseClaim('5b7c7a202201033d99e1be2930d290c127c0f4fe')" alt=""/>

            <div v-on:click="chooseClaim('5b7c7a202201033d99e1be2930d290c127c0f4fe')">
              <h4>FORTNITE TOP STREAM MOMENTS &mdash; Nickatnyte &amp; GamingwithMolt</h4>
              <p class="account">@nickatnyte</p>
            </div>
          </div>

          <div class="hook__page__content__card">
            <img src="https://spee.ch/a3b8258478ad88954f42f6ac3427eab380720f60/placeholder-lbrymine.png" v-on:click="chooseClaim('a1372cf5523885f5923237bfe522f02f5f054362')" alt=""/>

            <div v-on:click="chooseClaim('a1372cf5523885f5923237bfe522f02f5f054362')">
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
  import EventBus from "../event-bus";
  import hljs from "highlight.js";

  export default {
    data () {
      return {
        amount: 0.01,
        claimId: "",
        exampleCode: "",
        isLoading: false,
        jsonData: ""
      }
    },

    mounted () {
      hljs.configure({
        languages: ["bash", "json"]
      });
    },

    methods: {
      send () {
        let component = this;
        component.jsonData = "";
        component.isLoading = true;

        component.exampleCode = `
# Example code using the daemon
curl "http://localhost:5279" --data "{ "method": "wallet_send", "params": { "claim_id": "${this.address}", "amount": "${this.amount}" } }"
        `;

        component.$http.post("https://lbry.tech/forward", {
          amount: component.amount,
          claim_id: component.address,
          method: "wallet_send"
        }).then(response => {
          component.isLoading = false;
          component.jsonData = JSON.stringify(response.body, null, "  ");
        }).catch(error => {
          component.isLoading = false;
          component.jsonData = JSON.stringify(error, null, "  ");
          console.log("Sending of LBC failed:\n", error);
        });
      },

      chooseClaim (address) {
        const component = this;
        component.address = address;
        component.send();
      },

      goTo (page) {
        EventBus.$emit("HookStepUpdate", page);
      },

      highlight (language, text) {
        return hljs.highlight(language, text).value;
      }
    },

    name: "Step3"
  };
</script>
