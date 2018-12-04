"use strict";



//  I M P O R T S

import dedent from "dedent";
import html from "choo/html";
import raw from "choo/html/raw";



//  E X P O R T

export default () => dedent`
  <section class="playground">
    <ul class="playground-navigation">
      ${raw(navigation())}
    </ul>
    <p class="playground__description" id="playground-example-description"></p>
    <section class="playground-content">${raw(example1())}</section>
  </section>
`;



//  H E L P E R S

function example1() {
  return html`
    <div class="playground-content__urlbar" id="playground-url">
      <span>lbry://</span><input id="fetch-claim-uri" placeholder="&thinsp;Enter a LBRY address or select a video below" type="text"/>
      <button class="button" data-action="execute claim" type="button">Resolve</button>
    </div>

    <div class="playground-content__trends" id="playground-loader"></div>
    <div id="playground-results"></div>

    <script>
      document.getElementById("playground-example-description").textContent = document.querySelector("[data-action='playground, example 1']").dataset.description
    </script>
  `;
}

function navigation() { // TODO: Save tutorial position to localStorage
  return dedent`
    <li
      class="playground-navigation__example"
      data-action="playground, example 1"
      data-description="In this example, you can see what runs under the hood when selecting content to view in the LBRY app."
      data-example="1"
      data-success="<strong>Success</strong> You resolved a claim, which is a <em>fancy</em> way of saying you searched for a piece of content and got back all the metadata associated with it (if it exists)."
    >
      <button type="button">Resolve</button>
      <span>Get details of media (aka, "claim" metadata)</span>
    </li>

    <li
      class="playground-navigation__example"
      data-action="playground, example 2"
      data-description="Sometimes you want to create content, not just consume it. In this example, you can create a meme and upload it to LBRY!"
      data-example="2"
      data-success="<strong>Meme-a-riffic</strong> You've just contributed to the growing expanse that is the meme industry. Where will your meme go next? YOU DECIDE!"
    >
      <button type="button">Publish</button>
      <span>Create a meme and upload it to the LBRY blockchain</span>
    </li>

    <li
      class="playground-navigation__example"
      data-action="playground, example 3"
      data-description="In the LBRY app, you can financially support your favorite creators by donating LBRY Coin (LBC). In this example, we are donating LBC in your stead."
      data-example="3"
      data-success="<strong>Kudos</strong> You've just supported a creator with LBC (or, LBRY credits) with our own stash of LBC (you'd use your own IRL). You're basically saying, 'thanks for this great content, please continue!' and that's awesome. You're awesome."
    >
      <button type="button">Support</button>
      <span>Support creators on LBRY with a tip, on us!</span>
    </li>
  `;
}
