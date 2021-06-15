---
title: Hosting your own LBRY Web Instance
description: Setting up an app instance as a webpage.
---

Run your own instance of https://lbry.tv using Docker images.


## Run the SDK

The LBRY SDK provides RPC and streaming endpoints to interact with the LBRY network. Web users will connect to it directly, so it must be web-accessible. You may have to open ports on your firewall.

```
docker run -d -p 5279:5279 -p 5280:5280 vshyba/websdk
```

This image will not save files to disk. It has the `save_blobs` and `save_files` config options set to `false`. If you want to save files, see [Building your own SDK image](#building-your-own-sdk-image) below.


## Run the web app

Clone and install the app as described in the [lbry-desktop repo README](https://github.com/lbryio/lbry-desktop).
If you want to customize it further, follow the extra steps in `Customize the web app` section. Otherwise:

```
git clone https://github.com/lbryio/lbry-desktop.git
yarn
cp .env.defaults .env
```

Configure .env with the following settings. They must match the SDK ports in the previous section.
```
WEB_SERVER_PORT=8080
SDK_API_PATH=http://localhost:5279
LBRY_WEB_API=http://localhost:5279
LBRY_WEB_STREAMING_API=http://localhost:5280
LBRY_API_URL=http://disabled-api/
LBRY_WEB_BUFFER_API=https://disabled
```

Compile and run
```
NODE_ENV=production yarn compile:web
nodejs web/index.js
```


## Building your own SDK image

If you want to customize the SDK settings, you can 

Clone the SDK repo:
```
git clone https://github.com/lbryio/lbry-sdk.git
```

Create a `docker/webconf.yaml` file and modify as you need. This is a good start:
```
allowed_origin: "*"
max_key_fee: "0.0 USD"
save_files: false
save_blobs: false
streaming_server: "0.0.0.0:5280"
api: "0.0.0.0:5279"
data_dir: /tmp
download_dir: /tmp
wallet_dir: /tmp
```

Note that it is required to have `streaming_server` and `api` set to user-accessible IPs. If you want this to be accessible on the open web, that means setting  them to `0.0.0.0`.


To build the image, run:
```
docker build -f docker/Dockerfile.web -t <your dockerhub username>/<project name, like 'websdk'> .
docker push <dockerhub username/project name>
```


