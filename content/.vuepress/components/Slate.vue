<template>
  <div class="slate">
    <!--/
    <a href="#" id="nav-button">
      <span>
        NAV
        <img src="slate-navbar.png">
      </span>
    </a>
    /-->

    <aside class="api__toc">
      <!--/ <img src="slate-logo.png"/> /-->

      <div class="api__toc__search">
        <input type="search" class="search" id="input-search" placeholder="Search"/>
        <ul class="api__toc__search__results"></ul>
      </div>

      <div id="toc" class="api__toc__items" role="navigation"></div>

      <!--/
      <ul class="toc-footer">
        <li>Some footer content here</li>
      </ul>
      /-->
    </aside>

    <section class="api__content" v-html="htmlContent"></section>
  </div>
</template>

<script>
  window.$ = window.jQuery = require("jquery");

  require("jquery-ui");
  require("jquery.tocify");
  require("../js/jquery.highlight");

  const lunr = require("lunr");

  const md = require("markdown-it")()
    .use(require("markdown-it-anchor"), {
      level: 1
    })
    .use(require("markdown-it-container"), "api__content__body")
    .use(require("markdown-it-container"), "api__content__example");

  export default {
    data () {
      return {
        content: {},
        htmlContent: "",
        searchIndex: {},
        searchResults: {},
        toc: {}
      }
    },

    props: ["markdownFile"],

    methods: {
      makeToc: function () {
        this.toc = $("#toc").tocify({
          extendPage: false,
          hashGenerator: (text, element) => element.prop("id"),
          hideEffectSpeed: 180,
          highlightOffset: 60,
          ignoreSelector: ".toc-ignore",
          scrollHistory: false,
          scrollTo: -1,
          selectors: "h2",
          showEffectSpeed: 0,
          smoothScroll: false,
          theme: "none"
        }).data("toc-tocify");

        $("#nav-button").click(() => {
          $(".api__toc").toggleClass("active");
          $("#nav-button").toggleClass("active");

          return false;
        });

        $(".api__content").click(this.closeToc);
        $(".tocify-item").click(this.closeToc);
      },

      closeToc: () => {
        $(".api__toc").removeClass("open");
        $("#nav-button").removeClass("open");
      },

      populateSearchIndex: function () {
        const component = this;

        $(".slate .content h2").each(function () {
          const title = $(this);
          const body = title.nextUntil("h2");

          component.searchIndex.add({
            body: body.text(),
            id: title.prop("id"),
            title: title.text()
          });
        });
      },

      bindSearchIndex: function () {
        this.content = $(".slate .content");
        this.searchResults = $(".api__toc__search__results");

        $("#input-search").on("keyup", this.search);
      },

      search: function (event) {
        const component = this;
        const searchElement = $("#input-search");

        component.unhighlight();
        component.searchResults.addClass("active");

        // ESC clears the field
        if (event.keyCode === 27) searchElement.val("");

        if (searchElement.val()) {
          const results = component.searchIndex.search(searchElement.val()).filter(r => r.score > 0.0001);

          if (results.length) {
            component.searchResults.empty();

            $.each(results, function (index, result) {
              const elem = document.getElementById(result.ref);
              component.searchResults.append(`<li><a href="#" ${result.ref}>${$(elem).text()}</a></li>`);
            });

            component.highlight(this);
          } else {
            component.searchResults.html("<li></li>");
            $(".api__toc__search__results li").text(`No Results Found for "${searchElement.val()}"`);
          }
        } else {
          component.unhighlight();
          component.searchResults.removeClass("active");
        }
      },

      highlight: function (element) {
        if (element.value) this.content.highlight(element.value, { element: "span", className: "search-highlight" });
      },

      unhighlight: function () {
        this.content.unhighlight({ element: "span", className: "search-highlight" });
      }
    },

    mounted: function () {
      this.$http.get("/api.md").then(function (response) {
        this.htmlContent = md.render(response.body);

        this.$nextTick(function () {
          this.makeToc();

          this.searchIndex = new lunr.Index();

          this.searchIndex.ref("id");
          this.searchIndex.field("title", { boost: 10 });
          this.searchIndex.field("body");
          this.searchIndex.pipeline.add(lunr.trimmer, lunr.stopWordFilter);

          this.populateSearchIndex();
          this.bindSearchIndex();
        });
      }).catch(error => {
        console.log("Source Markdown file, not found:", error);
      });
    },

    name: "Slate"
  };
</script>

<style lang="scss">
  @import "../../../node_modules/highlight.js/styles/monokai-sublime";
  @import "../scss/init/colors";
  @import "../scss/init/mixins";

  // @import "../scss/partials/slate_variables";
  // @import "../scss/partials/slate_icons";
  // @import "../scss/partials/slate_style";

  .slate {
    width: 100%; height: 100%;
    position: relative;

    &::after {
      @include clearfix;
    }
  }

  .api__toc {
    width: 200px; height: calc(100vh - 4rem); // navigation is 4rem tall
    top: 4rem; left: 0; bottom: 0;

    background-color: $white;
    border-right: 1px solid rgba($gray, 0.3);
    float: left;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    z-index: 3;

    &:not(.active) {
    }

    &.active {
    }
  }

  .api__toc__search__results {
    &:not(.active) {
    }

    &.active {
    }
  }



  .api__content {
    display: grid;
    float: right;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    width: calc(100% - 200px);
  }

  .api__content__body,
  .api__content__example {
    padding: 2rem;
  }

  .api__content__body {
    border-bottom: 1px solid rgba($gray, 0.3);
  }

  .api__content__example {
    background-color: $black;
    border-bottom: 1px solid rgba($white, 0.1);
    color: $white;
  }
</style>
