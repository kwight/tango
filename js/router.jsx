/**
 * External dependencies
 */
var React = require( 'react' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
var config = require( './config.js' ),
	Index = require( './components/index.jsx'),
	Archive = require( './components/archive.jsx'),
	Single = require( './components/single.jsx'),
	Page = require( './components/page.jsx'),
	NotFound = require( './components/not-found.jsx');

Router = React.createClass({
	getInitialState: function() {
		return {
			template: <div />
		};
	},
	componentDidMount: function() {
		if ( config.subdir ) {
			page.base( config.subdir );
		}

		page( '/', this.index );
		page( /^\/\d{4}\/\d{2}\/\d{2}\/([a-z0-9-]+)\/$/, this.post );
		page( /^\/author\/([a-z0-9-]+)\/?$/, this.author );
		page( /^\/category\/([a-z0-9-]+)\/?$/, this.category );
		page( /^\/tag\/([a-z0-9-]+)\/?$/, this.tag );
		page( /^[a-z0-9-\/]+\/([a-z0-9-]+)\/$/, this.page );
		page( /^\/([a-z0-9-]+)\/$/, this.page );
		page( '*', this.notfound );

		page();
	},
	index: function( context, next ) {
		this.setState({
			template: <Index endpoint={ config.api + '/wp/v2/posts?_embed' } />
		});
	},
	author: function( context, next ) {
		this.setState({
			template: <Archive endpoint={ config.api + '/wp/v2/posts?_embed&filter[author_name]=' + context.params[0] } title={ 'Author: ' + context.params[0] } />
		});
	},
	category: function( context, next ) {
		this.setState({
			template: <Archive endpoint={ config.api + '/wp/v2/posts?_embed&filter[category_name]=' + context.params[0] } title={ 'Category: ' + context.params[0] } />
		});
	},
	tag: function( context, next ) {
		this.setState({
			template: <Archive endpoint={ config.api + '/wp/v2/posts?_embed&filter[tag]=' + context.params[0] } title={ 'Tag: ' + context.params[0] } />
		});
	},
	post: function( context, next ) {
		this.setState({
			template: <Single endpoint={ config.api + '/wp/v2/posts?_embed&filter[name]=' + context.params[0] } />
		});
	},
	page: function( context, next ) {
		this.setState({
			template: <Page endpoint={ config.api + '/wp/v2/pages?_embed&filter[name]=' + context.params[0] } />
		});
	},
	notfound: function() {
		this.setState({
			template: <NotFound />
		});
	},
	render: function() {
		return this.state.template;
	}
});

React.render( <Router />, document.getElementById( 'content' ) );
