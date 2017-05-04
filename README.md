Movies API - NodeJS Workshop
============================

This simple API is part of the NodeJS/ReactJS Workshop delivered at Spark on May 2017.

This course should cover the following topics:

   - NodeJS basics review
   - ExpressJS for APIs
   - Grunt as a task runner
   - Promises; pros, cons and possibilities


Installation
------------

The following is needed in order to run everything covered in this repo:

   - A proper installation of NodeJS (v6 or higher)
   - A proper installation of NPM
   - A proper installation of Docker with a running MongoDB docker container: `docker run --name mongo-instance -d -p 27017:27017 mongo`
   - Global grunt installation (`npm install -g grunt`)

Usage
-----

After the repo is cloned, the directory should contain the app src files, test files and a series of configuration files, needed to run the app and tests.

First step is to install dependencies:

```
npm install
```

After that, grunt commands can be run:

- `grunt`: runs a minimal server listening on localhost:3000 where the API can be requested
- `grunt test`: runs unit tests

