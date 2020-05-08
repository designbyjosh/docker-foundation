const autoprefixer = require('autoprefixer');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

const CSS_DESTINATION = './css'
const SASS_PATTERN = './sass/**/*.{scss,sass}';


var sassPaths = [
  '/node_modules/foundation-sites/scss',
  '/node_modules/motion-ui/src/',
  '/node_modules/normalize-scss/sass',
  '/node_modules/hamburgers/_sass/hamburgers'
];


function sass_task() {
    return gulp.src(SASS_PATTERN)
        .pipe(sass({
          includePaths: sassPaths
        })
        .on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(
            postcss([
                autoprefixer({
                    // browsers are coming from browserslist file
                    cascade: false,
                }),
            ])
        )
        .pipe(gulp.dest(CSS_DESTINATION));
}


function watch() {
    gulp.watch(SASS_PATTERN, sass_task);
}

exports.watch = watch;
exports.default = gulp.series(watch);