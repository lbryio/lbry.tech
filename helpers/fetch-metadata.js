"use strict";



//  P A C K A G E S

const local = require("app-root-path").require;
const prism = require("prismjs");
const raw = require("nanohtml/raw");
const request = require("request-promise-native");
const stringifyObject = require("stringify-object");

//  V A R I A B L E S

const randomString = local("/helpers/random-string");
const loadLanguages = require("prismjs/components/");
const logSlackError = local("/helpers/slack");
const uploadImage = local("/helpers/upload-image");

loadLanguages(["json"]);



//  E X P O R T

module.exports = exports = (data, socket) => {
  let dataDetails = "";

  if (data.example === 1 && !data.claim || !data.method) return;
  if (data.example === 2 && !data.data) return;
  if (data.example === 2) dataDetails = data.data; // file upload
  if (data.example === 3 && !data.claim || !data.method) return;

  const allowedMethods = [
    "publish",
    "resolve",
    "wallet_send"
  ];

  const body = {};
  const claimAddress = data.claim;
  const resolveMethod = data.method;
  let apiRequestMethod = "";

  if (allowedMethods.indexOf(resolveMethod) < 0) return socket.send(JSON.stringify({
    "details": "Unallowed resolve method for tutorial",
    "message": "notification",
    "type": "error"
  }));



  body.authorization = process.env.LBRY_DAEMON_ACCESS_TOKEN; // access_token
  body.method = resolveMethod;

  if (resolveMethod === "publish") {
    apiRequestMethod = "PUT";

    body.bid = 0.001; // Hardcoded publish amount
    body.description = dataDetails.description;
    body.file_path = process.env.LBRY_DAEMON_IMAGES_PATH + dataDetails.file_path; // TODO: Fix the internal image path in daemon (original comment, check to see if still true)
    body.language = dataDetails.language;
    body.license = dataDetails.license;
    body.name = dataDetails.name.replace(/\s/g, "") + randomString(10);
    body.nsfw = dataDetails.nsfw;
    body.title = dataDetails.title;

    // TODO: Forget all this and upload to spee.ch

    return uploadImage(body.file_path).then(uploadResponse => {
      if (uploadResponse.status !== "ok") return;

      body.file_path = uploadResponse.filename;
      body.filename = uploadResponse.filename;

      // Reference:
      // https://github.com/lbryio/lbry.tech/blob/legacy/content/.vuepress/components/Tour/Step2.vue
      // https://github.com/lbryio/lbry.tech/blob/legacy/server.js
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

  if (resolveMethod === "resolve") {
    apiRequestMethod = "GET";
    body.uri = claimAddress;
  }

  if (resolveMethod === "wallet_send") {
    apiRequestMethod = "POST";

    body.amount = "0.01"; // Hardcoded tip amount
    body.claim_id = claimAddress;
  }

  return new Promise((resolve, reject) => { // eslint-disable-line
    let explorerNotice = "";

    request({
      body: body,
      json: true,
      method: apiRequestMethod,
      url: `${process.env.NODE_ENV === "development" ? `http://localhost:5200/${resolveMethod}` : `https://daemon.lbry.tech/${resolveMethod}`}`
    }, (error, response, body) => {
      if (error) {
        if (process.env.NODE_ENV !== "development") {
          logSlackError(
            "\n" +
            "> *DAEMON ERROR:* ```" + JSON.parse(JSON.stringify(error)) + "```" + "\n" +
            "> _Cause: Someone is going through the Tour_\n"
          );
        }

        return resolve(error);
      }

      if (body.error && typeof body.error !== "undefined") {
        if (process.env.NODE_ENV !== "development") {
          logSlackError(
            "\n" +
            "> *DAEMON ERROR:* ```" + JSON.parse(JSON.stringify(body.error.message)) + "```" + "\n" +
            "> _Cause: Someone is going through the Tour after a response has been parsed_\n"
          );
        }

        return resolve(body.error);
      }

      if (
        body.result &&
        body.result.txid
      ) explorerNotice = `
        <p>If you want proof of the tip you just gave, <a href="https://explorer.lbry.io/tx/${body.result.txid}" target="_blank" title="Your tip, on our blockchain explorer" rel="noopener noreferrer">check it out</a> on our blockchain explorer!</p>
      `;

      if (socket) {
        const renderedCode = prism.highlight(stringifyObject(body, { indent: "  ", singleQuotes: false }), prism.languages.json, "json");

        return socket.send(JSON.stringify({
          "html": raw(`
            <h3>Response</h3>
            ${explorerNotice}
            <pre><code class="language-json">${renderedCode}</code></pre>
            <script>$("#temp-loader").hide();</script>
          `),
          "message": "updated html",
          "selector": `#example${data.example}-result`
        }));
      }

      return resolve(body.result[Object.keys(body.result)[0]].claim);
    });
  });
};
