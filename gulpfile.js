const gulp = require("gulp");
const sass = require("gulp-sass");
const { series } = require("gulp");
const babel = require('gulp-babel');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require("browser-sync").create(); //https://browsersync.io/docs/gulp#page-top


// // Scripts
// function js(cb) {
//     gulp.src("web/scripts/*js")
//         .pipe(babel({
//             presets: ['@babel/preset-env']
//         }))
//         .pipe(concat("main.js"))
//         .pipe(uglify())
//         .pipe(gulp.dest("web/scripts"));
//     cb();
// }

// Compile Sass
function css(cb) {
    gulp.src("web/styles/main.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({
            browserlist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("web/styles"))
        // Stream changes to all browsers
        .pipe(browserSync.stream());
    cb();
}

// function cssSourceMap(cb) {
//     gulp.src("web/styles/scss/**/*.scss")
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(sourcemaps.write("/"))
//         .pipe(gulp.dest("web/styles"));
//     cb();
// }

// Watch Files
function watch_files() {
    browserSync.init({
        proxy: "http://localhost:8888/"
    });
    gulp.watch("web/styles/main.scss", css);
    gulp.watch("templates/**/*.twig").on("change", browserSync.reload);
}

// Default 'gulp' command with start local server and watch files for changes.
exports.default = series(css, watch_files);
// exports.default = series(watch_files);



