/**
 * External dependencies
 */
var React = require( 'react' ),
	request = require( 'superagent' );

/**
 * Internal dependencies
 */
var Index = require( './components/index.jsx' ),
	Sidebar = require( './components/sidebar.jsx' ),
	config = require( './config.js' );

var Master = React.createClass({
	getInitialState: function() {
		return {
			posts: []
		};
	},
	componentDidMount: function() {
		endpoint = config.endpoint + '/posts/';

		request
			.get( endpoint )
			.end( function( err, res ){
				if ( res.ok ) {
					this.setState({
						posts: res.body
					});
				} else {
					console.log(res.text);
				}
			}.bind( this ) );
	},
	render: function() {
		return (
			<div>
				<Index posts = { this.state.posts } />
				<Sidebar />
			</div>
		)
	}
});

React.render(<Master />, document.getElementById( 'content' ) );
