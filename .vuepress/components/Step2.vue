<template>
  <div id="step2-page">
    <div v-images-loaded="imagesLoaded">
      <div class="xs12">
        <h1>Publish your content on the blockchain</h1>
        <p>Upload an image to the blockchain and you are able to view it on the <a href='http://explorer.lbry.io' target='_blank'>LBRY Blockchain Explorer</a>.</p>
      </div>
      <div class="xs12 sm8">
        <img src="https://spee.ch/40ac6818bbac87a208722bf4467653341d460908/lbry-green.png" id="base-image">
        <canvas id="meme-canvas" width="400" height="300">
          Sorry, canvas not supported
        </canvas>
        <div class="xs12 sm6">
          <div class="image-upload-container">
            <p>Upload a background image</p>
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
      </div>
      <div class="xs12 sm4">
        <div class="form-container">
          <form>
            <input type="text" v-model="topLine" placeholder="Top line" required />
            <input type="text" v-model="bottomLine" placeholder="Bottom line" required />
            <input type="text" v-model="title" placeholder="Title" required />
            <input type="text" v-model="description" placeholder="Description" required />
            <input type="text" v-model="author" placeholder="Author" required />
            <input type="text" v-model="language" placeholder="Language" required />
            <input type="text" v-model="license" placeholder="License" required />
            <label><input type="checkbox" v-model="nsfw" name="nsfw" />NSFW</label>
            <input type="submit" class="__button-black" v-on:click="submit" value="Submit" />
          </form>
        </div>
      </div>
      <div class="clear"></div>
      <div class="xs12" v-if="isLoading">
        <div class="loader"></div>
      </div>
    </div>
  </div>
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

<style lang="scss">

#step2-page {
  .sm8 {
    float: left;
    width: 66%;
  }
  .sm4 {
    float: right;
    width: 30%;
  }
  #meme-canvas {
    width: 400px;
    height: 300px;
  }
  #base-image {
    left: -10000px;
    top: -10000px;
    position: absolute;
  }
  .image-upload-container {
    background: white;
    width: 80%;
    padding: 1rem;
    margin: 1rem auto;
    p {
      color: black;
      text-shadow: none;
    }
  }
  .form-container {
    input {
      margin-bottom: 0.5rem;
      display: block;
      width: 80%;
      &[type='checkbox'] {
        margin: 0;
        width: 1rem;
        height: 1rem;
        display: inline-block;
        -moz-appearance: checkbox;
        -webkit-appearance: checkbox;
      }
    }
    label {
      text-align: left;
      display: block;
      line-height: 2rem;
    }
  }
  #fileInput {
    width: 100%;
  }
}


</style>
