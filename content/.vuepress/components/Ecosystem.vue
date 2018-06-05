<template>

  <section class="ecosystem">
    <aside class="ecosystem__submodules">
      <div class="ecosystem__submodule chainquery">
        <h3 class="__title">chainquery</h3>
      </div>

      <div class="ecosystem__submodule wallet">
        <h3 class="__title">wallet server</h3>
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
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit semper luctus praesent phasellus egestas lectus, placerat feugiat arcu dis fermentum maecenas in augue mus quisque euismod justo. Posuere senectus fermentum luctus iaculis nascetur congue enim, semper gravida egestas facilisis mus sociosqu dui metus, est augue mollis phasellus quis leo. Montes hendrerit potenti cubilia feugiat dictum vitae tellus, habitant cursus dignissim et leo morbi, aliquet proin bibendum vivamus per mattis.</p>

          <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
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
              <strong class="__title">Lighthouse</strong>
              <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
            </li>

            <li>
              <strong class="__title">chainquery</strong>
              <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
            </li>
          </ul>
        </div>

        <span class="__close" v-on:click="close()">&times;</span>
      </div>
    </section>

    <aside class="ecosystem__submodules">
      <div class="ecosystem__submodule lighthouse">
        <h3 class="__title">lighthouse</h3>
      </div>

      <div class="ecosystem__submodule reflector">
        <h3 class="__title">reflector</h3>
      </div>
    </aside>
  </section>

</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      open (ecosystemComponentClassName) {
        document.querySelectorAll(".ecosystem__module").forEach(n => n.classList.remove("active"));
        document.querySelectorAll(".ecosystem__submodule").forEach(n => n.classList.remove("active"));

        document.getElementsByClassName(ecosystemComponentClassName)[0].classList.add("active");

        switch (true) {
          case (ecosystemComponentClassName === "lbrycrd"):
            document.getElementsByClassName("chainquery")[0].classList.add("active");
            document.getElementsByClassName("lighthouse")[0].classList.add("active");
            document.getElementsByClassName("wallet")[0].classList.add("active");
            break;

          case (ecosystemComponentClassName === "lbry"):
            document.getElementsByClassName("reflector")[0].classList.add("active");
            document.getElementsByClassName("wallet")[0].classList.add("active");
            break;

          case (ecosystemComponentClassName === "applications"):
            document.getElementsByClassName("chainquery")[0].classList.add("active");
            document.getElementsByClassName("lighthouse")[0].classList.add("active");
            break;

          default:
            break;
        }
      },
      close () {
        document.querySelectorAll(".ecosystem__module").forEach(n => n.classList.remove("active"));
        document.querySelectorAll(".ecosystem__submodule").forEach(n => n.classList.remove("active"));

        /*
        switch (true) {
          case (ecosystemComponentClassName === "lbrycrd"):
            document.getElementsByClassName(ecosystemComponentClassName)[0].classList.remove("active");
            break;

          case (ecosystemComponentClassName === "lbry"):
            document.getElementsByClassName(ecosystemComponentClassName)[0].classList.remove("active");
            break;

          case (ecosystemComponentClassName === "applications"):
            document.getElementsByClassName(ecosystemComponentClassName)[0].classList.remove("active");
            break;

          default:
            break;
        }
        */
      }
    }
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

    border: 2px dashed;
    border-radius: 50%;
    cursor: default;

    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }

    &:not(.active) {
      border-color: rgba($gray, 0.3);
      color: rgba($gray, 0.3);
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
