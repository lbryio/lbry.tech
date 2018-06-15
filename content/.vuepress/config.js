// .vuepress/config.js
module.exports = {
  base: '/',
  title: 'LBRY.tech',
  head: [
    ['meta', {name: 'viewport', content: 'initial-scale=1, viewport-fit=cover'}],
    ['link', {rel: 'mask-icon', href: '/favicon.svg', color: '#222'}]
  ],
  themeConfig: {
    repo: 'lbryio/lbry.tech',
    docsBranch: 'master',
    editLinkText: 'Edit this page on Github'
  },
  ga: 'UA-60403362-1',
  markdown: {
    config: md => {
      var wikilinks = require('markdown-it-wikilinks')({
        makeAllLinksAbsolute: true,
        baseURL: '/glossary.html#',
        uriSuffix: '',
        htmlAttributes: {
          class: 'wikilink'
        }
      });
      md.use(wikilinks);
    }
  }
}
