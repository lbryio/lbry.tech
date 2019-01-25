---
title: LBRY Glossary
---

This glossary will help you understand the exact meaning of LBRY and blockchain related terms.

We encourage the submission of changes and additions to this glossary.

<GlossaryToc/>

### Blob

A Binary Large Object (BLOB) is a collection of binary data stored as a single entity in a database management system. When files are uploaded to the LBRY peer to peer network, they are broken down into 2MB encrypted blobs which are then shared to other peers.  

A [manifest](#manifest) blob is also created to index the multiple content blobs that were created from the file.  A [stream](#stream) is the collection of all these blobs particlar to one published file.  See [Encoding](https://spec.lbry.io/#encoding) in the specification.

### Block

A data structure that consists of a *block header* and a *Merkle tree* of transactions. Each block (except for *genesis block*) references one previous block, thus forming a tree called the *blockchain*. Block can be thought of as a group of transactions with a timestamp and a *proof-of-work* attached.

### Block Header

A data structure containing a previous block hash, a hash of a Merkle tree of transactions, a timestamp, a *difficulty* and a *nonce*.

### Block Height

The sequence number of a block in the blockchain. Height 0 refers to the *genesis block*. Several blocks may share the same height (see *Orphan*), but only one of them belongs to the *main chain*. Block height is used in *Lock time*.

### Blockchain

A public ledger of all confirmed transactions in a form of a tree of all valid *blocks* (including *orphans*). Most of the time, "blockchain" means the *main chain*, a single most *difficult* chain of blocks. Blockchain is updated by *mining* blocks with new transactions. *Unconfirmed transactions* are not part of the blockchain. If some clients disagree on which chain is main or which blocks are valid, a *fork* happens.

### Chainquery

Chainquery provides a SQLized view of the LBRY blockchain. The model of Chainquery at its foundation consists of the fundamental data types found in the block chain. This information is then expounded on with additional columns and tables that make querying the data much easier. Chainquery consists of 4 main parts: the API Server, the Daemon, the Job Scheduler, and the upgrade manager.

### Change

Informal name for a portion of a *transaction output* that is returned to a sender as a "change" after spending that output. Since *transaction outputs* cannot be partially spent, one can spend 1 BTC out of 3 BTC output only be creating two new outputs: a "payment" output with 1 BTC sent to a payee address, and a "change" output with remaining 2 BTC (minus *transaction fees*) sent to the payer's addresses.

### Channel Claim Signature

Creating a channel claim certificate allows you to group and identify claims based on an identity. A certificate is used to sign the claims and ensure uniqueness along with the claim ID. See [channel signing](https://lbry.tech/resources/signing-claim) for more information.

### Claim

A claim (ClaimTrie) is the data structure which LBRY uses to store claims to names. It uses a trie to efficiently store all claimed names, which can then be hashed the same way a Merkle tree is hashed. The root hash of the ClaimTrie is stored in the block header of each LBRY block, enabling nodes in the LBRY network to efficiently and securely validate the state of the ClaimTrie.  See [Stake & Claims](https://spec.lbry.io/#stakes) in the specification and [Read more](https://lbry.io/faq/claimtrie-implementation)

### Claim Deposit

When creating a channel claim or publishing content onto the LBRY blockchain, a small amount LBC (or more) must be deposited to reserve the name space in the claimtrie. See [Stake & Claims](https://spec.lbry.io/#stakes) in the specification and [naming documentation](https://lbry.io/faq/naming) for more information.

### Claim Sequence

The claim sequence provides a way to determine which order a claim was created at a particular claim name and enables claim resolution via this modifier. If someone had the first claim at lbry://one, anyone could reference that claim as `lbry://one:1`. See [Stake & Claims](https://spec.lbry.io/#stakes) in the specification and [URI documentation](https://lbry.tech/resources/uri) for more details.

### Claim Support

A special type of transaction that includes claim information, a LBC address, and a LBC value. Supports to one's own address increase the bid value of a claim and can be revoked anytime. Supports to an outside address also increase the value, but can only be revoked by the receiver (tip mechanism).  See [supports](https://spec.lbry.io/#supports) in the specification.

### Cold Storage

A collective term for various security measures to reduce the risk of remote access to the private keys. It could be a normal computer disconnected from the internet, or a dedicated hardware wallet, or a USB stick with a wallet file, or a *paper wallet*.

### Confirmed Transaction

Transaction that has been included in the blockchain. Probability of transaction being rejected is measured in a number of confirmations. See *Confirmation Number*.

### Confirmation Number

Confirmation number is a measure of the probability that a transaction could be rejected from the *main chain*. "Zero confirmations" means that the transaction is *unconfirmed* (not in any block yet). One confirmation means that the transaction is included in the latest block in the main chain. Two confirmations means the transaction is included in the block right before the latest one. And so on. Probability of transaction being reversed (*"double spent"*) is diminishing exponentially with more blocks added "on top" of it.

### Content Blob

A blob that contains an encrypted & encoded chunk of the content file.  Every stream must have at least two blobs - the manifest blob and, at least, one content blob. 

### Dewey

[A library classification system](https://en.wikipedia.org/wiki/Dewey_Decimal_Classification) and also the name of the smallest unit used in transactions. 1 LBRY Credit (LBC) is equal to 100 million deweys.

### Difficulty

Difficulty is a measure of how difficult it is to find a new block compared to the easiest it can ever be. By definition, it is a maximum *target* divided by the current target. Difficulty is used in two LBRY rules: 1) every block must meet difficulty target to ensure 2.5 minute interval between blocks and 2) transactions are considered confirmed only when they belong to a *main chain* which is the one with the biggest cumulative difficulty of all blocks.

### Depth

Depth refers to a place in the blockchain. A transaction with 6 *confirmations* can also be called "6 blocks deep".

### Deterministic Wallet

A collective term for different ways to generate a sequence of *private keys* and/or *public keys*. Deterministic wallet does not need a *Key Pool*. The simplest form of a deterministic wallet is based on hashing a secret string concatenated with a key number. For each number the resulting hash is used as a private key (public key is derived from it). More complex scheme uses *elliptic curve arithmetic* to derive sequences of public and private keys separately, which allows the generation of new *addresses* for every payment request without storing private keys on a web server. [More information on Bitcoin Wiki](https://en.bitcoin.it/wiki/Deterministic_wallet). See also *Wallet*.

### Dust

A transaction output that is smaller than the typical fee required to spend it. This is not a strict part of the protocol, as any amount more than zero is valid.

### ECDSA

Stands for *Elliptic Curve Digital Signature Algorithm*. Used to verify transaction ownership when making a transfer of bitcoins. See *Signature*.

### Effective Amount

The total LBC amount assigned to a claim, including the original bid and any tips/supports. During a vanity URL takeover, the effective amount is shown as 0.

### Elliptic Curve Arithmetic

A set of mathematical operations defined on a group of points on a 2D elliptic curve. LBRY, similar to the Bitcoin protocol, uses a predefined curve [secp256k1](https://en.bitcoin.it/wiki/Secp256k1). Here's the simplest possible explanation of the operations: you can add and subtract points and multiply them by an integer. Dividing by an integer is computationally infeasible (otherwise cryptographic signatures won't work). The private key is a 256-bit integer and the public key is a product of a predefined point G ("generator") by that integer: A = G * a. Associativity law allows implementing interesting cryptographic schemes like Diffie-Hellman key exchange (ECDH): two parties with private keys *a* and *b* may exchange their public keys *A* and *B* to compute a shared secret point `C: C = A * b = B * a` because `(G * a) * b == (G * b) * a`. Then this point C can be used as an AES encryption key to protect their communication channel.

### Fork

Refers either to a fork of a source code or, more often, to a split of the blockchain when two different parts of the network see different main chains. In a sense, fork occurs every time two blocks of the same height are created at the same time. Both blocks always have the different hashes (and therefore different difficulty), so when a node sees both of them, it will always choose the most difficult one. However, before both blocks arrive to a majority of nodes, two parts of the network will see different blocks as tips of the main chain.

### Full Node

A *node* which implements all of LBRY blockchain and does not require trusting any external service to validate transactions. It is able to download and validate the entire *blockchain*. All full nodes implement the same peer-to-peer messaging protocol to exchange transactions and blocks, but that is not a requirement. A full node may receive and validate data using any protocol and from any source. However, the highest security is achieved by being able to communicate as fast as possible with as many nodes as possible.

### Genesis Block

A very first block in the blockchain with hard-coded contents and a all-zero reference to a previous block. The LBRY genesis block was released on [28 Oct 2015](https://explorer.lbry.io/blocks/0) and the first block mined was on [23 Jun 2016](https://explorer.lbry.io/blocks/1).

### Hard Fork

Some people use term *hard fork* to stress that changing LBRY protocol requires an overwhelming majority to agree with it, or some noticeable part of the economy will continue with original blockchain following the old rules. See *Fork* and *Soft Fork* for further discussion.

### Hash Function

LBRY POW calculation uses three cryptographic hash functions: SHA-512, SHA-256 and RIPEMD-160. Click [here](https://lbry.io/faq/proof-algorithm) for more details.

### Hashrate

A measure of mining hardware performance expressed in hashes per second (GH/s). Click [here](https://www.tokens24.com/cryptopedia/basics/bitcoin-hash-rate) for more details.

### Key

Could mean an ECDSA public or private key, or an AES symmetric encryption key. AES is not used in the protocol itself (it only encrypts the ECDSA keys and other sensitive data), so usually the word *key* means an ECDSA key. When talking about *keys*, people usually mean private keys as public keys can always be derived from a private one. See also *Private Key* and *Public Key*.

### Key fee

The content price, set by the publisher, in order to download a claim. The key fee is paid once any part of the data is able to be downloaded.

### LBC

The currency code for 1 LBRY Credit (defined as 100 000 000 *deweys*).

### lbrycrd

lbrycrd is the authoritative implementation of the LBRY [blockchain](#blockchain) protocol. See [the source code](https://github.com/lbryio/lbrycrd), [the API](/api/blockchain), or [the whitepaper](/whitepaper).

### lbry-sdk

An [SDK](#sdk) for the LBRY protocol that can also be used independently. Distributed as a daemon or bundled directly, it contains a set of convenience methods for developing applications, and bundles an [SPV](#spv) wallet as well as implementation of the data network.

See [the source code](https://github.com/lbryio/lbry) or [the API documentation](/api/sdk).

### LBRY Credits

LBRY Credits (LBC) is the cryptocurrency used to make digital transactions (payments, tips, claims) on the LBRY blockchain.

### LBRY Daemon

The daemon combines various components to provide a single API across the LBRY ecosystem in order to interact with the blockchain and datanetwork.

### LBRY Redux

[lbry-redux](https://github.com/lbryio/lbry-redux) is a module which contains common React and redux code shared between lbry-desktop and lbry-android.

### LBRY Protocol

LBRY is an open-source protocol providing distribution, discovery, and purchase of digital content (data) via a decentralized network. It utilizes the LBRY blockchain as a global namespace and database of digital content. Blockchain entries contain searchable content metadata, identities, and rights and access rules. LBRY also provides a data network that consists of peers uploading and downloading data from other peers (possibly in exchange for payments) and a distributed hash table (used by peers to discover other peers).

### LBRY Reference Application

For most users, LBRY will be a place where they can find great videos, music, ebooks, and more. A vast digital library that is available on all of your devices. But LBRY consists of many components working together. The LBRY app is a graphical browser for the decentralized content marketplace provided by the LBRY protocol. It is essentially the lbry daemon bundled with an UI using Electron.

### LbryumX Server

A LbryumX-server for the LbryumX client. LbryumX is an extension of electrumx that provides the server side of LBRY Electrum Protocol. It sits between the LBRY daemon and LBRYCrd to provide SPV access to/from clients.

### Lighthouse

[Lighthouse](https://github.com/lbryio/lighthouse) is a lightning-fast advanced search engine API for publications on the LBRYcrd with autocomplete capabilities. The official lighthouse instance is live at https://lighthouse.lbry.io.

### Lightweight client

Compared to a *full node*, lightweight node does not store the whole blockchain and thus cannot fully verify any transaction. There are two kinds of lightweight nodes: those fully trusting an external service to determine wallet balance and validity of transactions (e.g. *blockchain.info*), and apps implementing *Simplified Payment Verification* (SPV). SPV clients do not need to trust any particular service, but are more vulnerable to a *51% attack* than full nodes. See *Simplified Payment Verification* for more info.

### M-of-N Multi-signature Transaction

A transaction that can be spent using M signatures when N public keys are required (M is less or equal to N). Multi-signature transactions that only contain one *OP_CHECKMULTISIG* opcode while N is 3, 2 or 1 are considered *standard*.

### Mainnet

Main LBRY network and its blockchain. The term is mostly used in comparison to *testnet*.

### Manifest

A blob that contains information about all the other blobs in its stream (the content blobs), in JSON format.  Sometimes referred to as the [[Stream Descriptor (SD) Blob]],  this blob lists each of the other blobs in the stream, in order, along with the filename for the content, and the cryptographic key needed to decode the content blobs [the stream key](#stream-key). See [Content Blobs](https://spec.lbry.io/#content-blobs) in the specification.

### Main Chain

A part of the blockchain which a node considers the most difficult (see *difficulty*). All nodes store all valid blocks, including *orphans*, and recompute the total difficulty when receiving another block. If the newly arrived block or blocks do not extend the existing main chain, but instead creates another one from some previous block, *reorganization* has occurred.

### Merkle Tree

A Merkle tree is an abstract data structure that organizes a list of data items in a tree of their hashes (like in Git, Mercurial or ZFS). In LBRY the Merkle tree is used only to organize transactions within a block (the block header contains only one hash of a tree) so that full nodes may prune fully spent transactions to save disk space. Click [here](https://en.bitcoin.it/wiki/Protocol_documentation#Merkle_Trees) for more details.

### Mempool

A technical term for a collection of unconfirmed transactions stored by a node until they either expire or get included in the main chain. When *reorganization* happens, transactions from orphaned blocks either become invalid (if already included in the *main chain*) or are moved to a pool of unconfirmed transactions. By default, *bitcoind* nodes throw away unconfirmed transactions after 24 hours.

### Miner

A person, software, or hardware that performs *mining*.

### Mining

A process of finding valid *hashes* of a block header by iterating through millions of variants of block headers (using *nonce* and *extra nonce*) in order to find a hash lower than the *target* (see also *difficulty*). The process needs to determine a single global history of all transactions (grouped in blocks). Mining consumes time and electricity, and nowadays the difficulty is so big that energy-wise it's not even profitable to mine using video graphics cards. Mining is paid for by *transaction fees* and by block *rewards* (i.e. newly generated coins, hence the term "mining").

### Mining Pool

A service that allows separate owners of mining hardware to split the reward proportionally to submitted work. Since the probability of finding a valid block hash is proportional to a miner's *hashrate*, small individual miners may work for months before finding a big per-block reward. Mining pools allow for more steady streams of smaller income. A pool owner determines the block contents and distributes ranges of *nonce* values between its workers. Normally, mining pools are centralized. P2Pool is a fully decentralized pool.

### Node

A node, or client, is a computer on the network that speaks LBRY message protocol (exchanging transactions and blocks). There are *full nodes* that are capable of validating the entire blockchain and *lightweight nodes* with reduced functionality. Wallet applications that speak to a server are not considered nodes.

### Nonce

Stands for "number used once". A 32-bit number in a *block header* which is iterated during a search for proof-of-work. Each time the nonce is changed, the *hash* of the block header is recalculated. If nonce overflows before valid proof-of-work is found, an *extra nonce* is incremented and placed in the *coinbase* script. Alternatively, one may change a Merkle tree of transactions or a timestamp.

### Opcode

8-bit code of a *script* operation. Codes from `0x01` to `0x4B` (decimal 75) are interpreted as a length of data to be pushed on the stack of the interpreter (data bytes follow the opcode). Other codes either do something interesting, are disabled and cause transaction verification to fail, or do nothing (reserved for future use). LBRY implements special op codes for the storing and updating of claim data.

### Orphan, Orphaned Block

A valid block that is no longer a part of a *main chain*. Usually happens when two or more blocks of the same *height* are produced at the same time. When one of them becomes a part of the main chain, others are considered "orphaned". Orphans also may happen when the blockchain is *forked* due to an attack (see *[51% attack](#_51-attack)*) or a bug. Then a chain of several blocks may become abandoned. Usually a transaction is included in all blocks of the same height, so its *confirmation* is not delayed and there is no *double spend*. See also *Fork*.

### Outpoint

An outpoint, as referenced in API documentation and elsewhere, is the most specific identification for a particular version of a claim (a claim may be updated and will be referenced by a new outpoint). The outpoint is the concatenation of the transaction id and nout (position in the transaction). Outpoint example: `f6dea4ad26fd526b77935969a17b081342fc92d68b3a1daf69d4a3378657c2fc:0`

### Paper Wallet

A form of *cold storage* where a *private key* for LBRY Credits *address* is printed on a piece of paper (with or without encryption) and then all traces of the key are removed from the computer where it was generated. To redeem bitcoins, a key must be imported in the wallet application so it can sign a transaction. See also *Casascius Coins*.

### Pay-to-Script Hash

A type of *script* and *address* that allows for the sending of bitcoins to arbitrary complex scripts using a compact hash of that script. This allows a payer to pay much smaller *transaction fees* and not wait very long for a *non-standard* transaction to get included in the blockchain. Then the actual script matching the hash must be provided by the payee when redeeming the funds. P2SH addresses are encoded in *Base58Check* just like regular public keys and start with the number "3".

### Peer

A peer is one instance of a client running on a computer on the Internet to which other clients connect and transfer data. Depending on context, "peer" can refer either to any client in the swarm or more specifically to a downloader, which is a client that has only parts of the file.

### Private Key (Privkey)

A 256-bit number used in *ECDSA* algorithm to create transaction *signatures* in order to prove ownership of a certain amount of credits. Can also be used in arbitrary *elliptic curve arithmetic* operations. Private keys are stored within *wallet* applications and are usually encrypted with a pass phrase. Private keys may be completely random (see *Key Pool*) or generated from a single secret number ("seed"). See also *Deterministic Wallet*.

### Proof-of-Work (PoW)

A number that is provably hard to compute. That is, it takes a measurable amount of time and/or computational power (energy) to produce. In LBRY, similar to Bitcoin, it is a *hash* of a *block header*. A block is considered valid only if its hash is lower than the current *target* (i.e. starts with a certain amount of zero bits). Each block refers to a previous block, thus accumulating previous proof-of-work and forming a *blockchain*.

Proof-of-work is not the only requirement, but an important one to make sure that it is economically infeasible to produce an alternative history of transactions with the same accumulated work. Each client can independently consider the most difficult chain of valid blocks as the "true" history of transactions, without the need to trust any source that provides the blocks.

Note that owning a very large amount of computational power does not override other rules enforced by every client. Ill-formed blocks or blocks containing invalid transactions are rejected no matter how difficult they were to produce.

### Public Key (Pubkey)

A 2D point on an elliptic curve [secp256k1](https://en.bitcoin.it/wiki/Secp256k1) that is produced by multiplying a predefined "generator" point by a *private key*. Usually it is represented by a pair of 256-bit numbers ("uncompressed public key"), but it can also be compressed to just one 256-bit number (at the slight expense of CPU time to decode an uncompressed number). A special hash of a public key is called an *address*. Typical LBRY transactions contain public keys or addresses in the output scripts and *signatures* in the input scripts.

### README

A README is a file included in all code repositories that includes basic information about that project. More in (/resources/repository-standards).

### Reflector

A reflector cluster to accept LBRY content for hosting en masse, re-host the content, and make money on data fees (currently disabled). This code includes Go implementations of the LBRY peer protocol, reflector protocol, and DHT.

### Reorg, Reorganization

An event in the *node* that happens when one or more blocks in the *main chain* become *orphaned*. Usually, newly received blocks are extending the existing main chain. Sometimes (4-6 times a week) a couple of blocks of the same *height* are produced almost simultaneously and for a short period of time some nodes may see one block as a tip of the main chain which will be eventually replaced by a more difficult block(s). Each transaction in the orphaned blocks either becomes invalid (if already included in the main chain block) or becomes *unconfirmed* and moved to the *mempool*. In case of a major bug or a *51% attack*, reorganization may involve reorganizing more than one block.

### Resolve

The resolve API command returns all available information about a claim or channel.

### Reward

Amount of newly generated LBRY credits that a *miner* may claim in a new block. The first transaction in the block allows a miner to claim currently allowed reward as well as all *transaction fees* from all transactions in the block. For security reasons, rewards cannot be *spent* before 100 blocks have been built on top of the current block.

### Schema

The schema defines the structure of the data (metadata) that is stored in claims in the LBRY blockchain.  See [Metadata](https://spec.lbry.io/#metadata) in the white paper, and [lbry.tech/resources/schema](https://lbry.tech/resources/schema) for more information.

### Script

A compact Turing-incomplete programming language used in transaction *inputs* and *outputs*. Scripts are interpreted by a Forth-like stack machine: each operation manipulates data on the stack. Most scripts follow the standard pattern and verify the digital *signature* provided in the transaction *input* against a *public key* provided in the previous transaction's *output*. Both signatures and public keys are provided using scripts. Scripts may contain complex conditions, but can never change any amounts being transferred. Amount is stored in a separate field in a *transaction output*.

### SDK

An abbreviation for Software Development Kit. [lbry-sdk](#lbry-sdk) is an SDK for developing applications that use the LBRY protocol.

### Secret key

Either the *Private Key* or an encryption key used in encrypted *wallets*. LBRY protocol does not use encryption anywhere, so *secret key* typically means a *private key* used for signing transactions.

### Signature

A sequence of bytes that proves that a piece of data is acknowledged by a person holding a certain *public key*. LBRY, like Bitcoin, uses *ECDSA* for signing transactions. Amounts of credits are sent through a chain of transactions: from one to another. Every transaction must provide a signature matching a public key defined in the previous transaction. This way only a proper owner of a secret *private key* associated with a given public key can spend credits further.

### Simplified Payment Verification

A scheme to validate transactions without storing the whole blockchain (only block headers) and without trusting any external service. Every transaction must be present with all its parent and sibling hashes in a *Merkle tree* up to the root. An SPV client trusts the most *difficult* chain of block headers and can validate if the transaction indeed belongs to a certain block header. Since SPV does not validate all transactions, a *51% attack* may not only cause a *double spend* (like with *full nodes*), but also make a completely invalid payment with credits created from nowhere. However, this kind of attack is very costly and probably more expensive than a product in question. Frequently abbreviated as SPV.

### Soft Fork

Sometimes the *soft fork* refers to an important change of software behavior that is not a *hard fork* (e.g. changing *mining fee* policy). See also *Hard Fork* and *Fork*.

### Spam

Incorrect peer-to-peer messages (like sending invalid transactions) may be considered a denial of service attack (see *DoS*). Valid transactions sending very tiny amounts and/or having low *mining fees* are called *Dust* by some people. The protocol itself does not define which transactions are not worth relaying or mining; it's a decision of every individual node. Any valid transaction in the blockchain must be accepted by the node if it wishes to accept the remaining blocks, so transaction censorship only means increased confirmation delays. Individual payees may also blacklist certain addresses (refuse to accept payments from some addresses), but that's too easy to work around using *mixing*.

### Spent Output

A transaction *output* can be spent only once: when another valid transaction makes a reference to this output from its own input. When another transaction attempts to spend the same output, it will be rejected by the nodes already seeing the first transaction. Blockchain as a *proof-of-work* scheme allows every node to agree on which transaction was indeed the first one. The whole transaction is considered spent when all its outputs are spent.

### SPV

SPV is an abbreviation for [Simplified Payment Verification](#simplified-payment-verification).

### Stream

Streaming media is multimedia that is constantly received by and presented to an end-user while being delivered by a provider. In LBRY, streams are associated with claim data in order to provide the capability to download files over a Peer to Peer network.  See [Streams](https://spec.lbry.io/#streams) in the specification.

### Stream Descriptor (SD) Blob

Same as [manifest](#manifest) The initial blob of a stream, it contains encryption information and points to other blobs required for the stream.

### Stream Hash

A unique hash for a [Stream](#stream). It is the sha384 hash of the file.

### Stream Key

Found in the [manifest](#manifest), this is the cryptographic key needed to decrypt the content blobs of a stream.

### Support (Claim Support)

Same as [Claim Support](#claim-support). A support is a wallet send transaction that includes claim information, which results in adding to a claim's effective amount. A tip is a special type of support that is sent from one wallet to another, so that the receiver can send it to their own wallet.

### Takeover Period

In order to take over a claim at an existing vanity URL, the bid must be higher and the takeover period must pass. In simple terms, the longer the claim is held, the longer the takeover period. For each month held, a day is added to the takeover period for a maximum of 7 days. See [controlling claims](https://spec.lbry.io/#controlling) in the specification, and [Claimtrie Bid States section here](https://lbry.io/faq/claimtrie-implementation) for more information.

### Target

A 256-bit number that puts an upper limit for a block header hash to be valid. The lower the target is, the higher the *difficulty* to find a valid hash. The maximum (easiest) target is `0x00000000FFFF0000000000000000000000000000000000000000000000000000`. The difficulty and the target are adjusted every 2016 blocks (approx. 2 weeks) to keep the interval between the blocks close to 10 minutes.

### Testnet

A set of parameters used for testing a LBRY network. Testnet is like *mainnet*, but has a different genesis block (it was reset several times, the latest testnet is *testnet3*). Testnet uses a slightly different *address* format to avoid confusion with main LBRY addresses and all nodes are relaying and mining non-standard transactions.

### Torba

An [SPV](#spv) wallet for the LBRY [blockchain](#blockchain). See the [source code](https://github.com/lbryio/torba).

### Transaction

A chunk of binary data that describes how credits are moved from one owner to another. Transactions are stored in the *[blockchain](#blockchain)*. Every transaction (except for *coinbase* transactions) has a reference to one or more previous transactions (*inputs*) and one or more rules on how to spend these credits further (*outputs*). See *Transaction Input* and *Transaction Output* for more info.

### Transaction Fee

Also known as "miners' fee", an amount that an author of a transaction pays to a miner who will include the transaction in a block. The fee is expressed as the difference between the sum of all *input* amounts and the sum of all *output* amounts. Unlike traditional payment systems, miners do not explicitly require fees and most miners allow free transactions. All miners are competing with each other for the fees and all transactions are competing for a place in a block. There are soft rules encoded in most clients that define minimum fees per kilobyte to relay or mine a transaction (mostly to prevent *DoS* and *spam*). Typically, the fee affects the priority of a transaction.

### Transaction Input

A part of a transaction that contains a reference to a previous transaction's *output* and a *script* that can prove ownership of that output. The script usually contains a *signature*, which is called a *scriptSig*. Inputs spend previous outputs completely. So if one needs to pay only a portion of some previous output, the transaction should include extra *change* output that sends the remaining portion back to its owner (on the same or different address). *Coinbase* transactions contain only one input with a zeroed reference to a previous transaction and arbitrary data in place of script.

### Transaction Output

An output contains an amount to be sent and a *script* that allows further spending. The script typically contains a *public key* (or an *address*, a hash of a public key) and a signature verification *opcode*. Only an owner of a corresponding *private key* is able to create another transaction that sends that amount further to someone else. In every transaction, the sum of output amounts must be equal or less than a sum of all input amounts. See also *Change*.

### Unconfirmed Transaction

Transaction that is not included in any block. Also known as "0-confirmation" transaction. Unconfirmed transactions are *relayed* by the nodes and stay in their *mempools*. An unconfirmed transaction stays in the pool until the node decides to throw it away, finds it in the blockchain, or includes it in the blockchain itself (if it's a miner). See also *Confirmation Number*.

### UTXO Set

A collection of *Unspent Transaction Outputs*. Typically used in discussions on optimizing an ever-growing index of *transaction outputs* that are not yet *spent*. The index is important for efficiently validating newly created transactions. Even if the rate of the new transactions remains constant, the time required to locate and verify unspent outputs grows.

### Wallet

An application or a service that helps in the keeping of private keys for signing transactions. Wallet does not keep LBRY credits themselves (they are recorded in *blockchain*). "Storing LBC" usually means storing the keys.

### 51% Attack

Also known as >50% attack or a *double spend* attack. An attacker can make a payment, wait until the merchant accepts some number of *confirmations* and provides the service, and then start mining a parallel chain of blocks starting with a block before the transaction. This parallel blockchain then includes another transaction that spends the same *outputs* on some other address. When the parallel chain becomes more *difficult*, it is considered a *main chain* by all nodes and the original transaction becomes invalid. Having more than half of the total *hashrate* guarantees the possibility to overtake a chain of any length, hence the name of the attack (strictly speaking, it is "more than 50%", not 51%). Also, even 40% hashrate allows making a double spend, but the chances are less than 100% and are diminishing exponentially with the number of confirmations that the merchant requires.

---

## About

Portions of this glossary originated from: [https://github.com/oleganza/bitcoin-papers/blob/master/BitcoinGlossary.md](https://github.com/oleganza/bitcoin-papers/blob/master/BitcoinGlossary.md)
