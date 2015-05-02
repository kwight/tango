Tango
===

Tango is an experimental WordPress theme that uses the [React UI library](https://facebook.github.io/react/) in conjunction with standard [Underscores](http://underscores.me) template files. The goal is to develop a method for adding the magic of JavaScript-based UIs to existing WordPress themes, built in PHP.

Requires the [WP API Theming](https://github.com/kwight/wp-api-theming) plugin.

## Installation

1. Install and activate the [WP REST API](https://github.com/WP-API/WP-API) plugin . Leave it on the `develop` branch.
2. Install and activate the [WP API Theming](https://github.com/kwight/wp-api-theming) plugin.
3. Clone the Tango repo into your `wp-content/themes/` folder: `git clone git@github.com:kwight/tango.git`
4. `cd` into your new Tango theme, and run `npm install`.
5. Run `npm run build` to create `style.css` and `js/public.js`. See Issues below if you get `EMFILE` errors.
6. Activate Tango from `Appearance > Themes`.

## Configuration

Tango requires some basic information to be able to properly connect to the API, and generate accurate links. These are set in `js/config.js`.

* `api`: the API's index, eg. `http://localhost/wp-json` (required)
* `serverRoot`: the root folder of your web server, eg. `http://localhost` (required)
* `subdir`: if your WordPress install is in a subfolder of your web server, enter the relative path here, eg. `/trunk/src`
* `localStorage`: whether or not to use [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for API results (note: there is currently no handling for stale results)

## Development

Run `npm run watch` instead of `npm run build` while developing, to have files recompile automatically upon save.

## Issues

Make sure you have compiled `style.css` and `js/public.js` (with `npm run build` or `npm run watch`) before activating Tango; otherwise, you'll get an error because of the missing required stylesheet.

On OS X, there is a [known issue](https://github.com/substack/node-browserify/issues/431) with low limits of open files, which can cause `Error: EMFILE` errors with Browserify (used by `npm run build`).

Some users report changing system settings with `sudo ulimit -n 2560` can solve it. If it does not, or you prefer not to change a system setting in that way, you can run `npm run watch` instead to generate `js/public.js` (but it will not be minified).
