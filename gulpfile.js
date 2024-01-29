'use strict'

const { readFileSync } = require('node:fs')
const { basename, resolve } = require('node:path')
const { parse } = require('json5')
const { src, dest, parallel, series, task, watch, symlink, lastRun } = require('gulp')
const browserSync = require('browser-sync')
const del = require('delete')
const $ = require('gulp-load-plugins')({
  postRequireTransforms: {
    sass: sass => sass(require('sass')),
  },
})

// https://www.npmjs.com/package/gulp-theo
// const theo = require('gulp-theo')

// // Transform design/props.yml to dist/props.scss:
// gulp.task('tokens:scss', () =>
//   gulp.src('design/props.yml')
//     .pipe(theo({
//       transform: { type: 'web' },
//       format: { type: 'scss' }
//     }))
//     .pipe(gulp.dest('dist'))
// )

const getSharedData = () => parse(readFileSync('./src/views/data/shared.json', 'utf8'))

function getData(file) {
  const dataPath = resolve(`./src/views/data/${basename(file.path, '.html')}.json`)
  let data = { shared: getSharedData() }

  try {
    data = Object.assign(data, parse(readFileSync(dataPath, 'utf8')))
  }
  catch (e) {
    console.error('Error reading data file:', e.message)
  }

  return data
}

function assets() {
  return src([
    'node_modules/@salesforce-ux/design-system/assets/**/*.{woff,woff2,txt,jpg,png,gif,svg}',
    'src/assets/**/*.{woff,woff2,txt,jpg,jpeg,png,gif,svg}',
  ], { since: lastRun(assets) })
    .pipe(dest('dist/assets'))
}

function clean() {
  return del(['dist'], { dot: true })
}

function copy() {
  return src('input/*.js')
    .pipe(dest('dist'))
}

function favicon() {
  return src(['src/favicon*.*'], { base: 'src' })
    .pipe(dest('dist'))
}

function link() {
  return src('input/*.js')
    .pipe(symlink('dist/'))
}

function scripts() {
  return src(['src/scripts/**/*.js'], { base: 'src' })
    .pipe(dest('dist/'))
}

function styles() {
  return src('src/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({ precision: 10 }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ remove: false }))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream({ match: '**/*.css' }))
}

function views() {
  return src([
    'src/views/**/*.njk',
    'src/views/**/*.html',
    '!src/views/**/_*.njk',
    '!src/views/**/_*.html',
  ], { base: 'src/views' })
    .pipe($.data(getData))
    .pipe($.nunjucks.compile())
    .pipe(dest('dist'))
}

function watchFiles() {
  browserSync({
    open: false,
    notify: false,
    server: 'dist',
    port: 8587,
    ui: {
      port: 8586,
    },
  })

  watch('src/styles/**/*.scss', styles)
  watch(['src/views/**/*.html', 'src/views/data/*.json'], views)
  watch('src/assets/**/*.{woff,woff2,txt,jpg,png,gif,svg}', assets)
  watch('src/scripts/**/*.js', scripts)
  watch([
    'dist/**/*.html',
    'dist/scripts/**/*.js',
    'dist/assets/*.{woff,woff2,txt,jpg,png,gif,svg}',
    'dist/assets/styles/*.css',
  ]).on('change', browserSync.reload)
}

exports.assets = assets
exports.clean = clean
exports.copy = copy
exports.favicon = favicon
exports.link = link
exports.scripts = scripts
exports.styles = styles
exports.views = views

const build = series(clean, parallel(assets, views, styles, scripts, favicon))
task('build', build)
task('default', series(build, watchFiles))
