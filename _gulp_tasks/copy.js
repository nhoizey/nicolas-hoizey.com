const config = require('./_config.json')
const gulp = require('gulp')
const merge = require('merge-stream');

gulp.task('copy', function () {
  const mediaGlobs = '/**/*.{jpg,jpeg,png,gif,webp,mp3,mp4,webm,ogg,pdf,zip}';
  const srcArticles = config.buildSrc + '/articles' + mediaGlobs;
  const srcLinks = config.buildSrc + '/links' + mediaGlobs;

  const articles = gulp.src(srcArticles).pipe(gulp.dest(config.assetDest + '/articles'));
  const links = gulp.src(srcLinks).pipe(gulp.dest(config.assetDest + '/links'));

  return merge(articles, links);
})
