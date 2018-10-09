"use strict";



//  P A C K A G E S

const local = require("app-root-path").require;
const prism = require("prismjs");
const raw = require("choo/html/raw");
const request = require("request-promise-native");
const stringifyObject = require("stringify-object");

//  V A R I A B L E S

const randomString = local("app/helpers/random-string");
const loadLanguages = require("prismjs/components/");
const logSlackError = local("app/helpers/slack");
const publishMeme = local("app/helpers/publish-meme");
const uploadImage = local("app/helpers/upload-image");

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
    details: "Unallowed resolve method for tutorial",
    message: "notification",
    type: "error"
  }));



  body.authorization = process.env.LBRY_DAEMON_ACCESS_TOKEN; // access_token
  body.method = resolveMethod;

  if (resolveMethod === "publish") {
    apiRequestMethod = "PUT";

    // Required for publishing
    body.author = "lbry.tech";
    body.bid = 0.0001; // Hardcoded publish amount
    body.description = dataDetails.description;
    body.language = dataDetails.language;
    body.license = dataDetails.license;
    body.name = dataDetails.name + "-" + randomString(10); // underscores are not allowed?
    body.nsfw = dataDetails.nsfw;
    body.title = dataDetails.title;

    // Gotta let the blockchain know what to save
    body.file_path = dataDetails.file_path; // just base64 string

    return uploadImage(body.file_path).then(uploadResponse => {
      if (!uploadResponse.status || uploadResponse.status !== "ok") {
        socket.send(JSON.stringify({
          details: "Image upload failed",
          message: "notification",
          type: "error"
        }));

        if (process.env.NODE_ENV !== "development") {
          logSlackError(
            "\n" +
            "> *DAEMON ERROR:*\n" +
            "> _Cause: Someone attempted to upload a meme to the web daemon_\n"
          );
        }

        return;
      }

      body.file_path = uploadResponse.filename;

      return publishMeme(body).then(publishResponse => {
        let explorerNotice = "";

        if (publishResponse.error) {
          socket.send(JSON.stringify({
            details: "Meme publish failed",
            message: "notification",
            type: "error"
          }));

          if (process.env.NODE_ENV !== "development") {
            logSlackError(
              "\n" +
              "> *DAEMON ERROR:* ```" + JSON.parse(JSON.stringify(publishResponse.error)) + "```" + "\n" +
              "> _Cause: Someone is going through the Playground after a response has been parsed_\n"
            );
          }

          return;
        }

        if (
          publishResponse.result &&
          publishResponse.result.claim_address
        ) explorerNotice = `
          <p class="playground__description success">
            Nicely done, you've published to <b>lbry://${publishResponse.result.lbrytech_claim_name}</b>! To see Proof of Work (lol) that your meme is on the LBRY blockchain, <a href="https://explorer.lbry.io/address/${publishResponse.result.claim_address}" rel="noopener noreferrer" target="_blank" title="Your meme, on our blockchain explorer">check it out</a> on our blockchain explorer! Please note that it may take a couple minutes for the transaction to be confirmed.
            <br/><br/>
            You can also check out your meme (once the transaction is confirmed) on <a href="https://open.lbry.io/${publishResponse.result.lbrytech_claim_name}#${publishResponse.result.claim_id}" rel="noopener noreferrer" target="_blank" title="Your meme, on LBRY">LBRY</a> or <a href="https://spee.ch/${publishResponse.result.claim_id}/${publishResponse.result.lbrytech_claim_name}" rel="noopener noreferrer" target="_blank" title="Your meme, on spee.ch">Spee.ch</a>!
          </p>

          <br/>
        `;

        delete publishResponse.result.lbrytech_claim_name;

        const renderedCode = prism.highlight(
          stringifyObject(publishResponse, { indent: "  ", singleQuotes: false }),
          prism.languages.json,
          "json"
        );

        /*
        https://open.lbry.io/Yet--another-test-733dd99009#59b368ed4b616108fe27d308fa8e22602acc762f
        https://open.lbry.io/claim_show#adee1be89febd3d89f51581601bca52d75a710a8

        You are generating the claim name, so you'd know it.  it would be https://open.lbry.io/claim-name#claim_id (claim id comes from the return). You can also run a claim_show with the claim id parameter to get name if that's easier. The spee.ch link would just be https://spee.ch/claimid/claimname
        */

        return socket.send(JSON.stringify({
          example: data.example,
          html: raw(`
            <h3>Response</h3>
            ${explorerNotice}
            <pre><code class="language-json">${renderedCode}</code></pre>
          `),
          message: "show result",
          selector: `#example${data.example}-result`
        }));
      });
    });
  }

  if (resolveMethod === "resolve") {
    apiRequestMethod = "GET";
    body.uri = claimAddress;
  }

  if (resolveMethod === "wallet_send") {
    const approvedIds = [
      "3db81c073f82fd1bb670c65f526faea3b8546720",
      "173412f5b1b7aa63a752e8832406aafd9f1ecb4e",
      "2a7f5db2678177435b1dee6c9e38e035ead450b6",
      "d81bac6d49b1f92e58c37a5f633a27a45b43405e",
      "b4668c0bd096317b44c40738c099b6618095e75f",
      "007789cc45cbb4255cf02ba77cbf84ca8e3d7561",
      "1ac47b8b3def40a25850dc726a09ce23d09e7009",
      "784b3c215a6f06b663fc1aa292bcb19f29c489bb",
      "758dd6497cdfc401ae1f25984738d024d47b50af",
      "8a7401b88d5ed0376d98f16808194d4dcb05b284"
    ];

    if (!approvedIds.includes(claimAddress)) {
      return socket.send(JSON.stringify({
        example: data.example,
        html: raw(`
          <h3>Response</h3>
          <pre><code class="language-text">Tipping creators not in the whitelist for this example is not allowed.</code></pre>
        `),
        message: "show result",
        selector: `#example${data.example}-result`
      }));
    }

    apiRequestMethod = "POST";

    body.amount = "0.01"; // Hardcoded tip amount
    body.claim_id = claimAddress;
  }



  return new Promise((resolve, reject) => { // eslint-disable-line
    request({
      body: body,
      json: true,
      method: apiRequestMethod,
      url: `${process.env.NODE_ENV === "development" ? `http://localhost:5200/${resolveMethod}` : `https://${process.env.DAEMON_URL}/${resolveMethod}`}`
    }, (error, response, body) => {
      if (error) {
        if (process.env.NODE_ENV !== "development") {
          logSlackError(
            "\n" +
            "> *DAEMON ERROR:* ```" + JSON.parse(JSON.stringify(error)) + "```" + "\n" +
            "> _Cause: Someone is going through the Playground_\n"
          );
        }

        return resolve(error);
      }

      if (body.error && typeof body.error !== "undefined") {
        if (process.env.NODE_ENV !== "development") {
          logSlackError(
            "\n" +
            "> *DAEMON ERROR:* ```" + JSON.parse(JSON.stringify(body.error.message)) + "```" + "\n" +
            "> _Cause: Someone is going through the Playground after a response has been parsed_\n"
          );
        }

        return resolve(body.error);
      }

      let explorerNotice = "";

      if (
        data.example === 3 &&
        body.result &&
        body.result.txid
      ) explorerNotice = `
        <p class="playground__description success">If you want proof of the tip you just gave on behalf of LBRY, <a href="https://explorer.lbry.io/tx/${body.result.txid}" rel="noopener noreferrer" target="_blank" title="Your tip, on our blockchain explorer">check it out</a> on our blockchain explorer! Please note that it may take a couple minutes for the transaction to be confirmed.</p><br/>
      `;

      if (socket) {
        const renderedCode = prism.highlight(
          stringifyObject(body, { indent: "  ", singleQuotes: false }),
          prism.languages.json,
          "json"
        );

        return socket.send(JSON.stringify({
          example: data.example,
          html: raw(`
            <h3>Response</h3>
            ${explorerNotice}
            <pre><code class="language-json">${renderedCode}</code></pre>
          `),
          message: "show result",
          selector: `#example${data.example}-result`
        }));
      }

      return resolve(body.result[Object.keys(body.result)[0]].claim);
    });
  });
};
