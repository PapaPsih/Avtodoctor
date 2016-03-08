<?php

class Wpmmp_Settings {

	function __construct() {

		if ( ! get_option( 'wpmmp_settings' ) ) {

			$settings = $this->default_settings();

			add_option( 'wpmmp_settings', $settings, '', 'yes' );

		}

		if ( ! get_option( 'wpmmp_theme_settings' ) ) {

			add_option( 'wpmmp_theme_settings', array(), '', 'yes' );

		}

		$this->hooks();

		$this->filters();

	}

	function hooks() {

		add_action( 'admin_menu', array( $this, 'add_menu' ) );

		add_action( 'init', array( $this, 'add_css_js_assets' ) );

		add_action( 'wp_ajax_wpmmp_reset_settings', array( $this, 'reset_settings' ) );

		add_action( 'init', array( $this, 'plugin_activation_notice' ) );

	}

	function filters() {

		add_filter( 'plugin_action_links_' . plugin_basename(WPMMP_PLUGIN_MAIN_FILE ), array( $this, 'add_settings_link' ) );

	}

	function add_menu() {

		$parent_slug = 'options-general.php';

		$page_title = __( 'Maintenance Mode Settings', 'wpmp' );

		$menu_title = __( 'Maintenance Mode', 'wpmp' );

		$capability = 'manage_options';

		$menu_slug = 'wpmmp-settings';

		add_object_page( $page_title, $menu_title, $capability, $menu_slug, array( $this, 'settings_page' ), 'dashicons-hammer' );

	}

	function add_meta_boxes() {
		
		add_meta_box( 
			'general-settings',
			__( 'General', 'wpmmp' ),
			array( $this, 'general_settings_meta_box' ),
			'wpmmp_settings_page',
			'normal'
		);

	}

	function add_css_js_assets() {

		if ( ! isset( $_GET['page'] ) )
			return FALSE;

		if ( ! $_GET['page'] == 'wpmmp-settings' )
			return FALSE;

		wp_enqueue_style( 'thickbox' );

		wp_enqueue_script( 'thickbox' );

		wp_enqueue_style( 'wpmp-settings', 
			plugins_url( 'css/admin-settings.css', WPMMP_PLUGIN_MAIN_FILE ) );

		wp_enqueue_script( 'wpmp-settings', 
			plugins_url( 'js/admin-settings.js', WPMMP_PLUGIN_MAIN_FILE ) );

		$translation_array = array( 
				'confirm_reset' => __( 'Are you sure you want to reset the settings ?', 'wpmmp' ),
				'successfull_reset' => __( 'The settings have been restored to the default settings', 'wpmmp' ),
				'reset_nonce' => wp_create_nonce( 'wpmmp_reset_nonce' ),
				'ajax_url' => admin_url( 'admin-ajax.php' )
			);
		
		wp_localize_script( 'wpmp-settings', 'wpmmpjs', $translation_array );

	}

	function settings_page() {

		if ( isset( $_POST['submit'] ) )
			$this->save_settings();

		if ( ! isset( $_GET['tab'] ) )
			$this->admin_tabs();
		else
			$this->admin_tabs( $_GET['tab'] );

		$nonce = wp_create_nonce( 'wpmmp_settings_page_nonce' );

		$settings = $this->get_settings();

		$themes = wpmmp_get_themes();

		echo "<a target='_blank' href='http://rocketplugins.com/wordpress-maintenance-mode-plugin/'><img class='wpmmp-banner-paid-image' src='". wpmmp_image_url( 'banner.png' ). "'/></a>";

		$this->add_meta_boxes();

		if ( ! isset( $_GET['tab'] ) )
			include wpmmp_settings_part( 'settings' );
		else
			include wpmmp_settings_part( $_GET['tab'] );

	}

	function save_settings() {

		if ( ! current_user_can( 'manage_options' ) )
			wp_die( 'You are not allowed to change plugin options' );

		if ( ! wp_verify_nonce( $_POST['nonce'], 'wpmmp_settings_page_nonce' ) )
			wp_die( 'Invalid Nonce' );

		$tab = 'settings';

		if ( ! isset( $_GET['tab'] ) )
			$_GET['tab'] = 'settings';

		if ( $_GET['tab'] == 'tab-advanced-settings' )
			$tab = 'tab-advanced-settings';

		$settings = wpmmp_get_settings();

		if ( $tab == 'settings' ) {

			$settings['status'] = stripslashes($_POST['settings']['status']);

			$theme = stripslashes($_POST['settings']['theme']);

			$settings['theme'] = $theme;

			$settings['title'] = stripslashes($_POST['settings']['title']);

			$settings['heading1'] = stripslashes($_POST['settings']['heading1']);

			$settings['heading2'] = stripcslashes($_POST['settings']['heading2']);

			$settings['content'] = stripcslashes($_POST['settings']['content']);

			if ( isset( $_POST['settings']['countdown_timer'] ) )
				$settings['countdown_timer'] = true;
			else
				$settings['countdown_timer'] = false;
  			
  			if ( isset( $_POST['settings']['progress_bar'] ) )
				$settings['progress_bar'] = true;
			else
				$settings['progress_bar'] = false;

			$settings['progress_bar_range'] = stripslashes($_POST['settings']['progress_bar_range']);

			$settings['countdown_time'] = stripslashes($_POST['settings']['countdown_time']);

			$settings = apply_filters( 'wpmmp_settings_before_save', $settings );
			
			update_option( 'wpmmp_settings', $settings );

			if ( function_exists('w3tc_pgcache_flush') ) {
			  w3tc_pgcache_flush();
			} else if ( function_exists('wp_cache_clear_cache') ) {
			  wp_cache_clear_cache();
			}

		}

		if ( $tab == 'tab-advanced-settings' ) {

			$settings['http_503_header'] = $_POST['settings']['http_503_header'];

			$settings['feed'] = $_POST['settings']['feed'];

			$settings = apply_filters( 'wpmmp_settings_before_save', $settings );
			
			update_option( 'wpmmp_settings', $settings );
			
		}

		include wpmmp_settings_part( 'settings-saved' );;
	}

	function reset_settings() {

		if ( ! current_user_can( 'manage_options' ) )
			exit( '1' );

		if ( ! wp_verify_nonce( $_REQUEST['nonce'], 'wpmmp_reset_nonce' ) )
			exit( '2' );

		if ( ! isset( $_REQUEST['which-settings'] ) )
			$_REQUEST['which-settings'] = 'settings';

		$which_settings = $_REQUEST['which-settings'];

		if ( $which_settings == 'settings' )
			update_option( 'wpmmp_settings', $this->default_settings() );

		exit( '10' );

	}

	function default_settings() {

		$default_settings = array(
				'status' => 'disabled',
				'theme' => 'default-4',
				'title' => get_bloginfo( 'blogname' ) . ' is down',
				'heading1' => 'We are down for maintenance',
				'heading2' => 'We will be here soon',
				'content' => 'Add Maintenance/Coming Soon Message here',
				'countdown_timer' => false,
				'countdown_time' => date('Y/m/d H:i a', time() ),
				'progress_bar' => false,
				'progress_bar_range' => 50,
				'http_503_header' => 'enabled',
				'feed' => 'disabled'
			);

		return apply_filters( 'wpmmp_default_settings', $default_settings );

	}

	public static function get_settings() {

		$settings = get_option( 'wpmmp_settings' );

		return apply_filters( 'wpmmp_settings', $settings );

	}

	function admin_tabs( $current = 'settings' ) {
	    
	    $tabs = array( 
	    		'settings' => __( 'Settings', 'wpmmp' ), 
	    		'tab-advanced-settings' => __( 'Advanced Settings', 'wpmmp' )
	    	);

	    echo '<div id="icon-themes" class="icon32"><br></div>';
	    
	    echo '<h2 class="nav-tab-wrapper">';
	    
	    foreach( $tabs as $tab => $name ){
	        
	        $class = ( $tab == $current ) ? ' nav-tab-active' : '';
	        
	        echo "<a class='nav-tab$class' href='?page=wpmmp-settings&tab=$tab'>$name</a>";

	    }

	    echo '</h2>';
	}

	function general_settings_meta_box( $settings ) {

		$themes = wpmmp_get_themes();

		include wpmmp_settings_part( 'general-meta-box.php' );

	}


	function plugin_activation_notice() {

		if ( get_option( 'wpmmp-activation-notice' ) )
			return FALSE;

		if ( isset( $_REQUEST['page'] ) ) {

			if ( $_REQUEST['page'] == 'wpmmp-settings' ) {

				add_option( 'wpmmp-activation-notice', 'showed', '', 'yes' );

				return FALSE;

			}

		}

		$settings_link = admin_url( 'admin.php?page=wpmmp-settings' );

		include wpmmp_view_path( 'admin-settings/plugin_actiavtion_notice' );

	}

	function add_settings_link( $links ) {

		$settings_link = admin_url( 'admin.php?page=wpmmp-settings' );

		$settings_link = sprintf( '<a href="%s">Settings</a>', $settings_link );

		return array_merge( $links, array( 
				'settings' => $settings_link
		 	) );

	}

}