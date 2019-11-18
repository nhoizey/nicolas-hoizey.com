const config = require('./_config.json')
const gulp = require('gulp')
const rename = require('gulp-rename');

gulp.task('copy', function () {

  const mediaGlobs = config.buildSrc + '/**/*.{jpg,jpeg,png,gif,webp,mp3,mp4,webm,ogg,pdf,zip}';
  return gulp
    .src(mediaGlobs)
    .pipe(rename(function (path) {
      if (path.dirname.match(/^(articles|links)\//)) {
        path.dirname = path.dirname.replace(/\/([0-9]{2})\/([^/]+)$/, "/$2/");
      }
    }))
    .pipe(gulp.dest(config.assetDest));
})
