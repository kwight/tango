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
		page( '/:slug', this.slug, this.render );
		page( '*', this.notfound, this.render );

		page( { dispatch: false } );
	},
	index: function( context, next ) {
		context.params.endpoint = config.api + '/wp/posts';
		next();
	},
	slug: function( context, next ) {console.log(context);console.log(next);
		context.params.endpoint = config.api + '/wp/posts?name=' + context.params.slug;
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
