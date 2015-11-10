module.exports = function(grunt) {

  // require time grunt to measure execution time
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '// <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>\n// v<%= pkg.version %>\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: false,
        createTag: false,
        push: false
      }
    },
  });

  // Load grunt Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');

  // Default task(s).
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('patch', ['bump:patch', 'uglify']);
  grunt.registerTask('minor', ['bump:minor', 'uglify']);
  grunt.registerTask('major', ['bump:major', 'uglify']);

};