---
title: Content Downloading
description: This resource article walks through the step-by-step process of downloading a piece of content from the LBRY network.
--- 

This resource outlines the step-by-step process of using the LBRY protocol to download something. 

## Getting Started

Downloading spans the three core components of LBRY (blockchain, DHT, blob exchange) and explains the structure of the claim metadata and the blobs that make up a stream.

You will need:

- a running [lbrycrd](https://github.com/lbryio/lbrycrd) node, or another way to access blockchain data (perhaps [lbryumx](https://github.com/lbryio/lbryumx) or [chainquery](https://github.com/lbryio/chainquery))
- a running DHT node
- the claim ID of the content you wish to download

For this example, we will use claim ID `d9317ac7842f88ba442fee749c4f834353c24206`.


## Overview

- start with **claim ID**
- blockchain gets you **metadata** for your claim ID
- parsing metadata gets you **stream hash** and fee info
  - if there is a fee, pay it using the blockchain
- dht gets you **peers** for the stream hash
- blob exchange gets **manifest blob** from peers
- manifest is parsed to get **content blob hashes**
- dht and then blob exchange get you the **content blobs**
- blobs are decrypted and assembled to create the **file**


## Parse the Metadata

Perform a `getclaimbyid` call to lbrycrd using the claim ID for the claim you want to look up. You should get a response with some parameters. The `value` parameter contains the claim contents as a protobuf-encoded binary string. Decode the value using the protobuf definitions in [lbryio/types](https://github.com/lbryio/types/tree/master/v2/proto). You will get a Claim object.


## Get the Stream Hash

Confirm that `Claim.type` is `1` (a stream claim).

Claim.Stream.hash contains the stream hash, which is the hash of the manifest blob in the stream.


## Pay the Fee

Check the `Claim.Stream.Fee` field. If it exists, then a payment is required to download this content. Get the address, amount, and currency from the Fee, convert the amount to LBC if its not already in LBC, and perform a `sendtoaddress` call to lbrycrd to send the fee amount to the fee address.

Our example claim does not have a fee. If you want to see a claim with a fee, look up claim ID `fbdcd44a97810522d23d5f1335b8ca04be9d776c`.

## Find Hosts for the Manifest Blob

Look up the stream hash in the DHT. Internally this will perform an iterativeFindValue call, starting with the nodes already in the routing table and proceeding to nodes that are closest to the stream hash. The DHT should return a list of hosts that have advertised that they have this hash.


## Download Manifest Blob

Use the blob exchange protocol to request the manifest blob from the hosts found in the previous step.


## Read Manifest Blob

The manifest is JSON-formatted text. It contains a dictionary with the following structure:

```
{
  "blobs": [
    {
      "blobHash": "b7e43c102781f978c24bc2bc...",
      "iv": "63a6befc3c8d01f662ffad2f2381b357",
      "length": 2097152,
    },
    ...
  ],
  "filename": "574c707655476a766d58632e6d7034",
  "key": "ee768c4e642012bb5b2e20cf9b1f997b",
  "version":1
}
```

All string fields are hex-encoded.

To download the content blobs, repeat the steps we took for the stream hash, but instead use the `blobHash` value for each blob. Look up the blob hash in the DHT to find hosts, then download the blob from those hosts.

## Decrypt and Assemble Blobs

Now that all the blobs have been downloaded, they can be decrypted and assembled into the original file. Decrypt each blob using the key and IVs in the manifest, and concatenate the decrypted bytes in order. Write the finished file to disk.


## Enjoy a Cute Puppy Video

You earned it.
