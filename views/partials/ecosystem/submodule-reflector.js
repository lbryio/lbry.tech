"use strict";



//  E X P O R T

module.exports = exports = () => `
  <div class="ecosystem__submodule reflector">
    <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="reflector">reflector</h3>

    <div class="ecosystem__submodule__description">
      <h4 class="ecosystem__submodule__description__title">Overview</h4>
      <p>A reflector cluster to accept LBRY content for hosting en masse, rehost the content, and make money on data fees (TODO). This code includes Go implementations of the LBRY peer protocol, reflector protocol, and DHT.</p>

      <h4 class="ecosystem__submodule__description__title __connection">Connection to...</h4>
      <p class="__connection-details"></p>

      <h4 class="ecosystem__submodule__description__title">Source</h4>
      <ul>
        <li><a href="https://github.com/lbryio/reflector.go" title="reflector source code">https://github.com/lbryio/reflector.go</a></li>
      </ul>

      <ul class="__parents">
        <li class="__parent green" data-action="open" data-target="applications">Applications</li>
        <li class="__parent red" data-action="open" data-target="lbrycrd">Blockchain</li>
        <li class="__parent blue" data-action="open" data-target="lbry">Data Network</li>
        <li class="__close" data-action="close">&times;</li>
      </ul>
    </div>
  </div>
`;
