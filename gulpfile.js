/**
 * Created by zhangruofan on 2015/12/23.
 */
var gulp = require('gulp'),
    fs = require('fs'),
    del = require('del'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    jshint = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    concat = require('gulp-concat'),
    webpackConfig = require('./webpack.config.js')
;
const scriptPath="./public/dist/js/";

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('default', ['lint']);

gulp.task('webpack:all', function () {
    getFolders(scriptPath).map(function(folder){
        if(folder==='lib') return;
        del([path.join(scriptPath,folder,'*.wp.js')]).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
        gulp.src(path.join(scriptPath,folder,'/entry.js'))
            .pipe(webpack(webpackConfig))
            .pipe(uglify())
            .pipe(gulp.dest(path.join(scriptPath,folder)));
    });
});

gulp.task('webpack:js',function(){
    del(['./public/dist/js/register/*.wp.js']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
    gulp.src('./public/dist/js/register/register.js')
    .pipe(webpack(webpackConfig))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist/js/register'));
});

gulp.task('css',function(){
   gulp.src('./public/dist/css/login/login.css')
    .pipe(minifycss()).pipe(rename('login.min.css'))
       .pipe(gulp.dest('./public/dist/css/login/'))
});

gulp.task('lint', function () {
    gulp.src('./public/dist/js/register/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean:js', function () {
    del(['./public/dist/js/*.js']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('clean:css', function () {
    del(['./public/dist/css/*.css']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('scripts', function () {
    gulp.src('./public/dist/js/lib/cookie.js')
        .pipe(uglify())
        .pipe(rename("cookie.min.js"))
        .pipe(gulp.dest('./public/dist/js/lib/'));
});