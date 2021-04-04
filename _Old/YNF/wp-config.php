<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'YNF' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

if ( !defined('WP_CLI') ) {
    define( 'WP_SITEURL', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] );
    define( 'WP_HOME',    $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] );
}



/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Zc6i7XVUMQVTG9aRwJkjKREhWMqXeUPBObZWpIA4t0pca2Kkx0ieuXgatbEWQiRC' );
define( 'SECURE_AUTH_KEY',  '3M5Ci9FNnvaOHnLk5dpQkxq6OL8aeyilikN35XEuSGgagaODuTIIhl9cYNo0mH6L' );
define( 'LOGGED_IN_KEY',    'd8uYkbNMuNp49uPj1jZ1OLIW1VWbww4NdUSFESkyccx9GTlzcSYTxzIkCjNfFQtk' );
define( 'NONCE_KEY',        'qigoLTMZEK3TmO9WoP8yrQBDmdxLgGuXyXbPDKcKw6lGwnKCPGSyI0ZOvfO9DJfw' );
define( 'AUTH_SALT',        'v0ExA1nlA57lugu4YH4Dur8U4X23c3fef5FU3ShrQx4XHNEcI8bjfivSpslRSIuc' );
define( 'SECURE_AUTH_SALT', 'HkqX2HmxK2JaIBNFlcba8x1CqgDDXcGpz8X52K0CapQvxi4gmV6YqSMliomKRAgo' );
define( 'LOGGED_IN_SALT',   '1ZdBElRn5WxNfAN06WZPbfEThXzX5Y8K0CRLcqAavmdLC56GOiV4ly8TUDe1TDcs' );
define( 'NONCE_SALT',       'caY264QzeTaCsU6Ltr8nOlxADfbyO0yVuFaVbislPe1jtyvJs8PHw0omNzfTSvYE' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
