module.exports = (grunt) ->

  # HELPERS
  # ============================================================================
  getBuildPath = ->
    path = ['build']
    path.push getBuildPrefix() if process.env.TRAVIS is 'true' and process.env.TRAVIS_SECURE_ENV_VARS is 'true'
    path.join('/') + '/'

  # TASKS
  # ============================================================================
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # Cleaning
    # --------
    clean:
      tpl    : ["src/js/templates/**/*.js"]
      js     : ["#{getBuildPath()}js/"]
      css    : ["#{getBuildPath()}css/"]
      html   : ["#{getBuildPath()}*.html"]
      assets : ["#{getBuildPath()}fonts/","#{getBuildPath()}img/","#{getBuildPath()}*.{ico,png}"]
      all    : ["#{getBuildPath()}","src/templates/**/*.js"]

    # Copying
    # -------
    copy:
      assets:
        expand : true
        cwd    : 'src/'
        src    : ['files/**', 'fonts/**','images/**','*.{png,ico}']
        dest   : getBuildPath()
      libs:
        expand : true
        cwd    : 'src/'
        src    : ['js/lib/**']
        dest   : getBuildPath()
      themecss:
        expand : true
        cwd    : 'src/'
        src    : ['css/**']
        dest   : getBuildPath()
      themejs:
        expand : true
        cwd    : 'src/'
        src    : ['js/**']
        dest   : getBuildPath()
      data:
        expand : true
        cwd    : 'build/_data/'
        src    : ['*.json']
        dest   : 'src/tpl/_data/'

    # Assembling
    # ----------
    assemble:
      options:
        assets    : "#{getBuildPath()}"
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
          dest   : getBuildPath()
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
          cssDir: "#{getBuildPath()}/css/"
          trace : false
      watch:
        options:
          cssDir: "#{getBuildPath()}/css/"
          trace : true
      doc:
        options:
          cssDir: 'build/css/'
          trace : false

    # RequireJS
    # ---------
    requirejs:
      compile:
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
        outputFile : "#{getBuildPath()}js/lib/modernizr.js"
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
        tasks: ['assets', 'compass:watch', 'copy:themecss']
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

  grunt.registerTask 'css', ['assets','compass:compile','copy:themecss']
  grunt.registerTask 'js', ['clean:js','clean:tpl','libs','jshint','copy:themejs']
  grunt.registerTask 'html', ['clean:html','assemble:pages']

  grunt.registerTask 'live', ['connect:basic','watch']
  grunt.registerTask 'build', ['clean:all','js','css','html']

  grunt.registerTask 'deploy', ['exec:loadcache','build','travis-deploy']
