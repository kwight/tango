/**
 * External dependencies
 */
var React = require( 'react' ),
	request = require( 'superagent' );

/**
 * Internal dependencies
 */
var config = require( '../../config.js' );

/**
 * 
 */
module.exports = {
	componentWillReceiveProps: function( props ) {
		this.makeRequest( props.endpoint );
	},
	componentDidMount: function() {
		// Ignore caching if disabled in the config.
		if ( ! config.localStorage ) {
			this.makeRequest();
			return;
		}

		// Use cached results in localStorage if we have them.
		var postsCache = JSON.parse( localStorage.getItem( this.props.endpoint ) );
		if ( postsCache ) {
			this.setState({
				posts: postsCache
			});
		}

		// No localStorage, so make an API request.
		else {
			this.makeRequest();
		}
		
	},
	makeRequest: function( endpoint ) {
		var endpoint = ( endpoint ) ? endpoint : this.props.endpoint;
		request
			.get( endpoint )
			.end( function( err, res ){
				if ( res.ok ) {
					// We have posts, so update our state.
					this.setState({
						posts: res.body
					});

					// Save results in localStorage for next time.
					localStorage.setItem( this.props.endpoint, JSON.stringify( res.body ) );
				} else {
					console.log(res.text);
				}
			}.bind( this ) );
	}
};
