---
title: Hosting your own LBRY Web Instance
description: Setting up an app instance as a webpage.
---
----

## Preparing the SDK


### Using pre-built docker image

TODO: use official images

This image comes with `save_blobs` and `save_files` to `false`, so it won't use disk. 
```
docker run -d -p <external RPC port>:5279 -p <external streaming port>:5280 vshyba/websdk

### Building your own image

Clone the SDK repo:
```
git clone https://github.com/lbryio/lbry-sdk.git
```

Create a config.yaml file and modify as you need. This is a good start:
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

Note that it is required to have `streaming_server` and `api` set to public IPs. Or at least the same network where the app will be served.

Now move the config file to `docker/webconf.yaml` and run:
```
docker build -f docker/Dockerfile.web -t <your dockerhub username>/<project name, like 'websdk'> .
docker push <dockerhub username/project name>
```
```

## Webapp

Clone and install the app as described in the [lbry-desktop repo README](https://github.com/lbryio/lbry-desktop).
If you want to customize it further, follow the extra steps in `Customize the web app` section. Otherwise:
```
git clone https://github.com/lbryio/lbry-desktop.git
yarn
cp .env.defaults .env
```

Configure .env as you need. This is a sample:
```
SDK_API_PATH=http://<SDK IP>:<SDK RPC PORT>/
...
WEB_SERVER_PORT=<web port>
LBRY_API_URL=http://disabled-api/
LBRY_WEB_API=http://<SDK IP>:<SDK RPC PORT>
LBRY_WEB_STREAMING_API=http://<SDK IP>:<SDK STREAMING PORT>
LBRY_WEB_BUFFER_API=https://disabled
...
customize UI and other values as needed
```

Compile and run:
```
NODE_ENV=production yarnpkg compile:web
nodejs web/index.js
```
