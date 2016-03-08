<?php
	/*
	Plugin Name: Email by MailGun
	Plugin URI: none
	Description: Плагин для отправки системных email-сообщений с помощью стороннего сервиса MailGun
	Version: 1.0.0
	Author: WebUniverse
	Author URI: http://webuniverse.com.ua/
	*/
	define( 'EMAIL_BY_MAILGUN_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	define( 'EMAIL_BY_MAILGUN_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

	function sendEmail($needle_data){
		$api_key = 'key-b71bcb36f3ee96f154e39472225b8db8';
		$domain = 'sandboxe3ee8aceaad146ec9fa51ad06f0a3427.mailgun.org';
		$from = 'Autodoctor <postmaster@sandboxe3ee8aceaad146ec9fa51ad06f0a3427.mailgun.org>';

		$url = 'https://api:' . $api_key . '@api.mailgun.net/v3/' . $domain . '/messages';

		$response = wp_remote_post( $url, array(
			'method' => 'POST',
			'headers' => array(),
			'body' => array('to' => $needle_data['recipient'],
						    'from' => $from,
						    'subject' => $needle_data['subject'],
						    'text' => $needle_data['message']),
			'cookies' => array()
		    )
		);

		if ( is_wp_error( $response ) ) {
		   $error_message = $response->get_error_message();
		   echo "Ошибка: $error_message";
		} else {
		   echo 'Ответ:<pre>';
		   print_r( $response );
		   echo '</pre>';
		}
	}

	//register_activation_hook( __FILE__, array( 'SMS_by_Turbosms', 'plugin_activation' ) );
	//register_deactivation_hook( __FILE__, array( 'SMS_by_Turbosms', 'plugin_deactivation' ) );