<?php
/*
Plugin Name: feedback plugin
Description: Create feedback
Version: 1.0
Author: Autodoctor
Author URI: http://autodoctor.com
Plugin URI: http://current.ua/my_orders/autodoctor/wordpress/wp-content/plugins/feedback
*/

define('FEEDBACK_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FEEDBACK_PLUGIN_URL', plugin_dir_url(__FILE__));

function get_feedback_list ($feedback_data)
{
	$mydb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);
	
	if ($feedback_data['feedback_location'] == 'product')
    {
        if ($feedback_data['answer_id'] == -1)
		    $feedbacks = $mydb->get_results( "SELECT id_feedback, date, id_product, user_name, feedback, answer_id FROM wp_feedback WHERE id_product = ".$feedback_data['product_id']);
        else
            $feedbacks = $mydb->get_results( "SELECT id_feedback, date, id_product, user_name, feedback, answer_id FROM wp_feedback WHERE id_product = ".$feedback_data['product_id']." AND answer_id = ".$feedback_data['answer_id']);
    }
	if ($feedback_data['feedback_location'] == 'home')
		$feedbacks = $mydb->get_results( "SELECT id_feedback, user_name, feedback, auto_brand, model, date FROM wp_feedback WHERE feedback_location = 'home'");
	
	if ($feedback_data['feedback_location'] == 'services')
		$feedbacks = $mydb->get_results( "SELECT id_feedback, user_name, date, feedback, auto_brand, model FROM wp_feedback WHERE feedback_location = 'services'");

		return $feedbacks;
}

function add_feedback ($feedback_data)
{
	$mydb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);

    $feedback_data['date'] = date ("d.m.y");

		$mydb->insert("wp_feedback", $feedback_data);
}

function del_feedback ($id)
{
    $mydb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);

    $mydb->get_results( "DELETE FROM wp_feedback WHERE id_feedback =".$id);

}

?>