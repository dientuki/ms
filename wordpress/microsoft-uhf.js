/**
 * Scripting to initialize Microsoft UHF.
 *
 * @package Microsoft-UHF
 */

/* Microsoft UHF requires that jQuery be available via the `$` shortcut. */
if ( 'undefined' === typeof $ && jQuery ) {
	$ = jQuery;
}

(function ($) {
	'use strict';

	/**
	 * Attempt to determine the ID of the current menu item based on its URL.
	 *
	 * @return string
	 */
	var getCurrentMenuItemId = function () {
		var pathname = window.location.pathname,
		    links    = $( '.shell-category-header a[href*="' + pathname + '"]' ),
		    linkId   = '';

		if ( isHomepage() ) {
			linkId = 'shell-cat-header-logo';

		} else if ( 0 < links.length ) {
			linkId = links.last().attr( 'id' );
		}

		// Remove the "-mobile" suffix, as Compass will handle this automatically.
		if ( linkId && '-mobile' === linkId.substr( -7 ) ) {
			linkId = linkId.substr( 0, linkId.length - 7 );
		}

		return linkId;
	},

	/**
	 * Determine if we're currently on the homepage.
	 *
	 * @return bool
	 */
	isHomepage = function () {
		var pathname = trimSlashes( window.location.pathname ),
		    homeLink = $( document.getElementById( 'shell-cat-header-logo' ) );

		if ( 0 === homeLink.length || 'undefined' === homeLink[0] ) {
			return false;
		}

		return trimSlashes( homeLink[0].pathname ) === pathname;
	},

	// Callback to initialize UHF.
	loadShell = function () {
		var settings = {
			currentMenuItemId: getCurrentMenuItemId()
		}

		if ( microsoftUhfSettings.loginUrl || microsoftUhfSettings.logoutUrl ) {
			settings.meControlOptions = {
				rpData: {
					msaInfo: {
						signInUrl: microsoftUhfSettings.loginUrl,
						signOutUrl: microsoftUhfSettings.logoutUrl
					}
				}
			};
		}

		window.onShellReadyToLoad = null;
		window.msCommonShell.load( settings );
	},

	/**
	 * Trim slashes from the beginning and end of a string.
	 *
	 * @param string str The string to remove leading and trailing slashes from.
	 * @return string The value of str minus leading/trailing slashes.
	 */
	trimSlashes = function ( str ) {
		if ( '/' === str.substr( 0, 1 ) ) {
			str = str.substr( 1 );
		}

		if ( '/' === str.substr( -1, 1 ) ) {
			str = str.substr( 0, str.length - 1 );
		}

		return str;
	};

	if ( window.msCommonShell ) {
		loadShell();
	} else {
		window.onShellReadyToLoad = loadShell;
	}

})(jQuery, undefined);
