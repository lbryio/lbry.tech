---
title: Build
---

## THIS IS NOT DONE AT ALL AND IF YOU CONTINUE TO READ IT YOU MENTALLY ASSENT TO COMMITTING AT LEAST ONE CHANGE THAT MAKES IT BETTER

## Introduction
 
Want to build something on top of LBRY? This is the place to get started.

At least, it's the place to get started so long as you have some idea of what LBRY _is_. If you don't, you should read the
[Overview](/overview) first.

### When to Use LBRY

- You want to build an application that contributes to the world's knowledge, or benefits from global, shared discovery (flesh this out).
- You want to replace an existing centralized service related to digital content distribution with a decentralized/community-controlled one.

### When Not to Use LBRY

- You want to privately distribute data/information.
- You want to do illegal things.

## Application Basics

You can build many types of apps.

Most will use the [lbry-sdk](https://github.com/lbryio/lbry) as a way of accessing and communicating with the LBRY network.

Others might use lbrycrd, chainquery, lighthouse, torba, etc.

### Web Applications

#### Full Web Applications

1. Set up a web server.
1. Install lbry. (Docker images? Other convenient ways of doing this?)
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
