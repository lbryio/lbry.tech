"use strict";



//  P A C K A G E

const fs = require("graceful-fs");
const html = require("choo-async/html");
const raw = require("nanohtml/raw");



//  E X P O R T

module.exports = exports = () => async () => html`
  <div class="hook" id="hook">
    <nav class="hook__navigation" id="hook-navigation">
      <div class="inner-wrap"> <!--/ TODO: Save tutorial position to localStorage /-->
        <button class="hook__navigation__step" data-action="tour, step 1" type="button">
          <span class="number">1</span>
          Resolve a claim
        </button>

        <button class="hook__navigation__step" data-action="tour, step 2" type="button">
          <span class="number">2</span>
          Publish content
        </button>

        <button class="hook__navigation__step" data-action="tour, step 3" type="button">
          <span class="number">3</span>
          Support with LBC
        </button>
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
            <span>lbry://</span><input id="fetch-claim-uri" placeholder="&thinsp;Claim URI goes here" type="text"/>
            <button class="button" data-action="execute claim" type="button">Execute</button>
          </div>
        </div>
      </header>

      <div class="hook__page__content inner-wrap" id="step1-placeholder"></div>

      <div class="hook__page__content inner-wrap" id="step1-selections">
        <p style="text-align: center;">&hellip;or select a live example from below</p>

        <div class="hook__page__content__card">
          <img data-action="choose claim" data-claim-id="itsadisaster" src="https://spee.ch/0654f2e2322ccfefa02a956d252df9ac7611d8b0/placeholder-itsadisaster.jpeg">

          <div data-action="choose claim" data-claim-id="itsadisaster">
            <h4>It's a Disaster</h4>
            <p class="account">Anonymous</p>
          </div>
        </div>

        <div class="hook__page__content__card">
          <img data-action="choose claim" data-claim-id="unbubbled1-1" src="https://spee.ch/b1bd330e048fc22dc7bf941c33dd8245eef492c1/unbubbled.png">

          <div data-action="choose claim" data-claim-id="unbubbled1-1">
            <h4>Unbubbled with Jamie King, Ep1.1 &mdash; Bitcoin, Boom or Bust</h4>
            <p class="account">@Unbubbled</p>
          </div>
        </div>

        <div class="hook__page__content__card">
          <img data-action="choose claim" data-claim-id="fortnite-top-stream-moments-nickatnyte" src="https://spee.ch/9880947df41af880bc19724ceddd1cce957a07e2/placeholder-fortninte.jpeg">

          <div data-action="choose claim" data-claim-id="fortnite-top-stream-moments-nickatnyte">
            <h4>FORTNITE TOP STREAM MOMENTS &mdash; Nickatnyte &amp; GamingwithMolt</h4>
            <p class="account">@nickatnyte</p>
          </div>
        </div>

        <div class="hook__page__content__card">
          <img data-action="choose claim" data-claim-id="six" src="https://spee.ch/a3b8258478ad88954f42f6ac3427eab380720f60/placeholder-lbrymine.png">

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
    - exampleCode !== ''
      <pre style="clear: both;"><code class="bash"><span v-html="highlight('bash', exampleCode)"></span></code></pre>

    - isLoading
      <div class="loader"></div>

    - jsonData
      <p style="text-align: center;">Success!<br/>
        <a class="__button-black" v-bind:href="'http://explorer.lbry.io/tx/'+txid">See the transaction on explorer.lbry.io</a>
      </p>

      <p style="text-align: center;">Here is the raw response:</p>
      <pre><code class="json"><span v-html="highlight('json', jsonData)"></span></code></pre>

    Meme submission process:
    - `PUT` request to `http://daemon.lbry.tech/images.php`:
      - headers: "Content-Type": "text/plain"
      - qs: access_token: process.env.LBRY_DAEMON_ACCESS_TOKEN
      - body: document.getElementById("meme-canvas").toDataURL("image/jpeg", 0.6)
      - response should be parsed as JSON
      - //
      - socket emit "fetch metadata":
        - bid: 0.001, // hard-coded on the back-end
        - description: component.description,
        - file_path: uploadResponse.body.filename,
        - language: component.language,
        - license: component.license,
        - method: "publish",
        - name: component.title,
        - nsfw: component.nsfw,
        - title: component.title
        - socket emit error from back-end if any field is missing

    Process after submitting meme:
    - isLoading appears
    - exampleCode and jsonData replace `#step2-placeholder` contents
    - next button should exist

    Issues:
    - image isn't uploaded to spee.ch
    - response is blank
    - response should have link to upload on Blockchain Explorer
    - NSFW flag should work
  */

  const images = [
    {
      alt: "Carl Sagan",
      src: "/assets/media/images/carlsagan2.jpg"
    },
    {
      alt: "Doge",
      src: "/assets/media/images/doge-meme.jpg"
    },
    {
      alt: "LBRY Logo With Green Background",
      src: "/assets/media/images/lbry-green.png"
    }
  ];

  const memePlaceholderData = {
    bottomLine: {
      placeholder: "Top line",
      value: "that I made"
    },
    description: {
      placeholder: "Description",
      value: "Check out this image I published to LBRY via lbry.tech"
    },
    topLine: {
      placeholder: "Top line",
      value: "This is an example meme"
    },
    title: {
      placeholder: "Title",
      value: "Dank Meme Supreme da Cheese"
    }
  };

  const renderedImages = [];

  for (const image of images) {
    renderedImages.push(`<img alt="${image.alt}" class="hook__page__content__meme__thumbnail" src="${image.src}"/>`);
  }

  return html`
    <section class="hook__page" id="step2-page" style="display: none;">
      <header class="hook__page__hero">
        <div class="inner-wrap">
          <h1>Publish your content on the blockchain</h1>
          <p>Upload an image to the blockchain and you are able to view it on the <a href="http://explorer.lbry.io" rel="noopener noreferrer" target="_blank" title="LBRY Blockchain Explorer">LBRY Blockchain Explorer</a>.</p>
        </div>
      </header>

      <div class="hook__page__content inner-wrap">
        <div class="hook__page__content__meme left">
          <img alt="Base image for LBRY meme creator" id="base-image" style="height: 0; visibility: hidden;"/>
          <canvas id="meme-canvas" height="300" width="400">Unfortunately, it looks like canvas is <strong>not supported</strong> in your browser</canvas>

          ${renderedImages}
        </div>

        <form class="hook__page__content__meme right">
          <h2>Image Text</h2>

          <fieldset>
            <label for="meme-top-line">Top line</label>
            <input id="meme-top-line" name="meme-top-line" placeholder="${memePlaceholderData.topLine.placeholder}" spellcheck="false" type="text" value="${memePlaceholderData.topLine.value}" required/>
          </fieldset>

          <fieldset>
            <label for="meme-bottom-line">Bottom line</label>
            <input id="meme-bottom-line" name="meme-bottom-line" placeholder="${memePlaceholderData.bottomLine.placeholder}" spellcheck="false" type="text" value="${memePlaceholderData.bottomLine.value}" required/>
          </fieldset>

          <h2 class="__metadata">Metadata</h2>

          <fieldset>
            <label for="meme-title">Title</label>
            <input id="meme-title" name="meme-title" placeholder="${memePlaceholderData.title.placeholder}" spellcheck="false" type="text" value="${memePlaceholderData.title.value}" required/>
          </fieldset>

          <fieldset>
            <label for="meme-description">Description</label>
            <textarea id="meme-description" name="meme-description" placeholder="${memePlaceholderData.description.placeholder}" spellcheck="false" type="text" required>${memePlaceholderData.description.value}</textarea>
          </fieldset>

          <fieldset>
            <label for="meme-language">Language</label>
            <select id="meme-language" name="meme-language">
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
            <select id="meme-license" name="meme-license" required>
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
            <label><input id="meme-nsfw-flag" name="nsfw" type="checkbox"/>NSFW</label>
          </fieldset>

          <fieldset>
            <button data-action="upload image" class="__button-black" type="button">Submit</button>
          </fieldset>
        </form>
      </div>

      <div class="hook__page__content inner-wrap" id="step2-placeholder"></div>
    </section>
  `;
}



function step3() {
  //
}
