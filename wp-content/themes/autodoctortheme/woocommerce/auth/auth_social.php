<?php

require "Auth_Vk.php";

$vk = new Auth_Vk();

if (!$_GET['code'])
{
    $query = "?client_id=".APP_ID."&display=page&scope=email&redirect_uri=".REDIRECT_URL."&response_type=code&v=5.45";
    $vk->redirect_url(URL_AUTH.$query);
}
if ($_GET['code'])
{
    $vk->set_code($_GET['code']);

    $vk->get_token();

    $vk->get_user();
}

?>