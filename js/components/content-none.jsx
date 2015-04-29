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
		return (
			<section className="no-results not-found">
				<header className="page-header">
					<h1 className="page-title" dangerouslySetInnerHTML={ { __html: 'Nothing Found' } } />
				</header>

				<div className="page-content" dangerouslySetInnerHTML={ { __html: 'It seems we can&rsquo;t find what you&rsquo;re looking for.' } } />
			</section>
		);
	}
} );
