const gulp = require('gulp')

require('require-dir')('./_gulp_tasks')

// Run the asset pipeline
gulp.task('assets', gulp.parallel('styles', 'scripts', 'icons', 'copy'))

// Development Build Process
gulp.task('build:dev', gulp.series('clean', 'generate', 'assets'))

// Production Build Process
gulp.task(
  'build',
  gulp.series('clean', 'generate', 'assets', 'critical', 'workbox')
)
