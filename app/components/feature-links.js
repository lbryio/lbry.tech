"use strict";



//  V A R I A B L E

const links = [ // TODO: Update images
  {
    href: "https://chat.lbry.io",
    image: "https://spee.ch/242c80dd57367cc3ad570560c177f5f3db5d7d81/Untitled-1-03-01.png",
    title: "Chat (Discord)"
  },
  {
    href: "https://discourse.lbry.io",
    image: "https://spee.ch/b10514a5e933d601509ca0cb2d7971e1c73912e2/GeoShapes2880x1800.png",
    title: "Developer Forum"
  },
  {
    href: "https://lbry.fund",
    image: "https://spee.ch/2dd7fb58272741ddaf86df07ead39852f19ea10b/SunsetbyBanned.png",
    title: "lbry.fund (Project Funding)"
  },
  {
    href: "https://www.reddit.com/r/lbry",
    image: "https://spee.ch/d445cab0f31d1b07a16ba7d0a9245feb9f05241e/Wind-Vector-resize.png",
    title: "Reddit"
  },
  {
    href: "https://lbry.io/join-us",
    image: "https://spee.ch/15ca6ae72f6361b7cd434e3f960536d652e00a0a/Siri.png",
    title: "Join Our Team"
  },
  {
    href: "https://twitter.com/lbryio",
    image: "https://spee.ch/660389650c32e656a1ea8b333a5f4cd228374b4a/sd-bg.png",
    title: "Twitter"
  },
   {
    href: "https://www.facebook.com/lbryio/",
    image: "https://spee.ch/660389650c32e656a1ea8b333a5f4cd228374b4a/sd-bg.png",
    title: "Facebook"
  }
];



//  E X P O R T

export default () => {
  const renderedLinks = [];
  let imageLink = "";

  for (const link of links) {
    if (link.image) imageLink = `<img alt="${link.title}" src="${link.image}"/>`;
    renderedLinks.push(returnLinkTemplate(link.href, link.title, imageLink));
  }

  return `
    <div class="feature-links">${renderedLinks.join("")}</div>
  `;
};



//  H E L P E R

function returnLinkTemplate(url, title, image) {
  return `
    <a class="feature-link" href="${url}" title="${title}">
      <h3 class="feature-link__title">
        <span class="feature-link__title-inner">${title}</span>
      </h3>

      <figure class="feature-link__background">
        ${image}
      </figure>
    </a>
  `;
}
