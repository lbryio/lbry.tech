# Contributing

This project follows the global contributing standards for all LBRY projects, to read those go [here](https://lbry.io/faq/contributing).

You can contribute to this project by [creating a pull request](https://help.github.com/articles/creating-a-pull-request).

Want to contribute by editing the text content on the site? This is easy, as most of the pages are Markdown files. Just use the "Edit this page on Github" found at the bottom of every page on the website.



## Code Overview

This project is a JavaScript-based documentation website and includes both the back-end and front-end of the website at [lbry.tech](https://lbry.tech).



### Back-End

Node.js + [Fastify](https://www.fastify.io) handle the back-end of this site. All back-end functionality is in one file, [server.js](server.js). Additionally, the back-end works as a proxy for some basic LBRY daemon method calls at `daemon.lbry.tech`.



### Front-End

[choo](https://choo.io) handles the front-end of this site. Sass files are automatically compiled when edited.
