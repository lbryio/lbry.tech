"use strict";



//  V A R I A B L E

const links = [ // TODO: Update images
  {
    href: "https://chat.lbry.io",
    image: "http://static.simpledesktops.com/uploads/desktops/2016/12/05/Untitled-1-03-01.png",
    title: "Chat (Discord)"
  },
  {
    href: "https://discourse.lbry.io",
    image: "http://static.simpledesktops.com/uploads/desktops/2017/02/28/GeoShapes_2880x1800.png",
    title: "Developer Forum"
  },
  {
    href: "https://lbry.fund",
    image: "http://static.simpledesktops.com/uploads/desktops/2015/08/20/Sunset_by_Banned.png",
    title: "lbry.fund (Project Funding)"
  },
  {
    href: "https://www.reddit.com/r/lbry",
    image: "http://static.simpledesktops.com/uploads/desktops/2016/08/28/Wind-Vector-resize.png",
    title: "Reddit"
  },
  {
    href: "https://lbry.io/join-us",
    image: "http://static.simpledesktops.com/uploads/desktops/2015/09/25/Siri.png",
    title: "Join Our Team"
  },
  {
    href: "https://twitter.com/lbryio",
    image: "http://static.simpledesktops.com/static/images/sd-bg.png",
    title: "Twitter"
  }
];



//  E X P O R T

export default function () {
  const renderedLinks = [];
  let imageLink = "";

  for (const link of links) {
    if (link.image) imageLink = `<img alt="${link.title}" src="${link.image}"/>`;
    renderedLinks.push(returnLinkTemplate(link.href, link.title, imageLink));
  }

  return `
    <div class="feature-links">${renderedLinks.join("")}</div>
  `;
}



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
