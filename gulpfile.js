var gulp = require( 'gulp' ),
	uglify = require( 'gulp-uglify' ),
	sass = require( 'gulp-sass' ),
	sourcemaps = require('gulp-sourcemaps');

gulp.task( 'js', function() {
	gulp.src( 'js/components/master.js' )
		.pipe( uglify() )
		.pipe( gulp.dest( 'js/' ) );
});

gulp.task( 'css', function() {
	gulp.src( 'sass/style.scss' )
	.pipe( sourcemaps.init() )
	.pipe( sass() )
	.pipe( sourcemaps.write() )
	.pipe( gulp.dest( './' ) );
});

gulp.task( 'default', [ 'js', 'css' ] );