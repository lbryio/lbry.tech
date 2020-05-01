---
title: Consensus Algorithm
description: How does the LBRY blockchain achieve consensus? This resource page will explain. 
---

LBRY uses [proof of work](https://en.bitcoin.it/wiki/Proof_of_work) as a [consensus mechanism](/spec#consensus), the same way that Bitcoin does.

LBRY has differences in hash function, block targeting, and difficulty adjustment.

### Hash Mechanism

```python
intermediate = sha512(sha256(sha256(data)))  # compute the sha512() of the double-sha256() of the data
left = ripemd(intermediate[:len(intermediate)/2])  # separately ripemd160 the left half
right = ripemd(intermediate[len(intermediate)/2:]) # and the right half
proof = sha256(sha256(left + right))  # concatenate the two halves, and double-sha256() it again
```

### Block Targeting & Difficulty Adjustment

The targeted time of each LBRY block is 2.5 mintues (150 seconds).  More information and links to source code [here](https://lbry.tech/spec#consensus).
