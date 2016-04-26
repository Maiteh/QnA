var gulp       = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        //injectChanges: true,
        host: 'localhost',
        proxy: 'localhost:3700',
    });
    gulp.watch("assets/css/*.css").on('change', browserSync.reload);
});

gulp.task('watch', function () {
    gulp.watch('assets/css/*.css' ['browser-sync']);
});