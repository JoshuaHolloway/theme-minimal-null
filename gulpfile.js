const gulp = require('gulp');
const themeKit = require('@shopify/themekit');
const sass = require('gulp-sass');

// ==============================================

gulp.task('sass', function() {
  return gulp.src('styles/custom-styles.scss') // source
    .pipe(sass())                              // compile with sasss
    .pipe(gulp.dest('assets'));                // destination
});

// ==============================================

gulp.task('watch', function() {

  gulp.watch('styles/**/*.scss', gulp.series('sass'));
  
  themeKit.command('watch', {
    allowLive: true,
    env: 'development' // env corresponds to environment from config.yml
  });

});