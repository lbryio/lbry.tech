---
title: Claim Signing
description: How does signing a claim (a publish) work in LBRY-land? This page explains in great detail. Seriously great detail. The greatest detail anyone has ever seen!
---

Reilly wants to publish _Terror on the Midway_ to the channel he claimed `lbry://@FleischerSuperman`. He picks the name "terroronthemidway", and fills in the information for the claim:

    {
        "claimType": "streamType",
        "stream": {
            "metadata": {
                "author": "Paramount Pictures",
                "description": "The episode in the series of Fleischer Studios-produced Superman serials. Subsequent episodes were produced by Famous  Studios.",
                "language": "en",
                "license": "Public Domain",
                "licenseUrl": "",
                "nsfw": false,
                "preview": "",
                "thumbnail": "https://s3.amazonaws.com/files.lbry.io/thumbnails/superman1940-thumb.png",
                "title": "Terror on the Midway - Superman Ep 9",
                "version": "_0_1_0"
            },
            "source": {
                "contentType": "video/mp4",
                "source": "9b70337f51fe9a4481504059b4220ad4f87378d59ecc87bd924c3f0f23da9442b9f75ffc091b65deefe92477a86a31ea",
                "sourceType": "lbry_sd_hash",
                "version": "_0_0_1"
            },
            "version": "_0_0_1"
        },
        "version": "_0_0_1"
    }

This is serialized as:

    080110011ae6020801129e02080410011a24546572726f72206f6e20746865204d6964776179202d2053757065726d616e2045702039227f54686520657069736f6
    46520696e2074686520736572696573206f6620466c656973636865722053747564696f732d70726f64756365642053757065726d616e2073657269616c732e2053
    756273657175656e7420657069736f64657320776572652070726f64756365642062792046616d6f7573202053747564696f732e2a12506172616d6f756e7420506
    9637475726573320d5075626c696320446f6d61696e38004a4868747470733a2f2f73332e616d617a6f6e6177732e636f6d2f66696c65732e6c6272792e696f2f74
    68756d626e61696c732f73757065726d616e313934302d7468756d622e706e6752005a001a41080110011a309b70337f51fe9a4481504059b4220ad4f87378d59ec
    c87bd924c3f0f23da9442b9f75ffc091b65deefe92477a86a31ea2209766964656f2f6d7034

To publish the uri `lbry://@FleischerSuperman/terroronthemidway`, Reilly must sign the SHA256 of the the combined claim address, claim value, and certificate claim id.
He starts by generating an address for the new name claim:

    bEGGwBFf39ek6ASJV5YwiUPvDqtpgczCVZ

His claim for the certificate at the uri `lbry://@FleischerSuperman` has a `claim_id` of

    2996b9a087c18456402b57cba6085b2a8fcc136d

It contains a der-encoded SECP256k1 public key

    {
        "certificate": {
            "keyType": "SECP256k1",
            "publicKey": "3056301006072a8648ce3d020106052b8104000a03420004180488ffcb3d1825af538b0b952f0eba6933faa6d8229609ac0aeadfdbcf49
                          c59363aa5d77ff2b7ff06cddc07116b335a4a0849b1b524a4a69d908d69f1bcebb",
            "version": "_0_0_1"
    }

### Signing the claim in detail

Reilly decodes and combines the claim address, the serialized claim value, and the claim id of
 the certificate claim. As hex, the combined value is:

    5510d538a8ea31210a2a65cfcdd985e3e7bbc42e7c2cecb7bc080110011ae6020801129e02080410011a24546572726f72206f6e20746865204d696477617920
    2d2053757065726d616e2045702039227f54686520657069736f646520696e2074686520736572696573206f6620466c656973636865722053747564696f732d
    70726f64756365642053757065726d616e2073657269616c732e2053756273657175656e7420657069736f64657320776572652070726f647563656420627920
    46616d6f7573202053747564696f732e2a12506172616d6f756e74205069637475726573320d5075626c696320446f6d61696e38004a4868747470733a2f2f73
    332e616d617a6f6e6177732e636f6d2f66696c65732e6c6272792e696f2f7468756d626e61696c732f73757065726d616e313934302d7468756d622e706e6752
    005a001a41080110011a309b70337f51fe9a4481504059b4220ad4f87378d59ecc87bd924c3f0f23da9442b9f75ffc091b65deefe92477a86a31ea2209766964
    656f2f6d70342996b9a087c18456402b57cba6085b2a8fcc136d

Then he takes the SHA256 of the combined string, giving:

    dea44974ace1893f304cae4073af06a7a6cbb209f97cf8ad5f322216f044304e

He signs (RFC 6979) this hash using the private key to the previously shown certificate, giving the signature:

    bf82d53143155bb0cac1fd3d917c000322244b5ad17e7865124db2ed33812ea66c9b0c3f390a65a9e2d452e315e91ae695642847d88e90348ef3c1fa283a36a8

Now he add this signature to the claim:

    {
        "claimType": "streamType",
        "publisherSignature": {
            "certificateId": "2996b9a087c18456402b57cba6085b2a8fcc136d",
            "signature": "bf82d53143155bb0cac1fd3d917c000322244b5ad17e7865124db2ed33812ea66c9b0c3f390a65a9e2d452e315e91ae695642847d88e90348ef3c1fa283a36a8",
            "signatureType": "SECP256k1",
            "version": "_0_0_1"
        },
        "stream": {
            "metadata": {
                "author": "Paramount Pictures",
                "description": "The episode in the series of Fleischer Studios-produced Superman serials. Subsequent episodes were produced by Famous  Studios.",
                "language": "en",
                "license": "Public Domain",
                "licenseUrl": "",
                "nsfw": false,
                "preview": "",
                "thumbnail": "https://s3.amazonaws.com/files.lbry.io/thumbnails/superman1940-thumb.png",
                "title": "Terror on the Midway - Superman Ep 9",
                "version": "_0_1_0"
            },
            "source": {
                "contentType": "video/mp4",
                "source": "9b70337f51fe9a4481504059b4220ad4f87378d59ecc87bd924c3f0f23da9442b9f75ffc091b65deefe92477a86a31ea",
                "sourceType": "lbry_sd_hash",
                "version": "_0_0_1"
            },
            "version": "_0_0_1"
        },
        "version": "_0_0_1"
    }

Serialized, the signed claim is represented as:

    080110011ae6020801129e02080410011a24546572726f72206f6e20746865204d6964776179202d2053757065726d616e2045702039227f5468652065706973
    6f646520696e2074686520736572696573206f6620466c656973636865722053747564696f732d70726f64756365642053757065726d616e2073657269616c73
    2e2053756273657175656e7420657069736f64657320776572652070726f64756365642062792046616d6f7573202053747564696f732e2a12506172616d6f75
    6e74205069637475726573320d5075626c696320446f6d61696e38004a4868747470733a2f2f73332e616d617a6f6e6177732e636f6d2f66696c65732e6c6272
    792e696f2f7468756d626e61696c732f73757065726d616e313934302d7468756d622e706e6752005a001a41080110011a309b70337f51fe9a4481504059b422
    0ad4f87378d59ecc87bd924c3f0f23da9442b9f75ffc091b65deefe92477a86a31ea2209766964656f2f6d70342a5c080110031a40bf82d53143155bb0cac1fd
    3d917c000322244b5ad17e7865124db2ed33812ea66c9b0c3f390a65a9e2d452e315e91ae695642847d88e90348ef3c1fa283a36a822142996b9a087c1845640
    2b57cba6085b2a8fcc136d

Now he can put this value in a claim transaction and broadcast the claim!

As long as his certificate claim is winning, his publication can be resolved by `lbry://@FleischerSuperman/terroronthemidway`

Even if his name is outbid, the publication can be resolved by the channel claim id at the uri: `lbry://@FleischerSuperman#2996b9a087c18456402b57cba6085b2a8fcc136d/terroronthemidway`
