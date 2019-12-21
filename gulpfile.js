const gulp = require('gulp')

require('require-dir')('./_gulp_tasks')

// Run the asset pipeline
gulp.task('assets', gulp.parallel('icons', 'copy'))

// Production Build Process
gulp.task(
  'build',
  gulp.series('clean', 'assets', 'workbox')
)
