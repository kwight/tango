/**
 * External dependencies
 */
var sprintf = sprintf = require( 'sprintf-js' ).sprintf;

/**
 * Internal dependencies
 */
var editLink = require( './edit-link.jsx' );

/**
 * 
 */
module.exports = {
	mixins: [ editLink ],
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
	entryFooter: function() {
		var html = '';

		if ( this.catLinks() ) {
			html += this.catLinks();
		}
		if ( this.tagLinks() ) {
			html += this.tagLinks();
		}
		html += this.editLink();

		return html;
	}
};
