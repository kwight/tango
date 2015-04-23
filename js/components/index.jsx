/**
 * External dependencies
 */
var React = require( 'react' ),
	request = require( 'superagent' );

/**
 * Internal dependencies
 */
var Content = require( './content.jsx' );

/**
 * 
 */
Index = React.createClass( {
	render: function() {
		var loop = this.props.posts.map( function( post ) {
			return (
				<Content key={ post.id } post={ post } />
			);
		});

		return (
			<div id="primary" className="content-area">
				<main id="main" className="site-main" role="main">
					{ loop }
				</main>
			</div>
		);
	}
} );

module.exports = Index;