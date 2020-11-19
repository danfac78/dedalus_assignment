# docker-json-server

[JSON Server](https://github.com/typicode/json-server) provides REST API mocking based on plain JSON.
This is a [docker](https://www.docker.io) image that eases setup.

## Usage

This docker image is available as a [trusted build on the docker index](https://index.docker.io/u/clue/json-server/),
so there's no setup required.
Using this image for the first time will start a download automatically.
Further runs will be immediate, as the image will be cached locally.

The recommended way to run this container looks like this:

```bash
$ docker-compose up --build
```

or

```bash
$ docker run -d -p 5000:80 -v ./data/db.json:/data/db.json clue/json-server
```

The above example exposes the JSON Server REST API on port 80, so that you can now browse to:

```
http://localhost:5000/

"/data"
"/data?from=:from"
"/data?from=:from&to=:to"


```

This is a rather common setup following docker's conventions:

* `-d` will run a detached instance in the background
* `-p {OutsidePort}:80` will bind the webserver to the given outside port
* `-v {AbsolutePathToJsonFile}:/data/db.json` should be passed to mount the given JSON file into the container
* `clue/json-server` the name of this docker image
