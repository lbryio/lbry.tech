"use strict";



module.exports = exports = {
  github: {
    repo: "lbryio/lbry.tech",
    docsBranch: "master/content",
    editLinkText: "Edit this page on GitHub"
  },
  ga: "UA-60403362-1",
  markdown: {
    config: md => md.use(require("markdown-it-wikilinks")({
      makeAllLinksAbsolute: true,
      baseURL: "/glossary.html#",
      uriSuffix: "",
      htmlAttributes: {
        class: "wikilink"
      }
    }))
  }
};
