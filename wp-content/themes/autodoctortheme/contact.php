<?php
/**
* @package WordPress
* @subpackage clean
* Template name: Контакты
*/
?>
	<?php include "header.php"; ?>
        <div class="content-main">
            <div class="wrap-center">
                <ul class="breadcrumb">
                        <li>
                            <a href="<?php echo get_option('home'); ?>">Интернет-магазин Autodoctor &rarr;
                            </a>
                        </li>
                        <li class="active"><?php the_title(); ?></li>
                    </ul>
                    <div class="main-title">
                        <span><?php the_title(); ?></span>
                    </div>
                    <div class="contact">
                        <?php
                            if (have_posts()): 
                                while (have_posts()): the_post();
                                    the_content(); echo '<br />';
                                endwhile; 
                            endif;  
                        ?>
                        <div class="address-form">
                            <form action="<?php echo get_page_link(); ?>">
                                <div class="title">
                                    <span>Пишите письма</span>
                                </div>
                                <div class="row">
                                    <input id="client_name" name="client_name" type="text" class="inp" placeholder="Как вас зовут" />
                                </div>
                                <div class="row">
                                    <input id="client_email" name="client_email" type="text" class="inp" placeholder="Почта" />
                                </div>
                                <div class="row">
                                    <input id="client_phone" name="client_phone" type="text" class="inp" placeholder="Ваш телефон" />
                                </div>
                                <div class="row">
                                    <textarea id="client_message" name="client_message" cols="30" rows="10" placeholder="Ваше сообщение"></textarea>
                                </div>
                                <div class="item">
                                    <div class="btn btn_white" style="cursor: pointer">
                                        <input type="submit" />Отправить</div>
                                </div>
                            </form>
                        </div>
                        <div class="big-line">
                            <a style="font-size: 60px">stoavtodoctor@rambler.ru</a>
                        </div>
                    </div>
                    <!-- contact end-->
            </div>
            <!-- wrap-center end-->
        </div>
        <?php include "footer.php"; ?>
    </div>
</div>


</body>




