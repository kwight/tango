/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */

/**
 * 
 */
module.exports = React.createClass( {
	render: function() {
		var loop = this.props.posts.map( function( post ) {
			return (
				<Content key={ post.id } post={ post } />
			);
		});

		return (
			<nav class="navigation posts-navigation" role="navigation">
				<h2 class="screen-reader-text">Posts navigation</h2>
				<div class="nav-links">

					<?php if ( get_next_posts_link() ) : ?>
					<div class="nav-previous"><?php next_posts_link( __( 'Older posts', '_s' ) ); ?></div>
					<?php endif; ?>

					<?php if ( get_previous_posts_link() ) : ?>
					<div class="nav-next"><?php previous_posts_link( __( 'Newer posts', '_s' ) ); ?></div>
					<?php endif; ?>

				</div>
			</nav>
		);
	}
} );
