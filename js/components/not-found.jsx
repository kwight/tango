/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var ContentNotFound = require( './content-none.jsx' ),
	Sidebar = require( './sidebar.jsx' );

/**
 * 
 */
module.exports = React.createClass( {
	render: function() {
		return (
			<div>
				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						<ContentNotFound />
					</main>
				</div>
				<Sidebar />
			</div>
		);
	}
} );
