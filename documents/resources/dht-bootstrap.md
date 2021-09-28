---
title: Hosting a DHT bootstrap node
description: How to setup a bootstrap DHT node
---

This guide will help you setup and maintain a LBRY DHT [bootstrap node](https://en.wikipedia.org/wiki/Bootstrapping_node). Those nodes are important so people can join the network on first startup.

After finishing and checking that it works, if you want to add your node to the SDK bootstrap list just open a PR adding yourself to the [conf file](https://github.com/lbryio/lbry-sdk/blob/master/lbry/conf.py#L694) or an issue on the [SDK repo](https://github.com/lbryio/lbry-sdk/).

## Requirements
- Being reachable over UDP on the internet at some port
- 1GB of memory
- Docker or Python 3.7 (check [pyenv](https://github.com/pyenv/pyenv) if your Linux distribution doesn't offer that version)

## Running directly from Docker
This is the easiest way to run and maintain your node. Just run:
```bash
docker run -d -p 4444:4444 lbry/dht-bootstrap:latest
```

## Installing LBRY SDK from source
The most up to date guide for doing it will always be in the [INSTALL.md file](https://github.com/lbryio/lbry-sdk/blob/master/INSTALL.md). Please refer to it if you run into trouble. Otherwise, this should be enough most of the time (assuming requirements are all there):
```bash
git clone https://github.com/lbryio/lbry-sdk.git
make install
```

### Running a node from source
After installing, just:
```bash
python scripts/dht_node.py
```

### Checking if it is working
From another machine with the SDK installed, run:
```bash
python scripts/dht_node.py --bootstrap_node your-server-domain-here.com:4444
```
After 10-20 seconds, you should see more than 0 peers on the log messages. If that is not the case, check firewall on the bootstrap node and see if it is reachable.
