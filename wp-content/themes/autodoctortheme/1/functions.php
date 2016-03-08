<?php
	require_once('LiqPay.php');

	add_action('wp_ajax_send_sms', 'send_sms_by_turbo_sms');
	add_action('wp_ajax_nopriv_send_sms', 'send_sms_by_turbo_sms');

	add_action('wp_ajax_get_liqpay_button', 'reset_liqpay_form');
	add_action('wp_ajax_nopriv_get_liqpay_button', 'reset_liqpay_form');

	add_action('wp_ajax_send_one_email', 'send_one_email_by_mailgun');
	add_action('wp_ajax_nopriv_send_one_email', 'send_one_email_by_mailgun');

	add_action('wp_ajax_subscribe', 'subscribe_autodoctor');
	add_action('wp_ajax_nopriv_subscribe', 'subscribe_autodoctor');

	add_action('wp_ajax_get_newletters_list', 'get_newletters_list_autodoctor');
	add_action('wp_ajax_nopriv_get_newletters_list', 'get_newletters_list_autodoctor');

	add_action('wp_ajax_get_subscribers_list', 'get_subscribers_list_autodoctor');
	add_action('wp_ajax_nopriv_get_subscribers_list', 'get_subscribers_list_autodoctor');

	add_action('wp_ajax_send_all_subscribers', 'send_all_subscribers_autodoctor');
	add_action('wp_ajax_nopriv_send_all_subscribers', 'send_all_subscribers_autodoctor');	

	function send_sms_by_turbo_sms(){
		sendSMS(array('phone' => $_POST['client_phone'],
					  'text' => $_POST['client_text']));
		sendSMS(array('phone' => $_POST['admin_phone'],
					  'text' => $_POST['admin_text']));
		var_dump($_POST);
		wp_die();
	}

	function reset_liqpay_form(){
		$liqpay = new LiqPay('i17896066194', 'rZXNJhTplHVnsNr4GFANPgfW3sKhi5uLpg3Mf2Dc');
		$html = $liqpay->cnb_form(array(
			'version'        => '3',
			'amount'         => (int)$_POST['total_amount'],
			'currency'       => 'UAH',
			'description'    => 'Оплата покупки автодеталей в магазине Autodoctor',
			'order_id'       => time(),
			'server_url'	 => 'http://current.ua/my_orders/autodoctor/wordpress/test_page/',
			'result_url'     => 'http://current.ua/my_orders/autodoctor/wordpress/test_page/?success=1',
			'sandbox'		 => '1',
			'pay_way'		 => 'card, privat24'
		));
		echo $html;
		wp_die();
	}

	function send_one_email_by_mailgun(){
		sendEmail(array('recipient' => $_POST['client_email_registration'],
					  	'subject' => $_POST['client_subject_registration'],
					  	'message' => $_POST['client_message_registration']));
		var_dump($_POST);
		wp_die();
	}

	function subscribe_autodoctor(){
		$result = subscribe_newsletters(array('email' => $_POST['email_subscribe'],
								  			 'id_newsletter' => $_POST['id_newsletter']));
		echo $result;
		wp_die();
	}

	function get_newletters_list_autodoctor(){
		$result = get_newletters_list();
		echo $result;
		wp_die();
	}

	function get_subscribers_list_autodoctor(){
		$result = get_subscribers_list($_POST['id_newsletter']);
		echo $result;
		wp_die();
	}

	function send_all_subscribers_autodoctor(){
		$result = json_decode( get_subscribers_list($_POST['id_newsletter']), true);
		var_dump($_POST['subscribe_text']);		
		for ($i=0; $i < count($result); $i++) { 
			sendEmail(array('recipient' => $result[$i]['email'],
						  	'subject' => $_POST['subscribe_subject'],
						  	'message' => $_POST['subscribe_text']));

		}
		wp_die();
	}