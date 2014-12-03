module.exports = (grunt) ->

  # TASKS
  # ============================================================================
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # Cleaning
    # --------
    clean:
      tpl    : ["src/js/templates/**/*.js"]
      js     : ["build/js/"]
      css    : ["build/css/"]
      html   : ["build/*.html"]
      assets : ["build/fonts/","build/img/","build/*.{ico,png}"]
      all    : ["build/","src/templates/**/*.js"]

    # Copying
    # -------
    copy:
      assets:
        expand : true
        cwd    : 'src/'
        src    : ['files/**', 'fonts/**','images/**','*.{png,ico}']
        dest   : 'build/'
      libs:
        expand : true
        cwd    : 'src/'
        src    : ['js/lib/**']
        dest   : 'build/'
      themecss:
        expand : true
        cwd    : 'src/'
        src    : ['css/**']
        dest   : 'build/'
      themejs:
        expand : true
        cwd    : 'src/'
        src    : ['js/**']
        dest   : 'build/'
      data:
        expand : true
        cwd    : 'build/_data/'
        src    : ['*.json']
        dest   : 'src/tpl/_data/'

    # Assembling
    # ----------
    assemble:
      options:
        assets    : 'build/'
        data      : ['src/tpl/_data/**/**/*.{json,yml}','package.json'],
        helpers   : ['src/tpl/_helpers/**/*.js','node_modules/prettify/prettify.js']
        partials  : ['src/tpl/_includes/**/*.{md,html,hbs}','src/tpl/pages/**/*-ajax-*.{md,html,hbs}','src/tpl/pages/**/pop-*.{md,html,hbs}']
        layoutdir : 'src/tpl/_layouts'
        layoutext : '.hbs'
        # Prettify helpers configuration
        prettify:
          indent   : 2
          condense : true
          newlines : true
      pages:
        files: [{
          expand : true
          cwd    : 'src/tpl/pages/'
          src    : ['**/*.{md,html,hbs}']
          dest   : 'build/'
          ext    : '.html'
        }]
      index:
        files: [{
          expand : true
          cwd    : 'src/tpl/'
          src    : ['index.hbs']
          dest   : 'build/'
          ext    : '.html'
        }]

    # Compass / CSS
    # -------------
    compass:
      options:
        config : './config.rb'
        force : true
        bundleExec : true
      compile:
        options:
          cssDir: "build/css/"
          trace : false
      watch:
        options:
          cssDir: "build/css/"
          trace : true
      doc:
        options:
          cssDir: 'build/css/'
          trace : false

    # RequireJS
    # ---------
    requirejs:
      compile:
    # Pleeease
    # --------

    pleeease:
      custom:
        options:
          browsers: ['last 2 versions', '> 5%', 'ios 6']
          filters : {'oldIE': true}
          rem     : ['16px']
          minifier: false
        files:
          'build/css/styles.css': 'build/css/styles.css'
        options:
          baseUrl: 'src/js'
          mainConfigFile: 'src/js/main.js'
          preserveLicenseComments: false
          optimize: 'uglify2'
          uglify2:
            mangle: true
          generateSourceMaps: true
          paths:
            almond: '../../node_modules/almond/almond'
            settings: 'empty:'
          name: 'main'
          fileExclusionRegExp: /tpl|_/,
          out: 'build/js/main.js'
          include: ['almond']

    # JSHint
    # ------
    jshint:
      options:
        jshintrc : '.jshintrc'
      files: ['src/js/**/*.js','!src/js/**/lib/**/*.js']

    # JS Compiling
    # ------------
    jst:
      options:
        amd       : true
        namespace : false
      compile:
        files: [{
          expand : true
          cwd    : 'src/js/templates/'
          src    : ['**/*.tpl']
          dest   : 'src/js/templates/'
          ext    : '.js'
        }]

    modernizr:
      dist:
        devFile    : 'remote'
        outputFile : "build/js/lib/modernizr.js"
        parseFiles : true
        extra:
          shiv       : true
          printshiv  : false
          load       : false
          mq         : false
          cssclasses : true
        tests: ['touch']
        uglify: true
        files :
          src: ['src/js/**/*.js','src/scss/project/**/*.scss']

    # Livereload
    # ----------
    connect:
      options:
        base: 'build'
      basic :
        options:
          livereload: true
      server:
        options :
          keepalive : true

    watch:
      options:
        livereload: true
        atBegin: true
      css:
        files: ['src/scss/**/*.scss', 'src/css/**/*.css']
        tasks: ['assets', 'compass:watch', 'pleeease', 'copy:themecss']
      js:
        files: ['src/js/templates/**/*.tpl','src/js/**/*.js']
        tasks: ['js']
      html:
        files: ['src/tpl/**/*.{md,hbs,html}']
        tasks: ['html']


  # DEPS / REGISTER
  # ============================================================================
  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks
  grunt.loadNpmTasks 'assemble'

  grunt.registerTask 'libs', ['modernizr','copy:libs']
  grunt.registerTask 'assets', ['clean:assets','clean:css','copy:assets']

  grunt.registerTask 'js', ['clean:js','clean:tpl','libs','jshint','copy:themejs']
  grunt.registerTask 'css', ['assets','compass:compile','pleeease','copy:themecss']
  grunt.registerTask 'html', ['clean:html','assemble:pages']

  grunt.registerTask 'live', ['connect:basic','watch']
  grunt.registerTask 'build', ['clean:all','js','css','html']

  grunt.registerTask 'deploy', ['exec:loadcache','build','travis-deploy']
