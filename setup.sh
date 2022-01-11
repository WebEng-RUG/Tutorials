#!/bin/bash

# This file will be used to compile all code necessary, to restore packages for our applications
# and set up the prerequisites for actually running the code.

# We assume to run this on Ubuntu 20.04

########### Load configuration from .env file
export $(cat .env | xargs)

########### Compile the .NET Core backend

cd backend-dotnetcore
dotnet build "Movies.csproj" -c Debug
cd ..

########### Restore all NPM packes for the Express backend

cd backend-express
npm ci --only-production
cd ..

########### Configure and start MariaDB and create the database

# Put in configuration with the right port; this is a here-doc construct
# which allows to pass multiline strings in bash scripts with variable
# interpolation to stdin.
cat > /etc/mysql/mariadb.cnf <<- EOT
[client-server]
port = ${DATABASE_PORT}
EOT

# Start the service
service mariadb start

# Create the database and associated user
mariadb -e "
CREATE DATABASE ${DATABASE_NAME};
GRANT ALL ON ${DATABASE_NAME}.* TO '${DATABASE_USER}'@'%' IDENTIFIED BY '${DATABASE_PASSWORD}' WITH GRANT OPTION;
"

# Import database files
# Disabled by default since it's a slow process
#for f in ./data/sql/*.sql
#do
    #mariadb ${DATABASE_NAME} < $f
#done
# Instead, just import the movies; takes about 3-4 minutes
mariadb ${DATABASE_NAME} < ./data/sql/1_movies_Movies.sql