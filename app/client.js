"use strict";



//  P A C K A G E S

import choo from "choo";
import html from "choo/html";
import devtools from "choo-devtools";
import ssr from "choo-ssr";

//  V A R I A B L E S

import head from "./components/head";
import wrapper from "./components/wrapper";



//  P R O G R A M

function main() {
  const app = choo();
  if (process.env.NODE_ENV !== "production") app.use(devtools());

  const page = view => (
    shell(
      ssr.head(
        head,
        ssr.state()
      ),
      ssr.body(wrapper(view))
    )
  );

  app.use(ssr());

  app.route("/", page(require("./views/home")));
  app.route("/api", page(require("./views/api")));
  app.route("/api/*", page(require("./views/api")));
  app.route("/*", page(require("./views/redirect")));

  return app;
}

if (typeof window !== "undefined") {
  const app = main();
  app.mount("html");
}



//  E X P O R T

module.exports = exports = main;



//  H E L P E R

function shell (head, body) {
  return (state, emit) => {
    const bodyRender = body(state, emit);
    const headRender = head(state, emit);

    return html`
      <!DOCTYPE html>
      <html lang="en">
        ${headRender}
        ${bodyRender}
      </html>
    `;
  };
}
