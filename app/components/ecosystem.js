"use strict";



//  P A C K A G E

import Component from "choo/component";

//  V A R I A B L E S

const APPLICATIONS = require("./ecosystem/module-applications");
const CHAINQUERY = require("./ecosystem/submodule-chainquery");
const LBRY = require("./ecosystem/module-lbry");
const LBRYCRD = require("./ecosystem/module-lbrycrd");
const LIGHTHOUSE = require("./ecosystem/submodule-lighthouse");
const REFLECTOR = require("./ecosystem/submodule-reflector");
const WALLET = require("./ecosystem/submodule-wallet");



//  P R O G R A M

Ecosystem.prototype = Object.create(Component.prototype);

Ecosystem.prototype.createElement = () => {
  return `
    <section class="ecosystem">
      <aside class="ecosystem__submodules">
        ${CHAINQUERY()}
        ${WALLET()}
      </aside>

      <section class="ecosystem__modules">
        ${LBRYCRD()}
        ${LBRY()}
        ${APPLICATIONS()}
      </section>

      <aside class="ecosystem__submodules">
        ${LIGHTHOUSE()}
        ${REFLECTOR()}
      </aside>
    </section>
  `;
};



//  E X P O R T

module.exports = exports = Ecosystem;



//  H E L P E R S

function Ecosystem() {
  if (!(this instanceof Ecosystem)) return new Ecosystem();
  Component.call(this);
}
