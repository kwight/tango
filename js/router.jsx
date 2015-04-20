/**
 * External dependencies
 */
var page = require( 'page' );

/**
 * Internal dependencies
 */
var config = require( './config.js' );

var Router = function() {
	if ( config.subdir ) {
		page.base( config.subdir );
	}

	page( '/', function() {
		var endpoint = config.api + '/wp/posts';
		React.render(<Master endpoint={ endpoint } />, document.getElementById( 'content' ) );
	} );

	page( '/:slug', function( context ) {
		console.log(context);
		var endpoint = config.api + '/wp/comments'
		React.render(<Master endpoint={ endpoint } />, document.getElementById( 'content' ) );
	} );

	page( '*', function() {
		console.log('catchall');
	} );

	page();
}

module.exports = Router;
