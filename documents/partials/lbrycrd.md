_This section assumes "blockchain" already means something to you. If you're totally new, the key problem solved by blockhain is the ability for distributed, disparate entities to all agree on a rivalrous state of affairs. For a more comprehensive introduction to blockchain, try starting [here](https://lopp.net/bitcoin.html)_

LBRY uses a public, proof-of-work blockchain that is very similar to Bitcoin. The blockchain is the foundation of the protocol stack.

The most salient feature of the LBRY blockchain is the association of a normalized string of characters (a "name") with a structured set of metadata. This coupling is called a [[claim]]. The content referenced by a claim can be accessed as a LBRY URL, e.g. [lbry://hellolbry](/playground?url=hellolbry).

The LBRY blockchain stores names and metadata in a parallel [[Merkle tree]], separate from the tree used to store transaction data. This allows LBRY URLs to be trustfully resolved even without a full copy of the blockchain.

The metadata contains information about the content, such as the title, creator, price (if any), and a unique signature allowing the actual content to be fetched from the data network, the next level in the LBRY stack.

### Additional Resources

*   See the [Whitepaper](/whitepaper "Whitepaper") for a more comprehensive introduction to the LBRY blockchain.
*   See the [Resources](/resources) for documentation about the LBRY blockchain, including its API.
*   See [[Naming]] for learning more about LBRY URLs and how they work.
*   See [[Identities]] for learning how the LBRY blockchain handles publisher identities.
