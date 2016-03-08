<?php

require "Auth_Fb.php";

$fb = new Auth_Fb();

if (!$_GET['code'])
{
    $params = array(
        'client_id'     => ClIENT_ID,
        'redirect_uri'  => REDIRECT_URL_FB,
        'scope'         => 'email,public_profile',
        'response_type' => 'code'
    );

    $query ='?' . urldecode(http_build_query($params));
    $fb->redirect_url(URL_AUTH_FB.$query);

}
if ($_GET['code']) {

    $fb->set_code($_GET['code']);

         $fb->get_token();

         $fb->get_user();

        $fb->get_link_share();

}
