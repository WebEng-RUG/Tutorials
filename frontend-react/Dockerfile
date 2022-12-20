# Use a Node 18.12.1 base image
FROM node:18.12.1-alpine 

# Set the working directory to /app inside the container
WORKDIR /app

# We set some default environment variables that our app will use to determine
# where and how to listen for incoming requests.
ENV HOST=0.0.0.0
ENV PORT=80

# We expose port 80 as the default port on which our app runs.
EXPOSE 80

# Copy app files except those in .dockerignore
COPY package.json ./
COPY package-lock.json ./

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci --silent

# Now we copy the rest of the files
# This is done after installing dependencies to make sure the dependencies are cached
# and only the files that change are copied
COPY . ./

# We set the default action to run when the container is started; it should
# start our application.
CMD ["npm", "run", "dev:container"]
