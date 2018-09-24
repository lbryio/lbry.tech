# Schema

## [Claim](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/claim.proto)

A `Claim` is the toplevel schema for everything that is published to the LBRY blockchain.

```protobuf
message Claim {
    enum Version {
        UNKNOWN_VERSION = 0;
        _0_0_1 = 1;
    }
    required Version version = 1;

    enum ClaimType {
        UNKNOWN_CLAIM_TYPE = 0;
        streamType = 1;
        certificateType = 2;
    }
    required ClaimType claimType = 2;
    
    optional Stream stream = 3;
    optional Certificate certificate = 4;
    optional Signature publisherSignature = 5;
}
```


## Content

### [Stream](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/stream.proto)

All content claims have a Stream field, which includes the content-specific information (e.g. a description of the content, instructions for downloading the content, etc).

```protobuf
message Stream {
    enum Version {
        UNKNOWN_VERSION = 0;
        _0_0_1 = 1;
    }
    required Version version = 1;
    
    required Metadata metadata = 2;
    required Source source = 3;
}
```

### [Metadata](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/metadata.proto)

`Metadata` provides information about a piece of content, such as the title, description, and price.

```protobuf
message Metadata {
    enum Version {
        UNKNOWN_VERSION = 0;
        _0_0_1 = 1;
        _0_0_2 = 2;
        _0_0_3 = 3;
        _0_1_0 = 4;
    }
    required Version version = 1;

    enum Language {
        UNKNOWN_LANGUAGE = 0;
        en = 1;
    }
    required Language language = 2;
    
    required string title = 3;
    required string description = 4;
    required string author = 5;
    required string license = 6;
    required bool nsfw = 7;

    optional Fee fee = 8;
    
    optional string thumbnail = 9;
    optional string preview = 10;
    optional string licenseUrl = 11;
}
```

### [Fee](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/fee.proto)

A `Fee` defines the prices for accessing a piece of content.

```protobuf
message Fee {
    enum Version {
        UNKNOWN_VERSION = 0;
        _0_0_1 = 1;
    }
    required Version version = 1;

    enum Currency {
        UNKNOWN_CURRENCY = 0;
        LBC = 1;
        BTC = 2;
        USD = 3;
    }
    required Currency currency = 2;

    required bytes address = 3;
    required float amount = 4;
}
```

### [Source](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/source.proto)

A `Source` contains information on how to download a stream. Only the LBRY data network is supported at the moment, but other sources may be added in the future.

```protobuf
message Source {
    enum Version {
        UNKNOWN_VERSION = 0;
        _0_0_1 = 1;
    }
    required Version version = 1;

    enum SourceTypes {
        UNKNOWN_SOURCE_TYPE = 0;
        lbry_sd_hash = 1;
    }
    required SourceTypes sourceType = 2;

    required bytes source = 3;
    required string contentType = 4;
}
```

## Channels

Channels are the identity mechanism in LBRY. They are constructed out of Certificates and Signatures. Both utilize a KeyType:

```protobuf
enum KeyType {
    UNKNOWN_PUBLIC_KEY_TYPE = 0;
    NIST256p = 1;
    NIST384p = 2;
    SECP256k1 = 3;
}
```

### [Certificate](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/certificate.proto)

Creating a channel involves making a `certificateType` claim. This claim contains the public key for a channel. It must include a Certificate field:

```protobuf
message Certificate {
    enum Version {
        UNKNOWN_VERSION = 0;
        _0_0_1 = 1;
    }
    required Version version = 1;
    
    required KeyType keyType = 2;
    required bytes publicKey = 4;
}
```


### [Signature](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/signature.proto)

Publishing a claim to a channels simply means that the claim is signed using the private key for a channel. This is done by including a Signature field in a Claim:

```protobuf
message Signature {
    enum Version {
        UNKNOWN_VERSION = 0;
        _0_0_1 = 1;
    }
    required Version version = 1;
    
    required KeyType signatureType = 2;
    required bytes signature = 3;
    required bytes certificateId = 4;
}
```
