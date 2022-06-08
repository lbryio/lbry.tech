---
title: SDK Settings
description: The daemon provided by the LBRY SDK has many settings. This resource lists them all and what they mean. Ready, set, settings! 
---

This document outlines how to configure SDK daemon settings and what options are available. They can be found on the lbry GitHub repository in [conf.py](https://github.com/lbryio/lbry-sdk/blob/master/lbry/conf.py).

## Daemon settings configuration

The easiest way to configure the settings is by editing the `daemon_settings.yml` file (may need to be created) that resides in the default [lbrynet directory](https://lbry.com/faq/lbry-directories). These settings can also be configured via the [settings_set](https://lbry.tech/api/sdk#settings_set) API call. The [settings_get](https://lbry.tech/api/sdk#settings_get) API call can be used to retrieve current values. Some values will require an SDK restart after being set via the API call.

Sample daemon_settings.yml file:
```
tcp_port: 3335
lbryum_servers: ['spv11.lbry.com:50001','spv19.lbry.com:50001']
download_directory: 'c:\lbry\Downloads'
use_upnp: false
```

To run the SDK with a specific configuration file, launch it by passing the config path: ```lbrynet start --config=c:\path\to\conf\daemon_settings.yml```. To run in debug mode, start with ```lbrynet start --verbose=lbrynet```.

## Configuration options
Configuration options are organized by their respective areas: Files, Wallet, Network, Security and Other.

### Files
| Setting                | Format  | Default value                                        | Sample Values      | Description                                                                          |
|------------------------|---------|------------------------------------------------------|--------------------|--------------------------------------------------------------------------------------|
| data_dir               | string  | [varies by OS](https://lbry.com/faq/lbry-directories) | 'c:\lbry\lbrynet\' | Where to store the lbrynet folder, which includes blob files, logs and   config data |
| delete_blobs_on_remove | boolean | true                                                 | false              | Delete blobs on a file_delete call?                                                  |
| download_dir           | string  | local downloads folder                               | 'c:\lbry\lbrynet\' | Location of downloaded output files                                                  |

### Wallet
| Setting                       | Format  | Default value                                        | Sample Values                      | Description                                                                                       |
|-------------------------------|---------|------------------------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------|
| blockchain_name               | string  | 'lbrycrd_main'                                       | 'lbrycrd_regtest'                  | Blockchain network to connect to                                                                  |
| lbryum_servers                | list    | ['spv11.lbry.com:50001','spv19.lbry.com:50001']  | ["mylbryum.lbry.com:50001]          | SPV wallet server address(Default servers are spv11-spv19)                                                                         |
| wallet_dir                    | string  | [varies by OS](https://lbry.com/faq/lbry-directories) | 'c:\lbry\lbryum\'                  | Wallet data location                                                                              |
| max_key_fee                   | json    | {'currency': 'USD', 'amount': 50.0}                  | {'currency': 'LBC', 'amount': 5.0} | Max payment allowed for content                                                                   |
| wallet                        | string  | 'lbryum'                                             | 'lbrycrd'                          | Choice of wallet software, SPV (lbryum) vs full node (lbrycrd). Currently   only lbryum supported |
| use_keyring                   | boolean | false                                                | true                               | Store wallet password in keyring (not currently available)                                                                 |

### Network 
| Setting                    | Format  | Default value             | Sample Values              | Description                                                                        |
|----------------------------|---------|---------------------------|----------------------------|------------------------------------------------------------------------------------|
| api                        | string  | localhost:5279            | 0:0:0:0:5280               | IP address and port the SDK API will listen on     |
| streaming_server           | string  | localhost:5280            | 0:0:0:0:5280               | IP address and port the media/streaming server will listen on   | 
| cache_time                 | integer | 150                       | 90                         | How long to keep resolve data in cache                                             |
| data_rate                  | float   | 0.0001                    | 0.05                       | What LBC rate, per MB, to offer DHT data at (currently disabled in the protocol)   |
| udp_port                   | integer | 4444                      | 4445                       | UDP port used to announce blobs                                                    |
| download_timeout           | integer | 30                        | 60                         | Time, in seconds, to allow get call to resolve and get initial blobs               |
| blob_download_timeout      | integer | 30                        | 60                         | Time, in seconds, to allow download to get next blob                               |
| announce_head_blobs_only   | boolean | true                      | false                      | Only announce first data blob                                                      |
| concurrent_blob_announcers | integer | 10                        | 0                          | Threads used in order to announce blobs. 0 means disabled                          |
| known_dht_nodes            | list    | ['lbrynet1.lbry.com:4444'] | ['myDHT.lbry.com:4444']     | Bootstrap nodes for network connectivity                                         |
| max_connections_per_download | integer | 5                         | 10                         | Threads used to download blobs                                                     |
| seek_head_blob_first       | boolean | true                      | false                      | Search for first data blob after downloading sd blob                               |
| tcp_port                   | integer | 4444                      | 3334                       | Port the SDK will listen on                                                        |
| concurrent_reflector_uploads| integer | 5                        | 10                         | Connections to use while uploading data to reflector                               |
| reflect_streams            | boolean | true                      | false                      | Send published data to reflector servers                                           |
| reflector_servers          | list    | ['reflector.lbry.com']    | ['myreflector.lbry.com']   | Server data will be reflected to                                                 |
| fixed-peer-delay           | integer | 2                         | 5                          | Time, in mintues, to allow download from P2P before trying fixed peer              |
| peer_connect_timeout       | integer | 30                        | 15                         | Time, in seconds, to allow download to find peers                                  |
| node_rpc_timeout           | integer | 5                         | 10                         | Time, in seconds, to allow connection over DHT                                     |
| network_interface          | string  | 0:0:0:0                   | 127.0.0.1                  | Interface to use for the DHT and blob exchange                                     |
| use_upnp                   | boolean | true                      | false                      | Attempt external port mapping via UPnP                                             |
| streaming_get              | boolean | false                     | true                       | Allow calling localhost:5280/get/claimname requests                                       |
| save_files                 | boolean | true                      | false                      | Save files with each download                                            |
| save_blobs                 | boolean | true                      | false                      | Save blobs with each download                                            |
### Other
| Setting            | Format  | Default value | Sample Values                  | Description                                                                                                   |
|--------------------|---------|---------------|--------------------------------|---------------------------------------------------------------------------------------------------------------|
| components_to_skip | list    | []            | ['reflector','hash_announcer'] | Disable components, [see entire list here](https://github.com/lbryio/lbry-sdk/wiki/Component-Dependencies-Table)  |
| share_usage_data   | boolean | true          | false                          | Share analytics data                                                                                          |
