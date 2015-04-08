var React = require( 'react' );

var Client = React.createClass({
	render: function() {
		return (
			<div>WREN kittens-only</div>
		)
	}
});

React.render(<Client />, document.getElementById( 'post-1241' ) );