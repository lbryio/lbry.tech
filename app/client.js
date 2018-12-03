"use strict";



//  I M P O R T S

import async from "choo-async";
import asyncHtml from "choo-async/html";
import choo from "choo";
import ssr from "choo-ssr";

//  U T I L S

import head from "./components/head";
import wrapper from "./components/wrapper";



//  P R O G R A M

function main() {
  const app = async(choo());

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
  app.route("/api/*", page(require("./views/api")));
  app.route("/*", page(require("./views/redirect")));

  app.mount("html");

  return app;
}

if (typeof window !== "undefined") main();



//  E X P O R T

module.exports = exports = main;



//  H E L P E R

function shell(head, body) {
  return (state, emit) => {
    const bodyPromise = Promise.resolve(body(state, emit));
    const headPromise = bodyPromise.then(() => head(state, emit)); // resolve `head` once `body` is resolved

    return asyncHtml`
      <!DOCTYPE html>
      <html lang="en">
        ${headPromise}
        ${bodyPromise}
      </html>
    `;
  };
}
