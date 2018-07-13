## [Claim](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/claim.proto)
Claims have the encompassing schema:

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



## [Stream](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/stream.proto)
Claims of streamType have a `stream`:

    message Stream {
        enum Version {
            UNKNOWN_VERSION = 0;
            _0_0_1 = 1;
        }
        required Version version = 1;
        required Metadata metadata = 2;
        required Source source = 3;
    }

## [Metadata](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/metadata.proto)
Streams have `metadata` describing their content:

    message Metadata {
        enum Version {
            UNKNOWN_VERSION = 0;
            _0_0_1 = 1;
            _0_0_2 = 2;
            _0_0_3 = 3;
            _0_1_0 = 4;
        }
        enum Language {
            UNKNOWN_LANGUAGE = 0;
            en = 1;
        }
        required Version version = 1;
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

## [Fee](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/fee.proto)
Metadata may include a fee to access the decryption key:

    message Fee {
        enum Version {
            UNKNOWN_VERSION = 0;
            _0_0_1 = 1;
        }
        enum Currency {
            UNKNOWN_CURRENCY = 0;
            LBC = 1;
            BTC = 2;
            USD = 3;
        }
        required Version version = 1;
        required Currency currency = 2;
        required bytes address = 3;
        required float amount = 4;
    }

## [Source](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/source.proto)
Streams have a `source` to download:

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



## [Certificate](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/certificate.proto)
Claims of certificateType have a `certificate`:

    message Certificate {
        enum Version {
            UNKNOWN_VERSION = 0;
            _0_0_1 = 1;
        }
        required Version version = 1;
        required KeyType keyType = 2;
        required bytes publicKey = 4;
    }

## [Signature](https://github.com/lbryio/lbryschema/blob/master/lbryschema/proto/signature.proto)
Claims may be signed using the private key to a Certificate public key:

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
