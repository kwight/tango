/**
 * External dependencies
 */
var React = require( 'react' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
var config = require( './config.js' ),
	Master = require( './components/master.jsx' );

var Router = {
	init: function() {
		if ( config.subdir ) {
			page.base( config.subdir );
		}

		page( '/', this.index, this.render );
		page( /^\/\d{4}\/\d{2}\/\d{2}\/([a-z0-9-]+)\/$/, this.post, this.render );
		page( /^[a-z0-9-\/]+\/([a-z0-9-]+)\/$/, this.page, this.render );
		page( /^\/([a-z0-9-]+)\/$/, this.page, this.render );
		page( '*', this.notfound, this.render );

		page( { dispatch: false } );
	},
	index: function( context, next ) {
		context.params.endpoint = config.api + '/wp/posts';
		next();
	},
	post: function( context, next ) {
		context.params.endpoint = config.api + '/wp/posts?name=' + context.params[0];
		next();
	},
	page: function( context, next ) {
		context.params.endpoint = config.api + '/wp/pages?name=' + context.params[0];
		next();
	},
	notfound: function() {
		console.log('notfound');
	},
	render: function( context, next ) {
		React.unmountComponentAtNode( document.getElementById( 'content' ) );
		React.render( <Master endpoint={ context.params.endpoint } />, document.getElementById( 'content' ) );
	}
}

module.exports = Router;
