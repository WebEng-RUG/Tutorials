# This file is a Dockerfile - it specifies how a docker container should be built
# and is supposed to be reproducible: so it yields the same application every single
# time.

# To be specific, this is a multi-stage Dockerfile, in this case we are building the vue code 
# into a static vanilla js bundle, which will then be served by the nginx to the client in the production stage
FROM node:18.12.1-alpine as build-stage

# Define our root directory, and then copy over the package files that tell us 
# which packages are required to run this app
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./

# The packages are then installed using the node package manager (npm).
RUN npm ci --only-production --silent

# Copying over the source files from the project.
COPY ./ .

# Building the application using the vite build script. 
# This creates the js package that will be served to the client.
RUN npm run build

##########
# Now we set up NGINX to serve the javascript package.
FROM nginx as production-stage

# Some configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the code from the build result
COPY --from=build-stage /app/dist /app


# We want to dynamically specify the list of supported backends so that
# we don't have to update code in every frontend when we add a new backend.
# In addition, we want to be able to dynamically select the backend ports.
#
# Therefore, we use a feature of the NGINX container that will substitute
# environment variable references in our static files upon container start.
# In this case, the resulting react app file contains the string "${BACKENDS}",
# and by marking it as a template, this string will be replaced by the value
# of the environment variable at runtime. This variable will then be set by
# Docker compose
ENV NGINX_ENVSUBST_OUTPUT_DIR /app/assets

# Move the files from the build result to the template directory
WORKDIR /app/assets
RUN mkdir /etc/nginx/templates; \
    for file in *.js; \
    do \
        mv -- "$file" "/etc/nginx/templates/$file.template"; \
    done
