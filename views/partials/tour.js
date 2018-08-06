// https://api.lbry.io/file/list_homepage
// https://api.lbry.io/file/list_trending

"use strict";



//  P A C K A G E S

const dedent = require("dedent");
const html = require("choo-async/html");
const raw = require("nanohtml/raw");



//  E X P O R T

module.exports = exports = () => html`
  <section class="tour">
    <ul class="tour__sidebar">
      ${raw(sidebar())}
    </ul>

    <section class="tour__content">
      ${raw(content())}
    </section>
  </section>
`;



function sidebar() { // TODO: Save tutorial position to localStorage // "active" class is added dynamically
  return dedent`
    <li class="tour__sidebar__step active">
      <button data-action="tour, step 1" data-step="1" type="button">Resolve a claim</button>
      <span>Get details of media (aka, "claim" metadata)</span>
    </li>

    <li class="tour__sidebar__step">
      <button data-action="tour, step 2" data-step="2" type="button">Publish content</button>
      <span>Create a meme and upload it to the LBRY blockchain</span>
    </li>

    <li class="tour__sidebar__step">
      <button data-action="tour, step 3" data-step="3" type="button">Support with LBC</button>
      <span>Support creators on LBRY with a tip, on us!</span>
    </li>
  `;
}

function content() {
  return html`
    <p>Some content here</p>
  `;
}
