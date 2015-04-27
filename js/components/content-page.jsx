/**
 * External dependencies
 */
var React = require( 'react' ),
	sprintf = require( 'sprintf-js' ).sprintf;

/**
 * Internal dependencies
 */
var config = require( '../config.js' ),
	postClasses = require( './shared/post-classes.jsx' ),
	editLink = require( './shared/edit-link.jsx' );

/**
 * 
 */
module.exports = React.createClass( {
	mixins: [ postClasses, editLink ],
	render: function() {
		return (
			<article id={ 'post-' + this.props.post.id } className={ this.postClasses() }>
				<header className="entry-header">
					<h1 className="entry-title">
						{ this.props.post.title.rendered }
					</h1>
				</header>

				<div className="entry-content" dangerouslySetInnerHTML={ { __html: this.props.post.content.rendered } } />

				<footer className="entry-footer"  dangerouslySetInnerHTML={ { __html: this.editLink() } } />
			</article>
		);
	}
} );
