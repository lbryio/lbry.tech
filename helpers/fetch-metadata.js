"use strict";



//  P A C K A G E S

const html = require("choo-async/html");
const local = require("app-root-path").require;
const request = require("request-promise-native");
const stringifyObject = require("stringify-object");

//  V A R I A B L E S

const logSlackError = local("/helpers/slack");
const uploadImage = local("/helpers/upload-image");



//  E X P O R T

module.exports = exports = (data, socket) => {
  let dataDetails = "";

  if (data.step === 1 && !data.claim || !data.method) return;
  if (data.step === 2 && !data.data) return;
  if (data.step === 2) dataDetails = data.data; // file upload

  const claimAddress = data.claim;
  const resolveMethod = data.method;

  /*
  const allowedClaims = [
    "fortnite-top-stream-moments-nickatnyte",
    "hellolbry",
    "itsadisaster",
    "six",
    "unbubbled1-1"
  ];
  */

  const allowedMethods = [
    "publish",
    "resolve",
    "wallet_send"
  ];

  if (allowedMethods.indexOf(resolveMethod) < 0) return socket.send(JSON.stringify({
    "details": "Unallowed resolve method for tutorial",
    "message": "notification",
    "type": "error"
  }));

  /*
  if (data.step === 1 && allowedClaims.indexOf(claimAddress) < 0) return socket.send(JSON.stringify({
    "details": "Invalid claim ID for tutorial",
    "message": "notification",
    "type": "error"
  }));
  */

  const body = {};

  body.access_token = process.env.LBRY_DAEMON_ACCESS_TOKEN;
  body.method = resolveMethod;
  if (data.step === 1) body.uri = claimAddress;

  if (resolveMethod === "publish") {
    body.bid = 0.001; // Hardcoded publish amount
    body.description = dataDetails.description;
    body.file_path = process.env.LBRY_DAEMON_IMAGES_PATH + dataDetails.file_path; // TODO: Fix the internal image path in daemon (original comment, check to see if still true)
    body.language = dataDetails.language;
    body.license = dataDetails.license;
    body.name = dataDetails.name;
    body.nsfw = dataDetails.nsfw;
    body.title = dataDetails.title;

    return uploadImage(body.file_path).then(uploadResponse => {
      if (uploadResponse.status !== "ok") return;

      body.file_path = uploadResponse.filename;
      body.method = resolveMethod;

      // Reference:
      // https://github.com/lbryio/lbry.tech/blob/legacy/content/.vuepress/components/Tour/Step2.vue
      // https://github.com/lbryio/lbry.tech/blob/legacy/server.js

      return new Promise((resolve, reject) => {
        request({
          qs: body,
          url: "http://daemon.lbry.tech/images.php"
        }, (error, response, body) => {
          if (error) reject(error);
          body = JSON.parse(body);
          // console.log(body);
          resolve(body);
        });
      });
    }).catch(uploadError => {
      // component.isLoading = false;
      // component.jsonData = JSON.stringify(uploadError, null, "  ");

      socket.send(JSON.stringify({
        "details": "Image upload failed",
        "message": "notification",
        "type": "error"
      }));

      logSlackError(
        "\n" +
        "> *DAEMON ERROR:* ```" + JSON.parse(JSON.stringify(uploadError)) + "```" + "\n" +
        "> _Cause: Someone attempted to publish a meme via the Tour_\n"
      );

      return;
    });
  }

  return new Promise((resolve, reject) => { // eslint-disable-line
    request({
      url: "http://daemon.lbry.tech",
      qs: body
    }, (error, response, body) => {
      if (error) {
        logSlackError(
          "\n" +
          "> *DAEMON ERROR:* ```" + JSON.parse(JSON.stringify(error)) + "```" + "\n" +
          "> _Cause: Someone is going through the Tour_\n"
        );

        return resolve(error);
      }

      body = JSON.parse(body);

      if (body.error && typeof body.error !== "undefined") {
        logSlackError(
          "\n" +
          "> *DAEMON ERROR:* ```" + JSON.parse(JSON.stringify(body.error)) + "```" + "\n" +
          "> _Cause: Someone is going through the Tour_\n"
        );

        return resolve(body.error);
      }

      if (socket) {
        return socket.send(JSON.stringify({
          "html": html`
            <p style="text-align: center;">Success! Here is the response for <strong>lbry://${claimAddress}</strong>:</p>
            <pre><code class="json">${stringifyObject(body, { indent: "  ", singleQuotes: false })}</code></pre>
            <button class="__button-black" data-action="tour, step 2" type="button">Go to next step</button>
            <script>$('#temp-loader').remove();</script>
          `,
          "message": "updated html",
          "selector": "#step1-result"
        }));
      }

      return resolve(body.result[Object.keys(body.result)[0]].claim);
    });
  });
};
