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

   - A proper installation of NodeJS (v6 or higher). A better way to install NodeJS could be through NVM (Node Version Manager)
   - A proper installation of NPM
   - A proper installation of Docker with a running MongoDB docker container: `docker run --name mongo-instance -d -p 27017:27017 mongo`
   - Global grunt installation (`npm install -g grunt` or `sudo npm install -g grunt` if running on Linux)


ENV preparation
---------------

After the repo is cloned, the directory should contain the app src files, test files and a series of configuration files, needed to run the app and tests.
To prepare the environment and start working, you just need to install npm dependencies:

```
npm install
```


DB-Seeding
----------

There's a grunt command configured to seed the DB with some (3) sample movies. Those movies are loaded from the db-data/movies.json file.

```
grunt seed-db
```

This runs a plugin that tries to connect to mongodb on localhost:27017 and the seeds the movies collection with the previously mentioned file contents. If you're not running MongoDB with that configuration, you can change it by modifying the `Gruntfile.js` file ('easy\_mongo\_fixture' section).


Usage
-----

There are grunt command to perform different tasks:

- `grunt`: runs a minimal server listening on localhost:3000 where the API can be requested
- `grunt test`: runs unit tests

