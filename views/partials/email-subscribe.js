"use strict";



//  P A C K A G E

const html = require("choo-async/html");



//  E X P O R T

module.exports = exports = () => html`
  <div id="emailSubscribe" class="newsletter-cta">
    <h3 class="newsletter-cta__title">Don't miss a bit - Subscribe for LBRY technical updates</h3>

    <div>
      <input class="newsletter-cta__input" id="emailAddress" placeholder="you@domain.tld" type="text"/>
      <button class="newsletter-cta__submit" data-action="subscribe to newsletter" title="Subscribe to our technical newsletter" type="button">Subscribe</a>
    </div>

    <p class="newsletter-cta__message" id="emailMessage"></p>
  </div>
`;
