<?php
/**
* @package WordPress
* @subpackage clean
* Template name: Тестовая страница
*/
?>

<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="<?php echo esc_url( get_template_directory_uri() ); ?>/static/css/mainqkpk1sv2t9.min.css" rel="stylesheet" type="text/css">
    <link rel="icon" type="image/png" href="<?php echo esc_url( get_template_directory_uri() ); ?>/fav.png">

    <script type='text/javascript'>
        var myajax = {"url":"<?php get_home_url(); ?>\/my_orders\/autodoctor\/wordpress\/wp-admin\/admin-ajax.php"};
    </script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/wu_main.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/separate-js/modernizr.custom.17797.js"></script>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/main.js"></script>

    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/separate-js/pikaday.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/separate-js/start.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/separate-js/cart.js"></script>
    <!--[if lt IE 9]>
    <script src="js/html5shiv-3.7.2.min.js"></script>
    <![endif]-->
</head>
<body>
	<center>
		<?php if($_GET['success']){ ?>
			<h3>Тестовая оплата с помощью LiqPay прошла успешно!</h3>
			<br><br><hr style = "border: 1px groove red;"><br><br><br><br>
		<?php } ?>
		<h3>Проверка отправки смс об успешной покупке</h3>
		<h4>Номер клиента</h5>
		<input type = "text" name = "client_phone" value = "+380934857180"><br>
		<h4>Текст сообщения для клиента</h4>
		<textarea name = "client_text">Текст для клиента</textarea><br>
		<h4>Номер администратора</h4>
		<input type = "text" name = "admin_phone" value = "+380934857180"><br>
		<h4>Текст сообщения для администратора</h4>
		<textarea name = "admin_text">Текст для администратора</textarea><br>
		<input type = "submit" class = "btn btn_light" onclick = "smsNotificationAboutBuying()"><br><br><hr style = "border: 1px groove red;"><br><br><br><br>

		<h3>Проверка отправки смс о записи на СТО</h3>
		<h4>Номер клиента</h5>
		<input type = "text" name = "client_phone_service" value = "+380934857180"><br>
		<h4>Текст сообщения для клиента</h4>
		<textarea name = "client_text_service">Текст для клиента об успешной записи на СТО</textarea><br>
		<h4>Номер администратора</h4>
		<input type = "text" name = "admin_phone_service" value = "+380934857180"><br>
		<h4>Текст сообщения для администратора</h4>
		<textarea name = "admin_text_service">Текст для администратора  о записи на СТО</textarea><br>
		<input type = "submit" class = "btn btn_light" onclick = "smsNotificationAboutService()"><br><br><hr style = "border: 1px groove red;"><br><br><br><br>

		<h3>Проверка оплаты с помощью системы LiqPay</h3>
		<h4>Стоимость товара</h5>
		<input type = "text" id = "price" onchange = "resetLiqpayButton()" name = "price" value = "100"><br>
		<h4>Количество товаров</h4>
		<input type = "number" name = "amount" onchange = "resetLiqpayButton()" value = "1"><br>
		<div id = "liqpay_button"></div><br><br><hr style = "border: 1px groove red;"><br><br><br><br>

		<h3>Проверка отправки email об успешной регистрации</h3>
		<h4>Email клиента</h5>
		<input type = "text" name = "client_email_registration" value = "absolute294200@gmail.com"><br>
		<h4>Тема сообщения клиента</h5>
		<input type = "text" name = "client_subject_registration" value = "Успешная регистрация на сайте Autodoctor"><br>
		<h4>Текст сообщения для клиента</h4>
		<textarea name = "client_message_registration">Поздравляем с успешной регистрацией! Чтобы подтвердить регистрацию, перейдите по этой ссылке: http://autodoctor.com.ua/success_registration</textarea><br>
		<input type = "submit" class = "btn btn_light" onclick = "emailNotificationAboutRegistration()"><br><br><hr style = "border: 1px groove red;"><br><br><br><br>

		<h3>Проверка подписки на новости, статьи и другие рассылки</h3>
		<h4>Список подписок</h5>
		<select id = "newsletters">
		</select>
		<h4>Ваш email</h5>
		<input type = "text" name = "email_subscribe" value = "absolute294200@gmail.com"><br>
		<input type = "submit" value = "Подписаться" class = "btn btn_light" onclick = "newSubscribe()"><br><br><hr style = "border: 1px groove red;"><br><br><br><br>

		<h3>Проверка отправки письма всем подписчикам</h3>
		<h4>Список подписок</h5>
		<select id = "newsletters_send">
		</select>
		<h4>Тема сообщения подписчикам</h5>
		<input type = "text" name = "subscribe_subject" value = "Успешная регистрация на сайте Autodoctor"><br>
		<h4>Текст сообщения подписчикам</h4>
		<textarea name = "subscribe_text">Новая новость</textarea><br>
		<input type = "submit" value = "Отправить подписчикам" class = "btn btn_light" onclick = "sendAllSubscribers()"><br><br><hr style = "border: 1px groove red;"><br><br><br><br>
	</center>
</body>