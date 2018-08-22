const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const fancyLog = require('fancy-log');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const CSS_DESTINATION = './css'
const SASS_PATTERN = './sass/**/*.{scss,sass}';

var sassPaths = [
  '/node_modules/foundation-sites/scss',
  '/node_modules/motion-ui/src/',
  '/node_modules/normalize-scss/sass',
  '/node_modules/hamburgers/_sass/hamburgers'
];

gulp.task('sass', function () {
    return gulp.src(SASS_PATTERN)
        // .pipe(sourcemaps.init())
        .pipe(sass({includePaths: sassPaths}))
        .on('error', function (error) {
            fancyLog.log.error(
                'Error (' + error.plugin + '): ' + error.messageFormatted
            );
        })
        .pipe(cleanCSS())
        .pipe(
            postcss([
                autoprefixer({
                    // browsers are coming from browserslist file
                    cascade: false,
                }),
            ])
        )
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(CSS_DESTINATION));
});



gulp.task('default', ['watch']);
gulp.task('watch', function () {
    gulp.watch(SASS_PATTERN, ['sass']);
});