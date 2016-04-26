var gulp       = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');
var nodemon = require('gulp-nodemon');

// Minify css for preformance
gulp.task('minify-css', function() {
    return gulp.src('assets/css/*.css')
    // Merge all the css files to one file.
        .pipe(concatCSS('styles/bundle.css'))
        // Minify css
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/styles'));
});

// Live reload of the browser.
gulp.task('browser-sync', function() {
    browserSync.init({
        //injectChanges: true,
        host: 'localhost',
        proxy: 'localhost:3700'
    });
    // Call function gulp watch to check if changes
    // if changes -> reload !!
    gulp.watch("assets/css/*.css", ['minify-css']).on('change', browserSync.reload);
});

// starting the app with nodemon
gulp.task('start', function () {
    nodemon({
        script: 'index.js'
        , ext: 'js jade'
        , tasks: ['browser-sync']})
        .on('restart', function () {
            console.log('restarted!')
        })
});


gulp.task('watch', function () {
    gulp.watch('assets/css/*.css' ['minify-css']);
});


// When just running 'gulp' he wil automatically run these tasks.
gulp.task('default', ['start', 'minify-css', 'browser-sync', 'watch']);