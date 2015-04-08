// External dependencies.
var gulp = require( 'gulp' ),
	browserify = require( 'browserify' ),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	reactify = require('reactify'),
	sassify = require('sassify'),
	uglify = require( 'gulp-uglify' ),
	sass = require( 'gulp-sass' ),
	sourcemaps = require('gulp-sourcemaps'),
	gutil = require('gulp-util');

// Set up the JavaScript watcher.
var bJS = browserify({
	entries: './js/master.jsx',
	transform: [ reactify ],
	debug: true,
	cache: {},
	packageCache: {}
});
var watchJS = watchify( bJS );

// Set up the Sass watcher.
var bCSS = browserify({
	entries: './sass/style.scss',
	transform: [ sassify ],
	debug: true,
	cache: {},
	packageCache: {}
});
var watchCSS = watchify( bCSS );

// Pay attention.
watchJS.on( 'update', bundleJS );
watchCSS.on( 'update', bundleCSS );
watchJS.on( 'log', gutil.log );
watchCSS.on( 'log', gutil.log );

// Standalone task for bundling JavaScript.
gulp.task( 'js', bundleJS );

// Standalone task for processing Sass.
gulp.task( 'css', bundleCSS );

// Default Gulp task.
gulp.task( 'default', [ 'js', 'css' ] );

/**
 * Compile all React and JavaScript files down to js/public.js.
 */
function bundleJS() {
	return watchJS.bundle()
		.pipe(source( 'public.js' ) )
		.pipe( buffer() )
		.pipe(sourcemaps.init( { loadMaps: true } ) )
		.pipe( uglify() )
		.on( 'error', gutil.log )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( './js/' ) );
}

/**
 * Compile all Sass files down to style.css.
 */
function bundleCSS() {
	return watchCSS.bundle()
		.pipe(source( 'style.css' ) )
		.pipe( buffer() )
		.pipe(sourcemaps.init() )
		.pipe( uglify() )
		.on( 'error', gutil.log )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( './' ) );
}
