module.exports = (grunt) ->

  # TASKS
  # ============================================================================
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # Cleaning
    # --------
    clean:
      js     : ["build/js/"]
      css    : ["build/css/"]
      html   : ["build/*.html"]
      images : ["build/img/"]
      assets : ["build/fonts/","build/*.{ico,png}"]
      all    : ["build/","src/templates/**/*.js"]

    # Copying
    # -------
    copy:
      assets:
        expand : true
        cwd    : 'src/'
        src    : ['files/**', 'img/**', 'fonts/**', '*.{png,ico}']
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
          cwd    : 'src/pages/'
          src    : ['**/*.{md,html,hbs}']
          dest   : 'build/'
          ext    : '.html'
        }]
      index:
        files: [{
          expand : true
          cwd    : 'src/'
          src    : ['index.{md,html,hbs}']
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
          cssDir: 'build/css/'
          trace : false
      watch:
        options:
          cssDir: 'build/css/'
          trace : true
      doc:
        options:
          cssDir: 'build/css/'
          trace : false

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

    responsive_images:
      options:
        engine: "gm"
        quality: 75
      welcome:
        options:
          sizes: [
            width: 320
          ,
            width: 480
          ,
            width: 640
          ,
            width: 960
          ,
            width: 1280
          ,
            width: 1600
          ]
        expand: true
        src: ['**/*.jpg']
        cwd: 'src/img/welcome/'
        dest: 'build/img/welcome/'
      avatar:
        options:
          quality: 90
          sizes: [
            width: 128
          ,
            width: 256
          ,
            width: 384
          ]
        expand: true
        src: ['**/*.jpg']
        cwd: 'src/img/avatar/'
        dest: "build/img/avatar/"

    # JSHint
    # ------
    jshint:
      options:
        jshintrc : '.jshintrc'
      files: ['src/js/**/*.js','!src/js/**/lib/**/*.js']

    # Modernizr
    # ---------
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
          src: ['src/js/**/*.js','src/scss/**/*.scss']

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
        files: ['src/js/**/*.js']
        tasks: ['js']
      html:
        files: ['src/pages/**/*.{md,hbs,html}', 'src/tpl/**/*.{md,hbs,html}']
        tasks: ['html']
      images:
        files: ['src/images/**/*.{jpg}']
        tasks: ['images']


  # DEPS / REGISTER
  # ============================================================================
  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks
  grunt.loadNpmTasks 'assemble'

  grunt.registerTask 'libs', ['modernizr','copy:libs']
  grunt.registerTask 'assets', ['clean:assets','clean:css','copy:assets']

  grunt.registerTask 'css', ['assets','compass:compile','pleeease','copy:themecss']
  grunt.registerTask 'js', ['clean:js','libs','jshint','copy:themejs']
  grunt.registerTask 'html', ['clean:html','assemble:pages']
  grunt.registerTask 'images', ['clean:images', 'responsive_images']

  grunt.registerTask 'live', ['connect:basic','watch']
  grunt.registerTask 'build', ['clean:all','js','css','html','images']
