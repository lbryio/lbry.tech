# How To Run Your Own Wallet Server

This guide will walk you through the process of setting up a LBRY wallet server. This involves provisioning a web server and setting up some services (docker, lbrycrd, and the wallet server). At the end, you'll have your own connection to the LBRY network.

**note:** This is early-stage stuff. You may encounter unexpected issues. Please be patient and don't hesitate to [reach out for help](#get-in-touch).


## Start With A Fresh Server

We recommend a dual-core server with at least 16GB RAM, 100GB disk, and a fresh Ubuntu 18.04 install. Memory usage is flexible. 32 GB works best, but 16 GB is enough for a few clients.

Make sure your firewall has ports 9246 and 50001 open. 9246 is the port lbrycrd uses to communicate to other nodes. 50001 is the wallet server RPC port.

## Install lbrycrd

### Download and setup
Download the [latest release of lbrycrd](https://github.com/lbryio/lbrycrd/releases/latest).

Then, create a folder on your home directory called `.lbrycrd` and save the following to `.lbrycrd/lbrycrd.conf`:
```
txindex=1
server=1
daemon=1
rpcuser=lbry
rpcpassword=lbry
dustrelayfee=0.00000001
rpcworkqueue=128
```

Feel free to change the `rpcuser` or `rpcpassword`. If you do, you'll have to update the `DAEMON_URL` variable later on (in the docker-compose.yml file) to match the user/password you chose.

## Create a service (optional)

You can run lbrycrdd directly using `./lbrycrdd`. However, we recommend creatinga systemd service to manage the process for you.

Create a file at `/etc/systemd/system/lbrycrdd.service` with the following contents:

```
[Unit]
Description="LBRYcrd daemon"
After=network.target

[Service]
ExecStart=/home/<your_user>/lbrycrdd -datadir="/home/<your_user>/.lbrycrd"
User=<your_user>
Group=<your_user_group>
Restart=on-failure
KillMode=process

[Install]
WantedBy=multi-user.target
```

Then run `sudo systemctl daemon-reload`.

Now you can start and stop lbrycrd with `sudo service lbrycrdd start` and `sudo service lbrycrdd stop`.

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
sudo usermod -aG docker $USER

```

### Download our docker-compose.yml

You can see it [here](https://github.com/lbryio/lbry-sdk/blob/master/docker/docker-compose-wallet-server.yml).
```
curl -L "https://raw.githubusercontent.com/lbryio/lbry-sdk/master/docker/docker-compose-wallet-server.yml" -o docker-compose.yml
```

Make sure the user and password in the `DAEMON_URL` variable (the `lbry@lbry` part) in this docker-compose.yml matches thes user/password in your `~/.lbrycrd/lbrycrd.conf` file.

## Turn It On

### Start the servers
```
docker-compose up --detach
```

### Check that everything worked

The first time you start the wallet server, it will take a few minutes to download a recent snapshot of the database and extract it. You can follow the progress with

```
docker-compose logs --follow
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


To check Elastic search, there are two commands you can use: 

```
curl localhost:9200 # get Elastic status

curl localhost:9200/claims/_count # check how many claims have been synced to Elastic
```

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
