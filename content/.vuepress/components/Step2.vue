<template>
  <section class="hook__page" id="step2-page">

    <div v-images-loaded="imagesLoaded">
      <header class="hook__page__hero">
        <div class="inner-wrap">
          <h1>Publish your content on the blockchain</h1>
          <p>Upload an image to the blockchain and you are able to view it on the <a href="http://explorer.lbry.io" title="LBRY Blockchain Explorer" target="_blank">LBRY Blockchain Explorer</a>.</p>
        </div>
      </header>

      <aside class="hook__page__content">
        <div class="inner-wrap">

          <div class="hook__page__content__meme left">
            <img v-bind:src="backgroundImage" id="base-image" alt="" />
            <canvas id="meme-canvas" width="400" height="300">Sorry, canvas not supported</canvas>

            <img v-for="image in images" v-bind:src="image.src" v-on:click="chooseImage(image.src)" class="thumbnail" v-bind:class="{'selected': backgroundImage == image.src}" v-bind:alt="image.alt">

          </div>

          <form class="hook__page__content__meme right" v-on:submit.prevent="submit">

            <h2>Image Text</h2>

            <fieldset>
              <label for="meme-top-line">Top line</label>
              <input name="meme-top-line" id="meme-top-line" type="text" v-model="topLine" placeholder="Top line" required/>
            </fieldset>

            <fieldset>
              <label for="meme-bottom-line">Bottom line</label>
              <input name="meme-bottom-line" id="meme-bottom-line" type="text" v-model="bottomLine" placeholder="Bottom line" required/>
            </fieldset>

            <h2 class="metadata">Metadata</h2>

            <fieldset>
              <label for="meme-title">Title</label>
              <input name="meme-title" id="meme-title" type="text" v-model="title" placeholder="Title" required/>
            </fieldset>

            <fieldset>
              <label for="meme-description">Description</label>
              <textarea name="meme-description" id="meme-description" type="text" v-model="description" placeholder="Description" required>{{ description}}</textarea>
            </fieldset>

            <fieldset>
              <label for="meme-language">Language</label>
              <select name="meme-language" id="meme-language" v-model="language">
                <option value="EN">English</option>
                <option value="FR">French</option>
                <option value="ES">Spanish</option>
                <option value="DE">German</option>
                <option value="IT">Italian</option>
                <option value="ZH">Chinese (Mandarin)</option>
                <option value="AR">Arabic</option>
                <option value="RU">Russian</option>
                <option value="JP">Japanese</option>
                <option value="">Not specified</option>
              </select>
            </fieldset>

            <fieldset>
              <label for="meme-license">License</label>
              <select name="meme-license" id="meme-license" v-model="license" required>
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
              <label><input type="checkbox" v-model="nsfw" name="nsfw"/>NSFW</label>
            </fieldset>

            <fieldset>
              <input type="submit" class="__button-black" value="Submit"/>
            </fieldset>
          </form>

          <div class="xs12" v-if="isLoading">
            <div class="loader"></div>
          </div>

        </div>
      </aside>
    </div>

  </section>
</template>

<script>
import imagesLoaded from 'vue-images-loaded'

import EventBus from '../event-bus';

export default {
  directives: {
    imagesLoaded
  },

  data () {
    var images = [
      {
        src: './carlsagan2.jpg',
        alt: 'Carl Sagan'
      },
      {
        src: './doge-meme.jpg',
        alt: 'Doge'
      },
      {
        src: 'lbry-green.png',
        alt: 'LBRY Logo With Green Background'
      }
    ];
    return {
      valid: false,
      isLoading: false,
      topLine: 'This is an example meme',
      bottomLine: 'that I made',
      title: '',
      description: 'Check out this image I published to LBRY via lbry.tech',
      author: '',
      language: 'EN',
      license: 'Public Domain',
      nsfw: false,
      images: images,
      backgroundImage: images[0].src,
      textFieldRules: [
        v => !!v || 'Field is required'
      ],
    }
  },
  methods: {
    updateCanvas () {
      var canvasWidth = 400;
      var canvasHeight = 300;
      var canvas = document.getElementById('meme-canvas');
      var ctx = canvas.getContext('2d');
      var img = document.getElementById('base-image');

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

      ctx.lineWidth = 4;
      ctx.font = 'bold 28px Karla';
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      ctx.lineJoin = 'round';

      ctx.strokeText(this.topLine.toUpperCase(), canvasWidth / 2, 20);
      ctx.fillText(this.topLine.toUpperCase(), canvasWidth / 2, 20);

      ctx.strokeText(this.bottomLine.toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
      ctx.fillText(this.bottomLine.toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
    },
    submit () {
      var component = this;
      component.isLoading = true;
      var canvas = document.getElementById('meme-canvas');
      component.$http.post('https:/lbry.tech/upload-image', document.getElementById('meme-canvas').toDataURL('image/png')).then(function(response) {
        component.isLoading = false;
        console.log(response);
      });

      //EventBus.$emit('HookFileUploaded', 'txhashhere');

    },
    imagesLoaded (instance) {
      var component = this;
      // Make sure the font is loaded
      document.fonts.load('bold 28px Karla').then(function() {
        component.updateCanvas();
      });
    },
    chooseImage (src) {
      var component = this;
      component.backgroundImage = src;
      component.updateCanvas();
    },
    setImage (file) {
      var component = this;
      document.getElementById('base-image').src = file;
      // allow one second to load the image
      setTimeout(component.updateCanvas, 1000);
    }
  },
  created () {
  },
  watch: {
    topLine () {
      this.updateCanvas();
    },
    bottomLine () {
      this.updateCanvas();
    }
  },
  name: 'Step2'
};
</script>
