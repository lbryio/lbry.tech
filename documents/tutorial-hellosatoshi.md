## Hello Satoshi - The LBRY "Hello World" Tutorial

Let's  get started with a simple "Hellow World" tutorial... LBRY style!

This tutorial will guide you through creating a basic [Electron](https://electronjs.org) application that calls to the LBRY network and renders an image returned by the network.

Electron is nice because it allows you to easily create web apps that don't rely on any centralized web servers, but you can absolutely use any tooling or language you would like.

### Prerequisites

This tutoral only has a few simple requirements:

- [npm](https://www.npmjs.com). Learn how to install it [here](https://www.npmjs.com/get-npm).
- [git](https://git-scm.com/).

Once you have those installed (see the links above for downloads and How-To's), you are ready to begin!

#### Step 1. Download and build the starter project

Grab "[electron-starter](https://github.com/lbryio/electron-starter)".  This project serves as a base upon which you can build LBRY applications.  (Similar to "create-react-app" for React development.)

If you have git and npm installed, run the following lines one at a time:

```
git clone https://github.com/lbryio/electron-starter
cd electron-starter
npm install
npm run dev
```

#### Step 2. Make sure everything works

Before we make any changes, it's a good idea to verify that everything is working correctly.

Try typing a word into the text input and click the button to [resolve](https://lbry.tech/api/sdk#resolve) it.

This performs a [[claim]] lookup, which retrieves metadata the title, thumbnail, and file type from the LBRY blockchain.

Try resolving `lbry://doitlive`.

If you received no errors, move on to Step 3!  Otherwise, head back to Step 1 to make sure you have all the requirements installed correctly.

#### Step 3. Make a small change to the code

Now that we have the metadata, let's [get](https://lbry.tech/api/sdk#get) the actual file!

The code to do this is already there, just un-comment these lines in the app's [renderer/index.js](https://github.com/lbryio/electron-starter/blob/master/src/renderer/index.js) file.

```js
claimData.innerText = "Loading...";

Lbry.get({ uri: `lbry://${value}` })
  .then(result => {
    const filePath = result.download_path;
    const image = document.createElement("img");

    image.src = filePath;
    imageWrapper.appendChild(image);

    claimData.innerText = JSON.stringify(result, null, 2);
  })
  .catch(error => {
    claimData.innerText = JSON.stringify(error, null, 2);
  });
```

This is the code that actually downloads a file.

There are more robust ways to handle the download progress, but this will work fine for images. After you added that code back, try `get`ing `lbry://doitlive`.

### Success!  You Did It!

While our Hello Satoshi app isn't much to look at, it shows how simple it is to connect to the LBRY network and download files!
