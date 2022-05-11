---
title: Hosting a BitTorrent UDP Tracker
description: Setting up a tracker for use with LBRY P2P.
---

*Warning: Unfortunately, some hosting providers explicitly forbids running a tracker in the ToS. Check with your ISP or VPS before running one yourself.*

The main difference from this guide to any other BitTorrent tracker guide is that it contains optional instructions for configuring a default peer IP fallback from a reflector node in the LBRY network.
The software we are going to use is a [fork of chihaya](https://github.com/shyba/chihaya) with support for this optional feature of using default peer IPs.

# Configuration
A default configuration can be found at `dist/example_config.yaml`.
This is an example for an UDP server running on 6969 with metrics enabled. Remember to **change the private key** to some random string.

Also, "fixed peers" prehook is enabled with default IPs. This will include reflector on responses. Discard the section to disable it or ask around on Discord for different servers. Enabling it helps as a fallback for content with no seeds.
```
---
chihaya:
  announce_interval: "30m"
  min_announce_interval: "15m"
  metrics_addr: "0.0.0.0:6880"
  udp:
    addr: "0.0.0.0:6969"
    max_clock_skew: "10s"
    private_key: ">>>>CHANGE THIS TO SOME RANDOM THING<<<<"
    enable_request_timing: false
    allow_ip_spoofing: false
    max_numwant: 100
    default_numwant: 50
    max_scrape_infohashes: 50
  storage:
    name: "memory"
    config:
      gc_interval: "3m"
      peer_lifetime: "31m"
      shard_count: 1024
      prometheus_reporting_interval: "1s"
  prehooks:
   - name: "fixed peers"
     options:
       fixed_peers:
         - 51.81.57.64:5567
         - 135.148.122.112:5567
```

# Running from Docker

This section assumes `docker` and `docker-compose` to be installed on a Linux distro. Please check official docs on how to install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

## Setting up
In order to define a tracker service and let Docker Compose manage it, create a file named `docker-compose.yml` with:
```
version: "3"
services:
  tracker:
    image: vshyba/chihaya
    command: --config /config/conf.yml
    volumes:
      - .:/config
    network_mode: host
    restart: always
```
Unfortunately the tracker does not work without `network_mode: host` due some bug with UDP on Docker. In this mode, firewall configuration needs to be done manually. If using `ufw`, try `ufw allow 6969`.

Now, move the configuration to the same directory as `docker-compose.yml`, naming it `conf.yml`. If it is not ready, check the configuration section above.

Start the tracker by running the following in the same directory as the compose file:
`docker-compose up -d`
Logs can be read with:
`docker-compose logs`
To stop:
`docker-compose down`

## Building the containter (optional)
A Dockerfile is provided within the repo. To build the container locally, run this command on the same directory the repo was cloned:
`sudo docker build -f Dockerfile . -t some_name/chihaya:latest`
It will produce an image called `some_name/chihaya`, which can be used in the Docker Compose section.

# Running from source as a service

Up to date guide will always live in the [chihaya repo](https://github.com/chihaya/chihaya#getting-started).

This section assumes Go language compiler to be installed. If that is not the case, please follow the [official instructions](https://go.dev/doc/install).

## Cloning and compiling
```bash
git clone https://github.com/shyba/chihaya.git
cd chihaya
go build ./cmd/chihaya
./chihaya --help
```

## Running
After configuring
```bash
./chihaya --config path/to/your/config.yaml
```

For ease of maintenance, it is recommended to run the tracker as a service. As there are many ways of doing it, please check a guide on `init`, `systemd` or the way your operating system distribution recommends.

This is an example for running it under as the current user using `systemd`:
```
[Unit]
Description=Chihaya BT tracker
After=network.target

[Service]
Type=simple
#User=chihaya
#Group=chihaya
WorkingDirectory=/home/user/github/chihaya
ExecStart=/home/user/github/chihaya/chihaya --config dist/example_config.yaml
Restart=on-failure
[Install]
WantedBy=multi-user.target
```

To try it, change `/home/user/github/chihaya` to where the code was cloned and run:
```bash=
mkdir -p ~/.config/systemd/user
# PASTE FILE IN ~/.config/systemd/user/chihaya.service
systemctl --user enable chihaya
systemctl --user start chihaya
systemctl --user status chihaya
```
