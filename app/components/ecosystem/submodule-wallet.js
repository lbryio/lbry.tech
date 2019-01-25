"use strict";



//  E X P O R T

export default () => `
  <div class="ecosystem__submodule wallet">
    <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="wallet">wallet server</h3>

    <div class="ecosystem__submodule__description">
      <div class="ecosystem__submodule__markdown">
        <h4 class="ecosystem__submodule__description__title">Overview</h4>
        <p> Provides a secured payment gateway and address subscription service between the <a href="https://github.com/lbryio/lbry" title="">lbry-sdk</a> and the <a href="https://github.com/lbryio/lbrycrd" title=""> blockchain protocol</a>.</p>

        <h4 class="ecosystem__submodule__description__title __connection">Connection to...</h4>
        <p class="__connection-details"></p>

        <h4 class="ecosystem__submodule__description__title">Source</h4>
        <ul>
          <li><a href="https://github.com/lbryio/lbry/tree/master/lbrynet/extras/wallet/server" title="spv wallet server source code">https://github.com/lbryio/lbry/tree/master/lbrynet/extras/wallet/server</a></li>
        </ul>
      </div>

      <ul class="__parents">
        <li class="__parent green" data-action="open" data-target="applications">Applications</li>
        <li class="__parent red" data-action="open" data-target="lbrycrd">Blockchain</li>
        <li class="__parent blue" data-action="open" data-target="lbry">Data Network</li>
        <li class="__close" data-action="close">&times;</li>
      </ul>
    </div>
  </div>
`;
