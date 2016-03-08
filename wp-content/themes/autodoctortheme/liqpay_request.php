<?php

$data = json_decode(base64_decode($_POST["data"]), true);


$host='80.78.241.112';
$database='autodoctor';
$user='root';
$pswd='1234rewq!';

$dbh = mysql_connect($host, $user, $pswd);
mysql_select_db($database);

if ($data['status'] == 'sandbox' || $data['status'] == 'success')
{
    $query = "SET NAMES utf8";
    $res = mysql_query($query);

    $query = "UPDATE wp_user_orders SET status_order = 'Оплачено' WHERE order_id =".$data['order_id'];
    $res = mysql_query($query);
    $client_phone = '';
    $client_text = '';
    $admin_phone = '';
    $admin_text = '';
    send_sms_by_turbo_sms($client_phone, $admin_phone, $client_text, $admin_text);
    $client_email_registration = '';
    $client_subject_registration = '';
    $client_message_registration = '';

    send_one_email_by_mailgun($client_email_registration,$client_subject_registration,$client_message_registration);
}
else if ($data['status'] == 'failure' || $data['status'] == 'error')
{
    $query = "SET NAMES utf8";
    $res = mysql_query($query);

    $query = "UPDATE wp_user_orders SET status_order = 'Неудачный' WHERE order_id =".$data['order_id'];
    $res = mysql_query($query);
}




