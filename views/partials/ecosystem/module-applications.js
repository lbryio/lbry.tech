"use strict";



//  P A C K A G E

const html = require("choo/html");



//  E X P O R T

module.exports = exports = () => html`
  <div class="ecosystem__module applications">
    <span class="__close" data-action="close">&times;</span>

    <h2 class="__title">
      <span data-action="open" data-target="applications">
        Applications
        <em>Browsers, spee.ch, and ∞</em>
      </span>

      <div>
        <span><a href="https://github.com/lbryio/lbry-android" title="Android app repo">android</a></span>
        <span><a href="https://github.com/lbryio/lbry-desktop" title="Desktop app repo">desktop</a></span>
        <span><a href="https://github.com/lbryio/spee.ch" title="spee.ch repo">spee.ch</a></span>
      </div>
    </h2>

    <div class="ecosystem__module__details">
      <p>Applications are the final level of the LBRY stack, and they represent how most people will actually use LBRY.</p>
      <p>LBRY Inc. currently releases and maintains three applications:</p>

      <ul>
        <li><a href="https://github.com/lbryio/lbry-desktop" title="">lbry-desktop</a>, a desktop browser for the LBRY network based in React and Electron.</li>
        <li><a href="https://github.com/lbryio/lbry-android" title="">lbry-android</a>, an Android browser for the LBRY network in React Native.</li>
        <li><a href="https://github.com/lbryio/spee.ch" title="">spee.ch</a>, a web-based viewer and link dump for free LBRY content.</li>
      </ul>

      <p>However, the very idea of LBRY is that there's <em>not</em> just one way to interact with the network. Anyone can build on top of LBRY in a permissionless manner. These applications exist to show what's possible and to give new users a user-friendly way to use LBRY.</p>

      <h3>Additional Resources</h3>
      <ul>
        <li>See <a href="/contribute" title="">Contribute</a> for learning how to contribute to existing LBRY apps.</li>
        <li>See [[Something]] for how to set up your own custom instance of spee.ch.</li>
        <li>See <a href="/build" title="">Build</a> for learning how to build your own app!</li>
      </ul>
    </div>
  </div>
`;
