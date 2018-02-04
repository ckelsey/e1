"use strict";
var gulp = require("gulp");
var browserSync = require("browser-sync").create();

var watchify = require("watchify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var assign = require("lodash.assign");
var stringify = require("stringify");
var plugins = require("gulp-load-plugins")();
var minifyCSS = require("gulp-minify-css");
var fs = require("fs");

gulp.task("moveToBuild", moveToBuild)

var buildFiles = [
	"fav.png",
	"index.html",
	"demo-service.js",
	"demo-styles.css",
    "dist/e1.min.css",
	"dist/e1.min.js",
	"dist/e1.min.js.map"
]

function moveToBuild() {
	if (!fs.existsSync("docs")){
		fs.mkdirSync("docs")
	}
	
	gulp.src(buildFiles).pipe(gulp.dest("docs"));
}

/* BROWSER SYNC
* Starts bower server
*/

gulp.task("browser-sync", function () {
	browserSync.init({
		server: {
			baseDir: "./docs"
		},
		https: true
	});
});

var styles = ["src/**/*.css"]
gulp.task("minifyCSS", css);

function css() {
	gulp.src(styles)
		.pipe(minifyCSS())
		.pipe(plugins.concat("e1.min.css"))
		.pipe(gulp.dest("dist"))
}


var babelPlugins = [
	require("babel-plugin-transform-es2015-modules-commonjs"),
]

var bableOptions = assign({}, watchify.args,{
	entries: ["./src/index.js"],
	debug: true
});

var bundle = watchify(browserify(bableOptions)
	.transform(stringify, { minify: true })
	.transform(require("babelify"), {
		presets: [require("babel-preset-env")],
		plugins: babelPlugins
	})
);

gulp.task("bundle", bundleJS);
bundle.on("update", bundleJS);
bundle.on("log", plugins.util.log);

function bundleJS() {
	return bundle.bundle()
		.on("error", plugins.util.log.bind(plugins.util, "Browserify Error"))
		.pipe(source("e1.min.js"))
		.pipe(buffer())
		.pipe(plugins.sourcemaps.init({ loadMaps: true }))
		.pipe(plugins.uglifyEs.default())
		.pipe(plugins.sourcemaps.write("./"))
		.pipe(gulp.dest("./dist"))
		.on("end", function () { plugins.util.log("Done!"); });
}


gulp.task("live", function () {
	gulp.watch(styles, ["minifyCSS"]);
	gulp.watch(buildFiles, ["moveToBuild"]);
});


gulp.task("default", [
	"browser-sync",
	"bundle",
    "minifyCSS",
    "moveToBuild",
	"live"
], function () { });