<template>
  <section class="ecosystem">
    <aside class="ecosystem__submodules">
      <div class="ecosystem__submodule chainquery" v-on:click="openSubmodule('chainquery')">
        <h3 class="ecosystem__submodule__title">chainquery</h3>

        <div class="ecosystem__submodule__description">
          <h4 class="ecosystem__submodule__description__title">Overview</h4>
          <p>The model of Chainquery at its foundation consist of the fundamental data types found in the block chain. This information is then expounded on with additional columns and tables that make querying the data much easier.</p>

          <h4 class="ecosystem__submodule__description__title __connection">Connection to...</h4>
          <p class="__connection-details"></p>

          <h4 class="ecosystem__submodule__description__title">Source</h4>
          <ul>
            <li><a href="https://github.com/lbryio/chainquery" title="chainquery source code">https://github.com/lbryio/chainquery</a></li>
          </ul>

          <ul class="__parents">
            <li class="__parent green" v-on:click="open('applications')">Applications</li>
            <li class="__parent red" v-on:click="open('lbrycrd')">Blockchain</li>
            <li class="__parent blue" v-on:click="open('lbry')">Data Network</li>
          </ul>

          <span class="__close" v-on:click="close()">&times;</span>
        </div>
      </div>

      <div class="ecosystem__submodule wallet" v-on:click="openSubmodule('wallet')">
        <h3 class="ecosystem__submodule__title">wallet server</h3>

        <div class="ecosystem__submodule__description">
          <h4 class="ecosystem__submodule__description__title">Overview</h4>
          <p>The LBRY app is a graphical browser for the decentralized content marketplace provided by the <a href="https://lbry.io" title="">LBRY</a> protocol. It is essentially the <a href="https://github.com/lbryio/lbry" title="">lbry daemon</a> bundled with an UI using <a href="http://electron.atom.io" title="">Electron</a>.</p>

          <h4 class="ecosystem__submodule__description__title __connection">Connection to...</h4>
          <p class="__connection-details"></p>

          <h4 class="ecosystem__submodule__description__title">Source</h4>
          <ul>
            <li><a href="https://github.com/lbryio/lbry-app" title="lbry-app source code">https://github.com/lbryio/lbry-app</a></li>
          </ul>

          <span class="__close" v-on:click="close()">&times;</span>
        </div>
      </div>
    </aside>

    <section class="ecosystem__modules">
      <div class="ecosystem__module lbrycrd">
        <h2 class="__title">
          <span v-on:click="open('lbrycrd')">
            Blockchain
            <em>The blockchain is "lbrycrd"</em>
          </span>

          <div>
            <span v-on:click="open('applications')">Applications</span>
            <span v-on:click="open('lbry')">Data Network</span>
          </div>
        </h2>

        <div class="ecosystem__module__details">
          <p>
            <em>
              This section assumes "blockchain" already means something to you. If you're totally new, the key problem solved by blockhain is the ability for distributed, disparate entities to all agree on a rivalrous state of affairs (such as account balances or metadata associated with a URL).
            </em>
          </p>
          <p>
            The LBRY blockchain is a public and uses proof-of-work consensus. It is the foundation of the protocol stack.
          </p>
          <p>
            The most salient feature of the LBRY blockchain is the association of a normalized character string with up to 8KB of metadata.
            This string of characters forms a LBRY URL, e.g.
          </p>
          <p>
            The LBRY blockchain contains two parallel [[Merkle Tree]]s, one for transactions (ala Bitcoin) and one for storing LBRY URLs and metadata.
          </p>
          <p>
            Conventionally, this metadata contains information about the content, such as the title and creator, the price (if any), and a unique signature allowing the actual content to be fetched from the data network, the next level in the LBRY stack.
          </p>
          <h3>Additional Resources</h3>
          <ul>
            <li>
              See the [Whitepaper]
            </li>
            <li>
              See [[Naming]] for learning more about LBRY URLs and how they work.
            </li>
            <li>
              See [[Identities]] for learning how the LBRY blockchain handles publisher identities.
            </li>
          </ul>
        </div>

        <span class="__close" v-on:click="close()">&times;</span>
      </div>

      <div class="ecosystem__module lbry">
        <h2 class="__title">
          <span v-on:click="open('lbry')">
            Data Network
            <em>The data network is "lbry"</em>
          </span>

          <div>
            <span v-on:click="open('applications')">Applications</span>
            <span v-on:click="open('lbrycrd')">Blockchain</span>
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

        <span class="__close" v-on:click="close()">&times;</span>
      </div>

      <div class="ecosystem__module applications">
        <h2 class="__title">
          <span v-on:click="open('applications')">
            Applications
            <em>LBRY has a lot of applications</em>
          </span>

          <div>
            <span v-on:click="open('lbrycrd')">Blockchain</span>
            <span v-on:click="open('lbry')">Data Network</span>
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
            <li>
              <a href="https://github.com/lbryio/lbry-app" title="source code for LBRY's desktop apps">Linux, macOS, and Windows apps</a>
            </li>
            <li>
              <a href="https://github.com/lbryio/lbry-android" title="LBRY Android app source code">Android app</a>
            </li>
            <li>
              <a href="https://github.com/lbryio/spee.ch" title="spee.ch source code">spee.ch</a>
            </li>
            <li>
              <a href="https://github.com/lbryio/lighthouse" title="lighthouse source code">lighthouse</a>
            </li>
            <li>
              <a href="https://github.com/lbryio/chainquery" title="chainquery source code">chainquery</a>
            </li>
          </ul>
        </div>

        <span class="__close" v-on:click="close()">&times;</span>
      </div>
    </section>

    <aside class="ecosystem__submodules">
      <div class="ecosystem__submodule lighthouse" v-on:click="openSubmodule('lighthouse')">
        <h3 class="ecosystem__submodule__title">lighthouse</h3>

        <div class="ecosystem__submodule__description">
          <h4 class="ecosystem__submodule__description__title">Overview</h4>
          <p>Lighthouse is a lightning-fast advanced search engine API for publications on the lbrycrd with autocomplete capabilities.</p>

          <h4 class="ecosystem__submodule__description__title __connection">Connection to...</h4>
          <p class="__connection-details"></p>

          <h4 class="ecosystem__submodule__description__title">Source</h4>
          <ul>
            <li><a href="https://github.com/lbryio/lighthouse" title="lighthouse source code">https://github.com/lbryio/lighthouse</a></li>
          </ul>

          <span class="__close" v-on:click="close()">&times;</span>
        </div>
      </div>

      <div class="ecosystem__submodule reflector" v-on:click="openSubmodule('reflector')">
        <h3 class="ecosystem__submodule__title">reflector</h3>

        <div class="ecosystem__submodule__description">
          <h4 class="ecosystem__submodule__description__title">Overview</h4>
          <p>A reflector cluster to accept LBRY content for hosting en masse, rehost the content, and make money on data fees (TODO). This code includes Go implementations of the LBRY peer protocol, reflector protocol, and DHT.</p>

          <h4 class="ecosystem__submodule__description__title __connection">Connection to...</h4>
          <p class="__connection-details"></p>

          <h4 class="ecosystem__submodule__description__title">Source</h4>
          <ul>
            <li><a href="https://github.com/lbryio/reflector.go" title="reflector source code">https://github.com/lbryio/reflector.go</a></li>
          </ul>

          <span class="__close" v-on:click="close()">&times;</span>
        </div>
      </div>
    </aside>
  </section>
</template>

<script>
  export default {
    methods: {
      open (ecosystemComponentClassName) {
        document.querySelectorAll(".ecosystem__module").forEach(n => n.classList.remove("active"));
        document.querySelectorAll(".__parent").forEach(n => n.classList.remove("active"));
        document.getElementsByClassName(ecosystemComponentClassName)[0].classList.add("active");

        switch (true) {
          case (ecosystemComponentClassName === "lbrycrd"):
            resetClasses();
            document.getElementsByClassName("chainquery")[0].className += " on red";
            document.getElementsByClassName("lighthouse")[0].className += " on red";
            document.getElementsByClassName("wallet")[0].className += " on red";
            break;



          case (ecosystemComponentClassName === "lbry"):
            resetClasses();
            document.getElementsByClassName("reflector")[0].className += " on blue";
            document.getElementsByClassName("wallet")[0].className += " on blue";
            break;



          case (ecosystemComponentClassName === "applications"):
            resetClasses();
            document.getElementsByClassName("chainquery")[0].className += " on green";
            document.getElementsByClassName("lighthouse")[0].className += " on green";
            break;



          default:
            break;
        }
      },

      openSubmodule (ecosystemComponentClassName) {
        if (!document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("on")) return; // do not activate unless submodule is `.on`

        document.querySelectorAll(".ecosystem__submodule").forEach(n => {
          n.classList.remove("active");
          n.classList.remove("on");
        });

        document.querySelectorAll(".ecosystem__module").forEach(n => n.classList.remove("active"));

        switch (true) {
          case (ecosystemComponentClassName === "chainquery"):
            setSubmoduleConnectionTitle(ecosystemComponentClassName);

            if (document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("green")) {
              document.querySelector(`.${ecosystemComponentClassName} .__connection-details`).innerHTML = `
                <strong>${ecosystemComponentClassName}</strong> is an application built on top of LBRY.
              `;
            }

            if (document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("red")) {
              document.querySelector(`.${ecosystemComponentClassName} .__connection-details`).innerHTML = `
                <strong>${ecosystemComponentClassName}</strong> is an application built on top of the LBRY blockchain.
              `;
            }

            document.getElementsByClassName("ecosystem")[0].className += " expand-left";
            document.getElementsByClassName(ecosystemComponentClassName)[0].className += " active";
            break;



          case (ecosystemComponentClassName === "wallet"):
            setSubmoduleConnectionTitle(ecosystemComponentClassName);

            if (document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("blue")) {
              document.querySelector(`.${ecosystemComponentClassName} .__connection-details`).innerHTML = `
                <strong>${ecosystemComponentClassName}</strong> is an application built on top of the LBRY data network.
              `;
            }

            if (document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("red")) {
              document.querySelector(`.${ecosystemComponentClassName} .__connection-details`).innerHTML = `
                <strong>${ecosystemComponentClassName}</strong> is an application built on top of the LBRY blockchain.
              `;
            }

            document.getElementsByClassName("ecosystem")[0].className += " expand-left";
            document.getElementsByClassName(ecosystemComponentClassName)[0].className += " active";
            break;



          case (ecosystemComponentClassName === "lighthouse"):
            setSubmoduleConnectionTitle(ecosystemComponentClassName);

            if (document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("green")) {
              document.querySelector(`.${ecosystemComponentClassName} .__connection-details`).innerHTML = `
                <strong>${ecosystemComponentClassName}</strong> is an application built on top of LBRY.
              `;
            }

            if (document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("red")) {
              document.querySelector(`.${ecosystemComponentClassName} .__connection-details`).innerHTML = `
                <strong>${ecosystemComponentClassName}</strong> is an application built on top of the LBRY blockchain.
              `;
            }

            document.getElementsByClassName("ecosystem")[0].className += " expand-right";
            document.getElementsByClassName(ecosystemComponentClassName)[0].className += " active";
            break;



          case (ecosystemComponentClassName === "reflector"):
            setSubmoduleConnectionTitle(ecosystemComponentClassName);

            if (document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("blue")) {
              document.querySelector(`.${ecosystemComponentClassName} .__connection-details`).innerHTML = `
                <strong>${ecosystemComponentClassName}</strong> is an application built on top of the LBRY data network.
              `;
            }

            document.getElementsByClassName("ecosystem")[0].className += " expand-right";
            document.getElementsByClassName(ecosystemComponentClassName)[0].className += " active";
            break;



          default:
            break;
        }
      },

      close () {
        resetClasses();
        document.querySelectorAll(".ecosystem__module").forEach(n => n.classList.remove("active"));
      }
    }
  }



  function setSubmoduleConnectionTitle(submoduleClass) {
    if (document.getElementsByClassName(submoduleClass)[0].classList.contains("blue")) {
      document.querySelector(`.${submoduleClass} .__connection`).innerHTML = "Connection to Data Network";
      document.querySelector(`.${submoduleClass} .__parent.blue`).className += " active";
    }

    if (document.getElementsByClassName(submoduleClass)[0].classList.contains("green")) {
      document.querySelector(`.${submoduleClass} .__connection`).innerHTML = "Connection to Applications";
      document.querySelector(`.${submoduleClass} .__parent.green`).className += " active";
    }

    if (document.getElementsByClassName(submoduleClass)[0].classList.contains("red")) {
      document.querySelector(`.${submoduleClass} .__connection`).innerHTML = "Connection to Blockchain";
      document.querySelector(`.${submoduleClass} .__parent.red`).className += " active";
    }
  }

  function resetClasses() {
    document.querySelectorAll(".ecosystem__submodule").forEach(n => {
      n.classList.remove("active");
      n.classList.remove("blue");
      n.classList.remove("green");
      n.classList.remove("on");
      n.classList.remove("red");
    });

    document.getElementsByClassName("ecosystem")[0].classList.remove("expand-left");
    document.getElementsByClassName("ecosystem")[0].classList.remove("expand-right");
  }
</script>

<style lang="scss">
  @import "../scss/init/colors";
  @import "../scss/init/mixins";

  .ecosystem {
    margin-bottom: 2rem; padding-top: 1rem;

    display: grid;
    font-size: 1rem;
    grid-gap: 1rem;

    &:not(.expand-left):not(.expand-right) {
      grid-template-columns: 144px auto 144px;

      .ecosystem__submodules {
        padding-top: 2.5rem;
      }
    }

    &.expand-left {
      grid-template-columns: 50% auto;

      .ecosystem__submodules:last-of-type,
      .ecosystem__submodule:not(.active) {
        display: none;
      }
    }

    &.expand-right {
      grid-template-columns: auto 50%;

      .ecosystem__submodules:first-of-type,
      .ecosystem__submodule:not(.active) {
        display: none;
      }
    }
  }



  .ecosystem__module {
    position: relative;
    width: 100%;

    > * {
      z-index: 1;
    }

    h2 {
      position: relative;
      width: 100%;

      > div {
        float: right;
        font-size: 1rem;
        padding-top: 1.95rem;
        padding-right: 3rem;
        position: relative;
        text-align: right;

        &::before {
          @include font-serif;
          top: 0.9rem; right: 3rem;

          content: "explore";
          font-size: 80%;
          font-style: italic;
          opacity: 0.3;
          position: absolute;
          text-align: right;
          width: 100%;
        }

        span {
          cursor: pointer;
          display: inline-block;
          position: relative;

          &:not(:last-of-type) {
            margin-right: 1rem;

            &::after {
              top: 0; right: -0.7rem;

              color: rgba($gray, 0.3);
              content: "/";
              font-style: italic;
              position: absolute;
            }
          }
        }
      }
    }

    h3 {
      position: relative;
    }

    &::before {
      width: 100%; height: 100%;
      top: 0; left: 0;

      content: "";
      position: absolute;
      z-index: 0;
    }

    &:not(.active) {
      @include center;

      h2 {
        font-size: 1.5rem;
        text-align: center;

        > span {
          cursor: pointer;
          display: block;
          padding: 1.9rem 2rem;

          em {
            display: block;
            font-size: 70%;
            font-weight: normal;
          }
        }

        > div {
          display: none;
        }
      }

      .ecosystem__module__details {
        display: none;
      }

      .__close {
        top: 2rem;
        transform: rotate(45deg);
        z-index: 0;
      }
    }

    &.active {
      padding: 1.9rem 2rem;

      h2 {
        font-size: 3rem;
        margin-bottom: 1rem;

        > span {
          cursor: default;

          em {
            display: none;
          }
        }
      }

      &::before {
        background-color: $white;
      }

      .__close {
        top: 2.35rem;
      }
    }



    &.lbrycrd {
      margin-bottom: 1rem;

      &:not(.active)::before {
        background-color: $red;
      }

      &.active::before {
        border: 2px solid $red;
      }
    }

    &.lbry {
      margin-bottom: 1rem;

      &:not(.active) {
        &::before {
          background-color: $blue;
        }

        h2 {
          margin-bottom: 0.5rem;

          &::after {
            bottom: 1rem; left: 0;

            content: "◼︎◼︎";
            font-size: 0.5rem;
            letter-spacing: 0.1rem;
            position: absolute;
            width: 100%;
            z-index: -1;
          }
        }
      }

      &.active::before {
        border: 2px solid $blue;
      }
    }

    &.applications {
      &:not(.active) {
        &::before {
          background-color: $green;
        }

        h2 {
          margin-bottom: 0.5rem;

          &::after {
            bottom: 1rem; left: 0;

            content: "◼︎◼︎◼︎◼︎◼︎";
            font-size: 0.5rem;
            letter-spacing: 0.1rem;
            position: absolute;
            width: 100%;
          }
        }
      }

      &.active::before {
        border: 2px solid $green;
      }
    }
  }

  .ecosystem__module__piece {
    background-color: $white;
    left: 10%;
    line-height: 2;
    position: relative;
    width: 80%;

    &:not(:last-of-type) {
      margin-bottom: 0.5rem;
    }
  }



  .ecosystem__submodule {
    border-width: 2px;
    cursor: default;
    position: relative;
    transition: border-color 0.2s;
    z-index: 2;

    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }

    &:not(.on):not(.active) {
      color: transparent;
    }

    &:not(.active) {
      @include center;
      width: 144px; height: 144px;

      border-radius: 50%;
      border-style: dashed;

      .ecosystem__submodule__title {
        text-align: center;
      }

      .ecosystem__submodule__description {
        display: none;
      }
    }

    &.active {
      width: 100%; height: 100%; max-height: 383px;

      border-style: solid;
      overflow-y: auto;
      padding: 2rem;

      .ecosystem__submodule__title {
        margin-bottom: 1rem;
      }
    }

    &:not(.blue):not(.green):not(.red) {
      border-color: rgba($gray, 0.3);
    }

    &.blue,
    &.green,
    &.red {
      &:not(.active) {
        cursor: pointer;
      }
    }

    &.blue {
      background-color: rgba($blue, 0.025);
      border-color: $blue;
    }

    &.green {
      background-color: rgba($green, 0.025);
      border-color: $green;
    }

    &.red {
      background-color: rgba($red, 0.025);
      border-color: $red;
    }
  }

  .ecosystem__submodule__title {
    font-size: 1.15rem;
    line-height: 1.33;
  }

  .ecosystem__submodule__description {
    margin-bottom: 2rem;

    .__close {
      top: 1.35rem;
    }
  }

  .ecosystem__submodule__description__title {
    color: rgba($black, 0.3);
    letter-spacing: 0.1rem;
    text-transform: uppercase;
  }



  .__parents {
    top: 2rem; right: 4rem;

    font-size: 1.15rem;
    line-height: 1.33;
    list-style-type: none;
    padding-right: 1rem;
    position: absolute;
    z-index: 1;

    &::before,
    &::after {
      position: absolute;
    }

    &::before {
      top: 0.25rem; left: -3.2rem;

      color: rgba($black, 0.3);
      content: "back to";
      font-size: 0.8rem;
      opacity: 0.3;
    }

    &::after {
      width: 1px; height: 100%;
      top: 0; right: 0;

      background-color: rgba($black, 0.3);
      content: "";
    }
  }

  .__parent {
    &:not(.active) {
      display: none;
    }

    &.active {
      cursor: pointer;
    }
  }

  .__close {
    cursor: pointer;
    font-size: 2rem;
    position: absolute;
    right: 2rem;
    transition: all 0.2s;
  }
</style>
