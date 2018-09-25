"use strict";

//  V A R I A B L E

const links = [ // TODO: Update images
  {
    href: "https://chat.lbry.io",
    image: "http://static.simpledesktops.com/static/images/sd-bg.png",
    title: "Join us in chat"
  },
  {
    href: "https://lbry.io/developer",
    image: "http://static.simpledesktops.com/uploads/desktops/2017/02/28/GeoShapes_2880x1800.png",
    title: "Join the developer email list"
  },
  {
    href: "https://lbry.io/meet",
    image: "http://static.simpledesktops.com/uploads/desktops/2016/12/05/Untitled-1-03-01.png",
    title: "Host a meet-up"
  },
  {
    href: "https://www.reddit.com/r/lbry",
    image: "http://static.simpledesktops.com/uploads/desktops/2016/08/28/Wind-Vector-resize.png",
    title: "Reddit"
  },
  {
    href: "https://lbry.fund",
    image: "http://static.simpledesktops.com/uploads/desktops/2015/08/20/Sunset_by_Banned.png",
    title: "Get funding for a project"
  },
  {
    href: "https://lbry.io/join-us",
    image: "http://static.simpledesktops.com/uploads/desktops/2015/09/25/Siri.png",
    title: "Get a job"
  },
  {
    href: "https://twitter.com/lbryio",
    title: "Twitter"
  }
];

export default function () {
  const renderedLinks = [];
  let imageLink = "";

  for (const link of links) {
    if (link.image) imageLink = `<img alt="${link.title}" src="${link.image}"/>`;
    renderedLinks.push(returnLinkTemplate(link.href, link.title, imageLink));
  }

  return `
    <ul class="feature-links">${renderedLinks.join("")}</ul>
  `;
};

function returnLinkTemplate(url, title, image) {
  return `
    <li class="feature-link">
      <div>
        <a class="feature-link__title" href="${url}" title="${title}">${title}</a>
      </div>

      <figure class="feature-link__background">
        ${image}
      </figure>
    </li>
  `;
}
