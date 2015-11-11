module.exports = function (grunt) {

  // require time grunt to measure execution time
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/**\n' +
          ' * <%= pkg.name %> - <%= pkg.description %>\n' +
          ' * @date <%= grunt.template.today("yyyy/mm/dd") %>\n' +
          ' * @version <%= pkg.version %>\n' +
          ' * @link <%= pkg.repository.url %>\n' +
          ' * @license <%= pkg.license %> License, http://www.opensource.org/licenses/<%= pkg.license %>\n' +
          ' */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'dist/<%= pkg.name %>.min.js', 'src/<%= pkg.name %>.js'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false
      }
    },
    jsbeautifier: {
      default: {
        src: ['Gruntfile.js', 'package.json', '**/*.js', '**/*.less', '**/*.html', '!node_modules/**/*', '!dist/*.js']
      },
      verify: {
        src: ['Gruntfile.js', 'package.json', '**/*.js', '**/*.less', '**/*.html', '!node_modules/**/*', '!dist/*.js'],
        options: {
          mode: 'VERIFY_ONLY'
        }
      },
      options: {
        html: {
          fileTypes: ['.html'],
          braceStyle: 'collapse',
          indentChar: ' ',
          indentScripts: 'keep',
          indentSize: 2,
          maxPreserveNewlines: 1,
          preserveNewlines: true,
          unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u'],
          wrapLineLength: 0
        },
        css: {
          fileTypes: ['.less'],
          indentChar: ' ',
          indentSize: 2
        },
        js: {
          fileTypes: ['.js'],
          braceStyle: 'collapse',
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: ' ',
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: true,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 2,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0,
          endWithNewline: true
        }
      }

    }
  });

  // Load grunt Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  // Default task(s).
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('verify', ['jsbeautifier:verify']);
  grunt.registerTask('format', ['jsbeautifier:default']);
  grunt.registerTask('patch', ['jsbeautifier:verify', 'bump:patch', 'uglify']);
  grunt.registerTask('minor', ['jsbeautifier:verify', 'bump:minor', 'uglify']);
  grunt.registerTask('major', ['jsbeautifier:verify', 'bump:major', 'uglify']);

};
