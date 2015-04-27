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
	entryMeta = require( './shared/entry-meta.jsx' );

/**
 * 
 */
module.exports = React.createClass( {
	mixins: [ postClasses, entryMeta ],
	render: function() {
		return (
			<article id={ 'post-' + this.props.post.id } className={ this.postClasses() }>
				<header className="entry-header">
					<h1 className="entry-title">
						<a href={ this.props.post.link } rel="bookmark" dangerouslySetInnerHTML={ { __html: this.props.post.title.rendered } } />
					</h1>

					<div className="entry-meta" dangerouslySetInnerHTML={ { __html: this.entryMeta() } } />
				</header>

				<div className="entry-content" dangerouslySetInnerHTML={ { __html: this.props.post.content.rendered } } />

				<footer className="entry-footer"  dangerouslySetInnerHTML={ { __html: this.entryFooter() } } />
			</article>
		);
	}
} );
