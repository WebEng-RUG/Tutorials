# Use a Node 18.12.1 base image
# We are using a multi-stage Dockerfile: we first compile the react app
# into a set of static HTML and JS files, which will then be served by
# nginx to create a small final image.
FROM node:18.12.1-alpine AS build

# Set the working directory to /app inside the container
WORKDIR /app

# We copy the package definitions first, so we don't have to reinstall
# all the packages every time only a few other files change.
COPY package.json ./
COPY package-lock.json ./

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci --silent --only-production

# Now we copy the rest of the files
# This is done after installing dependencies to make sure the dependencies are cached
# and only the files that change are copied
COPY . ./

# Then we build the React code
RUN npm run build

#############################
# Now we "start over" with a fresh nginx image. In here, we will copy the build result
# from the previous section and set up the automatic backend loading
FROM nginx

# Some configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the code from the build result
COPY --from=build /app/build /app

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
ENV NGINX_ENVSUBST_OUTPUT_DIR /app/static/js

# Move the files from the build result to the template directory
WORKDIR /app/static/js
RUN mkdir /etc/nginx/templates; \
    for file in *.js; \
    do \
        mv -- "$file" "/etc/nginx/templates/$file.template"; \
    done
