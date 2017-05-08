module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt-nodemon plugin: sourcefile monitoring and server manager
    nodemon: {
      dev: {
        script: 'bin/www'
      }
    },

    // grunt-mocha-test plugin: test runner using Mocha
    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    },

    // grunt-easy-mongo-fixture plugin: MongoDB seeder
    easy_mongo_fixture: {
      load: {
        options: {
          host: '127.0.0.1',
          port: 27017,
          database: 'movies-app',
          dir: './db-data',
          override: true,
        },
        collections: ['movies'],
        action: 'load'
      }
    }
  });

  // Load the necessary grunt plugins
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-easy-mongo-fixture');

  // Define tasks
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['nodemon']);
  grunt.registerTask('seed-db', ['easy_mongo_fixture:load']);
};

