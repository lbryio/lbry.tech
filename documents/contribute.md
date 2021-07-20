---
title: Contributor's Guide
description: Learn how to be a contributor to core and auxiliary LBRY components in this guide. Everything LBRY builds is open-source, be a part of it!
---

## Welcome to LBRY!

Interested in working on the LBRY protocol, an official LBRY app, or other LBRY infrastructure? Awesome! This guide will get you started.

This is a guide for contributing to the code bases maintained by the LBRY organization by [Coding](#coding), [Designing](#designing), [Writing](#writing), and [Testing](#testing).

Contributors that provide accepted pull requests, well-specified issues, or assist in testing and quality assurance typically receive LBC tokens as [appreciation](#appreciation).

## Repository Overview

Typical usage of LBRY does not involve a single piece of software, but several interacting components. If you're new to LBRY, our [Ecosystem Overview](/overview#ecosystem-overview) will teach you how various components interact.

If you want to contribute to LBRY, there's definitely something for you! The first step is to figure out what project to work on.

### Core Protocol Components

| Component | Language (Toolset) | What Is It | Intro Video
--- | --- | --- | ---
| [lbrycrd](https://github.com/lbryio/lbrycrd) | C++ | A full node for the LBRY blockchain, including a standalone wallet. Used by miners and some applications. Most consumer applications do not bundle [[lbrycrd]] directly, and instead bundle [[lbry-sdk]]. | [Video](/resources/video-lbrycrd)
| [lbry-sdk](https://github.com/lbryio/lbry-sdk) | Python (asyncio) | A daemon that can be used directly or to develop other applications. Provides convenience [APIs](/api/sdk), bundles an SPV wallet client and server, and contains an implementation of the LBRY data network. | [Video](/resources/video-lbrysdk)
| [schema](https://github.com/lbryio/lbry-sdk/tree/master/lbry/schema) | Protobuf, Python | Defines the structure of the metadata stored in the LBRY blockchain. | |

### Official Applications
| Application | Language (Toolset) | What Is It | Intro Video
--- | --- | --- | ---
| [lbry-desktop](https://github.com/lbryio/lbry-desktop) (and lbry.tv) | JavaScript (ReactJS, Electron) | A desktop browser for the LBRY network for Windows, macOS, and Linux as well as a web interface on lbry.tv. [[lbry-desktop]] is built with [[lbry-sdk]]. | [Video](/resources/video-lbrydesktop)
| [lbry-android](https://github.com/lbryio/lbry-android) | Java | A graphical browser for the LBRY network for Android. [[lbry-android]] uses [[lbry-sdk]] to interact with the network. | [Video](/resources/video-lbryandroid)
| [odysee-api](https://github.com/lbryio/odysee-api) | Go | An API server for https://odysee.com that reimplements some of the SDK APIs. | |
| [odysee-ios](https://github.com/lbryio/odysee-ios) | Swift | The Odysee IOS app. | |
| [lbry-redux](https://github.com/lbryio/lbry-redux) | JavaScript (Redux) | A common codebase for shared Redux logic between [[lbry-desktop]] and [[lbry-android]]. | |

### Websites
| Domain | Language (Toolset) | What Is It
--- | --- | ---
| [lbry.tech](https://github.com/lbryio/lbry.tech) | JavaScript (Node, Choo) | You're on it.
| [lbry.com](https://github.com/lbryio/lbry.com) | PHP (vanilla) | A website for LBRY end-users and creators.

### Auxiliary Services and Applications
| Domain | Language (Toolset) | What Is It
--- | --- | ---
| [chainquery](https://github.com/lbryio/chainquery) | Go | A utility for parsing, extracting, and updating the LBRY blockchain into structured SQL data. Used by several internal tools and useful for 3rd-party application development.
| [lighthouse](https://github.com/lbryio/lighthouse) | Go, ElasticSearch | A search service for the LBRY blockchain.
| [wunderbot](https://github.com/lbryio/lbry-wunderbot) | JavaScript (Node) | A chatbot used by the LBRY discord.
| [block-explorer](https://github.com/lbryio/block-explorer) | PHP (vanilla) | A blockchain explorer for the LBRY blockchain.

## Coding

Several hundred extremely good-looking, wise and moral people, as well as our CTO, have contributed to LBRY. Join us!

### How To Contribute Code

1. **Join the Community**. By joining our [chat](https://chat.lbry.com) or our [forum](https://discourse.lbry.com), you can interact with other developers when you have questions, ideas, or problems.
1. **Identify the component you want to work on**. LBRY has code bases that deal with everything from cryptography and distributed systems to end-user graphic user-interfaces. We use Python, JavaScript, C++, Go, and more. See [ecosystem overview](#ecosystem-overview) to find the right project.
1. **Get set up.** Each repo has a [[README]] with clear instructions on how to get the repo up and running properly. Thanks, [Repository Standards](https://lbry.tech/resources/repository-standards)!
1. **Find something to work on**. All actively developed repositories should have issues tagged "Good First Issues" specifically for new contributors. You are also welcome to work on something not currently filed if you have your own idea. Additionally, all repositories have contact information for the maintainer if you have trouble finding an issue to work on.
1. **Abide coding and commit standards**. Any specific information necessary to know in this regard should be in the project [[README]].
1. **Commit early and ask questions**. Is an issue confusing? Please comment and say so! Not sure if you've got the right approach? Commit your code and we'll give feedback. Certain you're doing everything right? Commit it anyway. Once you commit, open a pull request. We encourage work-in-progress commits to let us know you're working on something and to facilitate feedback.
1. **Accept feedback and finish**. Most pull requests are reviewed within two business days. Once the repository maintainer has approved your contribution, it will get merged and we'll try really hard to give you LBC even if you say no.

## Designing

Web and application designers are requested to be able to work directly on CSS in the project they'd be contributing to. Please follow the [Coding](#coding) instructions for any website or application you want to improve.

We're happy to provide assistance if you're used to working in HTML and CSS but are having trouble getting started. Check out [our chat](https://chat.lbry.com) or [our forum](https://discourse.lbry.com).

## Writing

Most written content, and especially all technical writing, is checked into source control. To improve content we've written or add new content:

1. Identify which website or application it is in (see the [overview](#ecosystem-overview)).
1. Search for a quoted phrase of the content you want to change (or use the same technique to identify the folder to create a new document in).
1. Edit the content via the GitHub interface and submit it as a pull request.

### Translating

Translation work is primarily organized through the [LBRY Foundation](https://lbry.org). For the current instructions on participating, see [their article](http://wiki.lbry.org/Translations).

## Testing

If you want to contribute without getting directly into the code, one of the best ways you can contribute is testing.

A number of our code bases ([[lbrycrd]], [[lbry-sdk]], all applications, more...) go through regular release cycles where new versions are shipped every several weeks. Testing pre-release versions is a great way to help us identify issues and ship bug-free code.

### Ways to Test

- "Watch" the repo on GitHub. You will receive an email with release notes whenever a release candidate is out and you can [raise an issue](#raising-issues).
- Join the #early-testing channel in our [chat](https://chat.lbry.com).
- For the hardcore, run master from source and/or the latest builds from [build.lbry.io](http://build.lbry.io).

Opening well-specified issues against release candidates or master builds is extremely useful in helping us create quality software.

**Note: Please do not use wallets with substantial sums when testing. If using release candidates and especially master builds, back up your wallet and be cautious. While a substantial bug, like one that caused loss of funds, would merit significant [Appreciation](#appreciation), you perform testing at your own risk.**

## Raising Issues

All [bug reports](#reporting-a-bug) and [feature requests](#feature-requests) are managed through GitHub.

If you're about to raise an issue because you've found a problem with LBRY, or you'd like to request a new feature, or for any other reason, please read this first.

### Reporting a Bug

A bug is a _demonstrable problem_ that is caused by the code in the repository. Good bug reports are extremely helpful - thank you!
Guidelines for bug reports:

1. **Identify the correct repo**. See [repository overview](#repository-overview). While it's okay if you get this wrong, it's a big help to us if you get it right.
2. **Check if the issue exists**. Please do a quick search to see if the issue has been reported (or fixed), including closed tickets.
3. **Follow the instructions** - When you open an issue inside of GitHub, each repo contains a template for how to create a good bug report. Santa _loves_ people who follow it.

Well-specified bug reports save developers lots of time and are [appreciated](#appreciation).

### Feature Requests

Feature requests are welcome. Before you submit one be sure to:

1. **Identify the correct repo**. See [repository overview](#repository-overview).
2. **Use the Github Issues search** and check the feature hasn't already been requested. Be sure to include closed tickets.
3. **Consider whether it's feasible** for us to tackle this feature in the next 6-12 months. The LBRY team is currently stretched thin just adding basic functionality. If this is a nice to have rather than a need, it is probably more clutter than helpful.
4. **Make a strong case** to convince the project's leaders of the merits of this feature. Please provide as much detail and context as possible. This means explaining the use case and why it is likely to be common.

### Discussion and Help

Sometimes, you may have a problem but an issue isn't appropriate (or you're not sure if it's a real issue).

Join our [chat](https://chat.lbry.com), our [forum](https://discourse.lbry.com), or another [community](https://lbry.tech/community) and talk to others about it.

## Appreciation

We offer LBC as a gesture of our appreciation to anyone who contributes to LBRY. While we're generous in what we send, it is more about recognizing and appreciating what you've given to the community than providing compensation.

The amount of LBC is not typically specified in advance of a contribution, though if you're particularly motivated by this aspect you are welcome to ask.
