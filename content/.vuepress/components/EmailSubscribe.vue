<template>
  <div id="email-subscribe" class="newsletter-cta">
    <h3 class="newsletter-cta__title">Subscribe to our developer newsletter</h3>
    <div>
      <input type="text" class="newsletter-cta__input" v-model="emailAddress" placeholder="you@domain.tld">
      <a class="newsletter-cta__submit" href="#" v-on:click.prevent="subscribe">Subscribe</a>
    </div>
    <p v-if="message" class="newsletter-cta__message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      emailAddress: '',
      message: ''
    }
  },
  name: 'EmailSubscribe',
  methods: {
    subscribe () {
      var component = this;
      this.message = '';
      if(!this.validateEmail(this.emailAddress)) {
        this.message = 'Your email is not valid!';
      } else {
        this.$http.post('//api.lbry.io/list/subscribe', {
          email: this.emailAddress,
          tag: 'developer'
        }, {
          emulateJSON: true
        }).then(function(response) {
          component.email = '';
          component.message = 'Thank you for subscribing!';
        }, function(response) {
          if(response.status == 409) {
            component.message = 'You have already subscribed to our mailing list!';
          }
        });
      }
    },
    validateEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>

<style lang="scss">
  @import "../scss/init/colors";
  @import "../scss/init/extends";
  @import "../scss/init/mixins";

  .newsletter-cta {
    background-color: rgba($black, 0.2);
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;

    > div:first-of-type {
      margin-right: auto;
      margin-left: auto;
      width: 500px;
    }

    &::after {
      @include clearfix;
    }
  }

  .newsletter-cta__title {
    font-size: 0.8rem;
    letter-spacing: 0.05rem;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
  }

  .newsletter-cta__input,
  .newsletter-cta__submit {
    @extend .__button-padding-horizontal;
    border-style: solid;
    border-width: 1px;
  }

  .newsletter-cta__input {
    width: calc(100% - 112px); height: 38px;

    background-color: $white;
    float: left;
    transition: border 0.2s;

    &:not(:focus) {
      border-top-color: $black;
      border-right-color: transparent;
      border-bottom-color: $black;
      border-left-color: $black;
    }

    &:focus {
      border-top-color: mix($black, $teal, 20%);
      border-right-color: transparent;
      border-bottom-color: mix($black, $teal, 20%);
      border-left-color: mix($black, $teal, 20%);
    }
  }

  .newsletter-cta__submit {
    @extend .__button-basic;
    @extend .__button-padding-vertical;
    color: $white;
    float: right;
    left: -1px;
    width: 112px;

    &:not(:hover) {
      background-color: $black;
      border-color: $black;
    }

    &:hover {
      background-color: $teal;
      border-color: mix($black, $teal, 20%);
    }
  }

  .newsletter-cta__message {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
</style>
