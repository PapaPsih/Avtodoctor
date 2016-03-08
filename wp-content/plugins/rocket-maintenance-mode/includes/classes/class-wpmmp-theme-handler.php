<?php

class Wpmmp_Theme_Handler {

	protected $name;

	protected $description;

	protected $id;

	protected $path;

	protected $template_name;

	protected $settings_page;

	protected $settings_page_title;

	protected $settings_page_slug;

	function __construct() {

		$this->_hooks();

		$this->_filters();

		$this->hooks();

		$this->filters();

		$this->init();

	}

	function init() {


	}

	function hooks() {



	}

	function filters() {


	}

	private function _filters() {

		add_filter( 'wpmmp_themes', array( $this, 'register_theme' ) );

		add_filter( 'wpmmp_settings_get_tab', array( $this, 'settings_get_tab' ) );

		add_filter( 'wpmmp_settings', array( $this, 'filter_settings' ) );

		if ( $this->is_activated() && $this->check_rules() )
				$this->theme_change();


		if ( $this->settings_page )
			add_filter( 'wpmmp_settings_tabs', array( $this, 'add_settings_tab' ) );
	}

	private function _hooks() {

		if ( $this->is_activated() )
			add_action( 'wpmmp_current_theme_settings', array( $this, 'theme_settings' ) );

		add_action( 'wpmmp_save_settings', array( $this, 'save_settings' ) );
 
	}

	public function name( $name = '' ) {

		if (  empty( $name ) )
			return $this->name;

		$this->name = $name;

	}

	public function description( $description = '' ) {

		if (  empty( $description ) )
			return $this->description;

		$this->description = $description;

	}

	public function id( $id = '' ) {

		if (  empty( $id ) )
			return $this->id;

		$this->id = $id;

	}

	function register_theme( $themes ) {

		if ( isset( $themes[$this->id] ) )
			return $themes;

		$themes[$this->id] = $this;

		return $themes;

	}

	public function is_activated( $theme_id = '' ) {

		if ( empty( $id ) )
			$id = $this->id();

		$theme = wpmmp_get_active_theme();

		if ( $id === 'default' ) {

			if ( strpos( $theme, 'default' ) !== false )
				return true;

		}

		return $theme == $id;

	}

	public function check_rules( $theme_id = '' ) {
		
		if ( empty( $id ) )
			$id = $this->id();

		$settings = wpmmp_get_settings();

		if ( $settings['status'] !== 'enabled' )
			return apply_filters( 'wpmmp_check_rules', FALSE, 'disabled' );

		return apply_filters( 'wpmmp_check_rules', TRUE, 'success' );

	}

	function theme_change() {

		if ( is_admin() || current_user_can( 'manage_options' ) 
			&& ! defined( 'WPMMP_DEBUG_MODE' ) )
			return FALSE;

		add_action( 'template_redirect', array( $this, 'template_hook' ) );

	}

	function theme_settings() {

		/* The message will be shown on the theme settings page if the theme do not support theme settings feature */

		_e( 'The current selected/activated mobile theme do not have any settings or the theme might not have support for this feature.', 'wpmmp' );

	}

	function template_hook() {

		$settings = wpmmp_get_settings();

		$theme_settings = $this->get_settings();

		if ( $settings['feed'] == 'enabled' )
			$this->disable_feed();

		if ( file_exists( $this->path ) ) {

			if ( $settings['http_503_header'] == 'enabled' ) {

				header('HTTP/1.1 503 Service Temporarily Unavailable');
				header('Status: 503 Service Temporarily Unavailable');
				header('Retry-After: 3600');

			}

			if ( ! isset($settings['countdown_time']) )
				$settings['countdown_time'] = '';

			list( $cd_date, $cd_hr_min ) = explode( 'T', $settings['countdown_time'] );

			$cd_date = str_replace( '-' , '/', $cd_date);

			include( $this->path );

			exit();

		}

	}

	function disable_feed() {

		add_action('do_feed', array( $this, 'disable_feed_message' ), 1);
		add_action('do_feed_rdf', array( $this, 'disable_feed_message' ), 1);
		add_action('do_feed_rss', array( $this, 'disable_feed_message' ), 1);
		add_action('do_feed_rss2', array( $this, 'disable_feed_message' ), 1);
		add_action('do_feed_atom', array( $this, 'disable_feed_message' ), 1);
		add_action('do_feed_rss2_comments', array( $this, 'disable_feed_message' ), 1);
		add_action('do_feed_atom_comments', array( $this, 'disable_feed_message' ), 1);

	}

	function disable_feed_message() {

		wp_die( __('No feed available,please visit our <a href="'. get_bloginfo('url') .'">homepage</a>!') );

	}
	
	function add_settings_tab( $tabs ) {

		$slug = $this->settings_page_slug;

		$title = $this->settings_page_title;

		$tabs[$slug] = $title;
		
		return $tabs;
	}

	function settings_get_tab( $tab ) {

		if ( ! isset( $_GET['tab'] ) )
			return $tab;

		if ( $this->settings_page && $_GET['tab'] == $this->settings_page_slug ) {
			return dirname( $this->path ) . '/settings-page-view.php';
		}

		return $tab;
	}

	function save_settings($tab){}
	function get_settings() { return array(); }

	function filter_settings( $settings ) {

		$settings[$this->id] = $this->get_settings();

		return $settings;

	}

}