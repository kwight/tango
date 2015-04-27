/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * 
 */
module.exports = {
	postClasses: function() {
		return this.props.post.post_class.join([separator = ' ']);
	}
};
