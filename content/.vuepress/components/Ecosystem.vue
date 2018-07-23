<template>
  <section class="ecosystem">
    <aside class="ecosystem__submodules">
      <div class="ecosystem__submodule chainquery" @click.self="openSubmodule('chainquery')">
        <h3 class="ecosystem__submodule__title" @click.self="openSubmodule('chainquery')">chainquery</h3>

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
            <li class="__parent green" @click="open('applications')">Applications</li>
            <li class="__parent red" @click="open('lbrycrd')">Blockchain</li>
            <li class="__parent blue" @click="open('lbry')">Data Network</li>
          </ul>

          <span class="__close" @click="close()">&times;</span>
        </div>
      </div>

      <div class="ecosystem__submodule wallet" @click.self="openSubmodule('wallet')">
        <h3 class="ecosystem__submodule__title" @click.self="openSubmodule('wallet')">wallet server</h3>

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
            <li class="__parent green" @click="open('applications')">Applications</li>
            <li class="__parent red" @click="open('lbrycrd')">Blockchain</li>
            <li class="__parent blue" @click="open('lbry')">Data Network</li>
          </ul>

          <span class="__close" @click="close()">&times;</span>
        </div>
      </div>
    </aside>

    <section class="ecosystem__modules">
      <div class="ecosystem__module lbrycrd">
        <h2 class="__title">
          <span @click="open('lbrycrd')">
            Blockchain
            <em>The foundation of the LBRY protocol</em>
          </span>

          <div>
            <span><a href="https://github.com/lbryio/lbrycrd">lbrycrd</a></span>
          </div>
        </h2>

        <div class="ecosystem__module__details">
          <p>
            <em>
              This section assumes "blockchain" already means something to you. If you're totally new, the key problem solved by blockhain is the ability for distributed, disparate entities to all agree on a state of affairs. For a more comprehensive introduction to blockchain, try starting [here].
            </em>
          </p>
          <p>
            The LBRY blockchain is a public, proof-of-work of work blockchain consensus. It is the foundation of the protocol stack.
          </p>
          <p>
            The most salient feature of the LBRY blockchain is the association of a normalized character string with up to 8KB of metadata.
            This string of characters forms a LBRY URL, e.g. <a href="/tour?url=lbry://hellolbry"><code>lbry://hellolbry</code></a>.
          </p>
          <p>
            The LBRY blockchain contains two parallel [[Merkle Tree]]s, one for transactions (ala Bitcoin) and one for storing LBRY URLs and metadata. This allows LBRY URLs to be trustfully resolved even without a full copy of the blockchain.
          </p>
          <p>
            Conventionally, this metadata contains information about the content, such as the title and creator, the price (if any), and a unique signature allowing the actual content to be fetched from the data network, the next level in the LBRY stack.
          </p>
          <h3>Additional Resources</h3>
          <ul>
            <li>
              See the [[Whitepaper]] for a more comprehensive introduction to the LBRY blockchain.
            </li>
            <li>
              See the [[Resources]] for documentation about the LBRY blockchain, including it's API.
            </li>
            <li>
              See [[Naming]] for learning more about LBRY URLs and how they work.
            </li>
            <li>
              See [[Identities]] for learning how the LBRY blockchain handles publisher identities.
            </li>
          </ul>
        </div>

        <span class="__close" @click="close()">&times;</span>
      </div>

      <div class="ecosystem__module lbry">
        <h2 class="__title">
          <span @click="open('lbry')">
            Data Network
            <em>The "nuts and bolts" (fix this) of the LBRY protocol</em>
          </span>

          <div>
            <span><a href="https://github.com/lbryio/lbry">lbry</a></span>
            <span><a href="https://github.com/lbryio/torba">torba</a></span>
            <span><a href="https://github.com/lbryio/lbryschema">lbryschema</a></span>
          </div>
        </h2>

        <div class="ecosystem__module__details">
          <p>
            While blockchain is the innovation that makes LBRY possible, the Data Network is the layer that actually
            makes the blockchain <em>useful</em>.
          </p>
          <p>
            The primary component for this level is <a href="https://github.com/lbryio/lbry">lbry</a>, a daemon that:
          </p>
          <ul>
            <li>Interprets and validates metadata in the LBRY blockchain via [lbryschema].</li>
            <li>Accesses and distributes the data referenced by metadata in the LBRY blockchain via a peer-to-peer network.</li>
            <li>Provides wallet functionality via an [[SPV]] wallet ([torba]).</li>
            <li>Facilitates building applications by being easily bundable and providing a simple, clean <a href="https://lbry.io/api">API</a> for the LBRY protocol.</li>
          </ul>
          <p>
            Unless choosing to re-implement aspects of the LBRY protocol by hand, most applications that interact with the LBRY network will bundle lbry.
          </p>
          <h3>Additional Resources</h3>
          <ul>
            <li>
              See the [[Whitepaper]] for a more comprehensive introduction to the LBRY data network.
            </li>
            <li>
              See [[Resources]] for documentation of the LBRY APIs.
            </li>
            <li>
              See [[Whatever]] for learning more about LBRY distributes data.
            </li>
            <li>
              See [[Build]] for learning how to use the daemon to solve your own problem or build your own app!
            </li>
          </ul>
        </div>

        <span class="__close" @click="close()">&times;</span>
      </div>

      <div class="ecosystem__module applications">
        <h2 class="__title">
          <span @click="open('applications')">
            Applications
            <em>Browsers, spee.ch, and ∞</em>
          </span>

          <div>
            <span><a href="https://github.com/lbryio/lbry-desktop">desktop</a></span>
            <span><a href="https://github.com/lbryio/lbry-android">android</a></span>
            <span><a href="https://github.com/lbryio/spee.ch">spee.ch</a></span>
          </div>
        </h2>

        <div class="ecosystem__module__details">
          <p>
            Applications are the final level of the LBRY stack, and they represent how most people will actually use LBRY.
          </p>
          <p>
            LBRY Inc. currently releases and maintains three applications:
          </p>
          <ul>
            <li><a href="https://github.com/lbryio/lbry-desktop">lbry-desktop</a>, a desktop browser for the LBRY network based in React and Electron.</li>
            <li><a href="https://github.com/lbryio/lbry-android">lbry-android</a>, an Android browser for the LBRY network in React Native.</li>
            <li><a href="https://github.com/lbryio/spee.ch">spee.ch</a>, a web-based viewer and link dump for free LBRY content.</li>
          </ul>
          <p>
            However, the very idea of LBRY is that there's <em>not</em> just one way to interact with the network.
            Anyone can build on top of LBRY in a permissionless manner.
            These applications exist to show what's possible and to give new users a user-friendly way to use LBRY.
          </p>
          <h3>Additional Resources</h3>
          <ul>
            <li>
              See [[Contribute]] for learning how to contribute to existing LBRY apps.
            </li>
            <li>
              See [[Something]] for how to set up your own custom instance of spee.ch.
            </li>
            <li>
              See [[Build]] for learning how to build your own app!
            </li>
          </ul>
        </div>

        <span class="__close" @click="close()">&times;</span>
      </div>
    </section>

    <aside class="ecosystem__submodules">
      <div class="ecosystem__submodule lighthouse" @click.self="openSubmodule('lighthouse')">
        <h3 class="ecosystem__submodule__title" @click.self="openSubmodule('lighthouse')">lighthouse</h3>

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
            <li class="__parent green" @click="open('applications')">Applications</li>
            <li class="__parent red" @click="open('lbrycrd')">Blockchain</li>
            <li class="__parent blue" @click="open('lbry')">Data Network</li>
          </ul>

          <span class="__close" @click="close()">&times;</span>
        </div>
      </div>

      <div class="ecosystem__submodule reflector" @click.self="openSubmodule('reflector')">
        <h3 class="ecosystem__submodule__title" @click.self="openSubmodule('reflector')">reflector</h3>

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
            <li class="__parent green" @click="open('applications')">Applications</li>
            <li class="__parent red" @click="open('lbrycrd')">Blockchain</li>
            <li class="__parent blue" @click="open('lbry')">Data Network</li>
          </ul>

          <span class="__close" @click="close()">&times;</span>
        </div>
      </div>
    </aside>
  </section>
</template>

<script>
  export default {
    methods: {
      open(ecosystemComponentClassName) {
        switch (true) {
          case (ecosystemComponentClassName === "lbrycrd"):
            resetClassesAndStorage();
            document.getElementsByClassName("lbrycrd")[0].classList.add("active");
            document.getElementsByClassName("chainquery")[0].className += " on red";
            document.getElementsByClassName("lighthouse")[0].className += " on red";
            document.getElementsByClassName("wallet")[0].className += " on red";

            localStorage.setItem("LBRY Ecosystem Overview • lbrycrd is open", true);
            break;



          case (ecosystemComponentClassName === "lbry"):
            resetClassesAndStorage();
            document.getElementsByClassName("lbry")[0].classList.add("active");
            document.getElementsByClassName("reflector")[0].className += " on blue";
            document.getElementsByClassName("wallet")[0].className += " on blue";

            localStorage.setItem("LBRY Ecosystem Overview • lbry is open", true);
            break;



          case (ecosystemComponentClassName === "applications"):
            resetClassesAndStorage();
            document.getElementsByClassName("applications")[0].classList.add("active");
            document.getElementsByClassName("chainquery")[0].className += " on green";
            document.getElementsByClassName("lighthouse")[0].className += " on green";

            localStorage.setItem("LBRY Ecosystem Overview • applications is open", true);
            break;



          default:
            break;
        }
      },

      openSubmodule(ecosystemComponentClassName) {
        if (!document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("on")) return; // do not activate unless submodule is `.on`

        document.querySelectorAll(".ecosystem__submodule").forEach(n => {
          n.classList.remove("active");
          n.classList.remove("on");
        });

        localStorage.removeItem("LBRY Ecosystem Overview • chainquery is open");
        localStorage.removeItem("LBRY Ecosystem Overview • wallet is open");
        localStorage.removeItem("LBRY Ecosystem Overview • lighthouse is open");
        localStorage.removeItem("LBRY Ecosystem Overview • reflector is open");

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

            localStorage.setItem("LBRY Ecosystem Overview • chainquery is open", true);
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

            localStorage.setItem("LBRY Ecosystem Overview • wallet is open", true); // uh-oh
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

            localStorage.setItem("LBRY Ecosystem Overview • lighthouse is open", true);
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

            localStorage.setItem("LBRY Ecosystem Overview • reflector is open", true);
            break;



          default:
            break;
        }
      },

      close() {
        resetClassesAndStorage();
      }
    },

    mounted() {
      const mainModules = [
        { applications: localStorage.getItem("LBRY Ecosystem Overview • applications is open") },
        { lbry: localStorage.getItem("LBRY Ecosystem Overview • lbry is open") },
        { lbrycrd: localStorage.getItem("LBRY Ecosystem Overview • lbrycrd is open") }
      ];

      const subModules = [
        { chainquery: localStorage.getItem("LBRY Ecosystem Overview • chainquery is open") },
        { lighthouse: localStorage.getItem("LBRY Ecosystem Overview • lighthouse is open") },
        { reflector: localStorage.getItem("LBRY Ecosystem Overview • reflector is open") },
        { wallet: localStorage.getItem("LBRY Ecosystem Overview • wallet is open") }
      ];

      for (const module of mainModules) {
        if (
          module[Object.keys(module)] === "true" &&
          document.querySelector(`.ecosystem__module.${Object.keys(module)} h2 span`)
        ) document.querySelector(`.ecosystem__module.${Object.keys(module)} h2 span`).click();
      }

      for (const subModule of subModules) {
        if (
          subModule[Object.keys(subModule)] === "true" &&
          document.querySelector(`.ecosystem__submodule.${Object.keys(subModule)}`)
        ) document.querySelector(`.ecosystem__submodule.${Object.keys(subModule)}`).click();
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

  function resetClassesAndStorage() {
    document.querySelectorAll(".ecosystem__submodule").forEach(n => {
      n.classList.remove("active");
      n.classList.remove("blue");
      n.classList.remove("green");
      n.classList.remove("on");
      n.classList.remove("red");
    });

    document.querySelectorAll(".ecosystem__module").forEach(n => n.classList.remove("active"));

    document.querySelectorAll(".ecosystem").forEach(n => {
      n.classList.remove("expand-left");
      n.classList.remove("expand-right");
    });

    document.querySelectorAll(".__parent").forEach(n => n.classList.remove("active"));

    // Clear localStorage
    localStorage.removeItem("LBRY Ecosystem Overview • lbrycrd is open");
    localStorage.removeItem("LBRY Ecosystem Overview • lbry is open");
    localStorage.removeItem("LBRY Ecosystem Overview • applications is open");
    localStorage.removeItem("LBRY Ecosystem Overview • chainquery is open");
    localStorage.removeItem("LBRY Ecosystem Overview • wallet is open");
    localStorage.removeItem("LBRY Ecosystem Overview • lighthouse is open");
    localStorage.removeItem("LBRY Ecosystem Overview • reflector is open");
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
        z-index: 3;
      }
    }



    &.lbrycrd,
    &.lbry {
      margin-bottom: 1rem;
    }

    &.lbry,
    &.applications {
      &:not(.active) {
        h2 {
          margin-bottom: 0.5rem;

          &::after {
            bottom: 1rem; left: 0;

            font-size: 0.5rem;
            letter-spacing: 0.1rem;
            position: absolute;
            width: 100%;
            z-index: -1;
          }
        }
      }
    }



    &.lbrycrd {
      &:not(.active)::before {
        background-color: $red;
      }

      &.active::before {
        border: 2px solid $red;
      }
    }

    &.lbry {
      &:not(.active) {
        &::before {
          background-color: $blue;
        }

        h2::after {
          content: "◼︎◼︎";
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

        h2::after {
          content: "◼︎◼︎◼︎◼︎◼︎";
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
      @include font-serif;
      top: 0.3rem; left: -3.4rem;

      color: rgba($black, 0.3);
      content: "back to";
      font-size: 0.8rem;
      font-style: italic;
      font-weight: 700;
    }

    &::after {
      width: 2px; height: 100%;
      top: 0; right: 0;

      background-color: rgba($black, 0.3);
      content: "";
    }
  }

  .__parent {
    font-weight: 700;

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
