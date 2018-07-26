"use strict";



//  P A C K A G E S

const Component = require("choo/component");
const dedent = require("dedent");
const html = require("choo-async/html");



//  E X P O R T

module.exports = exports = class Ecosystem extends Component {
  constructor() {
    super();

    this.subModuleChainquery = html`
      <div class="ecosystem__submodule chainquery">
        <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="chainquery">chainquery</h3>

        <div class="ecosystem__submodule__description">
          <h4 class="ecosystem__submodule__description__title">Overview</h4>
          <p>The model of Chainquery at its foundation consists of the fundamental data types found in the blockchain. This information is then expounded on with additional columns and tables that make querying the data much easier.</p>

          <h4 class="ecosystem__submodule__description__title __connection">Connection to...</h4>
          <p class="__connection-details"></p>

          <h4 class="ecosystem__submodule__description__title">Source</h4>
          <ul>
            <li><a href="https://github.com/lbryio/chainquery" title="chainquery source code">https://github.com/lbryio/chainquery</a></li>
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

    this.subModuleWallet = html`
      <div class="ecosystem__submodule wallet">
        <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="wallet">wallet server</h3>

        <div class="ecosystem__submodule__description">
          <h4 class="ecosystem__submodule__description__title">Overview</h4>
          <p>The LBRY app is a graphical browser for the decentralized content marketplace provided by the <a href="https://lbry.io" title="">LBRY</a> protocol. It is essentially the <a href="https://github.com/lbryio/lbry" title="">lbry daemon</a> bundled with an UI using <a href="http://electron.atom.io" title="">Electron</a>.</p>

          <h4 class="ecosystem__submodule__description__title __connection">Connection to...</h4>
          <p class="__connection-details"></p>

          <h4 class="ecosystem__submodule__description__title">Source</h4>
          <ul>
            <li><a href="https://github.com/lbryio/lbry-desktop" title="lbry-desktop source code">https://github.com/lbryio/lbry-desktop</a></li>
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

    this.subModuleLighthouse = html`
      <div class="ecosystem__submodule lighthouse">
        <h3 class="ecosystem__submodule__title" data-action="openSubmodule" data-target="lighthouse">lighthouse</h3>

        <div class="ecosystem__submodule__description">
          <h4 class="ecosystem__submodule__description__title">Overview</h4>
          <p>Lighthouse is a lightning-fast advanced search engine API for publications on the lbrycrd with autocomplete capabilities.</p>

          <h4 class="ecosystem__submodule__description__title __connection">Connection to...</h4>
          <p class="__connection-details"></p>

          <h4 class="ecosystem__submodule__description__title">Source</h4>
          <ul>
            <li><a href="https://github.com/lbryio/lighthouse" title="lighthouse source code">https://github.com/lbryio/lighthouse</a></li>
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

    this.subModuleReflector = html`
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

    this.moduleLbrycrd = html`
      <div class="ecosystem__module lbrycrd">
        <span class="__close" data-action="close">&times;</span>

        <h2 class="__title">
          <span data-action="open" data-target="lbrycrd">
            Blockchain
            <em>The foundation of the LBRY protocol</em>
          </span>

          <div>
            <span><a href="https://github.com/lbryio/lbrycrd" title="lbrycrd repo">lbrycrd</a></span>
          </div>
        </h2>

        <div class="ecosystem__module__details">
          <p><em>This section assumes "blockchain" already means something to you. If you're totally new, the key problem solved by blockhain is the ability for distributed, disparate entities to all agree on a rivalrous state of affairs. For a more comprehensive introduction to blockchain, try starting [here]</em></p>

          <p>The LBRY blockchain is a public, proof-of-work of work blockchain consensus. It is the foundation of the protocol stack.</p>

          <p>The most salient feature of the LBRY blockchain is the association of a normalized character string with up to 8KB of metadata. This string of characters forms a LBRY URL, e.g. <a class="__plain" href="/tour?url=hellolbry"><code>lbry://hellolbry</code></a></p>

          <p>The LBRY blockchain contains two parallel [[Merkle Tree]]s, one for transactions (ala Bitcoin) and one for storing LBRY URLs and metadata. This allows LBRY URLs to be trustfully resolved even without a full copy of the blockchain.</p>

          <p>Conventionally, this metadata contains information about the content, such as the title and creator, the price (if any), and a unique signature allowing the actual content to be fetched from the data network, the next level in the LBRY stack.</p>

          <h3>Additional Resources</h3>
          <ul>
            <li>See the [[Whitepaper]] for a more comprehensive introduction to the LBRY blockchain.</li>
            <li>See the [[Resources]] for documentation about the LBRY blockchain, including its API.</li>
            <li>See [[Naming]] for learning more about LBRY URLs and how they work.</li>
            <li>See [[Identities]] for learning how the LBRY blockchain handles publisher identities.</li>
          </ul>
        </div>
      </div>
    `;

    this.moduleLbry = html`
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
            <li>See the [[Whitepaper]] for a more comprehensive introduction to the LBRY data network.</li>
            <li>See [[Resources]] for documentation of the LBRY APIs.</li>
            <li>See [[Whatever]] for learning more about LBRY distributes data.</li>
            <li>See [[Build]] for learning how to use the daemon to solve your own problem or build your own app!</li>
          </ul>
        </div>
      </div>
    `;

    this.moduleApplications = html`
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
            <li><a href="https://github.com/lbryio/lbry-desktop">lbry-desktop</a>, a desktop browser for the LBRY network based in React and Electron.</li>
            <li><a href="https://github.com/lbryio/lbry-android">lbry-android</a>, an Android browser for the LBRY network in React Native.</li>
            <li><a href="https://github.com/lbryio/spee.ch">spee.ch</a>, a web-based viewer and link dump for free LBRY content.</li>
          </ul>

          <p>However, the very idea of LBRY is that there's <em>not</em> just one way to interact with the network. Anyone can build on top of LBRY in a permissionless manner. These applications exist to show what's possible and to give new users a user-friendly way to use LBRY.</p>

          <h3>Additional Resources</h3>
          <ul>
            <li>See [[Contribute]] for learning how to contribute to existing LBRY apps.</li>
            <li>See [[Something]] for how to set up your own custom instance of spee.ch.</li>
            <li>See [[Build]] for learning how to build your own app!</li>
          </ul>
        </div>
      </div>
    `;
  }

  createElement() {
    return dedent`
      <section class="ecosystem">
        <aside class="ecosystem__submodules">
          ${this.subModuleChainquery}
          ${this.subModuleWallet}
        </aside>
        <section class="ecosystem__modules">
          ${this.moduleLbrycrd}
          ${this.moduleLbry}
          ${this.moduleApplications}
        </section>
        <aside class="ecosystem__submodules">
          ${this.subModuleLighthouse}
          ${this.subModuleReflector}
        </aside>
      </section>
    `;
  }

  load() {
  }

  unload() {
  }

  update() {
    return false;
  }
};
