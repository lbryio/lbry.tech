"use strict";



//  E X P O R T

module.exports = exports = () => `
  <div class="ecosystem__module lbrycrd">
    <span class="__close" data-action="close">&times;</span>

    <h2 class="__title">
      <span data-action="open" data-target="lbrycrd">
        Blockchain
        <em>The foundation of the LBRY protocol</em>
      </span>

      <div>
        <span><a href="https://github.com/lbryio/lbrycrd" title="lbrycrd repo">lbrycrd</a></span>
      </div>
    </h2>

    <div class="ecosystem__module__details">
      <p><em>This section assumes "blockchain" already means something to you. If you're totally new, the key problem solved by blockhain is the ability for distributed, disparate entities to all agree on a rivalrous state of affairs. For a more comprehensive introduction to blockchain, try starting [here]</em></p>

      <p>LBRY uses a public, proof-of-work blockchain that is very similar to Bitcoin. The blockchain is the foundation of the protocol stack.</p>

      <p>The most salient feature of the LBRY blockchain is the association of a string of characters (a "name") with a structured set of metadata. This name can be accessed as a LBRY URL, e.g. <a class="__plain" href="/tour?url=hellolbry"><code>lbry://hellolbry</code></a></p>

      <p>The LBRY blockchain stores URLs and metadata in a Merkle tree. This allows LBRY URLs to be trustfully resolved even without a full copy of the blockchain.</p>

      <p>The metadata contains information about the content, such as the title, creator, price (if any), and a unique signature allowing the actual content to be fetched from the data network, the next level in the LBRY stack.</p>

      <h3>Additional Resources</h3>
      <ul>
        <li>See the <a href="https://lbry-whitepaper.herokuapp.com" title="Whitepaper">Whitepaper</a> for a more comprehensive introduction to the LBRY blockchain.</li>
        <li>See the <a href="/resources" title="">Resources</a> for documentation about the LBRY blockchain, including its API.</li>
        <li>See [[Naming]] for learning more about LBRY URLs and how they work.</li>
        <li>See [[Identities]] for learning how the LBRY blockchain handles publisher identities.</li>
      </ul>
    </div>
  </div>
`;
