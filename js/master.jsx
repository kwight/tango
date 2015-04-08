var React = require( 'react' );
var test = require( './components/test.jsx' );

var Client = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Master component</h1>
				<Test />
			</div>
		)
	}
});

React.render(<Client />, document.getElementById( 'post-1241' ) );