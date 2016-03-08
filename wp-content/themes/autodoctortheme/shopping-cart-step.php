<?php
/**
 * @package WordPress
 * @subpackage clean
 * Template name: Мой кабинет
 */
?>
<?php include "header.php";
?>
<body>
            <div class="content-main">
                <div class="wrap-center">
                    <ul class="breadcrumb">
                        <li>
                            <a href="#">Интернет-магазин Autodoctor &rarr;
                            </a>
                        </li>
                        <li class="active">Мой кабинет</li>
                    </ul>
                    <div class="main-title">
                        <span>Мой кабинет</span>
                    </div>

                    <div class="shopping-cart clearfix active-m">
                        <aside class="tabs">
                            <div class="tabs__control">
                                <ul>
                                    <li class="active">
                                        <a href="#">Личные данные</a>
                                    </li>
                                    <li>
                                        <a href="#">Мои заказы</a>
                                    </li>
                                    <li>
                                        <a href="#">Корзина</a>
                                    </li>
                                    <li>
                                        <a href="#">Рассылка</a>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                        <div class="shopping-cart__content">
                            <div class="tabs-body">
                            <?php if (is_user_logged_in()) { ?>
                                <section class="section-form active">
                                    <div class="wrap-form">
                                        <div class="title">
                                            <span>Основная информация</span>
                                        </div>

                                        <form id="new_data_form" action="" method="post" onsubmit = "return false;">
                                            <div class="row">
                                                <div class="col">
                                                    <p>Логин:</p>
                                                </div>
                                                <input name="login" type="text" class="inp" placeholder="Логин:" value="<?php echo $user_data->user_login; ?>" />
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p>Имя:</p>
                                                </div>
                                                <input name="new_first_name" type="text" class="inp" placeholder="Имя:" value="<?php echo $user_data->first_name; ?>" />
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p>Фамилия:</p>
                                                </div>
                                                <input name="new_last_name" type="text" class="inp" placeholder="Фамилия:" value="<?php  echo $user_data->last_name; ?>" />
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p>Электронная почтa:</p>
                                                </div>
                                                <input name="new_email" type="text" class="inp" placeholder="Электронная почтa:" value="<?php echo $user_data->user_email?>" />
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p>Телефон:</p>
                                                </div>
                                                <input name="new_phone" type="text" class="inp" placeholder="Телефон:" value="<?php echo $user_data->user_phone; ?>" />
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p>Адрес доставки:</p>
                                                </div>
                                                <input name="new_address" type="text" class="inp" placeholder="Адрес доставки:" value="<?php echo $user_data->address_delivery; ?>" />
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p>Номер новой почты:</p>
                                                </div>
                                                <input name="new_delivery_number" type="text" class="inp" placeholder="Номер новой почты:" value="<?php echo $user_data->number_delivery; ?>" />
                                            </div>
                                        </form>

                                    </div>
                                    <div class="wrap-form">
                                        <div class="title">
                                            <span>Пароль доступа</span>
                                        </div>
                                        <form id="new_pass_form" action="" method="post" onsubmit = "return false;">

                                            <div class="row">
                                                <div class="col">
                                                    <p>Текущий пароль:</p>
                                                </div>
                                                <input name="pass" type="text" class="inp" placeholder="" />
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p>Новый пароль:</p>
                                                </div>
                                                <input name="new_pass" type="text" class="inp" placeholder="" />
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p>Подверждение нового пароля:</p>
                                                </div>
                                                <input name="new_pass2" type="text" class="inp" placeholder="" />
                                            </div>
                                            <div class="btns">
                                                <div class="btn btn_dang">
                                                    <input type="button" />Отмена</div>
                                                <div class="btn btn_dang">
                                                    <input type="submit" onclick="applyChange('<?php echo $user_data->ID; ?>')" />Сохранить</div>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                                <?php } ?>

                                <section class="my-orders">
                                    <?php show_orders($current_user->ID); ?>
                                </section>
                                <section class="my-orders my-orders_bag ">
                                    <div class="table">
                                        <div class="row row_title">
                                            <div class="col col_1">
                                                <p>Описание товара</p>
                                            </div>
                                            <div class="col col_2">
                                                <p>Сумма</p>
                                            </div>
                                        </div>
                                        <!-- row end-->
                                        <?php show_bag ();?>

                                        <div class="row row_total">
                                            <div class="col col_1">
                                                <a href="#" class="btn btn_light">Продолжить покупки</a>
                                            </div>
                                            <div class="col col_2">
                                                <p>Итого:
                                                    <span class="total_price"><?php echo $woocommerce->cart->subtotal; ?></span> грн.</p>
                                                <a href="<?php echo get_site_url (); ?>/редактировать-личные-данные" class="btn btn_dang">Оформить заказ</a>
                                            </div>
                                        </div>
                                    </div>

                                </section>
                                <section class="section-form section-form_end">
                                    <div class="wrap-form">
                                        <div class="title">
                                            <span>Почтовая рассылка</span>
                                        </div>

                                        <div class="text">
                                            <div class="check">
                                                <input type="checkbox" id="cbtest1" />
                                                <label for="cbtest1" class="check-box">
                                                    <i></i>
                                                    <p></p>
                                                </label>
                                            </div>
                                            <b>Обзоры новинок и советы по выбору товаров</b>
                                            <p>
Статьи, видеообзоры и прочая полезная информация о товарах, а также будьте в курсе последних новостей, а также узнавайте первыми о акциях с суперценами, новинками и подарками</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <!-- tabs-body end-->
                        </div>
                        <!-- shopping-cart__content end-->
                    </div>
                    <!-- shopping-cart end-->
                    <div class="typography ">
                        <section class="section-form stage">
                            <div class="section-form__content">
                                <div class="wrap-form stage-active">
                                    <div class="title">
                                        <span>1. Контактные данные</span>
                                    </div>
                                    <form action="#">
                                        <div class="row">
                                            <div class="col">
                                                <p>Имя:</p>
                                            </div>
                                            <input type="text" class="inp" placeholder="" />
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <p>Фамилия:</p>
                                            </div>
                                            <input type="text" class="inp" placeholder="" />
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <p>Город:</p>
                                            </div>
                                            <input type="text" class="inp" placeholder="" />
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <p>Телефон:</p>
                                            </div>
                                            <input type="text" class="inp" placeholder="" />
                                        </div>
                                        <div class="item-btn">
                                            <div class="btn btn_grey">
                                                <input type="text" />Далее</div>
                                        </div>
                                    </form>
                                    <div class="edit">
                                        <a href="#">Редактировать</a>
                                    </div>
                                </div>
                                <div class="wrap-form">
                                    <div class="title">
                                        <span>2. Выбор способа доставки и оплаты</span>
                                    </div>
                                </div>

                            </div>

                            <div class="section-form__aside">
                                <div class="col">
                                    <img src="static/img/content/140x140-1.jpg" alt="logo" />

                                    <p>Рулевая рейка Toyota Camry 10</p>

                                    <div class="row">
                                        <div class="item">
                                            <p>1 шт.</p>
                                        </div>
                                        <div class="item">
                                            <p>3250 грн</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- col end-->
                                <div class="col">
                                    <img src="static/img/content/140x140-1.jpg" alt="logo" />

                                    <p>Рулевая рейка Toyota Camry 10</p>

                                    <div class="row">
                                        <div class="item">
                                            <p>1 шт.</p>
                                        </div>
                                        <div class="item">
                                            <p>3250 грн</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- col end-->
                                <div class="total">
                                    <div class="row">
                                        <div class="item">
                                            <p>
                                                <b>1 шт.</b>
                                            </p>
                                        </div>
                                        <div class="item">
                                            <p>
                                                <b>3250 грн</b>
                                            </p>
                                        </div>
                                    </div>
                                    <a href="#" class="btn btn_grey">Редактировать заказ</a>
                                </div>
                                <!-- total end-->
                            </div>
                        </section>
                    </div>
                    <!-- typography end-->
                    <div class="chart">
                        <div id="map2" style="width: 100%; height: 502px">

                        </div>
                    </div>
                    <!-- chart end-->
                </div>
                <!-- wrap-center end-->
            </div>

            <?php include "footer.php"; ?>
            </div>

            </div>


</body>
