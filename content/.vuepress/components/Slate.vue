<template>

  <div class="slate">
    <a href="#" id="nav-button">
      <span>
        NAV
        <img src="slate-navbar.png">
      </span>
    </a>
    <div class="tocify-wrapper">
      <img src="slate-logo.png">
      <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
      </div>
      <ul class="search-results"></ul>
      <div id="toc">
      </div>
        <ul class="toc-footer">
          <li>Some footer content here</li>
        </ul>
    </div>
    <div class="page-wrapper">
      <div class="content" v-html="htmlContent"></div>
      <div class="dark-box">
      </div>
    </div>
  </div>

</template>

<script>

window.$ = window.jQuery = require('jquery');

require('jquery-ui');

require('jquery.tocify');

require('../js/jquery.highlight');

var lunr = require('lunr');

var md = require('markdown-it')()
  .use(require('markdown-it-anchor'), {
    level: 1
  });

export default {
  data: function() {
    return {
      toc: {},
      searchIndex: {},
      content: {},
      searchResults: {},
      htmlContent: ''
    };
  },
  props: ['markdownFile'],
  methods: {
    makeToc: function() {

      this.toc = $("#toc").tocify({
        selectors: 'h2',
        extendPage: false,
        theme: 'none',
        smoothScroll: false,
        showEffectSpeed: 0,
        hideEffectSpeed: 180,
        ignoreSelector: '.toc-ignore',
        highlightOffset: 60,
        scrollTo: -1,
        scrollHistory: false,
        hashGenerator: function (text, element) {
          return element.prop('id');
        }
      }).data('toc-tocify');

      $("#nav-button").click(function() {
        $(".tocify-wrapper").toggleClass('open');
        $("#nav-button").toggleClass('open');
        return false;
      });

      $(".page-wrapper").click(this.closeToc);
      $(".tocify-item").click(this.closeToc);

    },
    closeToc: function() {

      $(".tocify-wrapper").removeClass('open');
      $("#nav-button").removeClass('open');

    },
    populateSearchIndex: function() {

      var component = this;

      $('.slate .content h2').each(function() {
        var title = $(this);
        var body = title.nextUntil('h2');
        component.searchIndex.add({
          id: title.prop('id'),
          title: title.text(),
          body: body.text()
        });
      });

    },
    bindSearchIndex: function() {

      this.content = $('.slate .content');
      this.searchResults = $('.slate .search-results');   

      $('#input-search').on('keyup', this.search);

    },
    search: function(event) {

      var component = this;

      component.unhighlight();
      component.searchResults.addClass('visible');

      var searchElement = $("#input-search");

      // ESC clears the field
      if (event.keyCode === 27) searchElement.val('');

      if (searchElement.val()) {
        var results = component.searchIndex.search(searchElement.val()).filter(function(r) {
          return r.score > 0.0001;
        });

        if (results.length) {
          component.searchResults.empty();
          $.each(results, function (index, result) {
            var elem = document.getElementById(result.ref);
            component.searchResults.append("<li><a href='#" + result.ref + "'>" + $(elem).text() + "</a></li>");
          });
          component.highlight(this);
        } else {
          component.searchResults.html('<li></li>');
          $('.search-results li').text('No Results Found for "' + searchElement.val() + '"');
        }
      } else {
        component.unhighlight();
        component.searchResults.removeClass('visible');
      }
    },
    highlight: function(element) {
      if (element.value) this.content.highlight(element.value, { element: 'span', className: 'search-highlight' });
    },
    unhighlight: function() {
      this.content.unhighlight({ element: 'span', className: 'search-highlight' });
    }
  },
  mounted: function() {

    this.$http.get(this.markdownFile).then(response => {

        this.htmlContent = md.render(response.body);

        this.$nextTick(function() {

            this.makeToc();

            this.searchIndex = new lunr.Index();

            this.searchIndex.ref('id');
            this.searchIndex.field('title', { boost: 10 });
            this.searchIndex.field('body');
            this.searchIndex.pipeline.add(lunr.trimmer, lunr.stopWordFilter);

            this.populateSearchIndex();

            this.bindSearchIndex();

        });

    });

  },
  name: 'Slate'
};
</script>

<style lang="scss">
  
  @import "../../../node_modules/highlight.js/styles/monokai-sublime";
  @import "../scss/partials/slate_variables";
  @import "../scss/partials/slate_icons";
  @import "../scss/partials/slate_style";

</style>