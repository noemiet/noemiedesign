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
     * Concatenate
     * @github.com/gruntjs/grunt-contrib-concat
     */
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      js: {
        // the files to concatenate
        src: [
              "js/src/bootstrap.min.js",
              "js/src/main-1.js",
              "js/src/masonry.js",
              "js/src/jquery.flexslider.js",
              "js/src/jquery.isotope.js",
              "js/src/jquery.imagesloaded.min.js",

             ],
        // the location of the resulting JS file
        dest: 'js/global.js'
      },
    },


    /**
     * Sass compiling
     * @github.com/gruntjs/grunt-contrib-sass
     */
    sass: {
      // Development options
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
        },
        files: {
          'css/global.css': 'sass/global.scss'
        }
      },

      // Distribution options
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= dir.css %>/<%= pkg.name %>.css': '<%= dir.sass %>/global.scss'
        }
      }
    },

    //  Jade
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          "index.html": "jade/index.jade",

        }
      }
    },


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

//  Jade
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          "index.html": "jade/index.jade",

        }
      }
    },

    /**
     * Watch
     * @github.com/gruntjs/grunt-contrib-watch
     */
    watch: {
      // Compile Sass dev on change
      sass: {
        files: '<%= dir.sass %>/**/*',
        tasks: ['sass:dev'],
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

  /**
   * Default Task
   * run `grunt`
   */
  grunt.registerTask('default', [
    'notify',
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
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
    'sass:dist',        // Compile Sass with distribution settings
  ]);

  grunt.registerTask('server', [
    'browserSync',
    'notify:server',
  ]);

};


