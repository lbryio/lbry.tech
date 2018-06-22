# LBRY JSON-RPC API Documentation

## blob_announce

> Returns:

```
    (bool) true if successful
```

Announce blobs to the DHT

### Arguments

| Parameter   | Description                                                            |
|:------------|:-----------------------------------------------------------------------|
| blob_hash   | (str) announce a blob, specified by blob_hash                          |
| stream_hash | (str) announce all blobs associated withstream_hash                    |
| sd_hash     | (str) announce all blobs associated withsd_hash and the sd_hash itself |


## blob_availability

> Returns:

```
    (dict) {
        "is_available": <bool, true if blob is available from a peer from peer list>
        "reachable_peers": ["<ip>:<port>"],
        "unreachable_peers": ["<ip>:<port>"]
    }
```

Get blob availability

### Arguments

| Parameter      | Description                                               |
|:---------------|:----------------------------------------------------------|
| blob_hash      | (str) check availability for this blob hash               |
| search_timeout | (int) how long to search for peers for the blobin the dht |
| blob_timeout   | (int) how long to try downloading from a peer             |


## blob_delete

> Returns:

```
    (str) Success/fail message
```

Delete a blob

### Arguments

| Parameter   | Description                           |
|:------------|:--------------------------------------|
| blob_hash   | (str) blob hash of the blob to delete |


## blob_get

> Returns:

```
    (str) Success/Fail message or (dict) decoded data
```

Download and return a blob

### Arguments

| Parameter            | Description                                                                                                     |
|:---------------------|:----------------------------------------------------------------------------------------------------------------|
| blob_hash *required* | (str) blob hash of the blob to get                                                                              |
| timeout              | (int) timeout in number of seconds                                                                              |
| encoding             | (str) by default no attempt at decodingis made, can be set to one of thefollowing decoders:'json'               |
| payment_rate_manager | (str) if not given the default payment ratemanager will be used.supported alternative rate managers:'only-free' |


## blob_list

> Returns:

```
    (list) List of blob hashes
```

Returns blob hashes. If not given filters, returns all blobs known by the blob manager

### Arguments

| Parameter   | Description                           |
|:------------|:--------------------------------------|
| needed      | (bool) only return needed blobs       |
| finished    | (bool) only return finished blobs     |
| uri         | (str) filter blobs by stream in a uri |
| stream_hash | (str) filter blobs by stream hash     |
| sd_hash     | (str) filter blobs by sd hash         |
| page_size   | (int) results page size               |
| page        | (int) page of results to return       |


## blob_reflect

> Returns:

```
    (list) reflected blob hashes
```

Reflects specified blobs

### Arguments

| Parameter        | Description             |
|:-----------------|:------------------------|
| reflector_server | (str) reflector address |


## blob_reflect_all

> Returns:

```
    (bool) true if successful
```

Reflects all saved blobs

### Arguments

| Parameter   | Description   |
||


## block_show

> Returns:

```
    (dict) Requested block
```

Get contents of a block

### Arguments

| Parameter            | Description                          |
|:---------------------|:-------------------------------------|
| blockhash *required* | (str) hash of the block to look up   |
| height *required*    | (int) height of the block to look up |


## channel_export

> Returns:

```
    (str) Serialized certificate information
```

Export serialized channel signing information for a given certificate claim id

### Arguments

| Parameter           | Description                                |
|:--------------------|:-------------------------------------------|
| claim_id *required* | (str) Claim ID to export information about |


## channel_import

> Returns:

```
    (dict) Result dictionary
```

Import serialized channel signing information (to allow signing new claims to the channel)

### Arguments

| Parameter                              | Description            |
|:---------------------------------------|:-----------------------|
| serialized_certificate_info *required* | (str) certificate info |


## channel_list

> Returns:

```
    (list) ClaimDict, includes 'is_mine' field to indicate if the certificate claim
    is in the wallet.
```

Get certificate claim infos for channels that can be published to

### Arguments

| Parameter   | Description   |
||


## channel_new

> Returns:

```
    (dict) Dictionary containing result of the claim
    {
        'tx' : (str) hex encoded transaction
        'txid' : (str) txid of resulting claim
        'nout' : (int) nout of the resulting claim
        'fee' : (float) fee paid for the claim transaction
        'claim_id' : (str) claim ID of the resulting claim
    }
```

Generate a publisher key and create a new '@' prefixed certificate claim

### Arguments

| Parameter               | Description                                 |
|:------------------------|:--------------------------------------------|
| channel_name *required* | (str) name of the channel prefixed with '@' |
| amount *required*       | (float) bid amount on the channel           |


## claim_abandon

> Returns:

```
    (dict) Dictionary containing result of the claim
    {
        txid : (str) txid of resulting transaction
        fee : (float) fee paid for the transaction
    }
```

Abandon a name and reclaim credits from the claim

### Arguments

| Parameter   | Description                            |
|:------------|:---------------------------------------|
| claim_id    | (str) claim_id of the claim to abandon |
| txid        | (str) txid of the claim to abandon     |
| nout        | (int) nout of the claim to abandon     |


## claim_list

> Returns:

```
    (dict) State of claims assigned for the name
    {
        'claims': (list) list of claims for the name
        [
            {
            'amount': (float) amount assigned to the claim
            'effective_amount': (float) total amount assigned to the claim,
                                including supports
            'claim_id': (str) claim ID of the claim
            'height': (int) height of block containing the claim
            'txid': (str) txid of the claim
            'nout': (int) nout of the claim
            'permanent_url': (str) permanent url of the claim,
            'supports': (list) a list of supports attached to the claim
            'value': (str) the value of the claim
            },
        ]
        'supports_without_claims': (list) supports without any claims attached to them
        'last_takeover_height': (int) the height of last takeover for the name
    }
```

List current claims and information about them for a given name

### Arguments

| Parameter       | Description                                |
|:----------------|:-------------------------------------------|
| name *required* | (str) name of the claim to list info about |


## claim_list_by_channel

> Returns:

```
    {
         resolved channel uri: {
            If there was an error:
            'error': (str) error message

            'claims_in_channel': the total number of results for the channel,

            If a page of results was requested:
            'returned_page': page number returned,
            'claims_in_channel': [
                {
                    'absolute_channel_position': (int) claim index number in sorted list of
                                                 claims which assert to be part of the
                                                 channel
                    'address': (str) claim address,
                    'amount': (float) claim amount,
                    'effective_amount': (float) claim amount including supports,
                    'claim_id': (str) claim id,
                    'claim_sequence': (int) claim sequence number,
                    'decoded_claim': (bool) whether or not the claim value was decoded,
                    'height': (int) claim height,
                    'depth': (int) claim depth,
                    'has_signature': (bool) included if decoded_claim
                    'name': (str) claim name,
                    'supports: (list) list of supports [{'txid': (str) txid,
                                                         'nout': (int) nout,
                                                         'amount': (float) amount}],
                    'txid': (str) claim txid,
                    'nout': (str) claim nout,
                    'signature_is_valid': (bool), included if has_signature,
                    'value': ClaimDict if decoded, otherwise hex string
                }
            ],
        }
    }
```

Get paginated claims in a channel specified by a channel uri

### Arguments

| Parameter      | Description                                                                               |
|:---------------|:------------------------------------------------------------------------------------------|
| uri *required* | (str) uri of the channel                                                                  |
| uris           | (list) uris of the channel                                                                |
| page           | (int) which page of results to return where page 1 is the firstpage, defaults to no pages |
| page_size      | (int) number of results in a page, default of 10                                          |


## claim_list_mine

> Returns:

```
    (list) List of name claims owned by user
    [
        {
            'address': (str) address that owns the claim
            'amount': (float) amount assigned to the claim
            'blocks_to_expiration': (int) number of blocks until it expires
            'category': (str) "claim", "update" , or "support"
            'claim_id': (str) claim ID of the claim
            'confirmations': (int) number of blocks of confirmations for the claim
            'expiration_height': (int) the block height which the claim will expire
            'expired': (bool) true if expired, false otherwise
            'height': (int) height of the block containing the claim
            'is_spent': (bool) true if claim is abandoned, false otherwise
            'name': (str) name of the claim
            'permanent_url': (str) permanent url of the claim,
            'txid': (str) txid of the cliam
            'nout': (int) nout of the claim
            'value': (str) value of the claim
        },
   ]
```

List my name claims

### Arguments

| Parameter   | Description   |
||


## claim_new_support

> Returns:

```
    (dict) Dictionary containing result of the claim
    {
        txid : (str) txid of resulting support claim
        nout : (int) nout of the resulting support claim
        fee : (float) fee paid for the transaction
    }
```

Support a name claim

### Arguments

| Parameter           | Description                            |
|:--------------------|:---------------------------------------|
| name *required*     | (str) name of the claim to support     |
| claim_id *required* | (str) claim_id of the claim to support |
| amount *required*   | (float) amount of support              |


## claim_renew

> Returns:

```
    (dict) Dictionary where key is the the original claim's outpoint and
    value is the result of the renewal
    {
        outpoint:{

            'tx' : (str) hex encoded transaction
            'txid' : (str) txid of resulting claim
            'nout' : (int) nout of the resulting claim
            'fee' : (float) fee paid for the claim transaction
            'claim_id' : (str) claim ID of the resulting claim
        },
    }
```

Renew claim(s) or support(s)

### Arguments

| Parameter           | Description                                                 |
|:--------------------|:------------------------------------------------------------|
| outpoint *required* | (str) outpoint of the claim to renew                        |
| height *required*   | (str) update claims expiring before or at this block height |


## claim_send_to_address

> Returns:

```
    (dict) Dictionary containing result of the claim
    {
        'tx' : (str) hex encoded transaction
        'txid' : (str) txid of resulting claim
        'nout' : (int) nout of the resulting claim
        'fee' : (float) fee paid for the claim transaction
        'claim_id' : (str) claim ID of the resulting claim
    }
```

Send a name claim to an address

### Arguments

| Parameter           | Description                                                                           |
|:--------------------|:--------------------------------------------------------------------------------------|
| claim_id *required* | (str) claim_id to send                                                                |
| address *required*  | (str) address to send the claim to                                                    |
| amount              | (int) Amount of credits to claim name for, defaults to the current amounton the claim |


## claim_show

> Returns:

```
    (dict) Dictionary containing claim info as below,

    {
        'txid': (str) txid of claim
        'nout': (int) nout of claim
        'amount': (float) amount of claim
        'value': (str) value of claim
        'height' : (int) height of claim takeover
        'claim_id': (str) claim ID of claim
        'supports': (list) list of supports associated with claim
    }

    if claim cannot be resolved, dictionary as below will be returned

    {
        'error': (str) reason for error
    }
```

Resolve claim info from txid/nout or with claim ID

### Arguments

| Parameter   | Description                                                     |
|:------------|:----------------------------------------------------------------|
| txid        | (str) look for claim with this txid, nout mustalso be specified |
| nout        | (int) look for claim with this nout, txid mustalso be specified |
| claim_id    | (str) look for claim with this claim id                         |


## cli_test_command

> Returns:

```
    pos args
```

This command is only for testing the CLI argument parsing
### Arguments

| Parameter          | Description   |
|:-------------------|:--------------|
| a_arg              | a arg         |
| b_arg              | b arg         |
| pos_arg *required* | pos arg       |
| pos_args           | pos args      |
| pos_arg2           | pos arg 2     |
| pos_arg3           | pos arg 3     |


## commands

> Returns:

```
    (list) list of available commands
```

Return a list of available commands

### Arguments

| Parameter   | Description   |
||


## daemon_stop

> Returns:

```
    (string) Shutdown message
```

Stop lbrynet-daemon

### Arguments

| Parameter   | Description   |
||


## file_delete

> Returns:

```
    (bool) true if deletion was successful
```

Delete a LBRY file

### Arguments

| Parameter                | Description                                                                                                        |
|:-------------------------|:-------------------------------------------------------------------------------------------------------------------|
| delete_from_download_dir | (bool) delete file from download directory,instead of just deleting blobs                                          |
| delete_all               | (bool) if there are multiple matching files,allow the deletion of multiple files.Otherwise do not delete anything. |
| sd_hash                  | (str) delete by file sd hash                                                                                       |
| file_name                | (str) delete by file name in downloads folder                                                                      |
| stream_hash              | (str) delete by file stream hash                                                                                   |
| rowid                    | (int) delete by file row id                                                                                        |
| claim_id                 | (str) delete by file claim id                                                                                      |
| txid                     | (str) delete by file claim txid                                                                                    |
| nout                     | (int) delete by file claim nout                                                                                    |
| claim_name               | (str) delete by file claim name                                                                                    |
| channel_claim_id         | (str) delete by file channel claim id                                                                              |
| channel_name             | (str) delete by file channel claim name                                                                            |


## file_list

> Returns:

```
    (list) List of files

    [
        {
            'completed': (bool) true if download is completed,
            'file_name': (str) name of file,
            'download_directory': (str) download directory,
            'points_paid': (float) credit paid to download file,
            'stopped': (bool) true if download is stopped,
            'stream_hash': (str) stream hash of file,
            'stream_name': (str) stream name ,
            'suggested_file_name': (str) suggested file name,
            'sd_hash': (str) sd hash of file,
            'download_path': (str) download path of file,
            'mime_type': (str) mime type of file,
            'key': (str) key attached to file,
            'total_bytes': (int) file size in bytes, None if full_status is false,
            'written_bytes': (int) written size in bytes,
            'blobs_completed': (int) num_completed, None if full_status is false,
            'blobs_in_stream': (int) None if full_status is false,
            'status': (str) downloader status, None if full_status is false,
            'claim_id': (str) None if full_status is false or if claim is not found,
            'outpoint': (str) None if full_status is false or if claim is not found,
            'txid': (str) None if full_status is false or if claim is not found,
            'nout': (int) None if full_status is false or if claim is not found,
            'metadata': (dict) None if full_status is false or if claim is not found,
            'channel_claim_id': (str) None if full_status is false or if claim is not found or signed,
            'channel_name': (str) None if full_status is false or if claim is not found or signed,
            'claim_name': (str) None if full_status is false or if claim is not found
        },
    ]
```

List files limited by optional filters

### Arguments

| Parameter        | Description                                                                                                    |
|:-----------------|:---------------------------------------------------------------------------------------------------------------|
| sd_hash          | (str) get file with matching sd hash                                                                           |
| file_name        | (str) get file with matching file name in thedownloads folder                                                  |
| stream_hash      | (str) get file with matching stream hash                                                                       |
| rowid            | (int) get file with matching row id                                                                            |
| claim_id         | (str) get file with matching claim id                                                                          |
| outpoint         | (str) get file with matching claim outpoint                                                                    |
| txid             | (str) get file with matching claim txid                                                                        |
| nout             | (int) get file with matching claim nout                                                                        |
| channel_claim_id | (str) get file with matching channel claim id                                                                  |
| channel_name     | (str) get file with matching channel name                                                                      |
| claim_name       | (str) get file with matching claim name                                                                        |
| full_status      | (bool) full status, populate the'message' and 'size' fields                                                    |
| sort             | (str) sort by any property, like 'file_name'or 'metadata.author'; to specify directionappend ',asc' or ',desc' |


## file_reflect

> Returns:

```
    (list) list of blobs reflected
```

Reflect all the blobs in a file matching the filter criteria

### Arguments

| Parameter   | Description                                                                         |
|:------------|:------------------------------------------------------------------------------------|
| sd_hash     | (str) get file with matching sd hash                                                |
| file_name   | (str) get file with matching file name in thedownloads folder                       |
| stream_hash | (str) get file with matching stream hash                                            |
| rowid       | (int) get file with matching row id                                                 |
| reflector   | (str) reflector server, ip address or urlby default choose a server from the config |


## file_set_status

> Returns:

```
    (str) Confirmation message
```

Start or stop downloading a file

### Arguments

| Parameter         | Description                                                             |
|:------------------|:------------------------------------------------------------------------|
| status *required* | (str) one of "start" or "stop"                                          |
| sd_hash           | (str) set status of file with matching sd hash                          |
| file_name         | (str) set status of file with matching file name in thedownloads folder |
| stream_hash       | (str) set status of file with matching stream hash                      |
| rowid             | (int) set status of file with matching row id                           |


## get

> Returns:

```
    (dict) Dictionary containing information about the stream
    {
        'completed': (bool) true if download is completed,
        'file_name': (str) name of file,
        'download_directory': (str) download directory,
        'points_paid': (float) credit paid to download file,
        'stopped': (bool) true if download is stopped,
        'stream_hash': (str) stream hash of file,
        'stream_name': (str) stream name ,
        'suggested_file_name': (str) suggested file name,
        'sd_hash': (str) sd hash of file,
        'download_path': (str) download path of file,
        'mime_type': (str) mime type of file,
        'key': (str) key attached to file,
        'total_bytes': (int) file size in bytes, None if full_status is false,
        'written_bytes': (int) written size in bytes,
        'blobs_completed': (int) num_completed, None if full_status is false,
        'blobs_in_stream': (int) None if full_status is false,
        'status': (str) downloader status, None if full_status is false,
        'claim_id': (str) claim id,
        'outpoint': (str) claim outpoint string,
        'txid': (str) claim txid,
        'nout': (int) claim nout,
        'metadata': (dict) claim metadata,
        'channel_claim_id': (str) None if claim is not signed
        'channel_name': (str) None if claim is not signed
        'claim_name': (str) claim name
    }
```

Download stream from a LBRY name.

### Arguments

| Parameter   | Description                                  |
|:------------|:---------------------------------------------|
| uri         | (str) uri of the content to download         |
| file_name   | (str) specified name for the downloaded file |
| timeout     | (int) download timeout in number of seconds  |


## help

> Returns:

```
    (str) Help message
```

Return a useful message for an API command

### Arguments

| Parameter   | Description                                 |
|:------------|:--------------------------------------------|
| command     | (str) command to retrieve documentation for |


## peer_list

> Returns:

```
    (list) List of contact dictionaries {'host': <peer ip>, 'port': <peer port>, 'node_id': <peer node id>}
```

Get peers for blob hash

### Arguments

| Parameter            | Description                                   |
|:---------------------|:----------------------------------------------|
| blob_hash *required* | (str) find available peers for this blob hash |
| timeout              | (int) peer search timeout in seconds          |


## peer_ping

> Returns:

```
    (str) pong, or {'error': <error message>} if an error is encountered
```

Find and ping a peer by node id

### Arguments

| Parameter   | Description   |
||


## publish

> Returns:

```
    (dict) Dictionary containing result of the claim
    {
        'tx' : (str) hex encoded transaction
        'txid' : (str) txid of resulting claim
        'nout' : (int) nout of the resulting claim
        'fee' : (decimal) fee paid for the claim transaction
        'claim_id' : (str) claim ID of the resulting claim
    }
```

Make a new name claim and publish associated data to lbrynet,
update over existing claim if user already has a claim for name.

Fields required in the final Metadata are:
    'title'
    'description'
    'author'
    'language'
    'license'
    'nsfw'

Metadata can be set by either using the metadata argument or by setting individual arguments
fee, title, description, author, language, license, license_url, thumbnail, preview, nsfw,
or sources. Individual arguments will overwrite the fields specified in metadata argument.

### Arguments

| Parameter       | Description                                                                                                                                                                                                                                                        |
|:----------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name *required* | (str) name of the content                                                                                                                                                                                                                                          |
| bid *required*  | (decimal) amount to back the claim                                                                                                                                                                                                                                 |
| metadata        | (dict) ClaimDict to associate with the claim.                                                                                                                                                                                                                      |
| file_path       | (str) path to file to be associated with name. If provided,a lbry stream of this file will be used in 'sources'.If no path is given but a sources dict is provided,it will be used. If neither are provided, anerror is raised.                                    |
| fee             | (dict) Dictionary representing key fee to download content:{'currency': currency_symbol,'amount': decimal,'address': str, optional}supported currencies: LBC, USD, BTCIf an address is not provided a new one will beautomatically generated. Default fee is zero. |
| title           | (str) title of the publication                                                                                                                                                                                                                                     |
| description     | (str) description of the publication                                                                                                                                                                                                                               |
| author          | (str) author of the publication                                                                                                                                                                                                                                    |
| language        | (str) language of the publication                                                                                                                                                                                                                                  |
| license         | (str) publication license                                                                                                                                                                                                                                          |
| license_url     | (str) publication license url                                                                                                                                                                                                                                      |
| thumbnail       | (str) thumbnail url                                                                                                                                                                                                                                                |
| preview         | (str) preview url                                                                                                                                                                                                                                                  |
| nsfw            | (bool) title of the publication                                                                                                                                                                                                                                    |
| sources         | (str) {'lbry_sd_hash': sd_hash} specifies sd hash of file                                                                                                                                                                                                          |
| channel_name    | (str) name of the publisher channel name in the wallet                                                                                                                                                                                                             |
| channel_id      | (str) claim id of the publisher channel, does not checkfor channel claim being in the wallet. This allowspublishing to a channel where only the certificateprivate key is in the wallet.                                                                           |
| claim_address   | (str) address where the claim is sent to, if not specifiednew address wil automatically be created                                                                                                                                                                 |


## report_bug

> Returns:

```
    (bool) true if successful
```

Report a bug to slack

### Arguments

| Parameter          | Description                  |
|:-------------------|:-----------------------------|
| message *required* | (str) Description of the bug |


## resolve

> Returns:

```
    Dictionary of results, keyed by uri
    '<uri>': {
            If a resolution error occurs:
            'error': Error message

            If the uri resolves to a channel or a claim in a channel:
            'certificate': {
                'address': (str) claim address,
                'amount': (float) claim amount,
                'effective_amount': (float) claim amount including supports,
                'claim_id': (str) claim id,
                'claim_sequence': (int) claim sequence number,
                'decoded_claim': (bool) whether or not the claim value was decoded,
                'height': (int) claim height,
                'depth': (int) claim depth,
                'has_signature': (bool) included if decoded_claim
                'name': (str) claim name,
                'permanent_url': (str) permanent url of the certificate claim,
                'supports: (list) list of supports [{'txid': (str) txid,
                                                     'nout': (int) nout,
                                                     'amount': (float) amount}],
                'txid': (str) claim txid,
                'nout': (str) claim nout,
                'signature_is_valid': (bool), included if has_signature,
                'value': ClaimDict if decoded, otherwise hex string
            }

            If the uri resolves to a channel:
            'claims_in_channel': (int) number of claims in the channel,

            If the uri resolves to a claim:
            'claim': {
                'address': (str) claim address,
                'amount': (float) claim amount,
                'effective_amount': (float) claim amount including supports,
                'claim_id': (str) claim id,
                'claim_sequence': (int) claim sequence number,
                'decoded_claim': (bool) whether or not the claim value was decoded,
                'height': (int) claim height,
                'depth': (int) claim depth,
                'has_signature': (bool) included if decoded_claim
                'name': (str) claim name,
                'permanent_url': (str) permanent url of the claim,
                'channel_name': (str) channel name if claim is in a channel
                'supports: (list) list of supports [{'txid': (str) txid,
                                                     'nout': (int) nout,
                                                     'amount': (float) amount}]
                'txid': (str) claim txid,
                'nout': (str) claim nout,
                'signature_is_valid': (bool), included if has_signature,
                'value': ClaimDict if decoded, otherwise hex string
            }
    }
```

Resolve given LBRY URIs

### Arguments

| Parameter      | Description                           |
|:---------------|:--------------------------------------|
| force          | (bool) force refresh and ignore cache |
| uri *required* | (str) uri to resolve                  |
| uris           | (list) uris to resolve                |


## resolve_name

> Returns:

```
    (dict) Metadata dictionary from name claim, None if the name is not
            resolvable
```

Resolve stream info from a LBRY name

### Arguments

| Parameter       | Description                                 |
|:----------------|:--------------------------------------------|
| name *required* | (str) the name to resolve                   |
| force           | (bool) force refresh and do not check cache |


## routing_table_get

> Returns:

```
    (dict) dictionary containing routing and contact information
    {
        "buckets": {
            <bucket index>: [
                {
                    "address": (str) peer address,
                    "port": (int) peer udp port
                    "node_id": (str) peer node id,
                    "blobs": (list) blob hashes announced by peer
                }
            ]
        },
        "contacts": (list) contact node ids,
        "blob_hashes": (list) all of the blob hashes stored by peers in the list of buckets,
        "node_id": (str) the local dht node id
    }
```

Get DHT routing information

### Arguments

| Parameter   | Description   |
||


## settings_get

> Returns:

```
    (dict) Dictionary of daemon settings
    See ADJUSTABLE_SETTINGS in lbrynet/conf.py for full list of settings
```

Get daemon settings

### Arguments

| Parameter   | Description   |
||


## settings_set

> Returns:

```
    (dict) Updated dictionary of daemon settings
```

Set daemon settings

### Arguments

| Parameter                     | Description                                                                                                                                                                                  |
|:------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| download_directory            | (str) path of download directory                                                                                                                                                             |
| data_rate                     | (float) 0.0001                                                                                                                                                                               |
| download_timeout              | (int) 180                                                                                                                                                                                    |
| peer_port                     | (int) 3333                                                                                                                                                                                   |
| max_key_fee                   | (dict) maximum key fee for downloads,in the format:{'currency': <currency_symbol>,'amount': <amount>}.In the CLI, it must be an escaped JSON stringSupported currency symbols: LBC, USD, BTC |
| disable_max_key_fee           | (bool) False                                                                                                                                                                                 |
| use_upnp                      | (bool) True                                                                                                                                                                                  |
| run_reflector_server          | (bool) False                                                                                                                                                                                 |
| cache_time                    | (int) 150                                                                                                                                                                                    |
| reflect_uploads               | (bool) True                                                                                                                                                                                  |
| share_usage_data              | (bool) True                                                                                                                                                                                  |
| peer_search_timeout           | (int) 3                                                                                                                                                                                      |
| sd_download_timeout           | (int) 3                                                                                                                                                                                      |
| auto_renew_claim_height_delta | (int) 0claims set to expire within this many blocks will beautomatically renewed after startup (if set to 0, renewswill not be made automatically)                                           |


## status

> Returns:

```
    (dict) lbrynet-daemon status
    {
        'lbry_id': lbry peer id, base58,
        'installation_id': installation id, base58,
        'is_running': bool,
        'is_first_run': bool,
        'startup_status': {
            'code': status code,
            'message': status message
        },
        'connection_status': {
            'code': connection status code,
            'message': connection status message
        },
        'blockchain_status': {
            'blocks': local blockchain height,
            'blocks_behind': remote_height - local_height,
            'best_blockhash': block hash of most recent block,
        },
        'wallet_is_encrypted': bool,

        If given the session status option:
            'session_status': {
                'managed_blobs': count of blobs in the blob manager,
                'managed_streams': count of streams in the file manager
                'announce_queue_size': number of blobs currently queued to be announced
                'should_announce_blobs': number of blobs that should be announced
            }
    }
```

Get daemon status

### Arguments

| Parameter      | Description                              |
|:---------------|:-----------------------------------------|
| session_status | (bool) include session status in results |


## stream_availability

> Returns:

```
    (dict) {
        'is_available': <bool>,
        'did_decode': <bool>,
        'did_resolve': <bool>,
        'is_stream': <bool>,
        'num_blobs_in_stream': <int>,
        'sd_hash': <str>,
        'sd_blob_availability': <dict> see `blob_availability`,
        'head_blob_hash': <str>,
        'head_blob_availability': <dict> see `blob_availability`,
        'use_upnp': <bool>,
        'upnp_redirect_is_set': <bool>,
        'error': <None> | <str> error message
    }
```

Get stream availability for lbry uri

### Arguments

| Parameter      | Description                                               |
|:---------------|:----------------------------------------------------------|
| uri *required* | (str) check availability for this uri                     |
| search_timeout | (int) how long to search for peers for the blobin the dht |
| blob_timeout   | (int) how long to try downloading from a peer             |


## stream_cost_estimate

> Returns:

```
    (float) Estimated cost in lbry credits, returns None if uri is not
        resolvable
```

Get estimated cost for a lbry stream

### Arguments

| Parameter      | Description                                                              |
|:---------------|:-------------------------------------------------------------------------|
| uri *required* | (str) uri to use                                                         |
| size           | (float) stream size in bytes. if provided an sd blob won't bedownloaded. |


## transaction_list

> Returns:

```
    (list) List of transactions

    {
        "claim_info": (list) claim info if in txn [{
                                                "address": (str) address of claim,
                                                "balance_delta": (float) bid amount,
                                                "amount": (float) claim amount,
                                                "claim_id": (str) claim id,
                                                "claim_name": (str) claim name,
                                                "nout": (int) nout
                                                }],
        "abandon_info": (list) abandon info if in txn [{
                                                "address": (str) address of abandoned claim,
                                                "balance_delta": (float) returned amount,
                                                "amount": (float) claim amount,
                                                "claim_id": (str) claim id,
                                                "claim_name": (str) claim name,
                                                "nout": (int) nout
                                                }],
        "confirmations": (int) number of confirmations for the txn,
        "date": (str) date and time of txn,
        "fee": (float) txn fee,
        "support_info": (list) support info if in txn [{
                                                "address": (str) address of support,
                                                "balance_delta": (float) support amount,
                                                "amount": (float) support amount,
                                                "claim_id": (str) claim id,
                                                "claim_name": (str) claim name,
                                                "is_tip": (bool),
                                                "nout": (int) nout
                                                }],
        "timestamp": (int) timestamp,
        "txid": (str) txn id,
        "update_info": (list) update info if in txn [{
                                                "address": (str) address of claim,
                                                "balance_delta": (float) credited/debited
                                                "amount": (float) absolute amount,
                                                "claim_id": (str) claim id,
                                                "claim_name": (str) claim name,
                                                "nout": (int) nout
                                                }],
        "value": (float) value of txn
    }
```

List transactions belonging to wallet

### Arguments

| Parameter   | Description   |
||


## transaction_show

> Returns:

```
    (dict) JSON formatted transaction
```

Get a decoded transaction from a txid

### Arguments

| Parameter       | Description                   |
|:----------------|:------------------------------|
| txid *required* | (str) txid of the transaction |


## utxo_list

> Returns:

```
    (list) List of unspent transaction outputs (UTXOs)
    [
        {
            "address": (str) the output address
            "amount": (float) unspent amount
            "height": (int) block height
            "is_claim": (bool) is the tx a claim
            "is_coinbase": (bool) is the tx a coinbase tx
            "is_support": (bool) is the tx a support
            "is_update": (bool) is the tx an update
            "nout": (int) nout of the output
            "txid": (str) txid of the output
        },
        ...
    ]
```

List unspent transaction outputs

### Arguments

| Parameter   | Description   |
||


## version

> Returns:

```
    (dict) Dictionary of lbry version information
    {
        'build': (str) build type (e.g. "dev", "rc", "release"),
        'ip': (str) remote ip, if available,
        'lbrynet_version': (str) lbrynet_version,
        'lbryum_version': (str) lbryum_version,
        'lbryschema_version': (str) lbryschema_version,
        'os_release': (str) os release string
        'os_system': (str) os name
        'platform': (str) platform string
        'processor': (str) processor type,
        'python_version': (str) python version,
    }
```

Get lbry version information

### Arguments

| Parameter   | Description   |
||


## wallet_balance

> Returns:

```
    (float) amount of lbry credits in wallet
```

Return the balance of the wallet

### Arguments

| Parameter           | Description                                                      |
|:--------------------|:-----------------------------------------------------------------|
| address             | (str) If provided only the balance for thisaddress will be given |
| include_unconfirmed | (bool) Include unconfirmed                                       |


## wallet_decrypt

> Returns:

```
    (bool) true if wallet is decrypted, otherwise false
```

Decrypt an encrypted wallet, this will remove the wallet password

### Arguments

| Parameter   | Description   |
||


## wallet_encrypt

> Returns:

```
    (bool) true if wallet is decrypted, otherwise false
```

Encrypt a wallet with a password, if the wallet is already encrypted this will update
the password

### Arguments

| Parameter               | Description                                            |
|:------------------------|:-------------------------------------------------------|
| new_password *required* | (str) password string to be used for encrypting wallet |


## wallet_is_address_mine

> Returns:

```
    (bool) true, if address is associated with current wallet
```

Checks if an address is associated with the current wallet.

### Arguments

| Parameter          | Description            |
|:-------------------|:-----------------------|
| address *required* | (str) address to check |


## wallet_list

> Returns:

```
    List of wallet addresses
```

List wallet addresses

### Arguments

| Parameter   | Description   |
||


## wallet_new_address

> Returns:

```
    (str) New wallet address in base58
```

Generate a new wallet address

### Arguments

| Parameter   | Description   |
||


## wallet_prefill_addresses

> Returns:

```
    (dict) the resulting transaction
```

Create new addresses, each containing `amount` credits

### Arguments

| Parameter                | Description                            |
|:-------------------------|:---------------------------------------|
| no_broadcast             | (bool) whether to broadcast or not     |
| num_addresses *required* | (int) num of addresses to create       |
| amount *required*        | (float) initial amount in each address |


## wallet_public_key

> Returns:

```
    (list) list of public keys associated with address.
        Could contain more than one public key if multisig.
```

Get public key from wallet address

### Arguments

| Parameter          | Description                                   |
|:-------------------|:----------------------------------------------|
| address *required* | (str) address for which to get the public key |


## wallet_send

> Returns:

```
    If sending to an address:
    (bool) true if payment successfully scheduled

    If sending a claim tip:
    (dict) Dictionary containing the result of the support
    {
        txid : (str) txid of resulting support claim
        nout : (int) nout of the resulting support claim
        fee : (float) fee paid for the transaction
    }
```

Send credits. If given an address, send credits to it. If given a claim id, send a tip
to the owner of a claim specified by uri. A tip is a claim support where the recipient
of the support is the claim address for the claim being supported.

### Arguments

| Parameter           | Description                                     |
|:--------------------|:------------------------------------------------|
| amount *required*   | (float) amount of credit to send                |
| address *required*  | (str) address to send credits to                |
| claim_id *required* | (float) claim_id of the claim to send to tip to |


## wallet_unlock

> Returns:

```
    (bool) true if wallet is unlocked, otherwise false
```

Unlock an encrypted wallet

### Arguments

| Parameter           | Description                         |
|:--------------------|:------------------------------------|
| password *required* | (str) password for unlocking wallet |


## wallet_unused_address

> Returns:

```
    (str) Unused wallet address in base58
```

Return an address containing no balance, will create
a new address if there is none.

### Arguments

| Parameter   | Description   |
||


