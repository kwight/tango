/**
 * External dependencies
 */
var sprintf = require( 'sprintf-js' ).sprintf;

/**
 * Internal dependencies
 */
var config = require( '../../config.js' );

/**
 * 
 */
module.exports = {
	editLink: function() {
		var link = config.serverRoot + config.subdir + '/wp-admin/post.php?post=' + this.props.post.id + '&action=edit';

		return sprintf( '<span class="edit-link"><a href="%s" rel="external">Edit</span>',
			link
		);
	}
};
