/**
 * External dependencies
 */
var React = require( 'react' ),
	sprintf = require( 'sprintf-js' ).sprintf;

/**
 * Internal dependencies
 */
var config = require( '../config.js' );

/**
 * 
 */
module.exports = React.createClass( {
	entryMeta: function() {
		var time = sprintf( '<time class="entry-date published updated" datetime="%1$s">%2$s</time>',
			this.props.post.date,
			this.date()
		);
		var author = sprintf( '<span class="author vcard"><a class="url fn n" href="%1$s">%2$s</a></span>',
			this.props.post.author.link,
			this.props.post.author.name
		);

		return sprintf( 'Posted on <span class="posted-on">%1$s</span> by <span class="byline">%2$s</span>', 
			time,
			author
		);
	},
	date: function() {
		var date = new Date( this.props.post.date );
		return date.toDateString();
	},
	catLinks: function() {
		if ( ! this.props.post.categories ) {
			return false;
		}

		var catLinks = [];

		this.props.post.categories.map( function( category ) {
			catLinks.push( '<a href="' + category.link + '" rel="category tag">' + category.name + '</a>' );
		});

		return sprintf( '<span class="cat-links">Posted in %s</span>',
			catLinks.join([separator = ', '])
		);
	},
	tagLinks: function() {
		if ( ! this.props.post.tags ) {
			return false;
		}

		var tagLinks = [];

		this.props.post.tags.map( function( tag ) {
			tagLinks.push( '<a href="' + tag.link + '" rel="tag">' + tag.name + '</a>' );
		});

		return sprintf( '<span class="cat-links">Tagged %s</span>',
			tagLinks.join([separator = ', '])
		);
	},
	editLink: function() {
		var link = config.serverRoot + config.subdir + '/wp-admin/post.php?post=' + this.props.post.id + '&action=edit';

		return sprintf( '<span class="edit-link"><a href="%s" rel="external">Edit</span>',
			link
		);
	},
	entryFooter: function() {
		return this.catLinks() + this.tagLinks() + this.editLink();
	},
	postClasses: function() {
		return this.props.post.post_class.join([separator = ' ']);
	},
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
