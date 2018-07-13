"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  E X P O R T

module.exports = exports = () => html`
  <div id="email-subscribe" class="newsletter-cta">
    <h3 class="newsletter-cta__title">Don't miss a bit - Subscribe for LBRY technical updates</h3>

    <div>
      <input type="text" class="newsletter-cta__input" v-model="emailAddress" placeholder="you@domain.tld">
      <a class="newsletter-cta__submit" href="#" v-on:click.prevent="subscribe" title="Subscribe to our technical newsletter">Subscribe</a>
    </div>

    <p class="newsletter-cta__message"></p>
  </div>
`;
