// Load plugins
var gulp = require('gulp'),                         //Gulp: task manager (automation)
    sass = require('gulp-sass'),                    //SASS: preprocesador convert sass to css
    autoprefixer = require('gulp-autoprefixer'),    //Autoprefixer: parses your CSS and adds vendor prefixes to CSS rules using values from Can I Use
    cleanCSS = require('gulp-clean-css'),           //CleanCSS: minify CSS
    //minifycss = require('gulp-minify-css'),       //This package has been deprecated, now use gulp-clean-css
    uglify = require('gulp-uglify'),                //Uglify: Minify JavaScript with UglifyJS3. 
    rename = require('gulp-rename'),                //Rename: rename files easily
    clean = require('gulp-clean'),                  //Clean: Removes files and folders
    concat = require('gulp-concat'),                //Concat: Files will be concatenated in the order that they are specified in the gulp.src function
    notify = require('gulp-notify'),                //Notify: notification plugin for gulp
    cache = require('gulp-cache'),                  //Cache: A temp file based caching proxy task for gulp
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),                        //Tiny-lr: exposes an HTTP server and express middleware, with a very basic REST API to notify the server of a particular change
    server = lr();
// Styles
gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(livereload(server))
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});
// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(livereload(server))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});
// Default task
gulp.task('default', ['clean'], function() {
    gulp.run('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {
// Listen on port 8888
  server.listen(8888, function (err) {
    if (err) {
      return console.log(err)
    };
// Watch .scss files
    gulp.watch('./sass/*.sass', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.run('styles');
    });
// Watch .js files
//    gulp.watch('src/scripts/**/*.js', function(event) {
//      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//      gulp.run('scripts');
//    });
// Watch image files
    gulp.watch('src/images/**/*', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.run('images');
    });
  });
});