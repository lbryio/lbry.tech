<template>

  <section class="overview__ecosystem">
    <div class="overview__ecosystem__module lbrycard" v-on:click="open('lbrycard')">
      <h2 class="__title">lbrycard</h2>

      <div class="overview__ecosystem__module__details">
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit semper luctus praesent phasellus egestas lectus, placerat feugiat arcu dis fermentum maecenas in augue mus quisque euismod justo. Posuere senectus fermentum luctus iaculis nascetur congue enim, semper gravida egestas facilisis mus sociosqu dui metus, est augue mollis phasellus quis leo. Montes hendrerit potenti cubilia feugiat dictum vitae tellus, habitant cursus dignissim et leo morbi, aliquet proin bibendum vivamus per mattis.</p>

        <p>Vel nisi hendrerit id tristique congue tortor nisl luctus, vulputate sem ridiculus inceptos et at torquent feugiat, mus cursus lobortis aenean senectus posuere odio. Imperdiet nascetur dapibus eget convallis ante donec iaculis dictumst mi est, venenatis quisque integer etiam justo id aliquet non diam semper erat, blandit quis lectus ac aptent magna cubilia augue laoreet. Mollis luctus pharetra nisl auctor potenti magna penatibus cras, justo lobortis iaculis porta a vel habitasse vulputate, taciti sociis arcu facilisis duis orci aliquam.</p>
      </div>
    </div>

    <div class="overview__ecosystem__module lbry" v-on:click="open('lbry')">
      <h2 class="__title">lbry</h2>

      <div class="overview__ecosystem__module__details">
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
    </div>

    <div class="overview__ecosystem__module applications" v-on:click="open('applications')">
      <h2 class="__title">Applications</h2>

      <div class="overview__ecosystem__module__details">
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
    </div>
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
        document.querySelectorAll(".overview__ecosystem__module").forEach(n => n.classList.remove("active"));
        document.getElementsByClassName(ecosystemComponentClassName)[0].classList.add("active");
      }
    },
    name: "Something"
  }
</script>

<style lang="scss">
  @import "../scss/init/colors";
  @import "../scss/init/mixins";
  @import "../scss/pages/overview";
</style>
