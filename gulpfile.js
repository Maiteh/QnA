var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sassGlob     = require('gulp-sass-glob');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var importer     = require('node-sass-globbing');
var plumber      = require('gulp-plumber');
var cssmin       = require('gulp-cssmin');
var browserSync  = require('browser-sync').create();
var notify       = require("gulp-notify");
var shell        = require('gulp-shell');;
var nodemon      = require('gulp-nodemon');

// nodemon
gulp.task('start', function () {
  nodemon({
    script: 'app.js', 
    ext: 'js html', 
    env: { 
        'NODE_ENV': 'development' 
    }
  })
});
var sass_config = {
  importer: importer,
  includePaths: [
    'node_modules/breakpoint-sass/stylesheets/',
    'node_modules/singularitygs/stylesheets/',
    'node_modules/compass-mixins/lib/'
  ]
};
gulp.task('sass', function () {
  gulp.src('public/stylesheets/sass/**/*.scss')
  
    .pipe(sassGlob())
    .pipe(sass({
        style: 'compressed',
        errLogToConsole: false,
        onError: function(err) {
            return notify().write(err);
        }
    }))
    //.pipe(sourcemaps.init())
    .pipe(sass(sass_config).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version']
    
    }))
    //.pipe(sourcemaps.write('.'))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/stylesheets/css'))
    .pipe(notify({message:'Style is up to date ! ', onLast: true}));
});


gulp.task('watch', function () {
  gulp.watch('public/stylesheets/sass/**/*.scss', ['sass']);
  gulp.watch('public/js/*.js', ['js'])
});


//Past all css files in to one
gulp.task('concat', function () {
  return gulp.src('public/stylesheets/css/*.css')
    .pipe(concatCSS("public/stylesheets/css/*.css"))
    .pipe(gulp.dest('public/stylesheets'));
});


// Default
gulp.task('default', ['start','sass', 'watch']);