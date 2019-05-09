---
title: Building the LBRY Android App
description: Step-by-step build instructions for the LBRY Android App
---

### Introduction
This guide provides step-by-step instructions to setup and build the [LBRY Android App](https://lbry.com/android) for development purposes. 

#### Estimated Time
25 - 40 minutes

#### Prerequisites
- A computer running Linux with `apt` (otherwise, alter the package installation instructions accordingly)
- At least 15GB of free disk space
- Internet access

### Environment Setup

You can set up your environment via Docker or manually.

#### Docker Environment Setup

Use [Docker](https://docs.docker.com/install/) and start a container using the `lbry/android-base` image. Run:
```
docker run -it lbry/android-base:latest /bin/bash
```

When this is complete, continue to [Building the App](#building-the-app).

#### Manual Environment Setup

##### 1. Install Packages via Apt

Install required system packages via `apt`:

```
sudo dpkg --add-architecture i386
sudo apt-get -y update
sudo apt-get install -y curl ca-certificates software-properties-common gpg-agent wget
sudo add-apt-repository ppa:deadsnakes/ppa -y && \
     curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get -y update && apt-get -y install autoconf autogen automake libtool libffi-dev \
     build-essential python3.7 python3.7-dev python3.7-venv python3-pip ccache git libncurses5:i386 libstdc++6:i386 \
     libgtk2.0-0:i386 libpangox-1.0-0:i386 libpangoxft-1.0-0:i386 libidn11:i386 python2.7 python2.7-dev \
     python-pip openjdk-8-jdk unzip zlib1g-dev zlib1g:i386 m4 libc6-dev-i386 yarn gawk nodejs npm
```

##### 2. Setup Python

Install required Python packages:

```
sudo -H pip install --upgrade cython==0.28.1 setuptools
```

##### 3. Setup Buildozer

Install buildozer, a tool for creating the apk package using the python for android toolchain:

```
git clone https://github.com/lbryio/buildozer.git
cd buildozer && python2.7 setup.py install && cd ..
```

##### 4. Setup Android SDK

The Android SDK needs to be setup for buildozer. This requires creating a few directories and downloading a number of files. Run the following commands to create the buildozer directory, download the required archives and extract them into their proper destination folders:

```
mkdir -p ~/.buildozer/android/platform
wget 'https://dl.google.com/android/android-sdk_r23-linux.tgz' -P ~/.buildozer/android/platform/ && \
  wget 'https://dl.google.com/android/repository/platform-28_r06.zip' -P ~/.buildozer/android/platform/ && \
  wget 'https://dl.google.com/android/repository/build-tools_r26.0.2-linux.zip' -P ~/.buildozer/android/platform/
tar -xvf ~/.buildozer/android/platform/android-sdk_r23-linux.tgz -C ~/.buildozer/android/platform/ && \
  mv ~/.buildozer/android/platform/android-sdk-linux ~/.buildozer/android/platform/android-sdk-23 && \
  unzip ~/.buildozer/android/platform/platform-28_r06.zip -d ~/.buildozer/android/platform/android-sdk-23/platforms && \
  mv ~/.buildozer/android/platform/android-sdk-23/platforms/android-9 ~/.buildozer/android/platform/android-sdk-23/platforms/android-28 && \
  mkdir -p ~/.buildozer/android/platform/android-sdk-23/build-tools && \
  unzip ~/.buildozer/android/platform/build-tools_r26.0.2-linux.zip -d ~/.buildozer/android/platform/android-sdk-23/build-tools && \
  mkdir -p ~/.buildozer/android/platform/android-sdk-23/licenses && \
  echo $'\nd56f5187479451eabf01fb78af6dfcb131a6481e' > ~/.buildozer/android/platform/android-sdk-23/licenses/android-sdk-license
```

##### 5. Install React

Install the react-native-cli npm package:
```
sudo npm install -g react-native-cli
```

When this is complete, continue to [Building the App](#building-the-app).

### Building the App

After [preparing your environment](#setup-environment), complete the steps below.

##### 1. Install Crystax
 
Crystax NDK is required for building Python 3.7 for the mobile app and a number of native C / C++ modules and packages used by the app. Run the following commands to download and extract the NDK:

```
wget 'https://www.crystax.net/download/crystax-ndk-10.3.2-linux-x86_64.tar.xz' -P ~/.buildozer/android/ && \
  tar -xvf ~/.buildozer/android/crystax-ndk-10.3.2-linux-x86_64.tar.xz -C ~/.buildozer/android/ && \
  rm -rf ~/.buildozer/android/crystax-ndk-10.3.2/platforms/android-9 && \
  ln -s ~/.buildozer/android/crystax-ndk-10.3.2/platforms/android-21 ~/.buildozer/android/crystax-ndk-10.3.2/platforms/android-9
```

##### 2. Clone and Configure the Repository

Clone the lbryio/lbry-android git repository:

```
git clone https://github.com/lbryio/lbry-android
cd lbry-android
cp buildozer.spec.sample buildozer.spec
```

The provided `buildozer.spec.sample` contains defaults provided you followed the environment setup exactly as described. If you altered the steps for your environment or you're encountering build trouble, check `buildozer.spec` to ensure everything is pointing in the right places.

##### 3. Install npm packages

Install the npm packages required for the app's React Native code:

```
cd app
npm install
cd ..
```

##### 4. Copy Build Files

Copy required files from the repository for the build to be successful:
```
cp scripts/build-target-python.sh ~/.buildozer/android/crystax-ndk-10.3.2/build/tools/build-target-python.sh
cp scripts/mangled-glibc-syscalls.h ~/.buildozer/android/crystax-ndk-10.3.2/platforms/android-21/arch-arm/usr/include/crystax/bionic/libc/include/sys/mangled-glibc-syscalls.h
```

##### 5. Build the thing!

You're finally ready to build the package! You just have to run a single command to generate the APK:

```
buildozer android debug
```

### All Set? Now Contribute!

Everything built at LBRY is open source.

Check out [lbry-android](https://github.com/lbryio/lbry-android) on GitHub to find issues or read our [Contributor's Guide](/contribute) to learn more.
