"use strict";
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');
var stringify = require('stringify');
var plugins = require('gulp-load-plugins')();
var minifyCSS = require('gulp-minify-css');

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var gutil = require('gulp-util');
var path = require("path")
var jshint = require('gulp-jshint')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.js');
var compiler = webpack(config);

var paths = {
	watch: ["./src/*,", "./src/**/*", "./demo/*"],
	jshint: ["src/*.js,", "src/**/*.js"]
}

gulp.task('webpack', function(done){
	compiler.run(onBuild(done));
});

function onBuild(done) {
    return function(err, stats) {
		
		if (err) {
		   
			gutil.log('Error', err);
			
			if (done) {
                done();
			}
			
        } else {
            Object.keys(stats.compilation.assets).forEach(function(key) {
                gutil.log('Webpack: output ', gutil.colors.green(key));
            });
			
			gutil.log('Webpack: ', gutil.colors.blue('finished ', stats.compilation.name));
			
			if (done) {
                done();
            }
        }
    }
}





gulp.task('jshint', function() {
    return gulp.src(paths.jshint)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});







var babelPlugins = [
	require('babel-plugin-transform-es2015-modules-commonjs'),
]

var demoServiceOptions = assign({}, watchify.args,{
	entries: ['./demo/index.js']
});

var demoService = watchify(browserify(demoServiceOptions)
	.transform(stringify, { minify: true })
	.transform(require('babelify'), {
		presets: [require('babel-preset-env')],
		plugins: babelPlugins
	})
);

gulp.task('demoService', bundleDemoService);
demoService.on('update', bundleDemoService);
demoService.on('log', plugins.util.log);

function bundleDemoService() {
	return demoService.bundle()
		.on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
		.pipe(source('demo.js'))
		.pipe(buffer())
		.pipe(plugins.uglifyEs.default())
		.pipe(gulp.dest('./docs'))
		.on('end', function () { plugins.util.log('Done!'); });
}





gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "./docs/"
		},
		https: true,
		port: 3004
	});
});

const docs = [
	"./demo/*.html",
	"./demo/*.css",
	"./demo/prism.js",
	"./dist/*"
]

gulp.task('moveDocs', function () {
	return gulp.src(docs).pipe(gulp.dest('./docs'))
});

gulp.task("dev", ["webpack", "server", "jshint", "moveDocs", "demoService"], function() {
	gulp.watch(paths.watch, ["webpack", "jshint", "moveDocs", "demoService"]);
});

gulp.task("default", [
	"dev"
], function () { });