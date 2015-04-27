/**
 * External dependencies
 */
var React = require( 'react' ),
	request = require( 'superagent' );

/**
 * Internal dependencies
 */
var getPosts = require( './shared/get-posts.jsx' ),
	ContentPage = require( './content-page.jsx' ),
	Sidebar = require( './sidebar.jsx' );

/**
 * 
 */
module.exports = React.createClass( {
	mixins: [getPosts],
	getInitialState: function() {
		return {
			posts: []
		};
	},
	render: function() {
		var loop = this.state.posts.map( function( post ) {
			return (
				<ContentPage key={ post.id } post={ post } />
			);
		});

		return (
			<div>
				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						{ loop }
					</main>
				</div>
				<Sidebar />
			</div>
		);
	}
} );
