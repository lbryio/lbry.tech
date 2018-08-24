"use strict";



//  P A C K A G E S

const async = require("choo-async");
const bundles = require("choo-bundles");
const choo = require("choo");
const data = require("choo-data");
const devtools = require("choo-devtools");
const ssr = require("choo-ssr");

//  V A R I A B L E S

const head = require("./views/partials/head");
const html = require("./views/components/html");
const layout = require("./views/components/layout");



//  P R O G R A M

function main() {
  const app = async(choo());

  app.use(ssr());
  app.use(data());
  app.use(bundles());

  if (process.env.NODE_ENV !== "production") app.use(devtools());

  const page = content => (html(
    ssr.head(
      head(),
      bundles.assets()
    ),
    ssr.body(
      async.catch(
        layout(content),
        require("./views/pages/error")(app)
      ),
      ssr.state()
    )
  ));

  app.route("/", page(require("./views/pages/home")(app)));
  app.route("/api", page(require("./views/pages/api")(app)));
  app.route("/api/*", page(require("./views/pages/api")(app)));
  app.route("/*", page(require("./views/pages/page")(app)));

  return app;
}

if (typeof window !== "undefined") {
  const app = main();
  app.mount("html");
}



//  E X P O R T

module.exports = exports = main;
