# Configurable settings for the LBRY daemon 

This document outlines how to configure daemon settings and what options are available. They can be found on the lbry GitHub repository in [conf.py](https://github.com/lbryio/lbry/blob/master/lbrynet/conf.py).

## Daemon settings configuration 

The easiest way to configure the settings is by editing the `daemon_settings.yml` file (may need to be created) that resides in the default [lbrynet directory](https://lbry.io/faq/lbry-directories). These settings can also be configured via the [settings_set](https://lbry.tech/api/sdk#settings_set) API call. The [settings_get](https://lbry.tech/api/sdk#settings_get) API call can be used to retrieve current values. Currently not all settings are made available via the API calls, see [GitHub issue 1374](https://github.com/lbryio/lbry/issues/1374). 

Sample daemon_settings.yml file:
```
peer_port: 3335
lbryum_servers: ['lbryumx1.lbry.io:50001','lbryumx2.lbry.io:50001']
download_directory: 'c:\lbry\Downloads'
use_upnp: false
```

## Configuration options
Configuration options are organized by their respective areas: Files, Wallet, Network, Security and Other.

### Files
| Setting                | Format  | Default value                                        | Sample Values      | Description                                                                          |
|------------------------|---------|------------------------------------------------------|--------------------|--------------------------------------------------------------------------------------|
| data_dir               | string  | [varies by OS](https://lbry.io/faq/lbry-directories) | 'c:\lbry\lbrynet\' | Where to store the lbrynet folder, which includes blob files, logs and   config data |
| delete_blobs_on_remove | boolean | true                                                 | false              | Delete blobs on a file_delete call?                                                  |
| download_directory     | string  | local downloads folder                               | 'c:\lbry\lbrynet\' | Location of downloaded output files                                                  |

### Wallet
| Setting                       | Format  | Default value                                        | Sample Values                      | Description                                                                                       |
|-------------------------------|---------|------------------------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------|
| auto_renew_claim_height_delta | integer | 0                                                    | 1000                               | If your claim is X blocks away, auto renew it. 0 means disabled (default)                         |
| blockchain_name               | string  | 'lbrycrd_main'                                       | 'lbrycrd_regtest'                  | Blockchain network to connect to                                                                  |
| disable_max_key_fee           | boolean | false                                                | true                               | If disabled, don't check for max fee                                                              |
| lbryum_servers                | list    | ['lbryumx1.lbry.io:50001','lbryumx2.lbry.io:50001']  | ["mylbryum.lbry.io:50001]          | SPV wallet server address                                                                         |
| lbryum_wallet_dir             | string  | [varies by OS](https://lbry.io/faq/lbry-directories) | 'c:\lbry\lbryum\'                  | Wallet data location                                                                              |
| max_key_fee                   | json    | {'currency': 'USD', 'amount': 50.0}                  | {'currency': 'LBC', 'amount': 5.0} | Max payment allowed for content                                                                   |
| wallet                        | string  | 'lbryum'                                             | 'lbrycrd'                          | Choice of wallet software, SPV (lbryum) vs full node (lbrycrd). Currently   only lbryum supported |
| use_keyring                   | boolean | false                                                | true                               | Store wallet password in keyring                                                                  |

### Network 
| Setting                    | Format  | Default value             | Sample Values              | Description                                                                        |
|----------------------------|---------|---------------------------|----------------------------|------------------------------------------------------------------------------------|
| api_host                   | string  | localhost                 | 0.0.0.0                    | IP address the daemon API will listen on                                           |
| api_port                   | integer | 5279                      | 9000                       | Port the daemon API will listen on                                                 |
| cache_time                 | integer | 150                       | 90                         | How long to keep resolve data in cache                                             |
| data_rate                  | float   | 0.0001                    | 0.05                       | What LBC rate, per MB, to offer DHT data at (currently disabled in the protocol)   |
| dht_node_port              | integer | 4444                      | 4445                       | UDP port used to announce blobs                                                    |
| download_timeout           | integer | 180                       | 30                         | Time, in seconds, to allow download to get data blobs                              |
| download_mirrors           | list    | ['blobs.lbry.io']         | 0 or [myreflector.lbry.io] | Location of mirrored content. 0 means disabled.                                        |
| is_generous_host           | boolean | true                      | false                      | Host blobs without data payments                                                   |
| announce_head_blobs_only   | boolean | true                      | false                      | Only announce first data blob                                                      |
| concurrent_announcers      | integer | 10                        | 0                          | Threads used in order to announce blobs. 0 means disabled                          |
| known_dht_nodes            | list    | ['lbrynet1.lbry.io:4444'] | ['myDHT.lbry.io:4444']     | Bootstrap nodes for network connectivity                                           |
| max_connections_per_stream | integer | 5                         | 10                         | Threads used to download blobs                                                     |
| seek_head_blob_first       | boolean | true                      | false                      | Search for first data blob after downloading sd blob                               |
| peer_port                  | integer | 3333                      | 3334                       | Port the daemon will listen on                                                     |
| reflector_port             | integer | 5566                      | 5555                       | Reflector port to listen on                                                        |
| reflect_uploads            | boolean | true                      | false                      | Send published data to reflector servers                                           |
| auto_re_reflect_interval   | integer | 86400 (1 day)             | 43200                      | Time in seconds to re-check reflected data                                         |
| reflector_servers          | list    | ['reflector.lbry.io']     | ['myreflector.lbry.io']    | Server data will be reflected to                                                   |
| run_reflector_server       | boolean | FALSE                     | TRUE                       | Daemon will act as a reflector node - accept data from other nodes                 |
| sd_download_timeout        | integer | 3                         | 1                          | Time, in mintues, to allow download to get sd blob                                 |
| peer_search_timeout        | integer | 60                        | 30                         | Time, in seconds, to allow download to find peers                                  |
| use_upnp                   | boolean | true                      | false                      | Attempt external port mapping via UPnP                                             |

### Security

| Setting        | Format  | Default value | Sample Values      | Description                                                                                                                      |
|----------------|---------|---------------|--------------------|----------------------------------------------------------------------------------------------------------------------------------|
| allowed_origin | string  | ''            | '*' or   localhost | IP address to allow API requests from                                                                                            |
| use_auth_http  | boolean | false         | true               | See [authentication instructions](https://github.com/lbryio/lbry/blob/master/lbrynet/daemon/auth/server.py#L179)   for details   |

### Other
| Setting            | Format  | Default value | Sample Values                  | Description                                                                                                   |
|--------------------|---------|---------------|--------------------------------|---------------------------------------------------------------------------------------------------------------|
| components_to_skip | list    | []            | ['reflector','hash_announcer'] | Disable components, [see entire list here](https://github.com/lbryio/lbry/wiki/Component-Dependencies-Table)   |
| share_usage_data   | boolean | true          | false                          | Share analytics data                                                                                          |
