/**
 * External dependencies
 */
var React = require( 'react' ),
	request = require( 'superagent' );

/**
 * Internal dependencies
 */
var Index = require( './index.jsx' ),
	Sidebar = require( './sidebar.jsx' );


Master = React.createClass({
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

module.exports = Master;
