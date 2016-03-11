<?php
	/*
	Plugin Name: Newsletters
	Plugin URI: none
	Description: Плагин для подписки на рассылку новостей, статей и других обновлений сайта
	Version: 1.0.0
	Author: WebUniverse
	Author URI: http://webuniverse.com.ua/
	*/
	define( 'NEWSLETTERS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	define( 'NEWSLETTERS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

	function subscribe_newsletters($needle_data){
		$mydb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);
		$myrows = $mydb->get_results( "SELECT email FROM wu_newsletters_subscribers WHERE email = '" . $needle_data['email'] .
																				   "' AND id_newsletter = " .  $needle_data['id_newsletter'] );
		if(count($myrows) == 0){
			$mydb->insert("wu_newsletters_subscribers", array(
			   "email" => $needle_data['email'],
			   "id_newsletter" => $needle_data['id_newsletter']
			));
			return 'okey';			
		}else{
			return json_encode(array('error' => 'Ошибка: Этот имейл уже подписан на данную рассылку.', ));
		}		
	}
	function get_newletters_list(){
		$mydb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);
		$myrows = $mydb->get_results( "SELECT * FROM wu_newsletters" );
		return json_encode($myrows);		
	}
	function get_subscribers_list($id_newsletter){
		$mydb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);
		$myrows = $mydb->get_results( "SELECT email FROM wu_newsletters_subscribers WHERE id_newsletter = " .  $id_newsletter );
		return json_encode($myrows);
        $q = "INSERT INTO reports ( user_id, user_name, user_phone, user_email, course_name, course_cost, liqpay_order_id, payment_id, status) VALUES ('".$user->get('id')."', '".$user->get('name')."', '".$user->get('email')."','".$course_name."' , 1350, '".$array['liqpay_order_id']."', '".$array['payment_id']."', '".$array['status']."')";
	}

	//register_activation_hook( __FILE__, array( 'SMS_by_Turbosms', 'plugin_activation' ) );
	//register_deactivation_hook( __FILE__, array( 'SMS_by_Turbosms', 'plugin_deactivation' ) );