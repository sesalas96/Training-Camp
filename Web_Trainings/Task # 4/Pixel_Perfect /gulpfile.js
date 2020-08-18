// Load plugins
const gulp = require('gulp');                          
const sass = require('gulp-sass');   
const browserSync = require("browser-sync").create();

//compile  sass into css  
function style() {
  // 1. find my sass
  return gulp.src('./sass/*.sass')
  // 2. pass that file throught sass compiler
    .pipe(sass())
  // 3. where do I save the compile CSS?
    .pipe(gulp.dest('./css'))
  // 4. stream changes to all browser
    .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./sass/*.sass',style);
  gulp.watch('./*.html').on('change',browserSync.reload);
}

exports.style = style;
exports.watch = watch;
