#!/bin/bash

# This file will be used to start all processes once all the dependencies are installed
# using ./install.sh and the code is compiled and downloaded using ./setup.sh.
# We start both backends and the frontend at the same time

# We assume to run this on Ubuntu 20.04

########### Load configuration from .env file
export $(cat .env | xargs)

########### Ensure the database is running
service mariadb start

########### Start the .NET Core backend

cd backend-dotnetcore
dotnet run & # We use " & " to run the process in the background
cd ..

########### Start the Express backend

cd backend-express
HOST=0.0.0.0 node -r ts-node/register -r tsconfig-paths/register server.ts &
cd ..

########### Start the frontend webserver

cd frontend-vanilla
http-server . -p ${FRONTEND_VANILLA_PORT} &
cd ..