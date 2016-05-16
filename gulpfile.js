var gulp        = require('gulp');
var cleanCSS    = require('gulp-clean-css');
var concatCSS   = require('gulp-concat-css');
var nodemon     = require('gulp-nodemon');
var notify      = require('gulp-notify');
var sass        = require('gulp-sass');

// nodemon
gulp.task('start', function () {
  nodemon({
    script: 'app.js', 
    ext: 'js html', 
    env: { 
        'NODE_ENV': 'development' 
    }
  })
  .pipe(notify("App started successfully"));
});

// convert sass
gulp.task('sass', function() {
    gulp.src('public/stylesheets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets/css/'))
});


// Minify css for preformance
gulp.task('minify-css', function() {
    return gulp.src('public/stylesheets/css/*.css')
        // Merge all the css files to one file.
        .pipe(concatCSS('public/stylesheets/style.css'))
        // Minify css
        .pipe(cleanCSS({compatibility: 'ie8'}))
     .pipe(gulp.dest('public/stylesheets'));
});

//Past all css files in to one
gulp.task('concat', function () {
  return gulp.src('public/stylesheets/css/*.css')
    .pipe(concatCss("public/stylesheets/style.css"))
    .pipe(gulp.dest('public/stylesheets'));
});


// Default
gulp.task('default',['nodemon'],function() {
    gulp.watch('./public/stylesheets/sass/*.scss',['sass', 'minify-css', 'concat']);
});