const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const inlineSource = require('gulp-inline-source');
const htmlmin = require('gulp-htmlmin');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const path = require('path');
const fs = require('fs');

function compileSass() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp/css'));
}

function compileTs() {
    return gulp.src('src/ts/**/*.ts')
        .pipe(ts({ target: 'ES2020', module: 'ESNext', strict: true }))
        .pipe(gulp.dest('.tmp/js'));
}

function copyFavicon() {
    return gulp.src('../public/favicon.*', { allowEmpty: true })
        .pipe(gulp.dest('../dist'));
}

function buildHtml() {
    let faviconFile = 'favicon.ico';
    try {
        const distFiles = fs.readdirSync('../dist');
        const favs = distFiles.filter(f => /^favicon\..+$/.test(f));
        if (favs.length > 0) {
            const ico = favs.find(f => f.endsWith('.ico'));
            faviconFile = ico || favs[0];
        }
    } catch (_) {}

    return gulp.src('src/index.html')
        .pipe(replace('{{favicon}}', faviconFile))
        .pipe(inlineSource({
            rootpath: path.resolve('.tmp'),
            compress: false,
            attribute: 'inline',
            pretty: true,
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
        }))
        .pipe(rename('404.html'))
        .pipe(gulp.dest('../dist'));
}

function cleanTemp() {
    return gulp.src('.tmp', { read: false, allowEmpty: true })
        .pipe(clean());
}

const build = gulp.series(
    gulp.parallel(compileSass, compileTs, copyFavicon),
    buildHtml,
    cleanTemp
);

gulp.task('default', build);

function watch() {
    gulp.watch('src/scss/**/*.scss', compileSass);
    gulp.watch('src/ts/**/*.ts', compileTs);
    gulp.watch('src/index.html', buildHtml);
    gulp.watch('../public/favicon.*', copyFavicon);
}
gulp.task('watch', gulp.series(build, watch));