/**
 * External dependencies
 */
var React = require( 'react' ),
	page = require( 'page' ),
	request = require( 'superagent' );

/**
 * Internal dependencies
 */
var Index = require( './components/index.jsx' ),
	Sidebar = require( './components/sidebar.jsx' ),
	config = require( './config.js' ),
	router = require( './routes.js' );

router();


var Master = React.createClass({
	getInitialState: function() {
		return {
			posts: []
		};
	},
	componentDidMount: function() {
		request
			.get( this.props.endpoint )
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
