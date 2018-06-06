import VueMultiAnalytics from 'vue-multianalytics'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  
  Vue.use(VueMultiAnalytics, {
    modules: {
      ga: {
        appName: "LBRY.tech",
        appVersion: "1.0",
        trackingId: "UA-60403362-1"
      },
      facebook: {
        token: "1618717031725766"
      }
    },
    routing: {
      vueRouter: router
    }
  });

}