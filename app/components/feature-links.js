"use strict";



//  U T I L

const links = [
  {
    href: "https://chat.lbry.io",
    image: "https://spee.ch/b432346bfd641990f3dc3dbceda057b4ededa360/discord-bg.jpg",
    title: "Chat (Discord)"
  },
  {
    href: "https://discourse.lbry.io",
    image: "https://spee.ch/e59dcbe6a533934eb82e73bb335b7e43cb8a9f7d/atmosphere.png",
    title: "Developer Forum"
  },
  {
    href: "https://lbry.fund",
    image: "https://spee.ch/b29b4cb6495c9c2e6fc26113bcc92158ed408a35/pixelsunset.png",
    title: "lbry.fund (Project Funding)"
  },
  {
    href: "https://www.reddit.com/r/lbry",
    image: "https://spee.ch/2357ab1464bcbba3458f4eabdad9644bcfd6f491/lines.png",
    title: "Reddit"
  },
  {
    href: "https://lbry.io/join-us",
    image: "https://spee.ch/6db68b3ebf22386fcd9d04237d11bfaff5ba2a95/minimalisticrubikcube.png",
    title: "Join Our Team"
  },
  {
    href: "https://twitter.com/lbryio",
    image: "https://spee.ch/9c38db124b85736adbcca48cdf34877d2110bbcd/GeoShapes.png",
    title: "Twitter"
  },
  {
    href: "https://www.facebook.com/lbryio",
    image: "https://spee.ch/734404b89658e30af920829553b22d1742c0d99a/voice.png",
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
