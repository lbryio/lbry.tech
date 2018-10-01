"use strict";

import html from "choo/html";
import linkGrid from "../components/link-grid";

module.exports = exports = () => html`
  <div>
    <section class="hero">
      <div>
        <h1>
          LBRY is a free, open, and community-run digital marketplace.<br/>
          Build the future of content freedom.
        </h1>
      </div>
    </section>

    <section class="features">
      ${linkGrid([
    {
      description: "Get your head around LBRY with 3 interactive examples.",
      destination: "/playground",
      label: "Party in the Playground",
      title: "Learn By Trying"
    },
    {
      description: "Dig into the formal specification of the LBRY protocol.",
      destination: "/whitepaper",
      label: "Wisdom of the Whitepaper",
      title: "Learn By Reading"
    }
  ])}
    </section>

    <section class="intro">
      <div class="inner-wrap">
        <h3>Overview</h3>
        <p>What if anyone in the world could publish a piece of digital content, anyone else in the world could access it, for free or for payment, and that entire system worked end-to-end without any centralized authority or point of control?</p>
        <a class="cta" href="/overview">Observe the Overview</a>
      </div>
    </section>

    <section class="docs">
      <div class="inner-wrap">
        <h3>Resources</h3>
        <p>Looking for API documentation, formal specifications, how-tos, resources, or the meaning of life? Find at least some of these things in the resources area.</p>
        <a class="cta" href="/resources">Roam to Resources</a>
      </div>
    </section>

    <div id="github-feed" class="github-feed">
      <h3>GitHub</h3>
      <h5 class="last-updated">Unable to fetch latest GitHub data</h5>
    </div>

    <section class="contribute">
      <div class="inner-wrap">
        <h3>Contribute</h3>
        <p>No matter your experience or skill level, <em>you</em> can progress content freedom.</p>

        <ul>
          <li><a href="" title="">Coding</a></li>
          <li><a href="" title="">Creative</a></li>
          <li><a href="" title="">Writing</a></li>
          <li><a href="" title="">Testing</a></li>
        </ul>
        <p>
         <a class="cta" href="/contribute">Collaborate with Contributors</a>
        </p>
      </div>
    </section>

    <section class="community">
      <div class="inner-wrap">
        <h3>Community</h3>
        <p>There's literally <a href="https://spee.ch/@lbrytech/dozens.mp4">12<sup>n</sup></a> of us.</p>

        <ul>
          <li><a href="//chat.lbry.io" title="LBRY on Discord">Chat</a></li>
          <li><a href="//discourse.lbry.io" title="LBRY on Discourse">Forum</a></li>
          <li><a href="//www.reddit.com/r/lbry" title="LBRY on Reddit">Reddit</a></li>
        </ul>
      </div>
    </section>
  </div>

  <script>
    $(function () {
      send(JSON.stringify({
        "message": "landed on homepage"
      }));
    });

    document.getElementsByTagName("body")[0].classList.add("home"); // TODO: make this happen in components/layout
  </script>
`;
