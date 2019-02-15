---
title: Build
description: Learn how to build your own app via LBRY in this comprehensive guide! The future of content freedom begins with you. *patriotic music plays*
---

## THIS IS NOT DONE AT ALL AND IF YOU CONTINUE TO READ IT YOU MENTALLY ASSENT TO COMMITTING AT LEAST ONE CHANGE THAT MAKES IT BETTER

## Introduction

Want to build something on top of LBRY? This is the place to get started. If this is your first introduction to LBRY, you should read the [Overview](/overview) first. If you would rather build with us, check out our [Contributing Guide](/contribute).

There are exactly 1,000,006 app ideas that could work on the LBRY network, but it doesn't make sense for _everything_ to be built on it.

### When to Use LBRY

- You want to build an application that contributes to the world's knowledge, or benefits from global, shared discovery.
- You want to replace an existing centralized service related to digital content distribution with a decentralized or community-controlled one.
- You want to build an application that is permissionless to interact with.
- You want to further openness, freedom of information, and/or personal choice on the internet.

### When Not to Use LBRY

- You want to privately distribute data or information. LBRY is designed for publishing and sharing information in an open fashion.
- You want to do illegal things.

Ready to get started? Let's build a [Hello Satoshi] app.

If you want to read a more general overview on application building (or you don't want to use Electron), you can jump right to [Applications 101].

## Hello Satoshi

This section will guide you through creating a basic [Electron](https://electronjs.org/) application that calls to the LBRY network and renders an image returned by the network.

Electron is nice because it allows you to easily create web apps that don't rely on any centralized web servers, but you can absolutely use any tooling or language you would like.

### Let's Build It

_These steps require [npm](https://www.npmjs.com/). Learn how to install it [here](https://www.npmjs.com/get-npm)._

1. Download and build the [electron-starter](https://github.com/lbryio/electron-starter) app.

   ```
   git clone https://github.com/lbryio/electron-starter
   cd electron-starter
   npm install
   npm run dev
   ```

2. Type a word into the text input and click the button to [resove](https://lbry.tech/api/sdk#resolve) it. This fetches a [claim](https://lbry.tech/spec#claims), which is just a way of saying that it looks up some info about it like the title, thumbnail, and file type.

   Try resolving `lbry://xxx`. ( <--- insert meme of choice here)

3. Make Your First Code Change

   Now that we have the metadata, lets [get](https://lbry.tech/api/sdk#get) the actual file! The code to do this is already there, just un-comment out these lines in the app's xxx.js file.

   ```
   Some js
   Sean still needs to update the project and add this.
   ```

   You should see a second button now, click it to get the file!

### (You Did It! Some funny success message)

The Hello Satoshi app isn't much to look at, but it shows how simple it is to connect to the LBRY network and download files!

Unfortunately, for some reason most users seem to want more functionality in an app than typing into a box and looking at the json data returned. Let's check out how to build apps real people want to use in the next section.

## Applications 101

You can build many types of apps. Your app doesn't have to use Electron, nor does it have to be targeted at consumers, use a UI, or even fetch digital content at all! In this section, we'll look into the different types of apps you could build, and the different components needed to build anything you want.

Most applications will use [lbry-sdk](https://github.com/lbryio/lbry) as a way of accessing and communicating with the LBRY network. A look at the [APIs](/api/sdk) provided by the SDK will help you understand what it can and can't do.

Some applications do not need to access content available on the network (e.g. a wallet-only app, or a blockchain visualizer). These applications might use [lbrycrd](https://github.com/lbryio/lbrycrd), the full-node blockchain daemon, or [chainquery](https://github.com/lbryio/chainquery), which parses blockchain data into SQL.

Let's look at some specific types of applications and the basic design for each.

### Web Applications

#### Full Web Applications

By full web application, we mean a centrally-hosted web application that uses most or all of the suite of capabilities the LBRY protocol provides.

To do this, we need [lbry-sdk](https://github.com/lbryio/lbry). You can download the latest version from the [releases page](https://github.com/lbryio/lbry/releases). Once that is downloaded, there are really only two steps to get it integrated into your app.

1. Run `lbrynet start` in the directory you downloaded the SDK. This starts the API server and connects to the LBRY network.

1. Setup an API wrapper to talk to the SDK.

   There are a number of very simple [api wrappers](https://lbry.tech/resources/api-wrappers) available in several different languages. Most of these have been created by community members! These allow you to easily send commands to the SDK in the language of your choice. If a wrapper for the language you would like to use doesn't exist, contact [someone?]. (All of the bounties we have on https://lbry.io/bounty/lbry-binding are claimed, should this be linked at all?)

That's all it takes! Now you can read and write data to the LBRY network from your app. :)

#### Blockchain Applications

Sometimes you don't need the [SDK](https://github.com/lbryio/lbry). For applications that only need blockchain data, such as a block explorer, check out [lbrycrd](#lbrycrd) and [Chainquery](#Chainquery).

#### Other Web Applications

It is also possible to create a browser extension similar to Joule and Metamask. Generally there are two ways to do this:

1. Have the user run [lbry-sdk](https://github.com/lbryio/lbry) on their computer and send commands from the browser that interact with the user's personal wallet.

2. Run [lbry-sdk](https://github.com/lbryio/lbry) on a centrally hosted server and manage keys or funds for each user.

Going through a centralized server can be safer (with added authentication), but it also comes with more responsibility to keep your user's funds secure.

#### Desktop Applications

Desktop app's can offer greater anonyminity, better performance, and features that aren't possible with a regular web app.

You will still need to do steps 1 and 2 in the [Full Web Applications] section to get the SDK running. Once that is done you can begin building an app that allows users to be fully in control of their data. They won't have to rely on third party services keeping anything secure, and they can choose to help strengthen LBRY network through seeding.

##### Electron Apps

The [official LBRY desktop app](https://github.com/lbryio/lbry-desktop) is built with electron. It is very easy to build with, and allows web developers to easily start creating "native" desktop applications. You can use a plain html document with a `<script>` tag, or build out a large web app. The official desktop app uses [React](https://reactjs.org/).

Check out the [Hello Satoshi] section to get a basic electron app up and running using [electron-starter](https://github.com/lbryio/electron-starter). It has everything you need to search for and download files. [This video](https://spee.ch/6/lbry-electron-starter) gives a brief overview of the project. Or, If you just want the source code, go [here](https://github.com/lbryio/electron-starter).

##### Other Applications

Who needs javascript? If performance is your number one goal, you probably won't want to use Electron. You can use any language you want to build and app on LBRY. If your app can interact with an API server, then it can interact with the LBRY network.

Check out the available [api wrappers](https://lbry.tech/resources/api-wrappers) if you are interested in building a non-electron desktop app. Or checkout the [section below] to learn how you can build something for mobile that interacts with the LBRY network.

### Mobile Applications

#### Android Applications

1. (Whatever magic you have to do to get a daemon running on Android.)

#### iOS Applications

We do not currently have tooling available to build LBRY apps on iOS.

## Application Tooling

### SDK

Talk about using SDK, docs, etc.

#### When To Use

#### Tips / Best Practices

1. Always leave a tip.

#### Pitfalls

1. Lex

### Chainquery

#### When To Use

1. You want blockchain data.

#### Tips / Best Practices

1. Use it.

#### Pitfalls

1. mempool

### lbrycrd

#### When To Use

#### Tips and Best Practices

1. use chainquery and lbrycrd together
1. use types to get structured data

#### Pitfalls

1. API naming

## Community and Support

Interact with other devs! Share your app!
