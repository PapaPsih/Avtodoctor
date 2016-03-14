<?php
/**
* @package WordPress
* @subpackage clean
* Template name: Услуги СТО
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
                    <div class="services">
                        <div class="services__calc">
                            <div class="text">
                                <p>СТО «Автодоктор» это полный комплекс услуг по ремонту вашего авто: развал-схождение, ремонт рулевых реек, СТО.</p>
                                <p>Опыт работы — 7 лет!</p>
                            </div>
                            <div class="calc">
                                <i></i>

                                <p>Калькулятор стоимости услуг</p>
                                <b></b>
                            </div>
                            <div class="popup-calc">
                                <div class="close">
                                    <span class="line1"></span>
                                    <span class="line2"></span>
                                </div>
                                <div class="wrap">
                                    <div class="popup-calc__text">
                                        <p>Выбрав интересующую вас услугу, вы можете увидеть ее цену. А также вы можете добавлять услуги, чтобы узнать их общую стоимость.</p>
                                    </div>
                                    <div class="item">
                                        <select id = "categories" class="select-inp" data-placeholder="Загружается...">
                                            <option></option>
                                            <option value="WY">Загружается...</option>
                                        </select>
                                    </div>
                                    <div class="item">
                                        <select id = "services" class="select-inp" data-placeholder="Загружается...">
                                            <option></option>
                                            <option value="WY">Загружается...</option>
                                        </select>
                                    </div>
                                    <div class="sum">
                                        <span>Стоимость:
                                            <i id = "price_service">0</i>грн.</span>
                                    </div>
                                    <a onclick="PricesCalculator.appendService()" style = "cursor: pointer;" class="btn btn_dang">Добавить еще</a>                                    
                                </div>

                                <div id = "services-table" class="table">
                                    <div class="row row_title">
                                        <div class="row_i">
                                            <div class="col">
                                                <span>Категория</span>
                                            </div>
                                            <div class="col">
                                                <span>Услуга</span>
                                            </div>
                                            <div class="col">
                                                <span>Цена</span>

                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>

                                <div class="wrap">
                                    <div class="popup-calc__text">
                                        <b>Общая стоимость:
                                            <span id = "all_summ">1000</span>
                                        </b>
                                        <br>
                                        <a href = "#enroll" style = "cursor: pointer;" class="btn btn_dang">Перейти к записи</a>
                                        <p>Данный расчет не является публичной офертой. Он поможет Вам определить предварительную стоимость услуг. Окончательную цену Вы можете узнать у наших специалистов, после контрольного осмотра автомобиля.</p>
                                    </div>
                                </div>
                            </div>
                            <!-- popup-calc end-->
                        </div>
                        <!-- services__calc end-->
                        <div class="services__info">
                            <div class="title">
                                <h3>Чем мы можем вам помочь</h3>
                            </div>
                            <?php
                                $args = array( 'category' => '13' );

                                $posts_array = get_posts( $args );
                                foreach ( $posts_array as $post ){
                                    $url = get_field('url_forward', $post->ID);
                                    if(!$url) {
                                        $url = get_site_url().'/services/service/?service='.$post->ID;
                                    }
                                    $one_new_ui = '<div style="cursor:pointer" class="wrap-img" onclick="location.href=\''. $url .'\'">
                                                        <div class="img">'; 
                                    $image_source = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full );
                                    $one_new_ui .= '<img src="' . $image_source[0] . '" alt="thumbnail" />';
                                    $one_new_ui .= '</div>
                                                    <div class="text">
                                                        <div class="item">
                                                            <b>' . $post->post_title . '</b>
                                                            
                                                            <p>' . $post->post_content .'</p>
                                                        </div>
                                                    </div>
                                                </div>';  
                                    echo $one_new_ui;   
                                    
                                } //end foreach
                            ?>        
                        </div>
                        <!-- services__info end-->

                        <div class="info-work">
                            <?php
                                $args = array( 'category' => '14' );

                                $posts_array = get_posts( $args );
                                $row_counter = 0;
                                $one_new_ui = '';
                                foreach ( $posts_array as $post ){
                                    $url = get_field('url_forward', $post->ID);
                                    if(!$url) {
                                        $url = get_site_url().'/services/service/?service='.$post->ID;
                                    }
                                    $one_new_ui .= '<div style="cursor:pointer" class="col col_33" onclick="location.href=\''.$url.'\'">';
                                    $image_source = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full );
                                    $one_new_ui .= '<img src="' . $image_source[0] . '" alt="thumbnail" />';
                                    $one_new_ui .= '    <div class="tex">
                                                            <p>' . $post->post_title . '</p>
                                                        </div>
                                                    </div>';
                                    if($row_counter == 0){
                                        $row = '<div class="row">';
                                    }else if($row_counter == 2){
                                        $row .= $one_new_ui;
                                        $row .= '</div>';
                                        echo $row;
                                        $one_new_ui = '';
                                        $row_counter = -1;
                                    }  
                                    $row_counter++;
                                } //end foreach
                            ?>                 
                        </div>
                        

                        <!-- wrap-row end-->
                        <?php
                            if (have_posts()):
                                while (have_posts()): the_post();
                                    the_content(); echo '<br />';
                                endwhile;
                            endif;
                        ?>

                        <div class="reviews-slider">
                            <div class="reviews-slider_i">

                            </div>
                            <div class="title">
                                <h3>Отзывы клиентов</h3>
                            </div>
                            <div class="slide">
                             <?php
                              show_feedbacks('services');
                             ?>
                            </div>
                            <!-- slide end-->
                            <a href="#" class="btn btn_light btn-reviews">Оставить отзыв</a>
                        </div>
                        <!-- reviews-slider end-->
                    </div>
                    <!-- services end-->
                </div>
                <!-- wrap-center end-->
            </div>
            <div class="record-popup">
                <div class="close">
                    <span class="line1"></span>
                    <span class="line2"></span>
                </div>
                <div class="wrap">
                    <div class="img">
                        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/img/content/clock.png" alt="logo" />
                    </div>
                    <div class="text">
                        <p>Спасибо, мы вам в течении 5 минут перезвоним и уточним детали</p>
                    </div>
                </div>
            </div>

            <div class="revices-popup">
                <div class="revices-popup__close">

                </div>
                <div class="title">
                    <span>
                        Расскажите о нашем сервисе СТО
                    </span>
                </div>
                <form action="" class="revices-form" method="post">
                    <div class="row">
                        <textarea name="feedback_text" id="" cols="30" rows="10" placeholder="Оставьте ваш отзыв"></textarea>
                        <?php if (is_user_logged_in()) {?>
                            <input name="user_name" type="hidden" class="inp" value="<?php echo $current_user->user_login; ?>" />
                            <input name="user_email" type="hidden" class="inp" value="<?php echo $current_user->user_email; ?>" />
                        <?php } else { ?>
                            <input name="user_name" type="text" class="inp" placeholder="Ваше имя" />
                            <input name="user_email" type="text" class="inp" placeholder="Электронная почта" />
                        <?php } ?>
                        <input name="feedback_location" type="hidden" value="services">
                    </div>
                    <!-- row end-->
                    <div class="row">
                        <div class="row_i">
                            <div class="col col_50">
                                <select name="auto_brand" class="select-inp" data-placeholder="Марка автомобиля">
                                    <option></option>
                                    <option value="Mrecedess">Марка автомобиля</option>
                                    <option value="Honda">Марка автомобиля</option>
                                    <option value="Reno">Марка автомобиля</option>
                                </select>
                            </div>
                            <div class="col col_50">
                                <select name="model" class="select-inp" data-placeholder="Модель">
                                    <option></option>
                                    <option value="WY">Модель</option>
                                    <option value="AL">Модель</option>
                                    <option value="AL">Модель</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- row end-->
                    <div class="row">
                        <div class="soc">
                            <p>Войти используя</p>
                            <div class="social-likes" data-counters="no">
                                <a href="<?php echo esc_url( get_template_directory_uri() ); ?>/woocommerce/auth/auth_social_fb.php"><img style="margin: 5px 6px" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/img/content/social.png" height="29px" width="29px"/></a>
                                <a href="<?php echo esc_url( get_template_directory_uri() ); ?>/woocommerce/auth/auth_social.php"><img style="margin: 5px 6px;" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/img/content/c-vk.png" height="29px" width="29px"/></a>
                                <a href=""><img style="margin: 5px 6px;" src="<?php echo esc_url( get_template_directory_uri() ); ?>/static/img/content/c-g.png" height="29px" width="29px"/></a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <input type="submit" class="btn btn_dang"  value="Оставить отзыв" onclick="newFeedback()">
                    </div>
                </form>
            </div>

            <div class="rev-thank">
                <div class="revices-popup__close">

                </div>
                <span>Спасибо!</span>
            </div>
        <?php include "footer.php"; ?>
    </div>
</div>


</body>