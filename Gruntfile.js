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

    // jshint: {
    //         all: ['Gruntfile.js']
    //     },

    /**
     * Set directory paths
     */
    // dir: {
    //   js: 'js',
    //   css: 'css',
    //   sass: 'css/sass',
    //   img: 'img'
    // },

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
          'css/global.css': 'sass/global.scss',
        }
      }
    },

      // Browser Sync integration
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
              // "js/src/main-1.js",
              // "js/src/masonry.js",
              "js/src/mas-test.js",
              "js/src/masonry.pkgd.min.js",
              "js/src/jquery.flexslider.js",
              "js/src/jquery.isotope.js",
              "js/src/jquery.imagesloaded.min.js",
              "js/src/sidebar_menu.js",
              "js/src/bootsidemenu.js",
             ],
        // the location of the resulting JS file
        dest: 'js/global.js'
      },
    },

    /**
     * Uglify
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
          "index": "jade/index.jade",
          "working": "jade/work.jade",
          // "bene.html": "jade/bene.jade",
          // "perkins.html": "jade/perkins.jade",
          // "reach.html": "jade/reach.jade",
          // "chill.html": "jade/chill.jade",
          // "grady.html": "jade/grady.jade",
          // "experiment.html": "jade/experiment.jade",
          // "poster.html": "jade/poster.jade",
          // "morning.html": "jade/morning.jade",
          // "shirt.html": "jade/shirt.jade",
          // "blue.html": "jade/blue.jade",
          "work/bene": "jade/bene.jade",
          "work/perkins": "jade/perkins.jade",
          "work/reach": "jade/reach.jade",
          "work/chill": "jade/chill.jade",
          "work/grady": "jade/grady.jade",
          "work/experiment": "jade/experiment.jade",
          "work/poster": "jade/poster.jade",
          "work/morning": "jade/morning.jade",
          "work/shirt": "jade/shirt.jade",
          "work/blue": "jade/blue.jade",
        }
      }
    },

      /**
     * Watch
     * @github.com/gruntjs/grunt-contrib-watch
     */
    watch: {
      jade: {
        files: ['jade/**/*'],
        tasks: ['jade_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      js: {
        files: [ "js/**/*", "!js/init.js"],
        tasks: ['js_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      sass: {
        files: ['sass/**/*'],
        tasks: ['sass_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      }
    },

    //  Concurrent
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 10,
      },
      monitor: {
        tasks: ["watch:jade", "watch:js", "watch:sass", "notify:watching", 'server']
      },
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
    
    
  });

  /**
   * Load the plugins specified in `package.json`
   */
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concurrent');

  /**
   * Default Task
   * run `grunt`
   */
 

  grunt.registerTask('jade_compile', ['jade', 'notify:jade_compile']);
  grunt.registerTask('js_compile', ['concat:js', 'notify:js_compile']);
  grunt.registerTask('sass_compile',['sass:dev', 'notify:sass_compile']);
  grunt.registerTask('server', ['browserSync','notify:server']);
  /**
   * Production tast, use for deploying
   * run `grunt production`
   */
  // grunt.registerTask('production', ['concat:js', 'uglify', 'sass:dist']);
 
  grunt.registerTask('default', ['concurrent:monitor']);
};


