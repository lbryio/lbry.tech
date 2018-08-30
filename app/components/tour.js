"use strict";



//  P A C K A G E S

import dedent from "dedent";
import html from "choo/html";
import raw from "choo/html/raw";



//  E X P O R T

export default function () {
  return dedent`
    <section class="tour">
      <ul class="tour__sidebar">
        ${raw(sidebar())}
      </ul>
      <section class="tour__content">${raw(example1())}</section>
    </section>
  `;
}



//  H E L P E R S

function example1() {
  return html`
    <div class="tour__content__urlbar" id="tour-url">
      <span>lbry://</span><input id="fetch-claim-uri" placeholder="&thinsp;Enter a LBRY address or select an example below" type="text"/>
      <button class="button" data-action="execute claim" type="button">Resolve</button>
    </div>

    <div class="tour__content__trends" id="tour-loader"></div>
    <div id="tour-results"></div>
  `;
}

function sidebar() { // TODO: Save tutorial position to localStorage
  return dedent`
    <li class="tour__sidebar__example" data-action="tour, example 1" data-example="1">
      <button type="button">Resolve a claim</button>
      <span>Get details of media (aka, "claim" metadata)</span><br/>
      <span>In this example, you can see what runs under the hood when selecting content to view in the LBRY app.</span>
    </li>

    <li class="tour__sidebar__example" data-action="tour, example 2" data-example="2">
      <button type="button">Publish content</button>
      <span>Create a meme and upload it to the LBRY blockchain</span><br/>
      <span>Sometimes you want to create content, not just consume it. In this example, you can create a meme and upload it to LBRY!</span>
    </li>

    <li class="tour__sidebar__example" data-action="tour, example 3" data-example="3">
      <button type="button">Support with LBC</button>
      <span>Support creators on LBRY with a tip, on us!</span><br/>
      <span>In the LBRY app, you can financially support your favorite creators by donating LBRY Coin (LBC). In this example, we are donating LBC in your stead.</span>
    </li>
  `;
}
