"use strict";



//  I M P O R T

import html from "choo/html";



//  E X P O R T

export default () => {
  if (
    !process.env.GITHUB_APP_ID ||
    !process.env.GITHUB_APP_SECRET ||
    !process.env.REWARD_URL
  ) {
    return html`
      <developer-program>
        <p><strong>Environment variables required to enable functionality are missing.</strong></p>
      </developer-program>
    `;
  }

  return html`
    <developer-program>
      <button class="button" id="get-started">Claim Developer LBC</button>
      <small class="meta">This will authenticate you with GitHub to prove eligibility as well as mark you as a follower of LBRY.</small>
    </developer-program>
  `;
};
