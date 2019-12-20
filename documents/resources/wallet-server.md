# How To Run Your Own Wallet Server

This guide will walk you through the process of setting up a LBRY wallet server. This involves provisioning a web server and setting up some services (docker, lbrycrd, and the wallet server). At the end, you'll have your own connection to the LBRY network.

**note:** This is early-stage stuff. You may encounter unexpected issues. Please be patient and don't hesitate to [reach out for help](#get-in-touch).


## Start With A Fresh Server

We recommend a dual-core server with at least 8GB RAM, 50GB disk, and a fresh Ubuntu 18.04 install. 

I tested this guide on AWS using a `t3.large` instance and the `ami-07d0cf3af28718ef8` image. If you're using AWS, create your instance in the us-east-2 (Ohio) region. That's where our snapshots are stored, so downloading them will be faster for you.

Make sure your firewall has ports 9246 and 50001 open. 9246 is the port lbrycrd uses to communicate to other nodes. 50001 is the wallet server RPC port.


## Set Up Docker

### Install Docker & Docker Compose
```
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
sudo apt install -y docker-ce docker-ce-cli containerd.io && \
sudo systemctl enable docker && sudo systemctl start docker && \
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose

```

### Download our docker-compose.yml

You can see it [here](https://github.com/lbryio/lbry-sdk/blob/master/docker/docker-compose-wallet-server.yml).
```
curl -L "https://raw.githubusercontent.com/lbryio/lbry-sdk/master/docker/docker-compose-wallet-server.yml" -o docker-compose.yml
```

## Turn It On

### Start the servers
```
sudo docker-compose up --detach
```

### Check that everything worked

The first time you start the wallet server, it will take a few minutes to download a recent snapshot of the database and extract it. You can follow the progress with

```
sudo docker-compose logs --follow
```

After the wallet server has caught up, it will bind to port 50001 and start responding to requests. You can check if this happened by running

```
sudo netstat -tlpn | grep 50001
```

If there is no output, the port is ont bound yet and the server is still catching up. Check the logs for more info.

After the wallet server is ready, check that it responds to basic RPC calls:

```
echo '{"id":1,"method":"server.version"}' | timeout 1 curl telnet://localhost:50001
```

You should see a response like `{"jsonrpc": "2.0", "result": ["0.46.1", "0.0"], "id": 1}`. If you do, congratulations! You've set up your own wallet server.


## Maintenance

### Stopping and Restarting

Use the usual docker-compose commands (`start`, `stop`, `pause`, etc) to control the servers. Run `docker-compose --help` to see the
options.


### Updating

To update to the latest wallet server release, run the following:
```
docker pull lbry/wallet-server:latest-release
docker-compose down
docker-compose up --detach
```

### Resyncing

From time to time, we'll release an update that requires erasing the wallet server database and recreating it from scratch. The process is
similar to an update, but causes the server to be down for much longer. Here's how to do it:
```
docker pull lbry/wallet-server:latest-release
docker-compose down
docker volume rm "$(whoami)_wallet_server"
WALLET_SERVER_SNAPSHOT_URL= docker-compose up --detach
```

## Get in touch

Whether you got to the end without a hiccup or you got stuck along the way, we want to hear from you. [Join our Discord](https://discord.gg/y3W9JuS) to get help, stay updated, and talk to other wallet server operators.
