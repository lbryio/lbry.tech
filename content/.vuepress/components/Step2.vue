<template>
  <section class="hook__page" id="step2-page" v-images-loaded="imagesLoaded">
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

          <img v-for="image in images" v-bind:src="image.src" v-on:click="chooseImage(image.src)" class="hook__page__content__meme__thumbnail" v-bind:class="{'selected': backgroundImage === image.src}" v-bind:alt="image.alt"/>
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



          <h2 class="__metadata">Metadata</h2>

          <fieldset>
            <label for="meme-title">Title</label>
            <input name="meme-title" id="meme-title" type="text" v-model="title" placeholder="Title" required/>
          </fieldset>

          <fieldset>
            <label for="meme-description">Description</label>
            <textarea name="meme-description" id="meme-description" type="text" v-model="description" placeholder="Description" spellcheck="false" required>{{ description }}</textarea>
          </fieldset>

          <fieldset>
            <label for="meme-language">Language</label>
            <select name="meme-language" id="meme-language" v-model="language">
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
</template>

<script>
  import hljs from "highlight.js";
  import imagesLoaded from "vue-images-loaded";

  export default {
    directives: {
      imagesLoaded
    },

    data () {
      const images = [
        {
          src: "./carlsagan2.jpg",
          alt: "Carl Sagan"
        },
        {
          src: "./doge-meme.jpg",
          alt: "Doge"
        },
        {
          src: "lbry-green.png",
          alt: "LBRY Logo With Green Background"
        }
      ];

      return {
        backgroundImage: images[0].src,
        bottomLine: "that I made",
        description: "Check out this image I published to LBRY via lbry.tech",
        exampleCode: "",
        images: images,
        isLoading: false,
        jsonData: "",
        language: "en",
        license: "Public Domain",
        loadingMessage: "",
        nsfw: false,
        textFieldRules: [
          v => !!v || "Field is required"
        ],
        title: "",
        topLine: "This is an example meme",
        valid: false,
        txid: ""
      }
    },

    mounted () {
      hljs.configure({
        languages: ["bash", "json"]
      });
    },

    methods: {
      updateCanvas () {
        const canvas = document.getElementById("meme-canvas");
        const canvasWidth = 400;
        const canvasHeight = 300;
        const ctx = canvas.getContext("2d");
        const img = document.getElementById("base-image");

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "white";
        ctx.font = "bold 28px Karla";
        ctx.lineJoin = "round";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.strokeText(this.topLine.toUpperCase(), canvasWidth / 2, 20);
        ctx.strokeText(this.bottomLine.toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
        ctx.fillText(this.topLine.toUpperCase(), canvasWidth / 2, 20);
        ctx.fillText(this.bottomLine.toUpperCase(), canvasWidth / 2, (canvasHeight - 40));
      },

      submit () {
        let component = this;
        component.isLoading = true;

        component.exampleCode = `
# Example code using the daemon
curl "http://localhost:5279" --data "{ 'method': 'publish', 'params': { 'name': '${component.title}', 'bid': 0.001, 'file_path': '/path/to/your/file.jpg', 'title': '${component.title}', 'description': '${component.description}', 'language': '${component.language}', 'license': '${component.license}', 'nsfw': '${component.nsfw}' } }"
        `;

        component.$http.post("https://lbry.tech/upload-image", document.getElementById("meme-canvas").toDataURL("image/jpeg", 0.6), {
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(uploadResponse => {

          if (uploadResponse.body.status === "error") {
            component.isLoading = false;
            component.exampleCode = "";
            return;
          }

          component.$http.post("https://lbry.tech/forward", {
            bid: 0.001,
            description: component.description,
            file_path: uploadResponse.body.filename,
            language: component.language,
            license: component.license,
            method: "publish",
            name: component.title,
            nsfw: component.nsfw,
            title: component.title
          }).then(response => {
            component.isLoading = false;
            component.jsonData = JSON.stringify(response.body, null, "  ");
            component.txid = response.body.result.txid;
          }).catch(error => {
            component.isLoading = false;
            component.jsonData = JSON.stringify(error, null, "  ");
            console.log("Forwarding uploaded image failed:\n", error);
          });
        }).catch(uploadError => {
          component.isLoading = false;
          component.jsonData = JSON.stringify(uploadError, null, "  ");
          console.log("Image upload failed:\n", uploadError);
        });
      },

      imagesLoaded (instance) {
        const component = this;
        document.fonts.load("bold 28px Karla").then(() => component.updateCanvas()); // Make sure the font is loaded
      },

      chooseImage (src) {
        const component = this;
        component.backgroundImage = src;
        component.updateCanvas();
      },

      setImage (file) {
        const component = this;
        document.getElementById("base-image").src = file;

        // allow one second to load the image
        setTimeout(component.updateCanvas, 1000);
      },

      highlight (language, text) {
        return hljs.highlight(language, text).value;
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

    name: "Step2"
  };
</script>
