# This file is a Dockerfile - it specifies how a docker container should be built
# and is supposed to be reproducible: so it yields the same application every single
# time.
#
# We take a basic NodeJS image with all prerequisites installed.
FROM node:18.12.1
WORKDIR /usr/src/app

# We expose port 80 as the default port on which our app runs.
EXPOSE 80

# We set some default environment variables that our app will use to determine
# where and how to listen for incoming requests.
ENV PORT=80
ENV HOST=0.0.0.0

# We first copy ONLY the project definition file (package.json), instead of all files
# at once. This prevents us from having to restore all dependencies (slow) every time
# we build, since every step in the Dockerfile build process is reusable. So
# if only our code changes, but our project file (incl. dependencies) does not,
# we can skip these two steps before recompiling, saving us quite some time.
#
# So we copy the project file and download all dependencies
COPY package*.json ./
# We use `npm ci` instead of `npm install` as `ci` will restore the dependencies exactly
# like they were when last updated - whereas `install` will also include minor updates.
RUN npm ci --only-production

# Now we can copy all source files (except those listed in `.dockerignore`)
COPY . .

# We set the default action to run when the container is started; it should
# start our application.
ENTRYPOINT [ "node", "-r", "ts-node/register", "-r", "tsconfig-paths/register", "server.ts" ]
