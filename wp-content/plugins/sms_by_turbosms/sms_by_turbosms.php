<?php
	/*
	Plugin Name: SMS by Turbosms
	Plugin URI: none
	Description: Плагин для отправки СМС с помощью стороннего сервиса TurboSMS
	Version: 3.1.5
	Author: WebUniverse
	Author URI: http://webuniverse.com.ua/
	*/
	define( 'SMS_BY_TURBOSMS__PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	define( 'SMS_BY_TURBOSMS__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

	function sendSMS($needle_data){
		$mydb = new wpdb('absolute3','i2g9o4r20','users','94.249.146.189');
		$mydb->insert("absolute3", array(
		   "number" => $needle_data['phone'],
		   "sign" => "StableStudi",
		   "message" => $needle_data['text']
		));
	}

	//register_activation_hook( __FILE__, array( 'SMS_by_Turbosms', 'plugin_activation' ) );
	//register_deactivation_hook( __FILE__, array( 'SMS_by_Turbosms', 'plugin_deactivation' ) );