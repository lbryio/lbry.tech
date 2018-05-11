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
            <img src="https://spee.ch/40ac6818bbac87a208722bf4467653341d460908/lbry-green.png" id="base-image" alt=""/>
            <canvas id="meme-canvas" width="400" height="300">Sorry, canvas not supported</canvas>

            <div class="hook__page__content__meme__uploader">
              Upload an image
              <image-uploader
                :quality="0.8"
                :autoRotate=true
                :maxWidth="400"
                outputFormat="string"
                :preview=false
                @input="setImage"
                @onComplete="imageUploaded"
              ></image-uploader>
            </div>
          </div>

          <form class="hook__page__content__meme right">
            <fieldset>
              <label for="meme-top-line">Top line</label>
              <input name="meme-top-line" id="meme-top-line" type="text" v-model="topLine" placeholder="Top line" required/>
            </fieldset>

            <fieldset>
              <label for="meme-bottom-line">Bottom line</label>
              <input name="meme-bottom-line" id="meme-bottom-line" type="text" v-model="bottomLine" placeholder="Bottom line" required/>
            </fieldset>

            <fieldset>
              <label for="meme-title">Title</label>
              <input name="meme-title" id="meme-title" type="text" v-model="title" placeholder="Title" required/>
            </fieldset>

            <fieldset>
              <label for="meme-description">Description</label>
              <input name="meme-description" id="meme-description" type="text" v-model="description" placeholder="Description" required/>
            </fieldset>

            <fieldset>
              <label for="meme-author">Author</label>
              <input name="meme-author" id="meme-author" type="text" v-model="author" placeholder="Author" required/>
            </fieldset>

            <fieldset>
              <label for="meme-language">Language</label>
              <input name="meme-language" id="meme-language" type="text" v-model="language" placeholder="Language" required/>
            </fieldset>

            <fieldset>
              <label for="meme-license">License</label>
              <input name="meme-license" id="meme-license" type="text" v-model="license" placeholder="License" required/>
            </fieldset>

            <fieldset>
              <label><input type="checkbox" v-model="nsfw" name="nsfw"/>NSFW</label>
            </fieldset>

            <fieldset>
              <input type="submit" class="__button-black" v-on:click="submit" value="Submit"/>
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
import { ImageUploader } from 'vue-image-upload-resize'

import EventBus from '../event-bus';

export default {
  directives: {
    imagesLoaded
  },
  components: {
    ImageUploader
  },
  data () {
    return {
      valid: false,
      isLoading: false,
      topLine: 'This is an example meme',
      bottomLine: 'that I made',
      title: '',
      description: '',
      author: '',
      language: 'EN',
      license: 'Public Domain',
      nsfw: false,
      backgroundImage: '',
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
      ctx.font = 'bold 28px Coda';
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      ctx.strokeText(this.topLine.toUpperCase(), canvasWidth / 2, 20);
      ctx.fillText(this.topLine.toUpperCase(), canvasWidth / 2, 20);

      ctx.strokeText(this.bottomLine.toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
      ctx.fillText(this.bottomLine.toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
    },
    submit () {
      // TODO: Do the upload
      EventBus.$emit('HookFileUploaded', 'txhashhere');
    },
    imagesLoaded (instance) {
      var component = this;
      // Make sure the font is loaded
      document.fonts.load('bold 28px Coda').then(function() {
        component.updateCanvas();
      });
    },
    setImage (file) {
      var component = this;
      document.getElementById('base-image').src = file;
      // allow one second to load the image
      setTimeout(component.updateCanvas, 1000);
    },
    imageUploaded () {
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
