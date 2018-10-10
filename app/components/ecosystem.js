"use strict";



//  P A C K A G E

const local = require("app-root-path").require;

//  U T I L S

const applications = local("/app/components/ecosystem/module-applications");
const chainquery = local("/app/components/ecosystem/submodule-chainquery");
const lbry = local("/app/components/ecosystem/module-lbry");
const lbrycrd = local("/app/components/ecosystem/module-lbrycrd");
const lighthouse = local("/app/components/ecosystem/submodule-lighthouse");
const reflector = local("/app/components/ecosystem/submodule-reflector");
const wallet = local("/app/components/ecosystem/submodule-wallet");



//  E X P O R T

export default () => {
  return `
    <section class="ecosystem">
      <aside class="ecosystem__submodules">
        ${chainquery()}
        ${wallet()}
      </aside>

      <section class="ecosystem__modules">
        ${lbrycrd()}
        ${lbry()}
        ${applications()}
      </section>

      <aside class="ecosystem__submodules">
        ${lighthouse()}
        ${reflector()}
      </aside>
    </section>
  `;
};
