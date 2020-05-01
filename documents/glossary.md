---
title: Glossary
description: lbry.tech sometimes uses acronyms and fancy words. This glossary converts our jargon into clarity.
---

This glossary will help you understand the exact meaning of LBRY and blockchain related terms.

We encourage the submission of changes and additions to this glossary.

<GlossaryToc/>

### Blob

The smallest unit of data in LBRY. Each blob is referenced by its [blob hash](#blob-hash), an SHA-384 hash of the blob contents. When files are uploaded to LBRY, they are split into blobs, which are then shared with other peers. See [Encoding](/spec#encoding) for more details.

### Blob Exchange Protocol

The peer-to-peer protocol that LBRY nodes use to upload and download blobs from each other. It handles data transfer, availability checking, and data price negotiation. The name is sometimes shortened to "BlobEx" or "blobex". [The spec](/spec#blob-exchange-protocol) has more info.

### Block

A data structure that consists of a block header and a list of transactions. Each block references one previous block, thus forming an ordered list called the blockchain.

### Block Header

The fields included at the top of each block. They are

- block version number
- hash of the previous block header
- hash of the transactions in the block
- root hash of the claimtrie, after all operations in the current block have been applied
- current timestamp in seconds
- current *target*
- *nonce*

### Block Height

The sequence number of a block in the blockchain. The first block is at height 0, the second is at height 1, and so on. Block 0 is called the [genesis block](#genesis-block).

### Blockchain

An open, distributed ledger that records transactions in a verifiable and change-resistant way. The LBRY blockchain serves as an index of the content available on the network, a payment system and record of purchases for priced content, and a source of cryptographic publisher identities.

### Canonical URL

Similar to the [Short URL](#short-url), but will include the channel for but for claims that are signed by channels. The canonical URL is generally the recommend URL to use when linking LBRY URLs or displaying URLs to users. Note that it is rarely possible for the canonical URL to change to a shorter version when a competeting channel or claim is abandoned, but even if this happens, older canonical URLs will still work.

### Chainquery

A tool that stores blockchain data in an SQL database, keeps the database up-to-date as the blockchain grows, and provides an API to access the data using standard SQL queries. 

[chainquery on github](https://github.com/lbryio/chainquery)

### Channel

The unit of identity in LBRY. A channel is established by publishing a special type of claim that contains a public key. Once a channel is created, content can be published "into" a channel by signing a piece of content with the private key that goes with a channel's public key. Channels allow publishers to build a brand and notify subscribers when new content is published. For details, see [Channels](/spec#channels).

### Claim

A [stake](#stake) that contains metadata about a stream or channel. Claims are stored in the claimtrie. More info at [Stake & Claims](/spec#stakes).

### Claimtrie

A claimtrie is a data structure used to store the set of all claims and prove the correctness of URL resolution. Full details at [Claimtrie](/spec#claimtrie).

### Claim Sequence

The order in which a claim for a particular name was created. Claim sequence is used in URLs to reference claims by their order. For example, the third claim for the name `hello` can be referenced by `lbry://hello:3`. See [Claim Sequence](/spec#claim-sequence) for more details.

### Cold Storage

A way to securely store digital information (e.g. private keys) by storing them on a medium that is not connected to the internet. This can take the form of an offline computer, USB key, hardware wallet, or even writing the data on a piece of paper.

### Confirmed Transaction

Transaction that has been included in the blockchain. Probability of transaction being rejected is measured in a number of confirmations. See [Confirmation](#confirmation).

### Confirmation

Transactions are confirmed when they have been included in a block that is part of the current "best" chain (the one with the highest total proof-of-work). A transaction in the most recent block of the chain is said to have 1 confirmation. A transaction in the previous block has 2 confirmations, and so on. A transaction that has not yet been included has zero confirmations, or is unconfirmed. Confirmation is not a guarantee that a transaction is final. Rather, the number describes the probability that a confirmation is final. Higher numbers increase the probability exponentially.

### Consensus

A set of rules that are used by blockchain nodes to determine whether a block is valid.

### Content Blob

A blob that contains part of a published file.

### Dewey

The name of the smallest unit of currency in LBRY. 1 LBRY Credit (LBC) is equal to 100 million deweys. The name comes from the [classification system](https://en.wikipedia.org/wiki/Dewey_Decimal_Classification) used by libraries to organize their collections.

### Effective Amount

The sum of the amount of an active claim and all of its active supports. The effective amount affects which claim is controlling for a name. Claims that are not active have an effective amount of 0.

### Fee

The price, set by the publisher, that must be paid before a piece of content can be downloaded. Free content has a fee of 0.

### Full Node

A node which can definitively decide whether a transaction is valid or not, without having to trust another source. Full nodes usually implement the full LBRY blockchain protocol and possess a full copy of the blockchain data. Compare with [SPV node](#simplified-payment-verification).

### Genesis Block

The first block in the blockchain. The genesis block is not mined, but is hard-coded into the protocol. It has no reference to a previous block. The LBRY genesis block was released on [28 Oct 2015](https://explorer.lbry.com/blocks/0). The first real block was mined was on [23 Jun 2016](https://explorer.lbry.com/blocks/1).


#### Hard Fork 

A change to the consensus rules such that a block that would have been considered invalid under the old rules is now considered valid under the new rules. Nodes that choose to adopt the hard fork will have to upgrade to the new rules in order to stay on the network. Nodes that refuse to adopt the new rules may continue to use the old rules. If a significant number of nodes are running both versions of the rules at once, the chain may split into two incompatible chains.

### Hashrate

A measure of mining hardware performance expressed in hashes per second (H/s). Click [here](https://www.tokens24.com/cryptopedia/basics/bitcoin-hash-rate) for more details.

### LBC

The currency code for [LBRY Credit](#lbry-credits).

### lbrycrd

lbrycrd is the authoritative implementation of the LBRY [blockchain](#blockchain) protocol. See [the source code](https://github.com/lbryio/lbrycrd), [the API](/api/blockchain), or [the formal specification](/spec).

### lbry-sdk

The SDK is three things:

- an implementation of the full LBRY protocol specification, except the blockchain protocol.
- components that are not part of the spec but are useful for developing applications using the protocol
- a daemon that participates in the LBRY data network and provides an API for interacting with the protocol

See [the source code](https://github.com/lbryio/lbry-sdk) or [the API documentation](/api/sdk).

### LBRY Credits

LBRY Credits are the cryptocurrency used to make digital transactions on the blockchain.

### Mainnet

Main LBRY network and its blockchain. The term is mostly used in comparison to [testnet](#testnet).

### Manifest

The first blob in a stream. The manifest contains information necessary to find the content blobs and decode them into a file. See [Streams](/spec#streams) in the specification.

### Mempool

The collection of unconfirmed transactions stored by a node until they either expire or get included in the blockchain.

### Node

A node, or client, is a program that implements LBRY. LBRY has two types of nodes: blockchain node and dht nodes. A single program may be both at once.

### Outpoint

The combination of a transaction ID and an index which refers to a particular transaction output. An outpoint is the most specific way to refer to a version of a claim. In contrast, the claim ID is used to refer to the latest version of a claim.

### Peer

A node that is connected to the global network and is responding to protocol requests. LBRY is a peer-to-peer network, which means that nodes connect to each other to perform network operations. A single node may sometimes act as a client and sometimes as a server.

### Permissionless

A system is permissionless if it can be joined, interacted with, or used without the explicit authorization of any party, nor can any party revoke the ability to use the system. 

An open system with no centralized control is permissionless. Examples include HTTP and Bitcoin.

### README

A file included with each LBRY project that contains basic information about that project. More in (/resources/repository-standards).

### Reflector

A long-running node that accepts blobs for upload and rehosts them on the network.

### Resolve (or URL Resolution) {#resolve}

The process of translating a URL into the associated claim ID and metadata. See [Resolution](/spec#resolution) for details.

### Schema

A definition of the structure of the metadata that is stored in claims in the blockchain.  See [Metadata](/spec#metadata) for more information.

### Simplified Payment Verification

A scheme to validate transactions without storing the whole blockchain.

### Short URL

The shortest [URL](https://spec.lbry.com/#urls), not including the [channel](#channel), that will [resolve](#resolve) to the correct claim (i.e. lbry://cats#c, returning lbry://cats#ca43e2b6db155177564e574b09dfedc7588816ef or lbry://@cats#0 returning lbry://@cats#0893dbed95307c4b27aadbcb1cc6cb593810b3f9). This is determined on a first come, first serve basis on claim id collisions. A short URL with more than one identifier may change to include only a single identifier if the previous claim, which had the single identifier, is deleted. 

### SPV

SPV is an abbreviation for [Simplified Payment Verification](#simplified-payment-verification).

### Stake

An entry in the blockchain that sets aside some credits and associates them with a name. [Claims](#claim) and [supports](#support) are types of stakes.

### Stream

A set of blobs that can be reassembled into a file. Every stream has one or more content blobs which contain the published file, and a manifest blob which contains a list of the content blob hashes.

### Stream Descriptor

A deprecated term that means the same thing as the [manifest](#manifest).

### Stream Hash

The SHA-384 hash of the stream [manifest](#manifest). The stream hash is a unique identifier for the stream.

### Stream Key

The cryptographic key needed to decrypt the content blobs of a stream. The stream key may be stored in the stream manifest, or may be stored by a third party and made available to a client in exchange for proof that the content was purchased.

### Support

A [stake](#stake) that lends its credits to bolster a claim. A support increases the *effective amount* of a claim, helping it compete for control of the claim's name. See [Supports](/spec#supports) for more on how they work.

### Testnet

A parallel LBRY blockchain, used for testing and development. Testnet is like [mainnet](#mainnet), but has a different genesis block and uses a slightly different address format to avoid confusion with main LBRY addresses. The testnet currency has no realworld value.

### Torba

An [SPV](#spv) wallet for the [blockchain](#blockchain). See the [source code](https://github.com/lbryio/lbry-sdk).

### Transaction

A change to the state of the blockchain. Transactions move credits from one address to another. They may also make changes to the claimtrie, such as creating or updating a claim.

### Transaction Fee

The fee paid to a miner for including a transaction in a block. Miners are incentivized to include transactions with higher fees. When blocks are full, lower-fee transactions may have to wait longer to be included.

### Wallet

An application or a service that stores private keys and generates and signs transactions. Wallets do not store LBRY Credits themselves (those are recorded as transactions in the global blockchain). "Storing LBC" usually means storing the private keys that control the credits.

