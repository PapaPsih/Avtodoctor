<?php

function load_wpmmp() {

	load_wpmmp_classes();

	//Plugin loaded
	do_action( 'wpmmp_loaded' );

}

function wpmmp_when_plugins_loaded() {

	//Register and init the default theme
	new Wpmmp_Default_Theme();

}


function load_wpmmp_classes() {

	wpmmp_include( 'classes/class-wpmmp-settings.php' );
	wpmmp_include( 'classes/class-wpmmp-theme-handler.php' );
	wpmmp_include( 'classes/class-wpmmp-default-theme.php' );

	new Wpmmp_Settings();

	add_action( 'plugins_loaded', 'wpmmp_when_plugins_loaded' );
	
}

function wpmmp_include( $file_name, $require = true ) {

	if ( $require )
		require WPMMP_PLUGIN_INCLUDE_DIRECTORY . $file_name;
	else
		include WPMMP_PLUGIN_INCLUDE_DIRECTORY . $file_name;

}

function wpmmp_view_path( $view_name, $is_php = true ) {

	if ( strpos( $view_name, '.php' ) === FALSE && $is_php )
		return WPMMP_PLUGIN_VIEW_DIRECTORY . $view_name . '.php';

	return WPMMP_PLUGIN_VIEW_DIRECTORY . $view_name;

}

function wpmmp_settings_part( $view_name, $is_php = true ) {

	return wpmmp_view_path( 'admin-settings/' . $view_name, $is_php );

}

function wpmmp_image_url( $image_name ) {

	return plugins_url( 'images/' . $image_name, WPMMP_PLUGIN_MAIN_FILE );

}

function wpmmp_css_url( $name ) {

	return plugins_url( 'css/' . $name, WPMMP_PLUGIN_MAIN_FILE );

}

function wpmmp_get_themes() {

	$themes = array();

	return apply_filters( 'wpmmp_themes' , $themes );

}

function wpmmp_get_settings() {

	return Wpmmp_Settings::get_settings();

}

function wpmmp_get_single_setting( $key ) {

	$settings = wpmmp_get_settings();

	if ( ! isset( $settings[$key] ) )
		return apply_filters( 'wpmmp_get_single_setting', NULL );

	return apply_filters( 'wpmmp_get_single_setting', $settings[$key] ); 

}

function wpmmp_get_active_theme() {

	$theme = wpmmp_get_single_setting( 'theme' );

	return apply_filters( 'wpmmp_get_active_theme', $theme );

}