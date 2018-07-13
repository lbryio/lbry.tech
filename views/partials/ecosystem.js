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
            <em>The blockchain is "lbrycrd"</em>
          </span>

          <div>
            <span data-action="open" data-target="applications">Applications</span>
            <span data-action="open" data-target="lbry">Data Network</span>
          </div>
        </h2>

        <div class="ecosystem__module__details">
          <p><em>This section assumes "blockchain" already means something to you. If you're totally new, the key problem solved by blockhain is the ability for distributed, disparate entities to all agree on a rivalrous state of affairs (such as account balances or metadata associated with a URL).</em></p>

          <p>The LBRY blockchain is a public and uses proof-of-work consensus. It is the foundation of the protocol stack.</p>

          <p>The most salient feature of the LBRY blockchain is the association of a normalized character string with up to 8KB of metadata. This string of characters forms a LBRY URL, e.g.</p>

          <p>The LBRY blockchain contains two parallel [[Merkle Tree]]s, one for transactions (ala Bitcoin) and one for storing LBRY URLs and metadata.</p>

          <p>Conventionally, this metadata contains information about the content, such as the title and creator, the price (if any), and a unique signature allowing the actual content to be fetched from the data network, the next level in the LBRY stack.</p>

          <h3>Additional Resources</h3>
          <ul>
            <li>See the [Whitepaper]</li>
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
            <em>The data network is "lbry"</em>
          </span>

          <div>
            <span data-action="open" data-target="applications">Applications</span>
            <span data-action="open" data-target="lbrycrd">Blockchain</span>
          </div>
        </h2>

        <div class="ecosystem__module__details">
          <ul>
            <li>
              <strong class="__title">lbryschema</strong>
              <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Himenaeos purus facilisi litora suspendisse molestie, cubilia maecenas faucibus vivamus.</li>
                <li>Nisi sociosqu interdum augue condimentum vivamus, ac leo feugiat.</li>
                <li>Justo eu neque aenean nec sagittis, cubilia magnis arcu.</li>
              </ul>
            </li>
            <li>
              <strong class="__title">lbryumx</strong>
              <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Himenaeos purus facilisi litora suspendisse molestie, cubilia maecenas faucibus vivamus.</li>
                <li>Nisi sociosqu interdum augue condimentum vivamus, ac leo feugiat.</li>
                <li>Justo eu neque aenean nec sagittis, cubilia magnis arcu.</li>
              </ul>
            </li>
          </ul>

          <h3>Additional Resources</h3>
          <ul>
            <li>
              <a href="https://github.com/lbryio/lbryschema" title="lbryschema source code">lbryschema</a>
            </li>
            <li>
              <a href="https://github.com/lbryio/lbryumx" title="lbryumx source code">lbryumx</a>
            </li>
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
            <em>LBRY has a lot of applications</em>
          </span>

          <div>
            <span data-action="open" data-target="lbrycrd">Blockchain</span>
            <span data-action="open" data-target="lbry">Data Network</span>
          </div>
        </h2>

        <div class="ecosystem__module__details">
          <ul>
            <li>
              <strong class="__title">Desktop</strong>
              <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
              </li>
            <li>
              <strong class="__title">Mobile</strong>
              <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
            </li>
            <li>
              <strong class="__title">spee.ch</strong>
              <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
            </li>
            <li>
              <strong class="__title">lighthouse</strong>
              <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
            </li>
            <li>
              <strong class="__title">chainquery</strong>
              <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
            </li>
          </ul>

          <h3>Additional Resources</h3>
          <ul>
            <li><a href="https://github.com/lbryio/lbry-desktop" title="source code for LBRY's desktop apps">Linux, macOS, and Windows apps</a></li>
            <li><a href="https://github.com/lbryio/lbry-android" title="LBRY Android app source code">Android app</a></li>
            <li><a href="https://github.com/lbryio/spee.ch" title="spee.ch source code">spee.ch</a></li>
            <li><a href="https://github.com/lbryio/lighthouse" title="lighthouse source code">lighthouse</a></li>
            <li><a href="https://github.com/lbryio/chainquery" title="chainquery source code">chainquery</a></li>
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
