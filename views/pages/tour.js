"use strict";



//  P A C K A G E

// const dedent = require("dedent");
const fs = require("graceful-fs");
const html = require("choo-async/html");
const raw = require("nanohtml/raw");



//  E X P O R T

module.exports = exports = () => async () => html`
  <div class="hook" id="hook">
    <nav class="hook__navigation" id="hook-navigation">
      <div class="inner-wrap"> <!--/ TODO: Save tutorial position to localStorage /-->
        <a href="#" class="hook__navigation__step" data-action="go to step 1">
          <span class="number">1</span>
          Resolve a claim
        </a>

        <a href="#" class="hook__navigation__step" data-action="go to step 2">
          <span class="number">2</span>
          Publish content
        </a>

        <a href="#" class="hook__navigation__step" data-action="go to step 3">
          <span class="number">3</span>
          Support with LBC
        </a>
      </div>
    </nav>

    ${step1()}
    ${step2()}
    ${step3()}
  </div>

  <script>${raw(fs.readFileSync("./views/partials/tour-scripts.js", "utf-8"))}</script>
`;



function step1() {
  /**
    Step 1 loading steps:
    - exampleCode !== ""
      <pre><code class="bash"><span v-html="highlight('bash', exampleCode)"></span></code></pre>

    - isLoading
      <div class="loader"></div>

    - jsonData
      <p style="text-align: center;">Success! Here is the response for <strong>lbry://{{ address }}</strong>:</p>
      <pre><code class="json"><span v-html="highlight('json', jsonData)"></span></code></pre>
      <a href="#" class="__button-black" data-action="go to step 2" title="Proceed to step two">Go to next step</a>

    - TODO:
      [✓] Create message for error
      [ ] Scroll to top of page when selecting a claim
  */

  return html`
    <section class="hook__page" id="step1-page">
      <header class="hook__page__hero">
        <div class="inner-wrap">
          <h1>Learn the LBRY protocol by examples</h1>
          <p>Let's start by getting the associated metadata for a claim.</p>

          <div class="hook__page__hero__claim">
            <span>lbry://</span><input id="fetch-claim-uri" type="text" placeholder="&thinsp;Claim URI goes here"/>
            <button data-action="fetch metadata" class="button" title="Execute claim" type="button">Execute</button>
          </div>
        </div>
      </header>

      <div class="hook__page__content inner-wrap" id="step1-placeholder"></div>

      <div class="hook__page__content inner-wrap" id="step1-selections">
        <p style="text-align: center;">&hellip;or select a live example from below</p>

        <div class="hook__page__content__card">
          <img src="https://spee.ch/0654f2e2322ccfefa02a956d252df9ac7611d8b0/placeholder-itsadisaster.jpeg" data-action="choose claim" data-claim-id="itsadisaster">

          <div data-action="choose claim" data-claim-id="itsadisaster">
            <h4>It's a Disaster</h4>
            <p class="account">Anonymous</p>
          </div>
        </div>

        <div class="hook__page__content__card">
          <img src="https://spee.ch/b1bd330e048fc22dc7bf941c33dd8245eef492c1/unbubbled.png" data-action="choose claim" data-claim-id="unbubbled1-1">

          <div data-action="choose claim" data-claim-id="unbubbled1-1">
            <h4>Unbubbled with Jamie King, Ep1.1 &mdash; Bitcoin, Boom or Bust</h4>
            <p class="account">@Unbubbled</p>
          </div>
        </div>

        <div class="hook__page__content__card">
          <img src="https://spee.ch/9880947df41af880bc19724ceddd1cce957a07e2/placeholder-fortninte.jpeg" data-action="choose claim" data-claim-id="fortnite-top-stream-moments-nickatnyte">

          <div data-action="choose claim" data-claim-id="fortnite-top-stream-moments-nickatnyte">
            <h4>FORTNITE TOP STREAM MOMENTS &mdash; Nickatnyte &amp; GamingwithMolt</h4>
            <p class="account">@nickatnyte</p>
          </div>
        </div>

        <div class="hook__page__content__card">
          <img src="https://spee.ch/a3b8258478ad88954f42f6ac3427eab380720f60/placeholder-lbrymine.png" data-action="choose claim" data-claim-id="six">

          <div data-action="choose claim" data-claim-id="six">
            <h4>LBRY Coin (LBC) GPU Miner for AMD and NVIDIA</h4>
            <p class="account">Anonymous</p>
          </div>
        </div>
      </div>
    </section>
  `;
}



function step2() {
  /**
    Step 2 loading steps:
    ...
  */

  const images = [
    {
      src: "../carlsagan2.jpg",
      alt: "Carl Sagan"
    },
    {
      src: "../doge-meme.jpg",
      alt: "Doge"
    },
    {
      src: "../lbry-green.png",
      alt: "LBRY Logo With Green Background"
    }
  ];

  const renderedImages = [];

  for (const image of images) {
    renderedImages.push(`<img src="${image.src}" class="hook__page__content__meme__thumbnail" alt="${image.alt}"/>`);
  }

  return html`
    <section class="hook__page" id="step2-page" style="display: none;"> <!--/ v-images-loaded="imagesLoaded" /-->
      <header class="hook__page__hero">
        <div class="inner-wrap">
          <h1>Publish your content on the blockchain</h1>
          <p>Upload an image to the blockchain and you are able to view it on the <a href="http://explorer.lbry.io" title="LBRY Blockchain Explorer" target="_blank" rel="noopener noreferrer">LBRY Blockchain Explorer</a>.</p>
        </div>
      </header>

      <div class="hook__page__content inner-wrap">
        <template v-if="!isLoading">
          <div class="hook__page__content__meme left">
            <img v-bind:src="backgroundImage" id="base-image" style="height: 0; visibility: hidden;" alt="Base image for LBRY meme creator"/>
            <canvas id="meme-canvas" width="400" height="300">Sorry, canvas is not supported</canvas>

            <!--/ <img v-for="image in images" v-bind:src="image.src" v-on:click="chooseImage(image.src)" class="hook__page__content__meme__thumbnail" v-bind:class="{'selected': backgroundImage === image.src}" v-bind:alt="image.alt"/> /-->
            ${renderedImages}
          </div>

          <form class="hook__page__content__meme right"> <!--/ v-on:submit.prevent="submit" /-->
            <h2>Image Text</h2>

            <fieldset>
              <label for="meme-top-line">Top line</label>
              <input name="meme-top-line" id="meme-top-line" type="text" placeholder="Top line" required/> <!--/ v-model="topLine" /-->
            </fieldset>

            <fieldset>
              <label for="meme-bottom-line">Bottom line</label>
              <input name="meme-bottom-line" id="meme-bottom-line" type="text" placeholder="Bottom line" required/> <!--/ v-model="bottomLine" /-->
            </fieldset>

            <h2 class="__metadata">Metadata</h2>

            <fieldset>
              <label for="meme-title">Title</label>
              <input name="meme-title" id="meme-title" type="text" placeholder="Title" required/> <!--/ v-model="title" /-->
            </fieldset>

            <fieldset>
              <label for="meme-description">Description</label>
              <textarea name="meme-description" id="meme-description" type="text" placeholder="Description" spellcheck="false" required>{{ description }}</textarea> <!--/ v-model="description" /-->
            </fieldset>

            <fieldset>
              <label for="meme-language">Language</label>
              <select name="meme-language" id="meme-language"> <!--/ v-model="language" /-->
                <option value="ar">Arabic</option>
                <option value="zh">Chinese (Mandarin)</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="jp">Japanese</option>
                <option value="ru">Russian</option>
                <option value="es">Spanish</option>
                <option value="">Not specified</option>
              </select>
            </fieldset>

            <fieldset>
              <label for="meme-license">License</label>
              <select name="meme-license" id="meme-license" required> <!--/ v-model="license" /-->
                <option value="Public Domain">Public Domain</option>
                <option value="Creative Commons Attribution 4.0 International">Creative Commons Attribution 4.0 International</option>
                <option value="Creative Commons Attribution-ShareAlike 4.0 International">Creative Commons Attribution-ShareAlike 4.0 International</option>
                <option value="Creative Commons Attribution-NoDerivatives 4.0 International">Creative Commons Attribution-NoDerivatives 4.0 International</option>
                <option value="Creative Commons Attribution-NonCommercial 4.0 International">Creative Commons Attribution-NonCommercial 4.0 International</option>
                <option value="Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</option>
                <option value="Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International</option>
                <option value="None">None</option>
              </select>
            </fieldset>

            <fieldset>
              <label><input type="checkbox" name="nsfw"/>NSFW</label> <!--/ v-model="nsfw" /-->
            </fieldset>

            <fieldset>
              <input type="submit" class="__button-black" value="Submit"/>
            </fieldset>
          </form>
        </template>

        <pre v-if="exampleCode !== ''" style="clear: both;"><code class="bash"><span v-html="highlight('bash', exampleCode)"></span></code></pre>

        <div class="loader" v-if="isLoading"></div>

        <div v-if="jsonData">
          <p style="text-align: center;">Success!<br/>
            <a class="__button-black" v-bind:href="'http://explorer.lbry.io/tx/'+txid">See the transaction on explorer.lbry.io</a>
          </p>
          <p style="text-align: center;">Here is the raw response:</p>
          <pre><code class="json"><span v-html="highlight('json', jsonData)"></span></code></pre>
        </div>
      </div>
    </section>
  `;
}



function step3() {
  //
}
