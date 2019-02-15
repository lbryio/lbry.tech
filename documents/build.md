---
title: Build
description: Learn how to build your own app via LBRY in this comprehensive guide! The future of content freedom begins with you. *patriotic music plays*
---

## THIS IS NOT DONE AT ALL AND IF YOU CONTINUE TO READ IT YOU MENTALLY ASSENT TO COMMITTING AT LEAST ONE CHANGE THAT MAKES IT BETTER

## Introduction

Want to build something on top of LBRY? This is the place to get started.

At least, it's the place to get started so long as you have some idea of what LBRY _is_. If you don't, you should read the
[Overview](/overview) first and the [spec](/spec) for more technical details. 

Want to build with us rather than on your own? Check out our [Contributing Guide](/contribute).

### When to Use LBRY

- You want to build an application that contributes to the world's knowledge, or benefits from global, shared discovery.
- You want to replace an existing centralized service related to digital content distribution with a decentralized or community-controlled one.
- You want to build an application that is permissionless to interact with.
- You want to further openness, freedom of information, and/or personal choice on the internet.

### When Not to Use LBRY

- You want to privately distribute data or information. LBRY is designed for publishing and sharing information in an open fashion.
- You want to do illegal things.

## Application Basics

You can build many types of apps. Fat apps, short apps, tall apps, skinny apps!

Most end-user applications will use the [lbry-sdk](https://github.com/lbryio/lbry) as a way of accessing and communicating with the LBRY network. A look at the [APIs](/api/sdk) provided by the SDK will help you understand what facilities the SDK provides.

Some applications do not need to access content available on the network (e.g. a wallet-only app, or a blockchain visualizer). These applications might use [lbrycrd](https://github.com/lbryio/lbrycrd), the blockchain daemon, or [chainquery](https://github.com/lbryio/chainquery), which parses blockchain data into SQL.

Let's look at some specific types of applications and the basic design for each.

### Web Applications

#### Full Web Applications

By full web application, we mean a centrally-hosted web application that uses most or all of the suite of capabilities the LBRY protocol provides.

1. Pick your favorite language and stack and do your typical setup to get a "Hello World" application running.
1. Install [lbry-sdk](//github.com/lbryio/lbry). (Docker images? Other convenient ways of doing this?)
1. Bridging basics.
1. See SDK Basics

#### Blockchain Applications

Sometimes you don't need the [SDK](https://github.com/lbryio/lbry). If you wanted to build a block explorer, you would only need to include [lbrycrd](https://github.com/lbryio/lbrycrd). Or if you only want to search through blockchain, [chainquery](https://github.com/lbryio/chainquery) is perfect for that. You can pair these with any language or tooling you want.

#### Other Web Applications

It is also possible to create a browser extension similar to Joule and Metamask. The browser could interact with the [SDK](https://github.com/lbryio/lbry) running locally on a users computer, or through a centrally hosted server. 


### Desktop Applications

If you are looking for more decentralization, a full desktop app can achieve that. If that is not something you care about, there are still a number of features that are desirable over a traditional web application, with full access to the file system being one of those. This allows users to be in control of how they view their files, and if they want to help strengthen LBRY network through seeding. 

If you would like to create a desktop application, there are a few ways to do so.

#### Electron Apps

The [official LBRY desktop app](https://github.com/lbryio/lbry-desktop) is built with electron. It is very easy to develop with, and allows web developers to easily start creating "native" desktop applications. You can use a plain html page with a `<script>` tag, or build out a large web app. The official desktop app uses React.

If you do want to write an electron app, check out the [Electron Starter Project](https://github.com/lbryio/electron-starter) for a bare bones setup that is very similar to how [lbry-desktop](https://github.com/lbryio/lbry-desktop) is structured. It's also a simple way to explore the [SDK api]((https://https://lbry.tech/api/sdk)). We are actively trying to make it better. If you see something wrong, feel free to submit an issue or PR! :)

#### Other Applications

Who needs javascript? You can use any language to develop your own LBRY desktop application. Just use the SDK (see [SDK Basics](#SDK-basics)).

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
