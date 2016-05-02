var gulp       = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var browserSync = require('browser-sync')
var reload = browserSync.reload;


// Minify css for preformance
gulp.task('minify-css', function() {
    return gulp.src('assets/css/*.css')
        // Merge all the css files to one file.
        .pipe(concatCSS('styles/bundle.css'))
        // Minify css
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/styles'));
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync({
        proxy: "localhost:3000",  // local node app address
        port: 5000,  // use *different* port than above
        notify: true
    });
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'index.js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
        ]
    })
        .on('start', function () {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function () {
            setTimeout(function () {
                reload({ stream: false });
            }, 1000);
        });
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['index.js'], reload);
});
