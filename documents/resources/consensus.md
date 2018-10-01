# LBRY Consensus Algorithm

LBRY uses [proof of work](https://en.bitcoin.it/wiki/Proof_of_work) as a consensus mechanism, the same way that Bitcoin does.

LBRY has differences in hash function, block targeting, and difficult adjustment.

### Hash Mechanism

```python
intermediate = sha512(sha256(sha256(data)))  # compute the sha512() of the double-sha256() of the data
left = ripemd(intermediate[:len(intermediate)/2])  # separately ripemd160 the left half
right = ripemd(intermediate[len(intermediate)/2:]) # and the right half
proof = sha256(sha256(left + right))  # concatenate the two halves, and double-sha256() it again
```

### Block Targeting

_PR this_.

### Difficulty Adjustment

_PR this_.
