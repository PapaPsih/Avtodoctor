<?php include "header.php"; ?>

            <div class="anchor scroll">
                <i></i>
                <span>Наверх</span>
            </div>
            <div class="content-main">
                <div class="wrap-center">
                    <?php
                    if ($_COOKIE['my_cookie_ad_main'] != 'hide')
                    {
                    $args = array(
                        'category' => '34',
                        'offset' => $offset
                    );
                    $posts_array = get_posts( $args );

                     foreach ( $posts_array as $post ){
                          if ($post->ID == 208)
                             echo $post->post_content;
                             }
                    }

                    ?>
                    <div class="info-brand">
                            <?php 
							$args = array(
								'taxonomy'     => 'product_cat',
								'orderby'      => 'name',
								'child_of'     => 17,
								'show_count'   => 0,
								'pad_counts'   => 0,
								'hierarchical' => 1,
								'title_li'     => '',
								'hide_empty'   => 0
							);

							$all_categories = get_categories( $args );
							$count = 0;

							foreach ($all_categories as $cat) 
							{
								$field_of_show = get_field('show_main', 'product_cat_'.$cat->term_id);
								
								if ($field_of_show[0] == 'yes')
								{
									$field_of_size = get_field('size', 'product_cat_'.$cat->term_id);
								
									if ($field_of_size == 'big_block')
									{
										$size = 50;
										
										$args = array( 'post_type' => 'product');
										$lastposts = get_posts( $args );
										$brands = array ();
										foreach ( $lastposts as $post ) 
										{
											$brand = get_post_meta($post->ID, 'Марка', true);
											if (!in_array($brand, $brands, false) && $brand != '')
											$brands[] = $brand;
										}
									}
									else $size = 25;
								
									$one_new_category_block = create_new_category_block( $cat , $size, $count, $brands);
									echo $one_new_category_block;
									$count++;
								}
							}

							?>      
                    </div>
                    <!-- info-brand end-->
                    <div class="reviews-slider">
                        <div class="title">
                            <h3>Отзывы клиентов</h3>
                        </div>
                        <div class="slide">
                            <?php
                                show_feedbacks('home');
                            ?>
                        </div>
                        <!-- slide end-->
                        <a href="#" class="btn btn_light btn-reviews">Оставить отзыв</a>
                    </div>
                    <!-- reviews-slider end-->
                    <div class="new-brand">
                        <div class="new-brand__row">
                            <div class="col-wrap col-wrap_50">
                                <div class="title">
                                    <a href="#">
                                        <span>Новости</span>
                                    </a>
                                </div>
                                <?php
                                    $args = array(
                                                'posts_per_page' => 2,
                                                'category' => '7,8'
                                            );
                                    $posts_array = get_posts( $args );
                                    $news_array = array('data' => array(),
                                                        'all_count' => count($posts_count));
                                    foreach ( $posts_array as $post ){
                                        $post_categories = wp_get_post_categories( $post->ID );
                                            
                                        $cat = get_category( $post_categories[0] );
                                            
                                            $one_new_ui = create_new_ui($post, 50);          
                                        echo $one_new_ui;                                 
                                    } //end foreach 
                                ?>
                            </div>
                            <div class="col-wrap col-wrap_50">
                                <div class="title">
                                    <span>Статьи</span>
                                </div>
                                <?php
                                    $args = array(
                                                'posts_per_page' => 2,
                                                'category' => '15,16',
                                                'offset' => $offset
                                            );
                                    $posts_array = get_posts( $args );
                                    $news_array = array('data' => array(),
                                                        'all_count' => count($posts_count));
                                    foreach ( $posts_array as $post ){
                                        $post_categories = wp_get_post_categories( $post->ID );
                                            
                                        $cat = get_category( $post_categories[0] );
                                        
                                        $one_new_ui = create_article_ui($post, 50);         
                                        echo $one_new_ui;                                 
                                    } //end foreach 
                                ?>
                            </div>
                        </div>
                        <!-- new-brand__row end-->
                    </div>
                    <!-- new-brand end-->
                    <div class="social-c">
                        <div class="social-c__row">
                            <div class="col col_25">
                                <div class="title">
                                    <span>Подпишись на наши обновления, и получи 5% скидку на услуги СТО</span>
                                </div>
                                <a href="#" class="btn btn_primary">Подписаться</a>
                            </div>
                            <div class="col col_25">
                                <div class="title">
                                    <span>Подпишись на наши обновления, и получи 5% скидку на услуги СТО</span>
                                </div>
                                <a href="#" class="btn btn_primary">Подписаться</a>
                            </div>
                            <div class="col col_25">
                                <div class="title">
                                    <span>Подпишись на наши обновления, и получи 5% скидку на услуги СТО</span>
                                </div>
                                <a href="#" class="btn btn_primary">Подписаться</a>
                            </div>
                            <div class="col col_25 social">
                                <div class="title">
                                    <span>Нас рекомендуют друзьям</span>
                                </div>
                                <div class="social-likes social-likes_vertical">
                                    <div class="facebook" title="Поделиться ссылкой на Фейсбуке">Facebook</div>
                                    <div class="twitter" title="Поделиться ссылкой в Твиттере">Twitter</div>
                                    <div class="plusone" title="Поделиться ссылкой в Гугл-плюсе">Google+</div>
                                </div>
                            </div>
                        </div>
                        <!-- social-c__row end-->
                    </div>
                    <!-- social-c end-->
                    <div class="auto-info">
                        <div class="title">
                            <span>Рулевое управление вашего авто</span>

                            <p>Автодоктор — лучший выбор</p>
                        </div>
                        <div class="text">
                            <p>Вас интересует рулевая рейка, тормозная система, аккумуляторы и прочие товары для авто? Все это вы можете купить прямо сейчас, сэкономив уйму времени! Интернет-магазин Doc-Service™ с радостью поможет вам избежать необходимости
                                посещать десятки магазинов.
                            </p>

                            <p>Вы можете заказать любой товар, не вставая со своего кресла, а наш курьер вовремя доставит покупку по указанному адресу. Вас интересует рулевая рейка, тормозная система, аккумуляторы и прочие товары для авто? Все это вы можете
                                купить прямо сейчас, сэкономив уйму времени! Интернет-магазин Doc-Service™ с радостью поможет вам избежать необходимости посещать десятки магазинов.</p>

                            <p>Вы можете заказать любой товар, не вставая со своего кресла, а наш курьер вовремя доставит покупку по указанному адресу.</p>
                        </div>
                        <div class="btn-wrap align-center">
                            <a href="#" class="btn btn_light">Хочу знать больше</a>

                        </div>
                    </div>
                    <!-- auto-info end-->
                </div>
                <!-- wrap-center end-->
            </div>
            <div class="revices-popup">
                <div class="revices-popup__close"></div>
                <div class="title">
                    <span>
                        Расскажите о своих впечатлениях
                        <br/>о нашем сервисе
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
                        <input name="feedback_location" type="hidden" value="home">
                    </div>
                    <!-- row end-->
                    <div class="row" id="filter">
                        <div class="row_i">
                            <div class="col col_50">
                                <select id="auto_brand" name="auto_brand" class="select-inp" data-placeholder="Марка автомобиля" onclick="select_filter_feedback()">
                                    <option></option>
                                    <?php
                                    include TECDOC_LOADER_PLUGIN_DIR.'tecdoc_base/tecdoc.php';
                                    $data_array = getBrands($tecdoc_db_link);

                                    foreach ($data_array as $value)
                                    {
                                        echo '<option value="'.$value['ID'].'">'.$value['name'].'</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="col col_50">
                                <select id="model" name="model" class="select-inp" data-placeholder="Модель">
                                    <option></option>

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
