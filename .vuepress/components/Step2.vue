<template>
  <v-container fluid id="step2-page">
    <v-layout row wrap v-images-loaded="imagesLoaded">
      <v-flex xs12>
        <h1 class="display-2">Publish your content on the blockchain</h1>
        <p class="subheading">Upload an image to the blockchain and you are able to view it on the <a href='http://explorer.lbry.io' target='_blank'>LBRY Blockchain Explorer</a>.</p>
      </v-flex>
      <v-flex xs12 sm8>
        <img src="https://spee.ch/40ac6818bbac87a208722bf4467653341d460908/lbry-green.png" id="base-image">
        <canvas id="meme-canvas" width="400" height="300">
          Sorry, canvas not supported
        </canvas>
        <v-flex xs12 sm6 class="mx-auto">
          <v-card class="pa-3">
            <p class="subheading">Upload a background image</p>
            <image-uploader
              :quality="0.8"
              :autoRotate=true
              :maxWidth="400"
              outputFormat="string"
              :preview=false
              @input="setImage"
              @onComplete="imageUploaded"
            ></image-uploader>
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex xs12 sm4>
        <v-card class="pa-3">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="topLine" dark solo :rules="textFieldRules" required></v-text-field>
            <v-text-field v-model="bottomLine" dark solo :rules="textFieldRules" required></v-text-field>
            <v-text-field v-model="title" label="Title" :rules="textFieldRules" required></v-text-field>
            <v-text-field v-model="description" label="Description" :rules="textFieldRules" required></v-text-field>
            <v-text-field v-model="author" label="Author" :rules="textFieldRules" required></v-text-field>
            <v-text-field v-model="language" label="Language" :rules="textFieldRules" required></v-text-field>
            <v-text-field v-model="license" label="License" :rules="textFieldRules" required></v-text-field>
            <v-checkbox label="NSFW" v-model="nsfw"></v-checkbox>
            <v-btn v-on:click="submit" :disabled="!valid">Submit</v-btn>
          </v-form>
        </v-card>
      </v-flex>
      <v-flex xs12 v-if="isLoading">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
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
      EventBus.$emit('file-uploaded', 'txhashhere');
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
}
</script>

<style lang="scss">

@import '../scss/variables';

#step2-page {
  #meme-canvas {
    width: 400px;
    height: 300px;
  }
  #base-image {
    left: -10000px;
    top: -10000px;
    position: absolute;
  }
  .input-group--text-field {
    margin-bottom: 0.5rem;
  }
  #fileInput {
    width: 100%;
  }
}


</style>
