#!/bin/bash

# This file will be used to install all dependencies and SDKs for our applications
# to run: so we will install backend, frontend, and database.

# We assume to run this on Ubuntu 20.04.

########### Install basic prerequisites
apt-get update
apt-get install -yq software-properties-common apt-transport-https wget curl

########### Install prerequisites for the .NET Core backend

# Install the Microsoft package signing key
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Add some configuring for the tzdata package so we don't have to interactively do so
echo 'tzdata tzdata/Areas select Europe' | debconf-set-selections
echo 'tzdata tzdata/Zones/Europe select Amsterdam' | debconf-set-selections

# Install SDK itself
apt-get update
DEBIAN_FRONTEND="noninteractive" apt-get install -yq dotnet-sdk-6.0

########### Install prerequisites for the Express backend

curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -yq nodejs

########### Install prerequisites for the frontend

# Install a simple NPM HTTP server that just serves some files - many alternatives are available
npm install http-server -g

########### Install the database we use: MariaDB

# Install the MariaDB repositories
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | bash

# Install MariaDB itself
apt-get update
apt-get install -yq mariadb-server