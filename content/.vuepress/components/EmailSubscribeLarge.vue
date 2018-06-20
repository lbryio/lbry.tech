<template>
  <div id="email-subscribe-large" class="newsletter-standalone">
    <input type="text" class="newsletter-standalone__input" v-model="emailAddress" placeholder="your@domain.tld"/><br/>
    <a class="newsletter-standalone__submit" href="#" v-on:click.prevent="subscribe" title="Subscribe to our technical newsletter">Subscribe</a><br/>

    <p v-if="message" class="newsletter-standalone__message">{{ message }}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        emailAddress: "",
        message: ""
      }
    },

    methods: {
      subscribe () {
        let component = this;
        component.message = "";

        if (!component.validateEmail(component.emailAddress)) {
          component.message = "Your email is not valid!";
          return;
        }

        component.$http.post("//api.lbry.io/list/subscribe", {
          email: component.emailAddress,
          tag: "developer"
        }, {
          emulateJSON: true
        }).then(response => {
          component.email = "";
          component.message = "Thank you for subscribing!";
        }, response => {
          if (response.status === 409) component.message = "You have already subscribed to our mailing list!";
        });
      },

      validateEmail (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    },

    name: "EmailSubscribe"
  };
</script>

<style lang="scss">
  @import "../scss/init/colors";
  @import "../scss/init/extends";
  @import "../scss/init/mixins";

  .newsletter-standalone__input,
  .newsletter-standalone__submit {
    @extend .__button-padding-horizontal;
    border-style: solid;
    border-width: 1px;
  }

  .newsletter-standalone__input {
    background-color: $white;
    font-size: 1rem;
    height: 38px;
    margin-bottom: 0.25rem;
    transition: border 0.2s;

    @media (min-width: 601px) {
      width: 500px;
    }

    @media (max-width: 600px) {
      width: 100%;
    }

    &:not(:focus) {
      border-color: $black;
    }

    &:focus {
      border-color: mix($black, $teal, 20%);
    }
  }

  .newsletter-standalone__submit {
    @extend .__button-basic;
    @extend .__button-padding-vertical;
    color: $white;
    display: inline-block;

    &:not(:hover) {
      background-color: $black;
      border-color: $black;
    }

    &:hover {
      background-color: $teal;
      border-color: mix($black, $teal, 20%);
    }
  }
</style>
