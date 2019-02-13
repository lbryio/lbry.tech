"use strict";



//  I M P O R T S

import got from "got";
import prism from "prismjs";
import raw from "choo/html/raw";
import stringifyObject from "stringify-object";

//  U T I L S

import randomString from "./random-string";
import messageSlack from "./slack";

import publishMeme from "./publish-meme";
import uploadImage from "./upload-image";

const allowedQueryMethods = [
  "publish",
  "resolve",
  "claim_tip"
];

const approvedContentIdsForTipping = [
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

//  P A C K A G E

const loadLanguages = require("prismjs/components/");
loadLanguages(["json"]); // eslint-disable-line padding-line-between-statements



//  E X P O R T

export default async(data, socket) => {
  const body = {};
  let apiRequestMethod = "";
  let dataDetails = "";
  let explorerNotice = "";

  if (data.example === 1 && !data.claim || !data.method) return;
  if (data.example === 2 && !data.data) return;
  if (data.example === 2) dataDetails = data.data; // file upload
  if (data.example === 3 && !data.claim || !data.method) return;

  const claimAddress = data.claim;
  const resolveMethod = data.method;

  if (allowedQueryMethods.indexOf(resolveMethod) < 0) {
    return socket.send(JSON.stringify({
      details: "Unallowed resolve method for tutorial",
      message: "notification",
      type: "error"
    }));
  }

  body.authorization = process.env.LBRY_DAEMON_ACCESS_TOKEN;
  body.method = resolveMethod;



  switch(true) {
    //  T I P
    //  E X A M P L E
    case resolveMethod === "claim_tip":
      if (!approvedContentIdsForTipping.includes(claimAddress)) {
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
      body.amount = "0.001"; // Hardcoded tip amount
      body.claim_id = claimAddress;

      break;



    //  P U B L I S H
    //  E X A M P L E
    case resolveMethod === "publish":
      apiRequestMethod = "PUT";

      // Required for publishing
      body.author = "lbry.tech";
      body.bid = "0.001"; // Hardcoded publish amount
      body.description = dataDetails.description;
      body.language = dataDetails.language;
      body.license = dataDetails.license;
      body.name = dataDetails.name + "-" + randomString(10);
      body.nsfw = dataDetails.nsfw;
      body.title = dataDetails.title;

      // Gotta let the blockchain know what to save
      body.file_path = dataDetails.file_path;

      try {
        const imageUploadResponse = await uploadImage(body.file_path);
        body.file_path = imageUploadResponse.filename; // eslint-disable-line padding-line-between-statements

        try {
          const memePublishResponse = await publishMeme(body);

          switch(true) {
            case data.example === 2:
            case memePublishResponse.result:
            case memePublishResponse.result.claim_address:
              explorerNotice = memePublishMessaging(memePublishResponse);
              break;

            default:
              break;
          }

          delete memePublishResponse.result.lbrytech_claim_name;

          const renderedCode = prism.highlight(
            stringifyObject(memePublishResponse, { indent: "  ", singleQuotes: false }),
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

        catch(memePublishError) {
          socket.send(JSON.stringify({
            details: "Meme publish failed",
            message: "notification",
            type: "error"
          }));

          if (process.env.NODE_ENV !== "development") {
            messageSlack({
              message: "```" + JSON.parse(JSON.stringify(memePublishError.error)) + "```",
              pretext: "_Someone is going through the Playground after a response has been parsed_",
              title: "DAEMON ERROR"
            });
          }

          return;
        }
      }

      catch(imageUploadError) {
        socket.send(JSON.stringify({
          details: "Image upload failed",
          message: "notification",
          type: "error"
        }));

        if (process.env.NODE_ENV !== "development") {
          messageSlack({
            message: "```" + imageUploadError.status + "```",
            pretext: "_Someone attempted to upload a meme to the web daemon and it failed_",
            title: "DAEMON ERROR"
          });
        }

        return;
      }



    //  R E S O L V E
    //  E X A M P L E
    case resolveMethod === "resolve":
      apiRequestMethod = "GET";
      body.uri = claimAddress;

      break;



    default:
      break;
  }



  //  Q U E R Y
  //  D A E M O N

  const queryOptions = {
    body: body,
    json: true,
    method: apiRequestMethod
  };

  const queryUrl = process.env.NODE_ENV === "development" ?
    `http://localhost:5200/${resolveMethod}` :
    `https://${process.env.DAEMON_URL}/${resolveMethod}`;

  try {
    const response = await got(queryUrl, queryOptions);

    switch(true) {
      case data.example === 3:
      case response.body.result:
      case response.body.result.txid:
        explorerNotice = tipCompletionMessaging(response.body);
        break;

      default:
        break;
    }

    if (socket) {
      const renderedCode = prism.highlight(
        stringifyObject(response.body, { indent: "  ", singleQuotes: false }),
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

    return response.body.result[Object.keys(response.body.result)[0]].claim;
  }

  catch(error) {
    messageSlack({
      message: "```" + error + "```",
      pretext: "_Someone is going through the Playground and the daemon is not running_",
      title: "DAEMON ERROR"
    });
  }
};



//  H E L P E R S

function memePublishMessaging(source) {
  return `
    <p class="playground__description success">
      Nicely done, you've published to <code>lbry://${source.result.lbrytech_claim_name}</code>.

      <br/><br/>

      To see Proof of Work (lol) that your meme is on the LBRY blockchain, <a href="https://explorer.lbry.io/tx/${source.result.txid}?address=${source.result.claim_address}" rel="noopener noreferrer" target="_blank" title="Your meme, on our blockchain explorer">check it out</a> on our blockchain explorer! Please note that it may take a couple minutes for the transaction to be confirmed.

      <br/><br/>

      You can also check out your meme (once the transaction is confirmed) on <a href="https://open.lbry.io/${source.result.lbrytech_claim_name}#${source.result.claim_id}" rel="noopener noreferrer" target="_blank" title="Your meme, on LBRY">LBRY</a> or <a href="https://spee.ch/${source.result.claim_id}/${source.result.lbrytech_claim_name}" rel="noopener noreferrer" target="_blank" title="Your meme, on spee.ch">Spee.ch</a>!
    </p>

    <br/>
  `;
}

function tipCompletionMessaging(source) {
  return `
    <p class="playground__description success">
      If you want proof of the tip you just gave on behalf of LBRY, <a href="https://explorer.lbry.io/tx/${source.result.txid}?address=${source.result.outputs[0].address}" rel="noopener noreferrer" target="_blank" title="Your tip, on our blockchain explorer">check it out</a> on our blockchain explorer! Please note that it may take a couple minutes for the transaction to be confirmed.
    </p><br/>
  `;
}

