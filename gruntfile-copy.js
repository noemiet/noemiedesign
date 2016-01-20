module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({
//  Copy
    copy: {
      dist: { cwd: 'font', src: [ '**' ], dest: 'dist/font', expand: true },
    },

//  Sass
  sass: {
    expanded: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
        },
        files: {
          'dist/css/materialize.css': 'node_modules/materialize-css/sass/materialize.scss',
        }
      },

    pwdist: {
      options: {
        style: 'compressed',
        sourcemap: 'none',
      },
      files: {
        'dist/css/pw-styles.min.css': 'sass/pw-style/pwstyle.scss',
      }
    },

    pw: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
        },
        files: {
          'css/pwstyle.min.css': 'sass/pw-style/pwstyle.scss',
        }
      }
    },

  // Browser Sync integration
    browserSync: {
      bsFiles: ["js/*.js", "css/*.css", "!**/node_modules/**/*", "*.html"],
      options: {
          server: {
              baseDir: "./" // make server from root dir
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

//  Concat
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
              "js/jquery.easing.1.3.js",
              "js/animation.js",
              "js/velocity.min.js",
              "js/hammer.min.js",
              "js/jquery.hammer.js",
              "js/global.js",
              "js/collapsible.js",
              "js/dropdown.js",
              "js/leanModal.js",
              "js/materialbox.js",
              "js/parallax.js",
              "js/tabs.js",
              "js/tooltip.js",
              "js/waves.js",
              "js/toasts.js",
              "js/sideNav.js",
              "js/scrollspy.js",
              "js/forms.js",
              "js/slider.js",
              "js/cards.js",
              "js/chips.js",
              "js/pushpin.js",
              "js/buttons.js",
              "js/transitions.js",
              "js/scrollFire.js",
              "js/date_picker/picker.js",
              "js/date_picker/picker.date.js",
              "js/character_counter.js",
             ],
        // the location of the resulting JS file
        dest: 'dist/js/materialize.js'
      },
      temp: {
        // the files to concatenate
        src: [
              "js/jquery.easing.1.3.js",
              "js/animation.js",
              "js/velocity.min.js",
              "js/hammer.min.js",
              "js/jquery.hammer.js",
              "js/global.js",
              "js/collapsible.js",
              "js/dropdown.js",
              "js/leanModal.js",
              "js/materialbox.js",
              "js/parallax.js",
              "js/tabs.js",
              "js/tooltip.js",
              "js/waves.js",
              "js/toasts.js",
              "js/sideNav.js",
              "js/scrollspy.js",
              "js/forms.js",
              "js/slider.js",
              "js/cards.js",
              "js/chips.js",
              "js/pushpin.js",
              "js/buttons.js",
              "js/transitions.js",
              "js/scrollFire.js",
              "js/date_picker/picker.js",
              "js/date_picker/picker.date.js",
              "js/character_counter.js",
             ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize.js'
      },
      pw: {
        // the files to concatenate
        src: [
              "js/pw-script/flexslider.js",
              "js/pw-script/waypoints.js",
              "js/pw-script/arrow.js",
              "js/pw-script/pw-chips.js",

             ],
        // the location of the resulting JS file
        dest: 'dist/js/pw-javascript.js'
      },
    },

//  Uglify
    uglify: {
      options: {
        // Use these options when debugging
        // mangle: false,
        // compress: false,
        // beautify: true

      },
      dist: {
        files: {
          'dist/js/materialize.min.js': ['dist/js/materialize.js']
        }
      },

      extras: {
        files: {
          'extras/noUiSlider/nouislider.min.js': ['node_modules/materialize-css/extras/noUiSlider/nouislider.js']
        }
      }
    },



//  Compress
    compress: {
      main: {
        options: {
          archive: 'bin/materialize.zip',
          level: 6
        },
        files:[
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'materialize/'},
          { expand: true, cwd: './', src: ['LICENSE', 'README.md'], dest: 'materialize/'},
        ]
      },

      src: {
        options: {
          archive: 'bin/materialize-src.zip',
          level: 6
        },
        files:[
          {expand: true, cwd: 'font/', src: ['**/*'], dest: 'materialize-src/font/'},
          {expand: true, cwd: 'sass/', src: ['materialize.scss'], dest: 'materialize-src/sass/'},
          {expand: true, cwd: 'sass/', src: ['components/**/*'], dest: 'materialize-src/sass/'},
          {expand: true, cwd: 'js/', src: [
              "jquery.easing.1.3.js",
              "animation.js",
              "velocity.min.js",
              "hammer.min.js",
              "jquery.hammer.js",
              "global.js",
              "collapsible.js",
              "dropdown.js",
              "leanModal.js",
              "materialbox.js",
              "parallax.js",
              "tabs.js",
              "tooltip.js",
              "waves.js",
              "toasts.js",
              "sideNav.js",
              "scrollspy.js",
              // "forms.js",
              "slider.js",
              "cards.js",
              "chips.js",
              "pushpin.js",
              "buttons.js",
              "transitions.js",
              "scrollFire.js",
              "date_picker/picker.js",
              "date_picker/picker.date.js",
              "character_counter.js",
             ], dest: 'materialize-src/js/'},
        {expand: true, cwd: 'dist/js/', src: ['**/*'], dest: 'materialize-src/js/bin/'},
        {expand: true, cwd: './', src: ['LICENSE', 'README.md'], dest: 'materialize-src/'}

        ]
      },

      starter_template: {
        options: {
          archive: 'templates/starter-template.zip',
          level: 6
        },
        files:[
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'starter-template/'},
          { expand: true, cwd: 'templates/starter-template/', src: ['index.html', 'LICENSE'], dest: 'starter-template/'},
          { expand: true, cwd: 'templates/starter-template/css', src: ['style.css'], dest: 'starter-template/css'},
          { expand: true, cwd: 'templates/starter-template/js', src: ['init.js'], dest: 'starter-template/js'}

        ]
      },

      parallax_template: {
        options: {
          archive: 'templates/parallax-template.zip',
          level: 6
        },
        files:[
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'parallax-template/'},
          { expand: true, cwd: 'templates/parallax-template/', src: ['index.html', 'LICENSE', 'background1.jpg', 'background2.jpg', 'background3.jpg'], dest: 'parallax-template/'},
          { expand: true, cwd: 'templates/parallax-template/css', src: ['style.css'], dest: 'parallax-template/css'},
          { expand: true, cwd: 'templates/parallax-template/js', src: ['init.js'], dest: 'parallax-template/js'}

        ]
      },

      splash_template: {
        options: {
          archive: 'templates/splash-template.zip',
          level: 6
        },
        files:[
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'splash-template/'},
          { expand: true, cwd: 'templates/splash-template/', src: ['index.html'], dest: 'splash-template/'},
          { expand: true, cwd: 'templates/splash-template/img', src: ['device.png', 'splash-img.jpg'], dest: 'splash-template/img'},
          { expand: true, cwd: 'templates/splash-template/css', src: ['style.css'], dest: 'splash-template/css'},
          { expand: true, cwd: 'templates/splash-template/js', src: ['arrow.js', 'waypoints.js', 'flexslider.js'], dest: 'splash-template/js'}

        ]
      },

    application_template: {
        options: {
          archive: 'templates/application-template.zip',
          level: 6
        },
        files:[
          { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'application-template/'},
          { expand: true, cwd: 'templates/application-template/', src: ['index.html'], dest: 'application-template/'},
          { expand: true, cwd: 'templates/application-template/img', src: ['cd-arrow.svg', 'cd-avatar.png', 'cd-logo.svg', 'cd-nav-icons.svg', 'cd-search.svg', 'hub-branding.png', 'noemie-avatar.jpg'], dest: 'application-template/img'},
          { expand: true, cwd: 'templates/application-template/css', src: ['style.css', 'reset.css'], dest: 'application-template/css'},
          { expand: true, cwd: 'templates/application-template/js', src: ['jquery-2.1.4.js', 'jquery.menu-aim.js', 'main.js'], dest: 'application-template/js'}

        ]
      }

    },



//  Clean
   clean: {
     temp: {
       src: [ 'temp/' ]
     },
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
          "icons.html": "jade/icons.jade",
          "about.html": "jade/about.jade",
          "sass.html": "jade/sass.jade",
          "getting-started.html": "jade/getting-started.jade",
          "mobile.html": "jade/mobile.jade",
          "showcase.html": "jade/showcase.jade",
          "parallax.html": "jade/parallax.jade",
          "parallax-demo.html": "jade/parallax-demo.jade",
          "typography.html": "jade/typography.jade",
          "color.html": "jade/color.jade",
          "shadow.html": "jade/shadow.jade",
          "grid.html": "jade/grid.jade",
          "media-css.html": "jade/media-css.jade",
          "table.html": "jade/table.jade",
          "helpers.html": "jade/helpers.jade",
          "forms.html": "jade/forms.jade",
          "buttons.html": "jade/buttons.jade",
          "navbar.html": "jade/navbar.jade",
          "cards.html": "jade/cards.jade",
          "preloader.html": "jade/preloader.jade",
          "collections.html": "jade/collections.jade",
          "badges.html": "jade/badges.jade",
          "footer.html": "jade/footer.jade",
          "dialogs.html": "jade/dialogs.jade",
          "modals.html": "jade/modals.jade",
          "dropdown.html": "jade/dropdown.jade",
          "tabs.html": "jade/tabs.jade",
          "side-nav.html": "jade/sideNav.jade",
          "pushpin.html": "jade/pushpin.jade",
          "waves.html": "jade/waves.jade",
          "media.html": "jade/media.jade",
          "collapsible.html": "jade/collapsible.jade",
          "chips.html": "jade/chips.jade",
          "scrollfire.html": "jade/scrollFire.jade",
          "scrollspy.html": "jade/scrollspy.jade",
          "transitions.html": "jade/transitions.jade",
          "fullscreen-slider-demo.html": "jade/fullscreen-slider-demo.jade",
          "pagination.html": "jade/pagination.jade",
          "breadcrumbs.html": "jade/breadcrumbs.jade",
          "splash.html" : "jade/splash.jade",
          "wordpress.html": "jade/wordpress.jade",
          "getting-started-from-scratch.html": "jade/getting-started-from-scratch.jade",
          "notifications.html" : "jade/notifications.jade",


        }
      }
    },

//  Watch Files
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
          title: "P+W UI Library", // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 1 // the duration of notification in seconds, for `notify-send only
        }
      },

      sass_compile: {
        options: {
          enabled: true,
          message: 'Sass Compiled!',
          title: "P+W UI Library",
          success: true,
          duration: 1
        }
      },

      js_compile: {
        options: {
          enabled: true,
          message: 'JS Compiled!',
          title: "P+W UI Library",
          success: true,
          duration: 1
        }
      },

      jade_compile: {
        options: {
          enabled: true,
          message: 'Jade Compiled!',
          title: "P+W UI Library",
          success: true,
          duration: 1
        }
      },

      server: {
        options: {
          enabled: true,
          message: 'Server Running!',
          title: "P+W UI Library",
          success: true,
          duration: 1
        }
      }
    },

      // Testem
      testem: {
        'default': {
          src: [
            'bower_components/qunit/qunit/qunit.js',
            'bower_components/jquery/dist/jquery.min.js',
            'js/jquery.easing.1.3.js',
            'js/animation.js',
            'js/velocity.min.js',
            'js/hammer.min.js',
            'js/jquery.hammer.js',
            'js/global.js',
            'js/collapsible.js',
            'js/dropdown.js',
            'js/leanModal.js',
            'js/materialbox.js',
            'js/parallax.js',
            'js/tabs.js',
            'js/tooltip.js',
            'js/waves.js',
            'js/toasts.js',
            'js/sideNav.js',
            'js/scrollspy.js',
            'js/forms.js',
            'js/slider.js',
            'js/cards.js',
            'js/chips.js',
            'js/pushpin.js',
            'js/buttons.js',
            'js/transitions.js',
            'js/scrollFire.js',
            'js/date_picker/picker.js',
            'js/date_picker/picker.date.js',
            'js/character_counter.js',
            'tests/setup.js',
            'tests/helpers/**/*.js',
            'tests/**/*-test.js'
          ],
          options: {
            framework: "qunit",
            test_page: 'tests/index.mustache?hidepassed',
            launch_in_dev: ['PhantomJS', 'Chrome', 'Firefox'],
          }
        }
      }


  });

  // load the tasks
  // grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks("grunt-remove-logging");
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-testem');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // define the tasks
  grunt.registerTask(
    'release',[
      'lint',
      'copy',
      'sass:expanded',
      'sass:min',
      'concat:dist',
      'concat:pw',
      'uglify:dist',
      'uglify:extras',
      'usebanner:release',
      'replace:version',
      'replace:readme',
      'rename:rename_src',
      'rename:rename_compiled'
    ]
  );

  grunt.registerTask('jade_compile', ['jade', 'notify:jade_compile']);

  // grunt.registerTask('js_compile', ['concat:temp', 'uglify:bin', 'notify:js_compile', 'clean:temp', 'concat:pw']);
  // grunt.registerTask('sass_compile',['sass:gh', 'sass:bin', 'sass:pw', 'notify:sass_compile']);
  grunt.registerTask('js_compile', ['concat:temp', 'concat:pw', 'notify:js_compile', 'clean:temp']);
  grunt.registerTask('sass_compile',['sass:pwdist', 'sass:pw', 'notify:sass_compile']);

  grunt.registerTask('server', ['browserSync', 'notify:server']);
  grunt.registerTask('lint', ['removelogging:source']);
  grunt.registerTask("default", ['concurrent:monitor']);
};

API Training Shop Blog About
© 2016 GitHub, Inc. Help Support