const { src, dest, series, watch } = require('gulp');
let clean = require('gulp-clean')
let gulpScss = require('gulp-sass')
let gulpEjs = require('gulp-ejs')
let gulpRename = require('gulp-rename')
let gulpFilter = require('gulp-filter')
let gulpAutoprefixer = require('gulp-autoprefixer')
let browserSync = require('browser-sync').create()

let srcPath = 'src'
let distPath = 'dist'

function css() {
  return src(`${srcPath}/**/*.scss`)
    .pipe(gulpScss())
    .pipe(gulpAutoprefixer())
    .pipe(dest(`${distPath}`))
}

function css2() {
  return src(`**/*.scss`)
    .pipe(gulpScss())
    .pipe(gulpAutoprefixer())
    .pipe(dest(`.`))
}

function html() {
  return src(`${srcPath}/**/*.ejs`)
    .pipe(gulpFilter(['**', '!*/components/**/*']))
    .pipe(gulpEjs())
    .pipe(gulpRename({ extname: '.html' }))
    .pipe(dest(`${distPath}/`));
}

function js() {
  return src(`${srcPath}/**/*.js`)
    .pipe(dest(`${distPath}/`));
}

function assets() {
  return src(`${srcPath}/assets/**/*`)
    .pipe(dest(`${distPath}/assets/`));
}

function cleanDist() {
  return src(`${distPath}`,{
    allowEmpty: true
  })
  .pipe(clean());
}

exports.default = function() {
  // 静态服务器 + 监听 scss/html 文件
  browserSync.init({
    files: [`${distPath}/**.css`, `${distPath}/**.html` ,`${distPath}/**.js`],
    server: distPath
  });
  series(cleanDist, css, html, js, assets)()
  watch(`${srcPath}/**/*.scss`, series(css))
  watch(`${srcPath}/**/*.js`, series(js))
  watch(`${srcPath}/**/*.ejs`, series(html))
  watch(`${srcPath}/assets/**/*`, series(assets))
}

exports.bs = function(cb) {
  // 静态服务器 + 监听 scss/html 文件
  browserSync.init({
    files: [`**.css`, `**.html` ,`**.js`],
    server: '.'
  });
  series(css2)()
  watch(`**/*.scss`, series(css2))
}

exports.build = series(cleanDist, css, html, js, assets);