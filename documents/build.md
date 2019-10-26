---
title: Build
description: Learn how to build your own app via LBRY in this comprehensive guide! The future of content freedom begins with you. *patriotic music plays*
---

## Introduction

Want to build something on top of LBRY? This is the place to get started. If this is your first introduction to LBRY, you should read the [Overview](./overview.md) first. If you would rather build with us, check out our [Contributing Guide](./contribute.md).

There are exactly 1,000,006 app ideas that could work on the LBRY network, but it doesn't make sense for _everything_ to be built on it.

### When to Use LBRY

- You want to build an application that contributes to the world's knowledge, or benefits from global, shared discovery.
- You want to replace an existing centralized service related to digital content distribution with a decentralized or community-controlled one.
- You want to build an application that is permissionless to interact with.
- You want to further openness, freedom of information, and/or personal choice on the internet.

### When Not to Use LBRY

- You want to privately distribute data or information. LBRY is designed for publishing and sharing information in an open fashion.
- You want to do illegal things.

Ready to get started? Let's build a [Hello Satoshi](#hello-satoshi) app.

If you want to read a more general overview on application building (or you don't want to use Electron), you can jump right to [Applications 101](#applications-101).

## Hello Satoshi

This section will guide you through creating a basic [Electron](https://electronjs.org) application that calls to the LBRY network and renders an image returned by the network.

Electron is nice because it allows you to easily create web apps that don't rely on any centralized web servers, but you can absolutely use any tooling or language you would like.

### The Steps

_These steps require [npm](https://www.npmjs.com). Learn how to install it [here](https://www.npmjs.com/get-npm)._

#### 1. Download and build the starter app

[electron-starter](https://github.com/lbryio/electron-starter) is the `create-react-app` of LBRY application building.

```
git clone https://github.com/lbryio/electron-starter
cd electron-starter
npm install
npm run dev
```

#### 2. Verify the app works

Type a word into the text input and click the button to [resolve](https://lbry.tech/api/sdk#resolve) it. This performs a [[claim]] lookup, which retrieves metadata the title, thumbnail, and file type from the LBRY blockchain.

Try resolving `lbry://doitlive`.

#### 3. Modify the code

Now that we have the metadata, let's [get](https://lbry.tech/api/sdk#get) the actual file! The code to do this is already there, just un-comment these lines in the app's [renderer/index.js](https://github.com/lbryio/electron-starter/blob/master/src/renderer/index.js) file.

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

This is the code that actually downloads a file. There are more robust ways to handle the download progress, but this will work fine for images. After you added that code back, try `get`ing `lbry://doitlive`.

### You Did It!

While our Hello Satoshi app isn't much to look at, it shows how simple it is to connect to the LBRY network and download files!

Unfortunately, most users will want more functionality in an app than typing into a box and looking at the JSON data returned. Let's check out how to build apps real people want to use in the next section.

## Applications 101

You can build many types of apps. Your app doesn't have to use Electron, nor does it have to be targeted at consumers, use a UI, or even fetch digital content at all! In this section, we'll look into the different types of apps you could build, and the different components needed to build anything you want.

Most applications will use the [LBRY SDK](#sdk) as a way of accessing and communicating with the LBRY network. A look at the [APIs](https://lbry.tech/api/sdk) provided by the SDK will help you understand what it can and can't do.

Some applications do not need to access content available on the network (e.g. a wallet-only app, or a blockchain visualizer). These applications might use [lbrycrd](#lbrycrd), the full-node blockchain daemon, or [chainquery](#chainquery), which parses blockchain data into SQL.

Let's look at some specific types of applications and the basic design for each.

### Web Applications

#### Full Web Applications

By full web application, we mean a centrally-hosted web application that uses most or all of the suite of capabilities the LBRY protocol provides.

For an example of a full web application that uses LBRY, check out the [spee.ch codebase](https://github.com/lbryio/spee.ch).

To create a full web application follow the typical steps you follow to create a basic application. Then, [follow the steps to interact with the LBRY SDK](#sdk).

Full web applications can may also benefit from using [chainquery](#chainquery), which provides an SQL interface to blockchain data. 

If your web application will utilize user accounts, a common design pattern is to simply associate user IDs with common LBRY types like files, claims, and channels.

If your web application will utilize per-user funds, we recommend using the account functionality provided by the SDK to give each user an account (wallet). This will allow you to keep funds cleanly separated with a single SDK instance.

That's all it takes!

#### Blockchain Applications

By blockchain applications, we mean applications that don't utilize the data network and digital content distribution capabilities of the LBRY protocol.

For an example of a blockchain application that uses LBRY, check out the [block-explorer codebase](https://github.com/lbryio/block-explorer).

Whether your blockchain application is a web application, desktop application, or a mobile application, the steps will be similar to those of full applications.

In each case, you'll follow the typical steps to build a basic application. Then, if your app is reading data from the blockchain and presenting it to users, you'll want to [follow the steps for using chainquery](#chainquery).

If your application needs to send funds, you'll want to [follow the steps for using lbrycrd](#lbrycrd). Note that it is also possible to move funds by using the [LBRY SDK](#sdk), but the SDK does not provide a full blockchain node, only an [[SPV]] wallet.

#### Other Web Applications

It is also possible to create a browser extension similar to Joule and Metamask. Generally there are two ways to do this:

1. Have the user run a local copy of the [SDK](#sdk) on their computer and send commands from the browser that interact with the user's personal wallet.

1. Run the [SDK](#sdk) on a centrally hosted server and manage keys or funds for each user. If you're doing this, you'll want to read [Full Web Applications](#full-web-applications).

Going through a centralized server makes it easier on users, but comes with more responsibility to keep your user's funds secure. It also requires creating business logic on your server to associate user accounts with common types like claims and files.

#### Desktop Applications

Desktop applications can offer greater anonymity, better performance, and features that aren't possible with a regular web app.

Regardless of the type of desktop app, you'll want to follow the steps for [using the SDK](#sdk). Once that is done you can begin building an app that allows users to be fully in control of their data. They won't have to rely on third party services keeping anything secure, and they can choose to help strengthen LBRY network through seeding.

##### Electron Apps

The [official LBRY desktop app](https://github.com/lbryio/lbry-desktop) is built with Electron. It is very easy to build with, and allows web developers to easily start creating "native" desktop applications. You can use a plain html document with a `<script>` tag, or build out a large web app. The official desktop app uses [React](https://reactjs.org/).

If you want to write an electron app, check out the [electron-starter project](https://github.com/lbryio/electron-starter) for a bare bones setup that is very similar to how [lbry-desktop](https://github.com/lbryio/lbry-desktop) is structured. It's also a simple way to explore the [SDK API](https://lbry.tech/api/sdk).

Check out [this video](https://spee.ch/6/lbry-electron-starter) for a brief overview and guide to get it running. If you just want the source code, go [here](https://github.com/lbryio/electron-starter). Or, if you really really want to see it in action _now_, just paste these commands into your terminal:

```
git clone https://github.com/lbryio/electron-starter
cd electron-starter
npm install
npm run dev
```

##### Other Applications

Who needs JavaScript? If performance is your number one goal, you probably won't want to use Electron. You can use any language you want to build an app on LBRY.

To build a desktop application in your language or framework of choice, follow your typical steps to create a basic application and then [follow the steps for using the LBRY SDK](#sdk).

### Mobile Applications

#### Android Applications

Creating a mobile application is slightly trickier than a desktop application, but still quite doable.

For an example of a mobile application that uses LBRY, check out [LBRY for Android](https://github.com/lbryio/lbry-android).

The tricky part on mobile is getting the SDK running and responding to calls. We recommend following the [build steps](https://github.com/lbryio/lbry-android/blob/master/BUILD.md) for the official mobile browser and then stripping out the parts you do not need.

Once the SDK is running, follow [these steps](#sdk) to interact and make calls.

#### iOS Applications

We do not currently have tooling available to build LBRY apps on iOS.

## Application Tooling

### SDK

The [LBRY SDK](https://github.com/lbryio/lbry-sdk) provides an API that enables easy access to all functionality of the LBRY network. Most applications will choose to use the SDK.

You can download the latest version from the [releases page](https://github.com/lbryio/lbry-sdk/releases) or via the following URLs, which will always download the latest SDK for each operating system:

| OS | URL |
| --- | --- |
| Linux | [lbry.com/releases/lbry.deb](https://lbry.com/releases/lbry.deb) |
| macOS | [lbry.com/releases/lbry.dmg](https://lbry.com/releases/lbry.dmg) |
| Windows | [lbry.com/releases/lbry.exe](https://lbry.com/releases/lbry.exe) |

#### Using the SDK

Once that is downloaded, there are two steps to get it integrated into your app.

First, run `lbrynet start` in the directory you downloaded the SDK. This starts the API server and connects to the LBRY network.

Then, use an API wrapper to talk to the SDK or write your own. There are a number of simple [API wrappers](https://lbry.tech/resources/api-wrappers) available in several different languages, created by LBRY community members! These allow you to easily send commands to the SDK in the language of your choice.

If a wrapper for the language you would like to use doesn't exist, it is still fairly easy to interact with. The SDK provides a JSON-RPC server at `localhost:5279` for interaction. You can call it via `cURL` or the HTTP functionality provided by the language you are using. You can look at an existing wrapper in another language for more detail.

The API provided by the SDK is documented [here](https://lbry.tech/api/sdk).

### Chainquery

[Chainquery](https://github.com/lbryio/chainquery) parses and syncs blockchain data in realtime to an SQL database. Applications that want to query blockchain data, whether that's transactions or [[claim]] metadata, will find it useful to use Chainquery.

You can download the latest version from the [releases page](https://github.com/lbryio/chainquery/releases) or via the following URLs, which will always download the latest version for each operating system:

| OS | URL |
| --- | --- |
| Linux | [lbry.com/releases/chainquery.deb](https://lbry.com/releases/chainquery.deb) |
| macOS | [lbry.com/releases/chainquery.dmg](https://lbry.com/releases/chainquery.dmg) |
| Windows | [lbry.com/releases/chainquery.exe](https://lbry.com/releases/chainquery.exe) |

Note: chainquery has both 32-bit and 64-bit builds, which the redirect URLs do not handle. Check the [releases page](https://github.com/lbryio/chainquery/releases) to ensure you get the right one.

#### Using Chainquery

The `README` bundled with Chainquery provides the latest steps for running Chainquery.

After following those steps, you'll have an SQL database that stays up to date, including [[mempool]] transactions. You can then query this database using the functionality provided by the language you're developing in.

### lbrycrd

[lbrycrd](https://github.com/lbryio/lbrycrd) provides a full blockchain node and a daemon for making JSON-RPC calls. Applications that require full blockchain functionality (as opposed to [[SPV]], provided by the [SDK](#sdk) will want to use lbrycrd. Most applications will not need to use lbrycrd.

You can download the latest version from the [releases page](https://github.com/lbryio/lbrycrd/releases) or via the following URLs, which will always download the latest version for each operating system:

| OS | URL |
| --- | --- |
| Linux | [lbry.com/releases/lbrycrd.deb](https://lbry.com/releases/lbrycrd.deb) |
| macOS | [lbry.com/releases/lbrycrd.dmg](https://lbry.com/releases/lbrycrd.dmg) |
| Windows | [lbry.com/releases/lbrycrd.exe](https://lbry.com/releases/lbrycrd.exe) |

#### Using lbrycrd

Run `./lbrycrdd -server -daemon` to tell the program to provide a JSON-RPC daemon.

We do not provide API wrappers for `lbrycrd`, but interacting with it works similar to the [SDK](#sdk).

`lbrycrd` is a fork of Bitcoin and it functions similarly to Bitcoin. [This documentation](https://en.bitcoin.it/wiki/API_reference_(JSON-RPC)) may help you understand how to make calls.

A full list of methods is available [here](https://lbry.tech/api/blockchain).

## Community and Support

Trouble? Questions? Want to share your progress? Interact with other devs!

- Join the #dev channel [in our chat](https://chat.lbry.com)
- Introduce yourself or ask a question in [the forum](https://forum.lbry.tech).
- Every LBRY repository on our [GitHub](https://github.com/lbryio) contains contact information for the maintainer.
