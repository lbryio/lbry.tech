---
title: Repository Documentation Standards
description: All repository documentation at LBRY complies with a single standard, outlined in this resource article.
---

This document outlines the standards for all public, open-source repositories used by LBRY.

The goal of this document is to ensure that LBRY documentation is welcoming, informative, comprehensive, and well-written.

Each codebase should include the following documents committed as markdown files at the top level of the repository:

## README.md

This document exists to introduce a project to a new visitor. It may also serve as a reference document for existing contributors. This document should include the following:

### Title / Heading

* The title (name) of the project at the top as an h1
* Any build status badges as appropriate immediately below the title
* A one or two sentence description of the project, below the title or status badges. The description should mention the language and any key frameworks (e.g. "lbry" should mention it uses both Python and Twisted)
* A screenshot, image, or gif of the project below the description (host it on spee.ch!)
* A table of contents if the document is long (can be one line of links to sections)

### Installation

* A single header labeled "Install" should be the next header as an h2
* Installation means installation for users. It should cover how to have the software on their computer in a user-friendly fashion, not how to run from source (e.g. it should link binaries if they exist)
* If the project is a library only intended to be used in other projects, it should still exist but can be extremely succinct (e.g. pip install lbryschema)
* If the project is not designed to be installed directly or used as a library in other projects, it should state as such (e.g. "This project is not designed to be installed directly. Continue reading below to learn how to use this project.”)

### Usage

* A single header labeled "Usage" should be the next header as an h2
* The Usage section should explain how to run or launch the project if applicable
* The Usage section should include examples of some basic commands if applicable
* In the case of a library, it should provide a few basic examples of how the library would be used
* Usage should always be included, even if it’s very simple (e.g. "Double click the installed application to browse with the LBRY network.”)

### Running from Source

* This section covers how to run the project from source and/or with the intent of working directly on it
* It can have a Prerequisites section for what is required to run from source
* It is okay to assume some basic assumptions about what people know about the language or tools the project uses. However, it’s good whenever possible to assume very little and provide links to the user for how to get the prerequisites
* For prerequisites for which it is not safe to assume knowledge of, the project should list the explicit command to add the prerequisite, or link to instructions on how to add the prerequisite
* If there are operating system specific instructions, these should be broken out into separate headings for each operating system
* It is okay to assume Linux and Unix are "first class citizens". While we want to support all OSs, Windows instructions and considerations can be secondary
* Include a step that explains how to verify you are running from source directly
* It is okay to point to a INSTALL.md file (which should reside in the root folder) if the installation steps are relatively lengthy

### Contributing

* A single header labeled "Contributing" should appear as an h2
* This should be the same message: "Contributions to this project are welcome, encouraged, and compensated. For more details, see *[CONTRIBUTING.md](CONTRIBUTING.md)*.”
* If CONTRIBUTING.md does not exist in the project, it should link to [https://lbry.com/faq/contributing](https://lbry.com/faq/contributing) (soon to be lbry.tech/contributing)

### (Additional Headings)

* Additional headings as appropriate will typically exist after the above and below the subsequent areas
* These areas should cover anything else appropriate or helpful to introduce a project to a new user

### License

* A single header labeled "License" should appear as an h2
* Assuming a standard license, this should be the same two sentences: "This project is X licensed. For the full license, see [LICENSE]."

### Security

* "We take security seriously. Please contact [security@lbry.com](mailto:security@lbry.com) regarding any security issues. Our PGP key is [here](https://lbry.com/faq/pgp-key) if you need it."

### Contact

* A single header labeled "Contact" should appear as an h2
* This should be the same or a similar message to the following: "The primary contact for this project is [@XXX](https://github.com/@XXX) ([xxx@lbry.com](mailto:xxx@lbry.com))"

### Additional Info and Links

* (optional)
* References to any additional documentation, such as generated API docs

## CONTRIBUTING.md

This document explains anything a visitor would need to know to contribute to the project.

This document should cover the following:

* First, it should contain a single sentence: "This project follows the global contributing standards for all LBRY projects, to read those go < here >.”
* A "Code Overview" section explaining some basic design choices and how to begin stepping through the code. An example would be explaining that Daemon.py is the primary entry point for the daemon code, and one can begin to trace through the code by looking for jsonrpc_xxx, where xxx is one of the api calls listed [here](https://lbry.com/api)
* A "Testing" section explaining how to run tests and stating that tests are necessary
* Information on how to submit pull requests, and what to expect afterwards (e.g. a link to our [branching doc](https://github.com/lbryio/lbry-sdk/wiki/Branching-and-Merging), commands to run before submitting PR, tests must pass, changelog entry, etc). If you find this gets repetitive, it may be best to link to a global doc
* Anything else a new visitor to a repository should know about contributing to that specific repository (linting, generating documentation, etc)

## LICENSE

Every repository should have a LICENSE file stating the license. The default license we use is MIT, and we license all code as MIT whenever possible.

Some code may use external libraries that prevent MIT licensing. If adding a license to a project for the first time that uses 3rd-party code, please ensure it is okay to actually MIT license it.

## ISSUE_TEMPLATE.md

A template for issues should exist to guide users in correctly filing them.

## Style and Formatting Notes

- Rely on autowrap instead of manually breaking up paragraphs with a carriage return.
