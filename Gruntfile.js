module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'bin/www'
      }
    },
    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Define test task
  grunt.registerTask('test', ['mochaTest']);

  // Define default task.
  grunt.registerTask('default', ['nodemon']);
};

