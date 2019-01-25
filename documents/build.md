---
title: Build
---

## THIS IS NOT DONE AT ALL AND IF YOU CONTINUE TO READ IT YOU MENTALLY ASSENT TO COMMITTING AT LEAST ONE CHANGE THAT MAKES IT BETTER

## Introduction
 
Want to build something on top of LBRY? This is the place to get started.

At least, it's the place to get started so long as you have some idea of what LBRY _is_. If you don't, you should read the
[Overview](/overview) first.

Want to build with us rather than on your own? Check out our [Contributing Guide](/contribute).

### When to Use LBRY

- You want to build an application that contributes to the world's knowledge, or benefits from global, shared discovery.
- You want to replace an existing centralized service related to digital content distribution with a decentralized or community-controlled one.
- You want to build an application that is [[permissionless]] to interact with.
- You want to further openness, freedom of information, and/or personal choice on the internet. 

### When Not to Use LBRY

- You want to privately distribute data or information. LBRY is designed for publishing and sharing information in an open fashion.
- You want to do illegal things.

## Application Basics

You can build many types of apps. Fat apps, short apps, tall apps, skinny apps!

Most end-user applications will use the [lbry-sdk](https://github.com/lbryio/lbry) as a way of accessing and communicating with the LBRY network. A look at the [APIs](/api/sdk) provided by the SDK will help you understand what facilities the SDK provides. 

Some applications do not need to access content available on the network (e.g. a wallet-only app, or a blockchain visualizer). These applications might use [lbrycrd](//github.com/lbryio/lbrycrd), the blockchain daemon, or [chainquery](//github.com/lbryio/lbrycrd), which parses blockchain data into SQL.

Let's look at some specific types of applications and the basic design for each.

### Web Applications

#### Full Web Applications

By full web application, we mean a centrally-hosted web application that uses most or all of the suite of capabilities the LBRY protocol provides.
 
1. Pick your favorite language and stack and do your typical setup to get a "Hello World" application running.
1. Install [lbry-sdk](//github.com/lbryio/lbry). (Docker images? Other convenient ways of doing this?)
1. Bridging basics.
1. See SDK Basics

#### Blockchain Applications

1. Might not need SDK
1. Just use chainquery/lbrycrd

#### Other Web Applications

1. Do these exist?

### Desktop Applications

#### Electron Apps

1. Use electron-starter kit
1. (Explain basic development)

#### Other Applications

1. You can use whatever tooling you want
1. Use the SDK (see [SDK Basics](#SDK-basics))

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
