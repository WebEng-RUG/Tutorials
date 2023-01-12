FROM nginx

# We want to dynamically specify the list of supported backends so that
# we don't have to update code in every frontend when we add a new backend.
# In addition, we want to be able to dynamically select the backend ports.
#
# Therefore, we use a feature of the NGINX container that will substitute
# environment variable references in our static files upon container start.
# In this case, the server-options.js file contains the string "${BACKENDS}",
# and by marking it as a template, this string will be replaced by the value
# of the environment variable at runtime. This variable will then be set by
# Docker compose
ENV NGINX_ENVSUBST_OUTPUT_DIR /usr/share/nginx/html/storage
COPY ./storage/server-options.js /etc/nginx/templates/server-options.js.template

# Copy the remaining files
COPY . /usr/share/nginx/html
