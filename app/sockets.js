"use strict";



//  P A C K A G E S

const html = require("choo/html");
const local = require("app-root-path").require;
const request = require("request-promise-native");

//  V A R I A B L E S

const fetchMetadata = local("app/helpers/fetch-metadata");
const { generateGitHubFeed } = local("app/helpers/github");
const logSlackError = local("app/helpers/slack");



//  P R O G R A M

module.exports = exports = (socket, action) => {
  if (typeof socket !== "object" && typeof action !== "object") return;

  switch(true) {
    case (action.message === "fetch metadata"):
      fetchMetadata(action, socket);
      break;

    case (action.message === "landed on homepage"):
      generateGitHubFeed(result => {
        socket.send(JSON.stringify({
          html: result,
          message: "updated html",
          selector: "#github-feed"
        }));
      });
      break;

    case (action.message === "landed on playground"):
      generateContent(1, result => {
        socket.send(JSON.stringify({
          html: result,
          message: "updated html",
          selector: "#playground-loader"
        }));
      });
      break;

    case (action.message === "request for playground, example 1"):
      generateContent(1, result => {
        socket.send(JSON.stringify({
          html: result,
          message: "updated html",
          selector: "#playground-loader"
        }));
      });
      break;

    case (action.message === "request for playground, example 2"):
      generateMemeCreator(socket);
      break;

    case (action.message === "request for playground, example 3"):
      generateContent(3, result => {
        socket.send(JSON.stringify({
          html: result,
          message: "updated html",
          selector: "#playground-loader"
        }));
      });
      break;

    case (action.message === "subscribe"):
      newsletterSubscribe(action, socket);
      break;

    default:
      console.log(action); // eslint-disable-line
      break;
  }
};



//  H E L P E R S

function generateContent(exampleNumber, displayTrendingContent) {
  if (exampleNumber === 1) {
    return getTrendingContent().then(response => {
      if (!response || !response.success || response.success !== true || !response.data) return "";

      const rawContentCollection = [];
      const renderedContentCollection = [];
      const trendingContentData = response.data;

      for (const data of trendingContentData) {
        rawContentCollection.push(fetchMetadata({ claim: data.url, method: "resolve", example: exampleNumber }));
      }

      Promise.all(rawContentCollection).then(collection => {
        for (const part of collection) {
          try {
            renderedContentCollection.push(`
              <figure class="playground__content__trend">
                <img alt="${part.name}" data-action="choose claim" data-claim-id="${part.name}" src="${makeImageSourceSecure(part.value.stream.metadata.thumbnail)}"/>

                <figcaption data-action="choose claim" data-claim-id="${part.name}">
                  ${part.value.stream.metadata.title}
                  <span>${part.channel_name}</span>
                </figcaption>
              </figure>
            `);
          } catch (err) {
            return; // TODO: Return nice error message
          }
        }

        renderedContentCollection.push(`
          <script>
            document.getElementById("playground-example-description").innerHTML = document.querySelector("[data-action='playground, example 1']").dataset.description
          </script>
        `);

        displayTrendingContent(renderedContentCollection.join(""));
      });
    });
  }

  if (exampleNumber === 3) {
    const approvedUrls = [
      "LBRY#3db81c073f82fd1bb670c65f526faea3b8546720",
      "correlation-can-imply-causation#173412f5b1b7aa63a752e8832406aafd9f1ecb4e",
      "thanos-is-the-protagonist-how-infinity#2a7f5db2678177435b1dee6c9e38e035ead450b6",
      "epic-arcade-mode-duos-nickatnyte-molt#d81bac6d49b1f92e58c37a5f633a27a45b43405e",
      "political-correctness-a-force-for-good-a#b4668c0bd096317b44c40738c099b6618095e75f",
      "10-secrets-hidden-inside-famous-logos#007789cc45cbb4255cf02ba77cbf84ca8e3d7561",
      "ever-wonder-how-bitcoin-and-other#1ac47b8b3def40a25850dc726a09ce23d09e7009",
      "bankrupt-pan-am#784b3c215a6f06b663fc1aa292bcb19f29c489bb",
      "minecraft-in-real-life-iron-man#758dd6497cdfc401ae1f25984738d024d47b50af",
      "ethan-shows-kyle-warframe-skyvault#8a7401b88d5ed0376d98f16808194d4dcb05b284"
    ];

    const rawContentCollection = [];
    const renderedContentCollection = [];

    for (const url of approvedUrls)
      rawContentCollection.push(fetchMetadata({ claim: url, method: "resolve", example: exampleNumber }));

    return Promise.all(rawContentCollection).then(collection => {
      for (const part of collection) {
        if (
          part &&
          part.value &&
          part.value.stream.metadata.thumbnail &&
          part.channel_name
        ) {
          renderedContentCollection.push(`
            <figure class="playground__content__trend">
              <img alt="${part.name}" data-action="choose claim" data-claim-id="${part.claim_id}" src="${makeImageSourceSecure(part.value.stream.metadata.thumbnail)}"/>
              <figcaption data-action="choose claim" data-claim-id="${part.claim_id}">
                ${part.value.stream.metadata.title}
                <span>${part.channel_name}</span>
              </figcaption>
            </figure>
          `);
        }
      }

      renderedContentCollection.push(`
        <script>
          document.getElementById("playground-example-description").innerHTML = document.querySelector("[data-action='playground, example 3']").dataset.description
        </script>
      `);

      displayTrendingContent(renderedContentCollection.join(""));
    });
  }
}

function generateMemeCreator(socket) {
  const images = [
    {
      alt: "Carl Sagan",
      // src: "https://spee.ch/4f6b953e605a602434246743fd246d3e1fd4f5fd/carlsagan2.jpg"
      src: "/assets/media/images/carlsagan2.jpg"
    },
    {
      alt: "Doge",
      // src: "https://spee.ch/2f90f2d91441a4d33d3d4eb82bdfc4c56ec742c7/doge-meme.jpg"
      src: "/assets/media/images/doge-meme.jpg"
    },
    {
      alt: "LBRY Logo With Green Background",
      // src: "https://spee.ch/40ac6818bbac87a208722bf4467653341d460908/lbry-green.png"
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

  for (const image of images)
    renderedImages.push(`<img alt="${image.alt}" class="playground__content__meme__canvas__thumbnail" src="${image.src}"/>`);

  const memeCreator = html`
    <div class="playground__content__meme__canvas">
      <img alt="Base image for LBRY meme creator" id="base-image" style="height: 0; position: absolute; visibility: hidden;"/>
      <canvas id="meme-canvas" height="600" width="800">Unfortunately, it looks like canvas is <strong>not supported</strong> in your browser</canvas>

      ${renderedImages}
    </div>

    <form class="playground__content__meme__editor">
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
        <button data-action="upload image" class="button" type="button">Submit</button>
      </fieldset>
    </form>
  `;

  return socket.send(JSON.stringify({
    example: 2,
    html: memeCreator,
    message: "updated html",
    selector: "#playground-loader"
  }));
}

function getTrendingContent() {
  return new Promise((resolve, reject) => { // eslint-disable-line
    request({
      method: "GET",
      url: "https://api.lbry.io/file/list_trending"
    }, (error, response, body) => {
      if (error || !JSON.parse(body)) resolve("Issue fetching content"); // error
      body = JSON.parse(body);
      resolve(body);
    });
  });
}

function makeImageSourceSecure(url) {
  const originalUrl = new URL(url);

  if (originalUrl.protocol !== "https")
    return `https://${originalUrl.host}${originalUrl.pathname}`;

  return originalUrl.href;
}

function newsletterSubscribe(data, socket) {
  const email = data.email;

  if (!validateEmail(email)) return socket.send(JSON.stringify({
    html: "Your email is invalid",
    message: "updated html",
    selector: "#emailMessage"
  }));

  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: `https://api.lbry.io/list/subscribe?email=${email}&tag=developer`
    }).then(body => {
      if (!body || !JSON.parse(body)) {
        logSlackError(
          "\n" +
          "> *NEWSLETTER ERROR:* ```¯\\_(ツ)_/¯ This should be an unreachable error```" + "\n" +
          `> _Cause: ${email} interacted with the form_\n`
        );

        return resolve(socket.send(JSON.stringify({
          html: "Something is terribly wrong",
          message: "updated html",
          selector: "#emailMessage"
        })));
      }

      body = JSON.parse(body);

      if (!body.success) {
        logSlackError(
          "\n" +
          "> *NEWSLETTER ERROR:* ```" + JSON.parse(JSON.stringify(body.error)) + "```" + "\n" +
          `> _Cause: ${email} interacted with the form_\n`
        );

        return reject(socket.send(JSON.stringify({
          html: body.error,
          message: "updated html",
          selector: "#emailMessage"
        })));
      }

      return resolve(socket.send(JSON.stringify({
        html: "Thank you! Please confirm subscription in your inbox.",
        message: "updated html",
        selector: "#emailMessage"
      })));
    })
      .catch(welp => {
        if (welp.statusCode === 409) {
          logSlackError(
            "\n" +
          "> *NEWSLETTER ERROR:* ```" + JSON.parse(JSON.stringify(welp.error)) + "```" + "\n" +
          `> _Cause: ${email} interacted with the form_\n`
          );

          return resolve(socket.send(JSON.stringify({
            html: "You have already subscribed!",
            message: "updated html",
            selector: "#emailMessage"
          })));
        }
      });
  });
}

function validateEmail(email) {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;

  return emailRegex.test(String(email));
}
