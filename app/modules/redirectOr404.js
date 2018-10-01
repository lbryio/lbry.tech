/*
this is fucking awful
 */

import Page404 from "../views/404.js";
import redirects from "../data/redirects.json";

export default (path) => {
  const redirectUrl = redirects[path];
  if (redirectUrl) {
    throw "fix this please, needs to redirect to:" + redirectUrl;
  } else {
    return Page404();
  }
};
