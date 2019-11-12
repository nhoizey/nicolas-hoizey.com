const config = require('./_config.json')
const gulp = require('gulp')

gulp.task('copy', function () {
  const linksDir = config.buildSrc + '/links'
  const linksMediaGlobs = [
    linksDir + '/**/*.{jpg,jpeg,png,gif,webp,mp3,mp4,webm,ogg,pdf,zip}'
  ]

  return gulp
    .src(linksMediaGlobs, { base: linksDir })
    .pipe(gulp.dest(config.assetDest + '/media'))
})
