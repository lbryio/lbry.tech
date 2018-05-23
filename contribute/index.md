---
contributing: true
title: Contributing
---

# Contributing to LBRY

Interested in working on the LBRY protocol, an official LBRY app, or other LBRY infrastructure? Awesome! This guide will get you started.

This guide is for contributing to the code bases maintained by the LBRY organization. For building on top of the LBRY protocol, see [Build](/build).

Contributors that provide accepted pull requests, well-specified issues, or assist in testing and quality assurance typically receive LBC tokens as appreciation.

## Ecosystem Overview

Typical usage of LBRY does not involve a single piece of software, but several interacting components.

If you want to contribute to LBRY, the first step is to understand where.

### Core Protocol Components

| Component | Language (Toolset) | What Is It
--- | --- | ---
| [lbrycrd](https://github.com/lbryio/lbrycrd) | C++ | A full node for the LBRY blockchain, including a standalone wallet. Used by miners and some applications. Most consumer applications do not bundle `lbrycrd` directly.
| [lbry](https://github.com/lbryio/lbry) | Python (Twisted) | A daemon that implements the LBRY protocol. Bundled with and/or used by most LBRY applications.
| [lbryum](https://github.com/lbryio/lbryum) | Python | The Simple Payment Verification (SPV) wallet bundled with `lbry`.
| [lbryum-server](https://github.com/lbryio/lbryschema) | Protobuf, Python |  The wallet server for the `lbryum` SPV wallet.
| [lbry-schema](https://github.com/lbryio/lbryschema) | Protobuf, Python | The structure of the metadata stored in the LBRY blockchain.

### Official Applications
| Application | Language (Toolset) | What Is It
--- | --- | ---
| [lbry-desktop](https://github.com/lbryio/lbry-desktop) | JavaScript (ReactJS, Electron) | A graphical browser for the LBRY protocol for Windows, macOS, and Linux. `lbry-desktop` bundles `lbry` and is primarily frontend code.
| [lbry-android](https://github.com/lbryio/lbry-app) | JavaScript (ReactNative), Python (kivy) | A graphical browser for the LBRY protocol for Android. `lbry-android` bundles `lbry` and is primarily frontend code.
| [lbry-redux](https://github.com/lbryio/lbry-app) | JavaScript (Redux) | A common codebase for shared Redux logic between `lbry-desktop` and `lbry-android`.
| [spee.ch](https://github.com/lbryio/spee.ch) | JavaScript (Node, ReactJS, Express) | A web-based host for free LBRY content. Usable directly as a content link dump site or as a customized, standalone install.

### Websites
| Domain | Language (Toolset) | What Is It
--- | --- | ---
| [lbry.tech](https://github.com/lbryio/lbry.tech) | JavaScript (Vue, Vuepress) | You're on it.
| [lbry.io](https://github.com/lbryio/lbry.io) | PHP (vanilla) | A website for LBRY end-users and creators.
| [lbry.fund](https://github.com/lbryio/lbry.fund) | HTML | A website for receiving funding from LBRY, Inc.

### Auxiliary Services and Applications
| Domain | Language (Toolset) | What Is It
--- | --- | ---
| [chainquery](https://github.com/lbryio/chainquery) | Go | A utility for parsing, extracting, and updating the LBRY blockchain into structured SQL data. Used by several internal tools and useful for 3rd-party application development.
| [lighthouse](https://github.com/lbryio/lighthouse) | JavaScript, ElasticSearch | A search service for the LBRY blockchain.
| Add more? chat/tip bots, explorer... |

## Coding

Several hundred extremely good-looking, intelligent and popular people, as well as our CTO, have contributed to LBRY. Join us!

Additionally, every technical employee of LBRY outside of the founding team started as a public contributor.

### How To Contribute Code

1. **Identify the component you want to work on**. LBRY has code bases in Python, JavaScript, PHP, and C++. See [Ecosystem Overview](#ecosystem-overview).
1. **Get set up.** Each repo has a `README.md` with clear instructions on how to get the repo up and running properly. Thanks, [Repository Standards](/repository-standards)!
1. **Find something to work on**. All actively developed repositories should have issues tagged "Good First Issues" specifically for new contributors. Some projects use a "level: n" tagging system, where lower numbers are simpler and higher numbers are more complex. Of course, you are also welcome to work on something not currently filed if you have your own idea! Additionally, all repositories have contact information for the maintainer if you have trouble finding an issue to work on.
1. **Abide coding and commit standards**. Any specific information necessary to know in this regard should be in the `README`.
1. **Commit early and ask questions**. Is an issue confusing? Please comment and say so! Not sure if you've got the right approach? Commit your code and we'll give feedback. Certain you're doing everything right? Commit it anyway. Once you commit, open a pull request. We encourage work-in-progress commits to let us know you're working on something and to facilitate feedback.
1. **Accept feedback and finish**. Most pull requests are reviewed within two business days. Once the repository maintainer has approved your contribution, it will get merged and we'll try really hard to give you LBC even if you say no.

## Designing

Web and application designers are requested to be able to work directly on CSS in the project they'd be contributing to. Please follow the [Coding](#Coding) instructions for any website or application you want to improve.

## Writing

Most written content at LBRY is checked into source control. To improve content we've written:

1. Identify which website or application it is in (see the [overview])(#ecosystem-overview).
1. Search for a quoted phrase of the content you want to change.
1. Edit the content via the GitHub interface and submit it as a pull request.

## Testing

If you want to contribute without getting directly into the code, one of the best ways you can contribute is testing.

A number of our code bases (`lbrycrd`, `lbry`, all applications, more...) go through regular release cycles where new versions are shipped every several weeks. Testing pre-release versions is a great way to help us identify issues and ship bug-free code.

For any projects that you want to be a tester on, "Watch" the repo on GitHub. You will receive an email with release notes whenever a release candidate is out.

For even harder-core testing, you can follow the `README` instructions in a project and test against the `master` branch of a project at any time. Additionally, `master` builds for some projects are always available via [releases.lbry.io](http://releases.lbry.io/).

Opening well-specified issues against release candidates or master builds is extremely useful in helping us create quality software.

**Note: that you perform testing at your own risk! If using release candidates and especially master builds, back up your wallet and be cautious.**

## Raising Issues

If you're about to raise an issue because you've found a problem with LBRY, or you'd like to request a new feature, or for any other reason, please read this first.

GitHub is the preferred channel for [bug reports](#report-a-bug) and [feature requests](#feature-requests).

### Reporting a Bug

A bug is a _demonstrable problem_ that is caused by the code in the repository. Good bug reports are extremely helpful - thank you!
Guidelines for bug reports:

1. **Identify the correct repo**. See [ecosystem overview](#ecosystem-overview). While it's okay if you get this wrong, it's a big help to us if you get it right.
2. **Use the GitHub issue search** &mdash; check if the issue has already been reported (or fixed). Be sure to include closed tickets in your search.
3. **Follow the instructions** - When you open an issue inside of GitHub, each repo contains a template for how to create a good bug report. Please follow it!

Well-specified bug reports save developers lots of time and are extremely appreciated, typically with an LBRY credit tip.

### Feature Requests

Feature requests are welcome. Before you submit one be sure to:

1. **Identify the correct repo**. See [ecosystem overview](#ecosystem-overview).
2. **Use the Github Issues search** and check the feature hasn't already been requested. Be sure to include closed tickets.
3. **Consider whether it's feasible** for us to tackle this feature in the next 6-12 months. The LBRY team is currently stretched thin just adding basic functionality. If this is a nice to have rather than a need, it is probably more clutter than helpful.
4. **Make a strong case** to convince the project's leaders of the merits of this feature. Please provide as much detail and context as possible. This means explaining the use case and why it is likely to be common.

## Tips

We offer LBC as a thank you to anyone who contributes to LBRY. While we think we're fair-to-generous in our tips, tipping is more about recognizing and appreciating what you've given to the community than providing compensation.

The amount of LBC is not typically specified in advance of a contribution, though if you're particularly motivated by this aspect you are welcome to ask.
