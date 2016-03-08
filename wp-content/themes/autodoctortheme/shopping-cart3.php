<?php
/**
 * @package WordPress
 * @subpackage clean
 * Template name: Редактировать личные данные
 */
?>
<?php include "header.php";
$user_data = get_userdata($current_user->ID);
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

<div class="shopping-cart clearfix ">
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
<section class="section-form active">
    <div class="wrap-form">
        <div class="title">
            <span>Основная информация</span>
        </div>
        <form action="#">
            <div class="row">
                <div class="col">
                    <p>Имя:</p>
                </div>
                <input type="text" class="inp" placeholder="Имя:" />
            </div>
            <div class="row">
                <div class="col">
                    <p>Фамилия:</p>
                </div>
                <input type="text" class="inp" placeholder="Фамилия:" />
            </div>
            <div class="row">
                <div class="col">
                    <p>Электронная почтa:</p>
                </div>
                <input type="text" class="inp" placeholder="Электронная почтa:" />
            </div>
            <div class="row">
                <div class="col">
                    <p>Телефон:</p>
                </div>
                <input type="text" class="inp" placeholder="Телефон:" />
            </div>
            <div class="row">
                <div class="col">
                    <p>Адрес доставки:</p>
                </div>
                <input type="text" class="inp" placeholder="Адрес доставки:" />
            </div>
            <div class="row">
                <div class="col">
                    <p>Номер новой почты:</p>
                </div>
                <input type="text" class="inp" placeholder="Номер новой почты:" />
            </div>
        </form>
    </div>
    <div class="wrap-form">
        <div class="title">
            <span>Пароль доступа</span>
        </div>
        <form action="#">

            <div class="row">
                <div class="col">
                    <p>Текущий пароль:</p>
                </div>
                <input type="text" class="inp" placeholder="" />
            </div>
            <div class="row">
                <div class="col">
                    <p>Новый пароль:</p>
                </div>
                <input type="text" class="inp" placeholder="" />
            </div>
            <div class="row">
                <div class="col">
                    <p>Подверждение нового пароля:</p>
                </div>
                <input type="text" class="inp" placeholder="" />
            </div>
            <div class="btns">
                <div class="btn btn_dang">
                    <input type="button" />Отмена</div>
                <div class="btn btn_dang">
                    <input type="button" />Сохранить</div>
            </div>
        </form>
    </div>
</section>

<section class="my-orders">
    <div class="table">
        <div class="row row_t">
            <div class="col col_1">
                <p>
                    <b>№ 236589</b>
                    <i>, 3 июня 2015, 08:45</i>
                </p>
            </div>
            <div class="col col_2">
                <p>
                    <b>№ 236589</b>
                </p>
            </div>
            <div class="col col_3">
                <p>
                    <b>Сумма</b>
                </p>
            </div>
        </div>
        <!-- row end-->
        <div class="row">
            <div class="col col_1">
                <img src="static/img/content/140x140-1.jpg" alt="logo" />
                <div class="info">
                    <p>Рулевая рейка Toyota Camry 10</p>
                </div>
            </div>
            <div class="col col_2">
                <p>1 шт.</p>
            </div>
            <div class="col col_3">
                <p>3 250 грн</p>
            </div>
        </div>
        <!-- row end-->
        <div class="row">
            <div class="col col_1">
                <img src="static/img/content/140x140-2.jpg" alt="logo" />
                <div class="info">
                    <p>Рулевая рейка Toyota Camry 10</p>
                </div>
            </div>
            <div class="col col_2">
                <p>1 шт.</p>
            </div>
            <div class="col col_3">
                <p>3 250 грн</p>
            </div>
        </div>
        <!-- row end-->
        <div class="row row_l">
            <div class="col col_1">
                <p>
                    <b>Доставка (самовывоз из Новой почты)</b>
                </p>
            </div>
            <div class="col col_2">
                <p></p>
            </div>
            <div class="col col_3">
                <p>40 грн.</p>
            </div>
        </div>
        <!-- row end-->
        <div class="row row_total">
            <div class="col col_1">
                <p>Статус заказа: Отправлен</p>
            </div>
            <div class="col col_2">
                <p>Итого:
                    <span>10 882,88</span>грн.</p>
            </div>
        </div>
    </div>
    <div class="table">
        <div class="row">
            <div class="col col_1">
                <p>
                    <b>№ 236589</b>
                    <i>, 3 июня 2015, 08:45</i>
                </p>
            </div>
            <div class="col col_2">
                <p>
                    <b>№ 236589</b>
                </p>
            </div>
            <div class="col col_3">
                <p>
                    <b>Сумма</b>
                </p>
            </div>
        </div>
        <!-- row end-->
        <div class="row">
            <div class="col col_1">
                <img src="static/img/content/140x140-1.jpg" alt="logo" />
                <div class="info">
                    <p>Рулевая рейка Toyota Camry 10</p>
                </div>
            </div>
            <div class="col col_2">
                <p>1 шт.</p>
            </div>
            <div class="col col_3">
                <p>3 250 грн</p>
            </div>
        </div>
        <!-- row end-->
        <div class="row">
            <div class="col col_1">
                <img src="static/img/content/140x140-2.jpg" alt="logo" />
                <div class="info">
                    <p>Рулевая рейка Toyota Camry 10</p>
                </div>
            </div>
            <div class="col col_2">
                <p>1 шт.</p>
            </div>
            <div class="col col_3">
                <p>3 250 грн</p>
            </div>
        </div>
        <!-- row end-->
        <div class="row row_l">
            <div class="col col_1">
                <p>
                    <b>Доставка (самовывоз из Новой почты)</b>
                </p>
            </div>
            <div class="col col_2">
                <p></p>
            </div>
            <div class="col col_3">
                <p>40 грн.</p>
            </div>
        </div>
        <!-- row end-->
        <div class="row row_total">
            <div class="col col_1">
                <p>Статус заказа: Отправлен</p>
            </div>
            <div class="col col_2">
                <p>Итого:
                    <span>10 882,88</span>грн.</p>
            </div>
        </div>
        <div class="row row_last">
            <div class="col align-right">
                <a href="#" class="btn btn_dang">Оплатить</a>
            </div>
        </div>
    </div>

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
        <div class="row">
            <div class="col col_1">
                <img src="static/img/content/140x140-1.jpg" alt="logo" />
                <div class="info">
                    <p>Рулевая рейка Toyota Camry 10</p>
                </div>
            </div>
            <div class="col col_2">
                <div class="counter">
                    <a href="#" class="minus">-</a>
                    <input type="text" value="0" />
                    <a href="#" class="pluse">+</a>

                </div>
            </div>
            <div class="col col_3">
                <p>3 250 грн</p>
                <a href="#" class="delete"></a>
            </div>

        </div>
        <!-- row end-->
        <div class="row">
            <div class="col col_1">
                <img src="static/img/content/140x140-1.jpg" alt="logo" />
                <div class="info">
                    <p>Рулевая рейка Toyota Camry 10</p>
                </div>
            </div>
            <div class="col col_2">
                <div class="counter">
                    <a href="#" class="minus">-</a>
                    <input type="text" value="0" />
                    <a href="#" class="pluse">+</a>

                </div>
            </div>
            <div class="col col_3">
                <p>3 250 грн</p>
                <a href="#" class="delete"></a>
            </div>

        </div>
        <!-- row end-->
        <div class="row">
            <div class="col col_1">
                <img src="static/img/content/140x140-1.jpg" alt="logo" />
                <div class="info">
                    <p>Рулевая рейка Toyota Camry 10</p>
                </div>
            </div>
            <div class="col col_2">
                <div class="counter">
                    <a href="#" class="minus">-</a>
                    <input type="text" value="0" />
                    <a href="#" class="pluse">+</a>

                </div>
            </div>
            <div class="col col_3">
                <p>3 250 грн</p>
                <a href="#" class="delete"></a>
            </div>

        </div>
        <!-- row end-->
        <div class="row">
            <div class="col col_1">
                <img src="static/img/content/140x140-1.jpg" alt="logo" />
                <div class="info">
                    <p>Рулевая рейка Toyota Camry 10</p>
                </div>
            </div>
            <div class="col col_2">
                <div class="counter">
                    <a href="#" class="minus">-</a>
                    <input type="text" value="0" />
                    <a href="#" class="pluse">+</a>

                </div>
            </div>
            <div class="col col_3">
                <p>3 250 грн</p>
                <a href="#" class="delete"></a>
            </div>

        </div>
        <!-- row end-->

        <div class="row row_total">
            <div class="col col_1">
                <a href="#" class="btn btn_light">Продолжить покупки</a>
            </div>
            <div class="col col_2">
                <p>Итого:
                    <span>10 882,88</span>грн.</p>
                <a href="#" class="btn btn_dang">Оформить заказ</a>
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
<div class="typography active-m">
    <section class="section-form stage">
        <div class="section-form__content">

            <div class="wrap-form stage-active">
                <div class="title">
                    <span>1. Контактные данные</span>
                </div>
                <form action="<?php echo get_site_url(); ?>/выбор-способа-доставки" method="post">
                    <div class="row">
                        <div class="col">
                            <p>Имя:</p>
                        </div>
                        <input type="text" class="inp" name="new_first_name" value="<?php echo $user_data->user_firstname; ?>" />
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>Фамилия:</p>
                        </div>
                        <input type="text" class="inp" name="new_last_name" value="<?php echo $user_data->user_lastname; ?>" />
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>Город:</p>
                        </div>
                        <input type="text" class="inp" name="city" value="<?php echo $user_data->user_city; ?>" />
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>Телефон:</p>
                        </div>
                        <input type="text" name="new_phone" class="inp" value="<?php echo $user_data->user_phone; ?>" />

                    </div>
                    <div class="item-btn">
                        <div class="btn btn_grey">
                            <input type="submit" onsubmit = "return false;" onclick="applyChange('<?php echo $user_data->ID; ?>')"  />Далее</div>
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

            <?php

            show_bag_mini();

            ?>

            <div class="total">
                <div class="row">
                    <div class="item">
                        <p>
                            <b><?php echo $woocommerce->cart->cart_contents_count; ?> шт.</b>
                        </p>
                    </div>
                    <div class="item">
                        <p>
                            <b><?php echo $woocommerce->cart->subtotal; ?> грн</b>
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
<div class="chart ">
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
