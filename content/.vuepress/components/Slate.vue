<template>
  <div class="__slate">
    <aside class="api__toc">
      <div class="api__toc__search">
        <input type="search" class="api__toc__search__field" id="input-search" placeholder="Search"/>
        <div class="api__toc__search__clear" id="clear-search" title="Clear search query">&times;</div>
        <ul class="api__toc__search__results"></ul>
      </div>

      <div id="toc" class="api__toc__items" role="navigation"></div>
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
          scrollTo: 84,
          selectors: "h2",
          showEffectSpeed: 0,
          smoothScroll: true,
          smoothScrollSpeed: 0,
          theme: "none"
        }).data("toc-tocify");
      },

      populateSearchIndex: function () {
        const component = this;

        $(".api__content__body h2").each(function () {
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
        this.content = $(".api__content");
        this.searchResults = $(".api__toc__search__results");

        $("#input-search").on("keyup", this.search);
      },

      search: function (event) {
        const component = this;
        const searchCancel = $("#clear-search");
        const searchElement = $("#input-search");

        component.unhighlight();
        component.searchResults.addClass("active");

        // ESC clears the field
        if (event.keyCode === 27) {
          searchCancel.removeClass("active");
          searchElement.val("");
        }

        searchCancel.on("click", function () {
          component.unhighlight();
          component.searchResults.removeClass("active");
          searchCancel.removeClass("active");
          searchElement.val("");
        });

        if (searchElement.val()) {
          const results = component.searchIndex.search(searchElement.val()).filter(r => r.score > 0.0001);
          searchCancel.addClass("active");

          if (results.length) {
            component.searchResults.empty();

            $.each(results, function (index, result) {
              const elem = document.getElementById(result.ref);
              component.searchResults.append(`<li><a href="#${result.ref}" title="Visit the '${$(elem).text()}' section in our documentation">${$(elem).text()}</a></li>`);
            });

            component.highlight(this);
          } else {
            component.searchResults.html(`<li style="padding: 0.25rem 0.5rem 0.25rem 0.75rem;">No results found for <code>${searchElement.val()}</code></li>`);
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

    created: function () {
      this.$http.get(this.markdownFile).then(function (response) {
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

  .__slate {
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
  }

  .api__toc__search {
    position: relative;
  }

  .api__toc__search__field {
    border-bottom: 1px solid rgba($gray, 0.3);
    font-size: 1rem;
    line-height: 2rem;
    padding: 0.25rem calc(2rem + 4px) 0.25rem 0.5rem;
    width: 100%;
  }

  .api__toc__search__clear {
    width: 1.25rem; height: 1.25rem;
    top: 0.6rem; right: 0.75rem;

    background-color: $black;
    border-radius: 50%;
    color: $white;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1.3;
    position: absolute;
    text-align: center;
    transition: opacity 0.2s;

    &:not(.active) {
      opacity: 0;
      visibility: hidden;
    }

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }



  .api__toc__search__results,
  .api__toc__items {
    font-size: 0.8rem;
    line-height: 1.33;
  }

  .api__toc__search__results {
    list-style-type: none;

    &:not(.active) {
      display: none;
    }

    &.active {
      background-color: rgba($gray, 0.3);
      border-bottom: 1px solid rgba($gray, 0.3);
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }

    a {
      display: block;
      padding: 0.25rem 0.5rem 0.25rem 0.75rem;

      &:hover {
        background-color: rgba($gray, 0.3);
      }
    }
  }

  .api__toc__items {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;

    ul {
      list-style-type: none;

      &:hover {
        background-color: rgba($gray, 0.3);
      }

      li {
        padding: 0.25rem 0.5rem 0.25rem 0.75rem;
      }
    }
  }

  .tocify-focus {
    background-color: rgba($gray, 0.3);
  }



  .api__content {
    display: grid;
    float: right;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    width: calc(100% - 200px);

    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    h3 {
      font-size: 1.15rem;
      margin-bottom: 0.25rem;
    }

    p, ol, ul {
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    ol, ul {
      padding-left: 1rem;
    }

    table {
      border: 1px solid rgba($white, 0.1);
      border-radius: 0.3rem;
      border-spacing: 0;
      font-size: 0.8rem;
      line-height: 1.33;
      width: 100%;
    }

    thead {
      display: none;
    }

    th, td {
      padding: 0.5rem 1rem 0.5rem 0.5rem;
    }

    th {
      border-bottom: 1px solid rgba($white, 0.1);
    }

    tr:nth-child(even) {
      background-color: rgba($white, 0.1);
    }
  }

  .api__content__body,
  .api__content__example {
    padding: 2rem;
  }

  .api__content__body {
    border-bottom: 1px solid rgba($gray, 0.3);
  }

  .api__content__example {
    background-color: mix($gray, $black, 10%);
    border-bottom: 1px solid rgba($white, 0.1);
    color: $white;

    pre {
      margin-bottom: 1rem; padding: 1rem;

      background-color: $black;
      border-radius: 0.3rem;
      line-height: 1.33;
      overflow-x: auto;
      overflow-y: hidden;
    }
  }
</style>
