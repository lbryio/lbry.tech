---
title: Merkle Claim Trie
description: Publishes to the LBRY network get placed into a Merkle Claim Trie. Learn what that is and why trie is not a typo in this resource article.
---

This article will discuss how the data structures that organize claims by names work, how proofs are generated/verified, and how consensus on the state of the trie is represented.

For looking into how claims end up in the trie, [read this instead](/spec#claimtrie).

## The Trie


A Trie is an ordered tree data structure. Think of it as a hash map or dictionary where the keys are ordered and organized in prefixes. It's used for storing claims by name and looks (a bit) like this:
![Wikipedia claimtrie](https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Trie_example.svg/400px-Trie_example.svg.png)

You can read more on it [here](https://en.wikipedia.org/wiki/Trie), but for understanding the ClaimTrie let's just think of it as a mapping of names and claims where you can easily find which character of a name prefix forms a collision. Like the first `t` for `{to, tea, ted, ten}` and the `e` in `te` for `{tea, ted, ten}`.

## Consensus

Each block header holds an extra 256 bits value calculated out of the root node of the claim trie at that block height. It's called `nameclaimroot` and is influenced by all children nodes as we will see next. If a blockchain network peer disagrees that a claim name was accepted or who is the winner of each name, its `nameclaimroot` will differ and the block won't form the same chain as the ones that accepted the official rules. This is the same for the traditional Merkle root, which is the root of the [Merkle tree](https://bitcoin.org/en/glossary/merkle-tree), formed by transactions in a block.

## What's in a leaf?
The leaf currently holds the winner of that name. It's formed by the transaction hash, output number of the claim in that transaction and the height it was accepted.

### Generating the leaf hash
So, let's suppose that the winner claim of `mindblown` name was made at transaction output `1` of the transaction hash `67ad533eb2676c9d36bfa100092af5358de747e08ef928c0c54a8b3891c2b76b` and included in the Trie at height `102`.
1. The transaction hash is converted from [RPC byte order](https://bitcoin.org/en/glossary/rpc-byte-order) to [internal byte order](https://bitcoin.org/en/glossary/internal-byte-order).
2. The output number becomes a simple string.
3. The height becomes a big endian 64 bits value.
4. The node hash is calculated as the double SHA-256 hash of the double SHA-256 hash of the internal byte order representation of the transaction hash concatenated with the double SHA-256 hash of the output number representation concatenated with the double SHA-256 hash of the height.

This is better represented in the simple python script below:
```python
import struct
from hashlib import sha256
from binascii import unhexlify, hexlify
name = "mindblown".encode()
tx = '67ad533eb2676c9d36bfa100092af5358de747e08ef928c0c54a8b3891c2b76b'
nout = 1
at_height = 102

sha256d = lambda x: sha256(sha256(x).digest()).digest()
def hash_leaf(tx, nout, height):
    raw_tx = unhexlify(tx)[::-1]
    raw_nout = str(nout).encode()
    raw_height = struct.pack('>Q', height)
    return sha256d(sha256d(raw_tx) + sha256d(raw_nout) + sha256d(raw_height))

print("leaf hash is {}".format(hexlify(hash_leaf(tx, nout, at_height)[::-1])))
```

## How is the root hash calculated?

Let's start with a ClaimTrie holding a single claim.
The claim is named `mindblown` and was included at block 102 with the same details as the last section. It's actually a real claim as [you can see in the block explorer](https://explorer.lbry.com/blocks/102). This block has the first claim ever, so the ClaimTrie was the simple case being explained in here.
We start with the leaf hash:
1. Hash the leaf hash using double SHA-256.
2. For each character of the name (nodes of the trie), the hash of a node is the double SHA-256 of the node's character concatenated with the children hash.

Continuing with the Python script from the last section, this is how to calculate the root of a claim trie holding a single name:
```python
def hash_single_claim_trie(name, claim_tx, claim_nout, claim_height):
    final_hash = sha256d(hash_leaf(claim_tx, claim_nout, claim_height))
    for character in reversed(name):
        final_hash = sha256d(bytearray([character]) + final_hash)
    return final_hash

print("root hash is {}".format(hexlify(hash_single_claim_trie(name, tx, nout, at_height)[::-1])))
```

## What if there are more leafs?

Just concatenate the node character with the children’s hashes sha256d(character + leftmost child hash + ... + rightmost child hash ).
TO BE IMPROVED
