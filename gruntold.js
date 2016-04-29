module.exports = function(grunt) {

  /**
   * Initialize grunt
   */
  grunt.initConfig({

    /**
     * Read package.json
     */
    pkg: grunt.file.readJSON('package.json'),


    /**
     * Set banner
     */
    banner: '/**\n' +
    '<%= pkg.title %> - <%= pkg.version %>\n' +
    '<%= pkg.homepage %>\n' +
    'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
    'License: <%= pkg.license %>\n' +
    '*/\n',


    /**
     * Set directory paths
     */
    dir: {
      js: 'js',
      css: 'css',
      sass: 'css/sass',
      img: 'img'
    },


    /**
     * JSHint
     * @github.com/gruntjs/grunt-contrib-jshint
     */
    jshint: {
      gruntfile: 'Gruntfile.js',
      files: ['<%= dir.js %>/src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },


//  Concat
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
              "js/src/bootstrap.min.js",
              "js/src/jquery-1.11.2.min.js",
              "js/src/flexslider.js",
              "js/src/imagesloaded.min.js",
              "js/src/jquery.isotope.js",
              "js/src/main-1.js",
              "js/src/masonry.js",
              "js/src/masonry.pkgd.min.js",
              "js/src/salvattore.js",
             ],
        // the location of the resulting JS file
        dest: 'js/global.js'
      },


//  Sass
  sass: {
    expanded: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
        },
        files: {
          'css/global.css': 'sass/global.scss',
        }
      },

    // pwdist: {
    //   options: {
    //     style: 'compressed',
    //     sourcemap: 'none',
    //   },
    //   files: {
    //     'dist/css/pw-styles.min.css': 'sass/pw-style/pwstyle.scss',
    //   }
    // },

    // pw: {
    //     options: {
    //       style: 'compressed',
    //       sourcemap: 'none',
    //     },
    //     files: {
    //       'css/pwstyle.min.css': 'sass/pw-style/pwstyle.scss',
    //     }
    //   }
    // },


    /**
     * Minify
     * @github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {

      // Uglify options
      options: {
        banner: '<%= banner %>'
      },

      // Minify js files in js/src/
      dist: {
        src: ['<%= concat.js.dest %>'],
        dest: '<%= dir.js %>/<%= pkg.name %>.min.js'
      },
    },

    browserSync: {
      bsFiles: ['js/*.js', 'css/*.css', '!**/node_modules/**/*', './*.html'],
      options: {
          server: {
              baseDir: './' // make server from root dir
          },
          port: 8000,
          ui: {
              port: 8080,
              weinre: {
                  port: 9090
              }
          },
          open: false
      }
    },

//  Notifications
    notify: {
      watching: {
        options: {
          enabled: true,
          message: 'Watching Files!',
          title: "Noemie Design", // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 1 // the duration of notification in seconds, for `notify-send only
        }
      },

      sass_compile: {
        options: {
          enabled: true,
          message: 'Sass Compiled!',
          title: "Noemie Design",
          success: true,
          duration: 1
        }
      },

      js_compile: {
        options: {
          enabled: true,
          message: 'JS Compiled!',
          title: "Noemie Design",
          success: true,
          duration: 1
        }
      },

      jade_compile: {
        options: {
          enabled: true,
          message: 'Jade Compiled!',
          title: "Noemie Design",
          success: true,
          duration: 1
        }
      },

      server: {
        options: {
          enabled: true,
          message: 'Server Running!',
          title: "Noemie Design",
          success: true,
          duration: 1
        }
      }
    },


    /**
     * Watch
     * @github.com/gruntjs/grunt-contrib-watch
     */
    watch: {

      // JShint Gruntfile
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },

      // Compile Sass dev on change
      sass: {
        files: '<%= dir.sass %>/**/*',
        tasks: ['sass:dev'],
      },

      // JShint, concat + uglify JS on change
      js: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'concat', 'uglify']
      },

      // Live reload files
      livereload: {
        options: { livereload: true },
        files: [
          '<%= dir.css %>/**/*.css',  // all .css files in css/ dir
          '<%= dir.js %>/**/*.js',    // all .js files in js/ dir
          '**/*.{html,php}',          // all .html + .php files
          '<%= dir.img %>/**/*.{png,jpg,jpeg,gif,svg}'  // img files in img/ dir
        ]
      }
    }
  });


  /**
   * Default Task
   * run `grunt`
   */
  grunt.registerTask('default', [
    'notify',
    // 'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
    'sass:dev',         // Compile Sass with dev settings
    'browserSync',
    'watch',
  ]);


  /**
   * Production tast, use for deploying
   * run `grunt production`
   */
  grunt.registerTask('production', [
    // 'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
    'sass:dist',        // Compile Sass with distribution settings
  ]);

  grunt.registerTask('server', [
    'browserSync',
    'notify:server',
  ]);



  /**
   * Load the plugins specified in `package.json`
   */
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');ß
};