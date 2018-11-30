"use strict";



//  U T I L S

import {
  applications,
  chainquery,
  lbry,
  lbrycrd,
  lighthouse,
  reflector,
  wallet
} from "./ecosystem";



//  E X P O R T

export default () => `
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
