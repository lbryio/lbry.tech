"use strict";



//  E X P O R T

module.exports = exports = () => `
  <div class="ecosystem__module lbry">
    <span class="__close" data-action="close">&times;</span>

    <h2 class="__title">
      <span data-action="open" data-target="lbry">
        Data Network
        <em>The "nuts and bolts" (fix this) of the LBRY protocol</em>
      </span>

      <div>
        <span><a href="https://github.com/lbryio/lbry" title="lbry repo">lbry</a></span>
        <span><a href="https://github.com/lbryio/lbryschema" title="lbryschema repo">lbryschema</a></span>
        <span><a href="https://github.com/lbryio/torba" title="torba repo">torba</a></span>
      </div>
    </h2>

    <div class="ecosystem__module__details">
      <p>While blockchain is the innovation that makes LBRY possible, the Data Network is the layer that actually makes the blockchain <em>useful</em>.</p>
      <p>The primary component for this level is <a href="https://github.com/lbryio/lbry">lbry</a>, a daemon that:</p>

      <ul>
        <li>Interprets and validates metadata in the LBRY blockchain via [lbryschema].</li>
        <li>Accesses and distributes the data referenced by metadata in the LBRY blockchain via a peer-to-peer network.</li>
        <li>Provides wallet functionality via an [[SPV]] wallet ([torba]).</li>
        <li>Facilitates building applications by being easily bundable and providing a simple, clean <a href="https://lbry.io/api">API</a> for the LBRY protocol.</li>
      </ul>
      <p>Unless choosing to re-implement aspects of the LBRY protocol by hand, most applications that interact with the LBRY network will bundle lbry.</p>

      <h3>Additional Resources</h3>
      <ul>
        <li>See the <a href="/whitepaper" title="">Whitepaper</a> for a more comprehensive introduction to the LBRY data network.</li>
        <li>See <a href="/resources" title="">Resources</a> for documentation of the LBRY APIs.</li>
        <li>See [[Whatever]] for learning more about LBRY distributes data.</li>
        <li>See <a href="/build" title="">Build</a> for learning how to use the daemon to solve your own problem or build your own app!</li>
      </ul>
    </div>
  </div>
`;
