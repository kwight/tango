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

module.exports = {
	init: function() {
		if ( config.subdir ) {
			page.base( config.subdir );
		}

		page( '/', this.index, this.render );
		page( /^\/\d{4}\/\d{2}\/\d{2}\/([a-z0-9-]+)\/$/, this.post, this.render );
		page( /^\/author\/([a-z0-9-]+)\/?$/, this.author, this.render );
		page( /^\/category\/([a-z0-9-]+)\/?$/, this.category, this.render );
		page( /^\/tag\/([a-z0-9-]+)\/?$/, this.tag, this.render );
		page( /^[a-z0-9-\/]+\/([a-z0-9-]+)\/$/, this.page, this.render );
		page( /^\/([a-z0-9-]+)\/$/, this.page, this.render );
		page( '*', this.notfound, this.render );

		page( { dispatch: false } );
	},
	index: function( context, next ) {
		context.params.endpoint = config.api + '/wp/posts';
		next();
	},
	author: function( context, next ) {
		context.params.endpoint = config.api + '/wp/posts?author_name=' + context.params[0];
		next();
	},
	category: function( context, next ) {
		context.params.endpoint = config.api + '/wp/posts?category_name=' + context.params[0];
		next();
	},
	tag: function( context, next ) {
		context.params.endpoint = config.api + '/wp/posts?tag=' + context.params[0];
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
