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
	getInitialState: function() {
		return {
			posts: []
		};
	},
	componentWillReceiveProps: function( newProps ) {
		if ( newProps.endpoint !== this.props.endpoint ) {
			this.getPosts( newProps.endpoint );
		}
	},
	componentDidMount: function() {
		this.getPosts( this.props.endpoint );
	},
	getPosts: function( endpoint ) {
		// Ignore caching if disabled in the config.
		if ( ! config.localStorage ) {
			this.makeRequest( endpoint );
			return;
		}

		// Use cached results in localStorage if we have them.
		var postsCache = this.getLocalStorage( endpoint );
		if ( postsCache ) {
			this.setState({
				posts: postsCache
			});
		}

		// No localStorage, so make an API request.
		else {
			this.makeRequest( endpoint );
		}
	},
	makeRequest: function( endpoint ) {
		request
			.get( endpoint )
			.end( function( err, res ){
				if ( res.ok ) {
					// We have posts, so update our state.
					this.setState({
						posts: res.body
					});

					if ( config.localStorage ) {
						// Save results in localStorage for next time.
						this.setLocalStorage( endpoint, res.body );
					}
				} else {
					console.log(res.text);
				}
			}.bind( this ) );
	},
	getLocalStorage: function( endpoint ) {
		return JSON.parse( localStorage.getItem( endpoint ) );
	},
	setLocalStorage: function( endpoint, data ) {
		localStorage.setItem( endpoint, JSON.stringify( data ) );
	}
};
