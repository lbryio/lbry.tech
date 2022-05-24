---
title: LBRY P2P: Settings and troubleshooting
description: Guide on properly setting up P2P nodes and how to diagnose/fix common issues.
---

# LBRY P2P: Settings and troubleshooting

A very important step in supporting the network resilience is hosting content in a decentralized way. This already happens when you stream content using the desktop version of LBRY APP, but sometimes we want to make sure this is working or dedicate larger amounts of resources for this task.

This document aims to explain P2P configuration and troubleshooting from small to large nodes. If you don't know how to change SDK settings, check [this other document first](https://lbry.tech/resources/daemon-settings).

## Reachability
The first priority when seeding content is making sure there is a way for other nodes to reach you across the internet.

### Figuring out your ports
In order to troubleshoot reachability, we start by checking your configuration for the UDP and TCP ports. By default, they will both be set to 4444. Those can be found on the configuration under the keys `udp_port` and `tcp_port`. Please set them both to the same value as this helps connectivity trough [hole punching](https://en.wikipedia.org/wiki/Hole_punching_(networking)) and ease of management.

### Checking for reachability
There are some websites providing generic ways to check ports, like:
- https://www.portcheckers.com/
- https://portchecker.co/check

However, checking the port does not check if LBRY P2P protocol is working behind it. For a better check, we can use a tool hosted by Madiator, a community member.
- To test for UDP (DHT): http://test.madiator.com:60666/dht/<your `udp_port`>
- To test for TCP (P2P): http://test.madiator.com:60666/p2p/<your `tcp_port`>

As a last resource to test a remote machine DHT service, from a local SDK try:
```bash
lbrynet peer ping <DHT node id> <IP> <port>
```

To find out what the `DHT node id` is, on the target machine run `lbrynet status` and look for `node_id` .

### I am unreachable. What now?

VPN users: check with your provider if they feature port forwarding. There are guides specific to each one, like [this one from Mullvad](https://mullvad.net/en/help/port-forwarding-and-mullvad/).

Domestic routers: there are websites like [this one](https://portforward.com/how-to-port-forward/) providing information on popular router models. Unfortunately, this document would be huge if we added port forwarding instructions for every router/firewall.

Servers: check if your firewall is blocking the SDK ports. For ufw on Linux, this is `sudo ufw allow <port>`.

If you still have trouble figuring that out, don't be shy, [ask the LBRY community on Discord!](https://chat.lbry.com/)

## Content blobs storage settings

Files in LBRY are composed by `content blobs`, which can be seen as chunks of binary encrypted data belonging to some content. By default, the SDK enables saving blobs to disk, which then can be served over P2P. To check if that is enabled, look for the `save_blobs` setting.

**The following settings are isolated. The space limit set for one does not apply to the other.**

### Setting up storage space control

By default, content blobs are kept as long as the files are still in your file list. If you wish to allocate a space limit for content blobs and let the SDK decide what to delete, set `blob_storage_limit` to a value in megabytes.

This won't delete your downloads from the file list. Instead, it deletes content blobs associated with older files as space for newer blobs is requested.


### Setting up space for automatic contribution

This section is aimed at fully automatic contribution in background. Normal usage of the SDK with P2P enabled already helps the network, but requires interaction.

LBRY SDK can be configured to help the P2P network by automatically downloading and hosting content. This is ideal for contributing spare disk space and network bandwidth without further interaction.

Enabling: change `network_storage_limit` to the size (in megabytes) that will be used for automatic seeding.

Disabling: setting the space to 0 disables it. The space used will eventually be released automatically. For cleaning immediately, issue a `lbrynet blob clean` from command line.
