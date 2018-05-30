<template>
  <div id="email-subscribe-large">
    <input type="text" class="input" v-model="emailAddress" placeholder="your@email.com">
    <br/>
    <br/>
    <a class="__button-black" href="#" v-on:click.prevent="subscribe">Subscribe</a>
    <p v-if="message" class="message">{{ message }}</p>
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

#email-subscribe-large {
  .title {
    margin-bottom: 0.5rem;
  }
  .input {
    border: 1px solid black;
    padding: 0.65rem;
    background: white;
    margin-right: 1rem;
    width: 18rem;
    font-size: 1.1rem;
  }
  .__button-black {
    font-size: 1.1rem;
  }
  .message {
    margin-top: 1rem;
  }
}

</style>