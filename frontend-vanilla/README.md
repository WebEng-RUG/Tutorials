# Vanilla JS Movies API frontend

This directory contains an example implementation of a (partial) Movies API frontend, using the API as specified in `../specification/spec.yml`. As explained in the tutorial slides, we will not use any third-party libraries or frameworks in this demo and will only use the tools natively provided by current browsers.

For working with this code, I recommend to use Visual Studio Code (Win/Mac/Linux), or JetBrains WebStorm (Win/Mac/Linux). Within VS Code, you can simply open the root directory of this repository.

## Getting started

The best way to run the frontend is using Docker Compose. The instructions on how to do this are provided in the main `README`. However, running for development purposes is not ideal in Docker Compose - it is better to run either locally or in Docker without Compose.

What I mean by "running the frontend" is simply running a webserver that serves the static files for this application without any preprocessing. This job can be done by almost any webserver you can think of, and it's up to you how you want to do so. Most SPA frameworks and templates already contain their own webserver to do this for development.

The simplest way of getting going for development purposes is still running the webserver inside of a Docker container, as that requires the least amount of configuration on your side. We will then bind-mount the files of this folder into the container so it can always serve the most recent version.

A prerequisite is to get Docker installed (see root folder `README`), but after that the following command should suffice:

```bash
docker run --rm -p <XXXX>:80 --mount type=bind,source=$(pwd),target=/usr/share/nginx/html -d nginx
```

This means: start a docker container from the image `nginx` (running the nginx webserver) on port `<XXXX>` (replace with your own port number), where we bind mount the files in the current folder to the webserver path. Run the container in the background (`-d`) and make sure to clean it up after it stops/crashes (`--rm`).

Now, you should be able to see the docker container when running `docker ps`, you can stop it by running `docker stop <name>` where the name is the one you see in `docker ps`. You should also be able to access the application by navigating to `localhost:XXXX` in your browser.
