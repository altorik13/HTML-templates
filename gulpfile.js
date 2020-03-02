'use strict'

const gulp = require('gulp');
//utility
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
//css
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
//js
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
//html
var fileinclude = require('gulp-file-include');
//assets
var imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
function clean() {
    return del(['build/*']);
}

//files
var other_cssFiles = [
    './node_modules/normalize.css/normalize.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    //font-awesome 4.7
    './src/styles/_css/*.css'
];
var cssFiles = [
    './src/styles/**/*.scss'
];
var jsFiles = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './src/js/slick.min.js',
    //
    './src/js/scripts.js'
];


function stylesCss() {
    return gulp.src(other_cssFiles)
        .pipe(concat('asset-styles.css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}
function styles() {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            browsers: ['> 1%']
        }))
        .pipe(cleanCSS({
            level: 2
            // compatibility: 'ie9'
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

function templates() {
    return gulp.src('./src/**/*.html')
        .pipe(fileinclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream());
}

function img() {
    return gulp.src('./src/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img/'));
}

function fonts() {
    return gulp.src('./src/fonts/**')
        .pipe(gulp.dest('./build/fonts/'));
}


function watch() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
        // tunnel: true
    });

    gulp.watch('./src/styles/**/*.scss', styles);
    // gulp.watch('./src/styles/**/*.scss', stylesCss);
    gulp.watch('./src/styles/**/*.css', stylesCss);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./src/**/*.html', templates);
}

gulp.task('clear', clean);
// gulp.task('styles', styles);
// gulp.task('scripts', scripts);
// gulp.task('templates', templates);
gulp.task('watch', watch);

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(styles, stylesCss, scripts, templates, img, fonts)
));

gulp.task('dev', gulp.series(
    gulp.parallel(styles, stylesCss, scripts, templates),
    watch,
    gulp.parallel(img, fonts)
));




//postCSS:
    // .pipe(postcss(plugins))





// var postcss = require('gulp-postcss');
// var autoprefixer = require('autoprefixer');
// var cssnano = require('cssnano');

// var plugins = [
//     autoprefixer({browsers: ['> 1%']}),
//     cssnano()
// ];
