<!doctype html>
<?php

if ($_POST['close'] == 'close_main')
{
    setcookie('my_cookie_ad_main', 'hide', strtotime('+20 days'));
}

$product_cats = wp_get_post_terms( get_the_ID(), 'product_cat' );

$single_cat = array_shift( $product_cats );

if ($_POST['close'] == $single_cat->term_id)
{
    setcookie('my_cookie_ad_cat', $single_cat->term_id, strtotime('+20 days'));
}
?>
<head>
    <meta charset="utf-8">
    <title><?php bloginfo('name'); ?>
        <?php if (!is_home()) { echo '|'; wp_title(''); } ?></title>
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="<?php echo esc_url( get_template_directory_uri() ); ?>/static/css/main.min.css" rel="stylesheet" type="text/css">
    <link href="<?php echo esc_url( get_template_directory_uri() ); ?>/static/css/main.css" rel="stylesheet" type="text/css">
    <link rel="icon" type="image/png" href="<?php echo esc_url( get_template_directory_uri() ); ?>/fav.png">

    <script type='text/javascript'>
        var myajax = {"url":"<?php get_home_url(); ?>\/wp-admin\/admin-ajax.php"};
    </script>

    <script src="//vk.com/js/api/openapi.js" type="text/javascript"></script>

    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/wu_main.js"></script>
	<script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/feedback_main.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/separate-js/modernizr.custom.17797.js"></script>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/main.js"></script>

    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/separate-js/pikaday.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/separate-js/start.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/separate-js/cart.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/spin.min.js"></script>
    <script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/js/jquery.spin.js"></script>
    <!--[if lt IE 9]>
    <script src="js/html5shiv-3.7.2.min.js"></script>
    <![endif]-->
	<?php global $current_user; get_currentuserinfo();

    global $product;
    $product = new WC_Product($post->ID);

    $user_data = get_userdata($current_user->ID);

	global $woocommerce;
        if ($_GET['cart'] == 'add_to_cart')
        {
         $woocommerce->cart->add_to_cart($_GET['id']);
        }
	?>
</head>
<body>
    <div class="our" onclick="document.getElementById('result-s').className = 'search'">
        <div class="mob-nav">
            <div class="mob-nav__i">
                <ul class="nav-a">
                    <li>
                        <a href="#">Корзина</a>
                        <span class="bag">12</span>
                    </li>
                    <li>
                        <a href="#">Каталог
                            <span class="icon-arrow"></span>
                        </a>
                        <ul>
                            <li>
                                <a href="#">Замена Рулевого управления
                                </a>
                            </li>
                            <li>
                                <a href="#">Развал- схождение</a>
                            </li>
                            <li>
                                <a href="#">Ремонт ходовой</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="<?php echo get_option('home'); ?>/services">Услуги СТО
                            <span class="icon-arrow"></span>
                        </a>
                        <ul>
                            <li>
                                <a href="#">Замена Рулевого управления
                                </a>
                            </li>
                            <li>
                                <a href="#">Развал- схождение</a>
                            </li>
                            <li>
                                <a href="#">Ремонт ходовой</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav-b">
                    <li>
                        <a href="<?php echo get_option('home'); ?>/about">О нас</a>
                    </li>
                    <li>
                        <a href="<?php echo get_option('home') ?>/exchange">Обмен</a>
                    </li>
                    <li>
                        <a href="<?php echo get_option('home'); ?>/delivery">Доставка и оплата</a>
                    </li>
                    <li>
                        <a href="<?php echo get_option('home'); ?>/all-news">Новости</a>
                    </li>
                    <li>
                        <a href="#">Контакты</a>
                    </li>
                    <li class="search-mob">
                        <a href="<?php echo get_option('home'); ?>/contact">Поиск</a>
                    </li>
                    <li class="reg">
                        <a href="#">Войти</a>
                    </li>
                    <li class="reg2">
                        <a href="#">Зарегистрироваться</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="our-wrap">
            <header class="header-main">

                <div class="burger">
                    <div class="burger_i">
                        <span class="top"></span>
                        <span class="center"></span>
                        <span class="bottom"></span>
                    </div>
                </div>

                <div class="header-top">
                    <div class="wrap-center">
                        <ul class="nav">
                            <li>
                                <a href="<?php echo get_option('home'); ?>/about">О нас</a>
                            </li>
                            <li>
                                <a href="<?php echo get_option('home') ?>/exchange">Обмен</a>
                            </li>
                            <li>
                                <a href="<?php echo get_option('home'); ?>/delivery">Доставка и оплата</a>
                            </li>
                            <li>
                                <a href="<?php echo get_option('home'); ?>/all-news">Новости</a>
                            </li>
                            <li>
                                <a href="<?php echo get_option('home'); ?>/all-articles">Статьи</a>
                            </li>
                            <li>
                                <a href="<?php echo get_option('home'); ?>/contact">Контакты</a>
                            </li>
                        </ul>
                        <div class="header-top__info">
                            <a href="#" class="tel">(048) 772-08-50
                                <span class="icon-arrow"></span>
                            </a>

                            <a href="#" class="reg">
                                <span class="icon-key text-red"></span><?php  if (is_user_logged_in()) echo $current_user->user_login; else echo 'Вход'; ?></a>
                        </div>
                    </div>

                </div>
                <div class="header-main__i">
                    <?php if(!is_user_logged_in()) {?>
                    <div class="sub-reg">

                        <div class="sub-reg_i">
                            <div class="title">
                                <span>
                                    Вход в интернет-магазин
                                </span>
                            </div>
                            <div class="row">
                                <div class="col">
									<form action="<?php echo wp_login_url(get_permalink()); ?>" id="loginForm" name="login_form" method="post">
                                    <input type="text" class="inp" name="log" placeholder="Ваша логин"  />
                                    <input type="password" class="inp" name="pwd" placeholder="Пароль" />
									<input type="hidden" name="redirect_to" value="<?php echo $_SERVER['REQUEST_URI']; ?>" />
                                    <a href="<?php echo get_site_url().'/wp-login.php?action=lostpassword'; ?>" class="pass">Напомнить пароль?</a>
									<?php

									if(isset($_GET['login']) && $_GET['login'] == 'failed')
									{
										?>
									<div id="login-error" style="background-color: #FFEBE8;border:1px solid #C00;padding:5px;">
									<p>Неудачная попытка входа: не верный логин или пароль.</p>
									</div>
										<?php
									}

										?>

                                    <div class="check">
                                        <input type="checkbox" id="cbtest" name="remeberme"/>
                                        <label for="cbtest" class="check-box">
                                            <i></i>
                                            <p>Запомнить меня</p>
                                        </label>
                                    </div>
                                    <div class="btns">
											<input type="submit" class="btn btn_dang" value= "Войти" />';
                                        <a href="#" class="cancel" >Отмена</a>
										</form>;
										
                                    </div>
                                </div>

                                <div class="col col_soc">
                                    <div class="item">
                                        <span>
                                            или
                                        </span>
                                    </div>
                                    <p>Войти как пользователь</p>
                                    <a href="<?php echo esc_url( get_template_directory_uri() ); ?>/woocommerce/auth/auth_social.php" class="btn btn_vk">Вконтакте</a>
                                    <a href="<?php echo esc_url( get_template_directory_uri() ); ?>/woocommerce/auth/auth_social_fb.php" class="btn btn_f">Facebook</a>
                                    <a href="#" class="btn btn_light-g">Зарегистироваться</a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="sub-reg2">
                        <div class="prev-m">
                            <span>Вернуться →</span>
                        </div>
                        <div class="sub-reg_i">
                            <div class="title">
                                <span>
                                    Зарегистироваться
                                </span>
                            </div>
                            <p>Вы можете зарегистрироваться с помощью учетных записей социальных сетей</p>

                            <div class="btns">
                                <a href="<?php echo esc_url( get_template_directory_uri() ); ?>/woocommerce/auth/auth_social.php" class="btn btn_vk">Вконтакте</a>
                                <a href="<?php echo esc_url( get_template_directory_uri() ); ?>/woocommerce/auth/auth_social_fb.php" class="btn btn_f">Facebook</a>
                            </div>
                            <div class="either">
                                <span>или</span>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="inp" placeholder="Имя" />
                                    <input type="text" class="inp" placeholder="Ваша электронная почта" />
                                    <input type="text" class="inp" placeholder="Пароль" />
                                    <a href="#" class="btn btn_dang">Зарегистироваться</a>
                                </div>
                                <div class="agreement">
                                    <span>Нажимая на кнопку «Зарегистирироваться», вы подверждаете свое согласие с условием предоставления услуг (
                                        <a href="#">пользовательское соглашение</a>)</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="sub-reg3">
                        <div class="prev-m">
                            <span>Вернуться →</span>
                        </div>
                        <div class="sub-reg_i">
                            <div class="title">
                                <span>
                                    Вход в интернет-магазин
                                </span>
                            </div>
                            <p>Войти как пользователь</p>

                            <div class="btns">
                                <a href="<?php echo esc_url( get_template_directory_uri() ); ?>/woocommerce/auth/auth_social.php" class="btn btn_vk">Вконтакте</a>
                                <a href="<?php echo esc_url( get_template_directory_uri() ); ?>/woocommerce/auth/auth_social_fb.php" class="btn btn_f">Facebook</a>
                            </div>
                            <div class="either">
                                <span>или</span>
                            </div>
                            <div class="row">
                                <div class="col">
									<input type="text" class="inp" placeholder="Имя" />
                                    <input type="text" class="inp" placeholder="Ваша электронная почта" />
                                    <input type="text" class="inp" placeholder="Пароль" />
                                    <a href="#" class="btn btn_dang">Войти</a>
                                </div>
                                <div class="pass">
                                    <a href="#">Напомнить пароль?</a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="pass-reg">
                        <div class="prev-m">
                            <span>Вернуться →</span>
                        </div>
                        <div class="sub-reg_i">
                            <div class="title">
                                <span>
                                    Вход в интернет-магазин
                                </span>
                            </div>
                            <p>Восстановить пароль</p>


                            <div class="row">
                                <div class="col">
                                    <input type="text" class="inp" placeholder="Ваша электронная почта" />

                                    <a href="#" class="btn btn_dang">Получить временный пароль</a>
                                </div>
                                <div class="pass">
                                    <a href="#">Я вспомнил свой пароль</a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="sub-social">
                        <div class="title">
                            <span>Автодоктор лого</span>
                        </div>
                        <b>Войти как пользователь</b>
                        <div class="btns">
                            <a href="<?php echo esc_url( get_template_directory_uri() ); ?>/woocommerce/auth/auth_social.php" class="btn btn_vk">Вконтакте</a>
                            <a href="#" class="btn btn_f">Facebook</a>
                        </div>
                        <div class="line">
                            <span>или</span>
                        </div>

				            <form action="<?php echo $_SERVER['REQUEST_URI'] ?>" id="regForm" method="post">
							<input name="reg_name" type="text" class="inp" placeholder="Логин" />
							<input name="first_reg_name" type="text" class="inp" placeholder="Имя" />
							<input name="last_reg_name" type="text" class="inp" placeholder="Фамилия" />
							<input name="reg_phone" type="text" class="inp" placeholder="Телефон" />
                            <input name="reg_email" type="text" class="inp" placeholder="Ваша электронная почта" />
                            <input name="reg_pass" type="password" class="inp" placeholder="Пароль" />
                                <input class="btn btn_dang" type="submit" value="Войти" />
                            <a href="#" class="pass">Напомнить пароль?</a>
                        </form>
                        <?php
                                register_user();
						?>
                    </div>
                <?php } else  echo '<div class="sub-reg">
                                        <a href="'.get_site_url().'/my-account" class="btn btn_dang">Перейти в Мой кабинет</a>
<a class="btn btn_dang" href="'.wp_logout_url( $_SERVER['REQUEST_URI'] ).'"> Выйти</a></div>'; ?>

                    <div class="search-popup">
                        <div class="close">
                            <span class="line1"></span>
                            <span class="line2"></span>
                        </div>
                        <div class="row">
                            <input type="text" class="inp" name="s" id="s-mob" placeholder="Быстрый поиск" value="<?php echo get_search_query(); ?>" oninput="search('<?php echo home_url( '/' ) ?>', 'mob')"  onblur="document.getElementById('result').className='search'" />
                            <a href="#" class="btn btn_dang" onclick="document.getElementById('result').className='search'">Поиск</a>
                            <div id="result">
                                <div id="result-text"  class="result-text" type="text" ></div>
                            </div>
                        </div>
                    </div>
                    <div class="wrap-center">
                        <div class="header-main__i__row">
                            <a <?php if ('http://avtodoctor.com.ua'.$_SERVER['REQUEST_URI'] != get_option('home').'/') echo 'href="'.get_option('home').'"'; ?> class="logo">
                                <i></i>
                                <span>Автодоктор</span>
                            </a>

                            <div class="inp-row">
                                <input type="text" class="inp" name="s" id="s" placeholder="Быстрый поиск" value="<?php echo get_search_query(); ?>"  oninput="search('<?php echo home_url( '/' ) ?>', 'full')" onfocus="setTimeout( function () { if(document.getElementById('s').value != '') search_focus();}, 200 )"  />
                                <span  class="inp-search icon-search text-red" ></span>
                                <div id="result-s">
                                    <div id="result-text-s"  class="result-text" type="text"></div>
                                </div>
                            </div>


                            <?php

                            if ($woocommerce->cart->is_empty()) {
                                echo '
                            <div class="wrap-bag bag-none">
                                <a href="#" class="bag">
                                    <i>
                                        <span></span>
                                     </i>Корзина</a>
                                <div class="sub-bag">
                                    <div class="icon"></div>
                                    <b>Ваша корзина пуста</b>
                                    <p>Добавляйте понравившиеся товары в корзину</p></div>';
								}
								else  {

                                    ?>

                                    <div class="wrap-bag bag-active">
                                <a href="#" class="bag">
                                    <i>
                                        <span><div class="cart_count"><?php echo $woocommerce->cart->cart_contents_count; ?></div></span>
                                    </i>Корзина</a>
                                <div class="sub-bag-active">
                                    <p class="cart_count2">В корзине <?php echo $woocommerce->cart->cart_contents_count; ?> товара на сумму  <?php echo $woocommerce->cart->subtotal; ?> грн.</p>
                                    <div class="row">
                                        <a href="" onclick="location.href='<?php echo get_site_url (); ?>/редактировать-личные-данные'" class="btn btn_dang">Оформить заказ</a>
                                    </div>
                                    <div class="icon"></div>
                                    <div class="bag-step">
                                        <i></i>
                                        <a href="" onclick="myOrders('<?php echo get_site_url(); ?>/my-account#my_orders')" >Перейти в корзину</a>
                                    </div>
								</div>
                            </div>

                              <?php  }?>
                        </div>
                        <!-- header-main__i__row end-->
                        <div class="header-main__i__nav">
                            <ul>
                                <li>
                                    <a href="<?php echo get_site_url(); ?>/product-category/products/steering_gears/">Рулевые рейки
                                    </a>
                                </li>
                                <li>
                                    <a href="<?php echo get_site_url(); ?>/product-category/products/brakes_zimmerman/">Тормоза Zimmermann
                                    </a>
                                </li>
                                <li>
                                    <a href="<?php echo get_site_url(); ?>/product-category/products/suspension/">Подвеска H&R
                                    </a>
                                </li>
                                <li>
                                    <a href="<?php echo get_option('home'); ?>/services">Услуги СТО</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- header-main__i end-->

            </header>