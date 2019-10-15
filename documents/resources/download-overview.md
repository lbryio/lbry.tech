---
title: Content Downloading
description: This resource article walks through the step-by-step process of downloading a piece of content from the LBRY network.
--- 

This resource outlines the step-by-step process of using the LBRY protocol to download something. 

## Getting Started

Downloading spans the three core components of LBRY (blockchain, DHT, blob exchange) and explains the structure of the [claim metadata](/spec#metadata) and the blobs that make up a [LBRY stream](/spec#data).

You will need:

- a running [lbrycrd](https://github.com/lbryio/lbrycrd) node, or another way to access blockchain data (perhaps [lbryumx](https://github.com/lbryio/lbryumx) or [chainquery](https://github.com/lbryio/chainquery))
- a running DHT node
- the `claimID` of the content you wish to download

For this example, we will use claimID `d9317ac7842f88ba442fee749c4f834353c24206`.


## Overview

- start with **claim ID**
- blockchain gets you **metadata** for your claimID
- parsing metadata gets you **sd hash** and fee info
  - if there is a fee, pay it using the blockchain
- dht gets you **peers** for the sd hash
- blob exchange gets **sd blob** from peers
- sd blob is parsed to get **content hashes**
- dht and then blob exchange get you the **content blobs**
- blobs are decrypted and assembled to create the **file**


## Parse the Metadata

Perform a `getclaimbyid` call to lbrycrd using the claimID for the claim you want to look up. You should get a response with some parameters. The `value` parameter contains the claim contents as a protobuf-encoded binary string. Decode the value using the protobuf definitions in [lbryio/types](https://github.com/lbryio/types/tree/master/v2/proto). You will get a Claim object.


## Get the SD Hash

Confirm that `Claim.claimType` is `1` (streamType) and `Claim.Stream.Source.sourceType` is `1` (lbry_sd_hash).

Claim.Stream.Source.source contains the hash of the `sd blob` for the content. We call this the `sd hash`.


## Pay the Fee

Check the `Claim.Stream.Metadata.Fee` field. If it exists, then a payment is required to download this content. Get the address, amount, and currency from the Fee, convert the amount to LBC if its not already in LBC, and perform a `sendtoaddress` call to lbrycrd to send the fee amount to the fee address.

Our example claim does not have a fee. If you want to see a claim with a fee, look up claim ID `fbdcd44a97810522d23d5f1335b8ca04be9d776c`.

## Find Hosts for SD Blob

Look up the sd hash in the DHT. Internally this will perform an iterativeFindValue call, starting with the nodes already in the routing table and proceeding to nodes that are closest to the sd hash. The DHT should return a list of hosts that have advertised that they have this hash.


## Download SD Blob

Use blob exchange protocol to request the sd blob from the hosts found in the previous step.


## Read SD Blob

The SD blob is JSON-formatted text. It contains a dictionary with the following structure:

```
{
  "stream_name": "574c707655476a766d58632e6d7034",
  "blobs": [
    {
      "length": 2097152,
      "blob_num": 6,
      "blob_hash": "b7e43c102781f978c24bc2bc...",
      "iv": "63a6befc3c8d01f662ffad2f2381b357"
    },
    ...
  ],
  "stream_type": "lbryfile",
  "key": "ee768c4e642012bb5b2e20cf9b1f997b",
  "suggested_file_name": "574c707655476a766d58632e6d7034",
  "stream_hash": "6b1f9d5f129e06bb94b2ffdda817a5848c...",
}
```

All string fields are hex-encoded.

To download the content blobs, repeat the steps we took for the SD hash, but instead use the `blob_hash` value for each blob. Look up the blob_hash in the DHT to find hosts, then download the blob from those hosts.

Every stream has 0-length blob as the last blob in the list of blobs. This blob is not a real blob, and is not available on the network. It serves a similar purpose to the null byte at the end of a string - it signals that this is the last blob. This supports streaming a file when the number of blobs is not known in advance.


## Decrypt and Assemble Blobs

Now that all the blobs have been downloaded, they can be decrypted and assembled into the original file. Decrypt each blob using the key and IVs in the SD blob, and concatenate the decrypted bytes in `blob_num` order. Write the finished file to disk (you may use the `suggested_file_name` from the SD blob, or choose your own).


## Enjoy a Cute Puppy Video

You earned it.
