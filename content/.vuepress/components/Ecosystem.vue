<template>
  <section class="ecosystem">
    <aside class="ecosystem__submodules">
      <div class="ecosystem__submodule chainquery">
        <h3 class="__title">
          chainquery
          <span>Blockchain and Applications</span>
        </h3>

        <div class="ecosystem__submodule__description">
          <strong>chainquery</strong> parses and syncs LBRY blockchain data into structured SQL<br/>
          <strong><a href="https://github.com/lbryio/chainquery" title="chainquery source code">→ Source code</a></strong>
        </div>
      </div>

      <div class="ecosystem__submodule wallet">
        <h3 class="__title">
          wallet server
          <span>Blockchain and Data Network</span>
        </h3>

        <div class="ecosystem__submodule__description">
          <strong>lbry-app</strong> is a browser and wallet for LBRY<br/>
          <strong><a href="https://github.com/lbryio/lbry-app" title="lbry-app source code">→ Source code</a></strong>
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
      <div class="ecosystem__submodule lighthouse">
        <h3 class="__title">
          lighthouse
          <span>Blockchain and Applications</span>
        </h3>

        <div class="ecosystem__submodule__description">
          <strong>lighthouse</strong> is a lightning fast search for the LBRY blockchain<br/>
          <strong><a href="https://github.com/lbryio/lighthouse" title="lighthouse source code">→ Source code</a></strong>
        </div>
      </div>

      <div class="ecosystem__submodule reflector">
        <h3 class="__title">
          reflector
          <span>Data Network</span>
        </h3>

        <div class="ecosystem__submodule__description">
          <strong>reflector</strong> accepts LBRY content for re/hosting<br/>
          <strong><a href="https://github.com/lbryio/reflector.go" title="reflector source code">→ Source code</a></strong>
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
        document.getElementsByClassName(ecosystemComponentClassName)[0].classList.add("active");

        switch (true) {
          case (ecosystemComponentClassName === "lbrycrd"):
            resetClasses();
            document.getElementsByClassName("chainquery")[0].className += " active red";
            document.getElementsByClassName("lighthouse")[0].className += " active red";
            document.getElementsByClassName("wallet")[0].className += " active red";
            break;



          case (ecosystemComponentClassName === "lbry"):
            resetClasses();
            document.getElementsByClassName("reflector")[0].className += " active blue";
            document.getElementsByClassName("wallet")[0].className += " active blue";
            break;



          case (ecosystemComponentClassName === "applications"):
            resetClasses();
            document.getElementsByClassName("chainquery")[0].className += " active green";
            document.getElementsByClassName("lighthouse")[0].className += " active green";
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



  function resetClasses() {
    document.querySelectorAll(".ecosystem__submodule").forEach(n => {
      n.classList.remove("active");
      n.classList.remove("blue");
      n.classList.remove("green");
      n.classList.remove("red");
    });
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
    grid-template-columns: 144px auto 144px;
  }



  .ecosystem__modules {
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

      &:not(.active) {
        &::before {
          background-color: $red;
        }
      }

      &.active {
        &::before {
          border: 2px solid $red;
        }
      }
    }

    &.lbry,
    &.applications {
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

      &.active {
        &::before {
          border: 2px solid $blue;
        }
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

      &.active {
        &::before {
          border: 2px solid $green;
        }
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



  .ecosystem__submodules {
    padding-top: 2.5rem;
  }

  .ecosystem__submodule {
    @include center;
    width: 144px; height: 144px;

    border-radius: 50%;
    border-width: 2px;
    cursor: default;
    position: relative;
    transition: border 0.2s;
    z-index: 2;

    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }

    &:not(.active) {
      border-color: rgba($gray, 0.3);
      color: rgba($gray, 0.3);
    }

    &:not(:hover) {
      .ecosystem__submodule__description {
        opacity: 0;
        visibility: hidden;
      }
    }

    h3 {
      position: relative;
      text-align: center;

      span {
        @include font-mono;
        display: block;
        font-size: 0.8rem;
        padding-top: 1rem;
        position: relative;
        width: 100%;

        &::before {
          content: "connects to";
          display: block;
          font-size: inherit;
          font-style: italic;
          position: absolute;
          top: 0;
          width: 100%;
        }
      }
    }

    &.chainquery,
    &.wallet {
      .ecosystem__submodule__description {
        left: -2px;
      }
    }

    &.lighthouse,
    &.reflector {
      .ecosystem__submodule__description {
        right: -2px;
      }
    }

    &:not(.blue):not(.green):not(.red) {
      border-style: dashed;
    }

    &.blue,
    &.green,
    &.red {
      border-style: solid;
    }

    &.blue {
      background-color: rgba($blue, 0.3);
      border-color: $blue;
    }

    &.green {
      background-color: rgba($green, 0.3);
      border-color: $green;
    }

    &.red {
      background-color: rgba($red, 0.3);
      border-color: $red;
    }
  }

  .ecosystem__submodule__description {
    background-color: $white;
    border: 2px solid rgba($gray, 0.3);
    color: $black;
    padding: 1rem;
    position: absolute;
    transition: all 0.2s;
    width: 350px;
  }



  .__close {
    cursor: pointer;
    font-size: 2rem;
    position: absolute;
    right: 2rem;
    transition: all 0.2s;
  }
</style>
