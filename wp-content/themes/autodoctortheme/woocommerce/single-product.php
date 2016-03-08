<?php
/**
 * The Template for displaying all single products.
 *
 * Override this template by copying it to yourtheme/woocommerce/single-product.php
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); ?>

<div class="content-main">
                <div class="wrap-center">
                    <ul class="breadcrumb">
                        <li>
                            <a href="#">Интернет-магазин Autodoctor &rarr;
                            </a>
                        </li>
                        <li class="active"><?php
                            add_filter( 'woocommerce_breadcrumb_defaults', 'jk_change_breadcrumb_home_text' );
                            function jk_change_breadcrumb_home_text( $defaults ) {

                                $defaults['home'] = '';
                                return $defaults;
                            }
                            $args = array(
                                'delimiter' => '&rarr;'); woocommerce_breadcrumb($args); ?></li>
                    </ul>
 
					 <div class="main-title">
                        <span><?php the_title();?></span>
						
                    </div>

                    <div class="one-brand clearfix">
                        <div class="one-brand-slider">
	
                            <div class="one-brand-slider-wrap">
                                  <?php

                                  $src = wp_get_attachment_image_src( get_post_thumbnail_id($id), 10);

                                  if ($src[0])
                                      $img .= '<div class="col">
										<img src='.$src[0].' alt="logo" />
										</div>';

                             $attachment_ids = $product->get_gallery_attachment_ids();

                             foreach( $attachment_ids as $attachment_id )
                             {
										$img .= '<div class="col">
										<img src='.wp_get_attachment_url( $attachment_id ).' alt="logo" />
										</div>';
                             }
                                  echo $img;
									?>
                            </div>

                        </div>
                        <!-- one-brand-slider end-->
                        <div class="one-brand_info">
                            <div class="ind">
                              <?php

							echo '<span itemprop="productID" class="sku">Артикул: ' .$product->get_sku(). '</span>'; ?> 
                                <p>
                                    <i></i><?php if ($product->is_in_stock()) echo "Есть в наличии";  else echo "Нет в наличии"; ?></p>
                            </div>
                            <div class="price">
                                <b>Цена:</b>

                                <p><?php echo $product->get_price(); ?></p>
                                <b>грн</b>
                            </div>
                            <a name="add_to_cart" href="<?php get_page_link() ?>?cart=add_to_cart&id=<?php echo $product->id ?>" class="btn btn_dang">
                                <i></i>Купить</a>
                            <div class="info-main">
                                <div class="col">
                                    <div class="title">
                                        <span class="del">
                                            <i></i>Доставка</span>
                                    </div>
                                    <p>Доставка по Одессе — 40 грн. Адресная доставка в любой город — от 35 грн.</p>
                                </div>
                                <div class="col col_50">
                                    <div class="title">
                                        <span class="payment">
                                            <i></i>Оплата</span>
                                    </div>
                                    <p>Наличными курьеру; безналичная для юр. лиц; Visa/ Mastercard, Приват 24.</p>
                                </div>
                                <div class="col col_50">
                                    <div class="title">
                                        <span class="guarantee">
                                            <i></i>Гарантия 6
                                            <br/>месяцев
                                        </span>
                                    </div>
                                    <p>Возврат или обмен в течении 14 дней.</p>
                                </div>
                            </div>
                        </div>
                        <!-- one-brand_info end-->
                    </div>
                    <!-- one-brand end-->
                    <?php
                    $args = array(
                        'category' => '34',
                        'offset' => $offset
                    );
                    $posts_array = get_posts( $args );

                    $product_cats = wp_get_post_terms( get_the_ID(), 'product_cat' );

                    $single_cat = array_shift( $product_cats );

                    $check = false;

                    foreach ( $posts_array as $post ){

                        if ($single_cat->term_id == get_field('location', $post->ID) && $_COOKIE['my_cookie_ad_cat'] != $single_cat->term_id)
                        {
                            $html = $post->post_content;
                            echo $html;

                            $check = true;
                        }
                        if (get_field('location', $post->ID) == 0)
                            $default = $post->post_content;
                    }

                    if (!$check)
                        echo $default;
                    ?>


                    <div class="feedback">
                        <div class="feedback__i">
                            <div class="col">
                                <div class="title">
                                    <span>Характеристики</span>
                                </div>

                                <?php
                                $attributes = $product->get_attributes();
                                foreach ($attributes as $attribute)
                                {
                                    if ($attribute['is_visible'])
                               echo '<div class="row">
                                    <div class="item">
                                        <b>'.$attribute['name'].'</b>
                                    </div>
                                    <div class="item">
                                        <p>'.$attribute['value'].'</p>
                            </div>
                        </div>';
                                }

                                ?>

                            </div>
                            <div class="col">
                                <div class="title">
                                    <span>Отзывы о товаре и сервисе магазина</span>
                                </div>
                                <div id="feedback-error"></div>

                                <ul class="media-list" id="feedback_list" >

                                     <?php show_feedbacks_product ($product->id) ?>

                                </ul>
                                <!-- media-list end-->

                                <form onsubmit = "return false;" action="" method="post" id="feedback_form" class="revices-form">
                                    <div class="row">
                                        <div class="textarea">
                                            <span class="face-people"></span>
                                            <textarea id="feedback_text" name="feedback_text" cols="30" rows="10" value="" placeholder="Оставьте ваш отзыв" ></textarea>

                                        </div>
                                        <input type="hidden" name="id_product" value="<?php echo $product->id; ?>" />
										<input type="hidden" name="feedback_location" value="product">
                                        <?php if (is_user_logged_in()) {?>
                                        <input name="user_name" type="hidden" class="inp" value="<?php echo $current_user->user_login; ?>" />
                                        <input name="user_email" type="hidden" class="inp" value="<?php echo $current_user->user_email; ?>" />
                                        <?php } else { ?>
                                        <input name="user_name" type="text" class="inp" placeholder="Ваше имя" />
                                        <input name="user_email" type="text" class="inp" placeholder="Электронная почта" />
                                        <?php } ?>
                                        <input type="hidden" name="answer_id" id="answer_id" value="" >
                                    </div>
                                    <!-- row end-->
                                    <?php if (!is_user_logged_in()) { ?>
                                    <div class="row">
                                        <div class="soc">
                                            <p>Войти используя</p>

                                            <div class="social-likes" data-counters="no">
                                                <div class="facebook" title="Поделиться ссылкой на Фейсбуке">Facebook</div>
                                                <div class="vkontakte" title="Поделиться ссылкой во Вконтакте">Вконтакте
                                                </div>
                                                <div class="plusone" title="Поделиться ссылкой в Гугл-плюсе">Google+</div>
                                            </div>
                                        </div>
                                    </div> <?php } ?>
                                    <div class="row">
                                        <input type="submit" class="btn btn_dang" value="Оставить отзыв" onclick = "newFeedback()" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- feedback end-->
                    <?php if($product->get_upsells()) { ?>
                    <div class="similar-goods">
                        <div class="title">
                            <span>C этим товаром покупают</span>
                        </div>
                        <div class="similar-goods-slider">
                            <div class="similar-goods-slider__i">
                                <div class="brand-directory">
                                    <?php
                                    show_brand_directory_upsells($product->id);
                                    ?>

                                </div>
                                <!--brand-directory end-->
                            </div>
                        </div>
                        <!-- similar-goods-slider end-->
                    </div>
                    <!-- similar-goods end-->
                        <?php } if ($product->get_cross_sells()) { ?>
                <div class="similar-goods">
                    <div class="title">
                        <span>Товары аналоги </span>
                    </div>
                    <div class="similar-goods-slider">
                        <div class="similar-goods-slider__i">
                            <div class="brand-directory">
                                <?php
                                show_brand_directory_crossells($product->id);
                                ?>
                            </div>
                            <!--brand-directory end-->
                        </div>
                    </div>
                    <!-- similar-goods-slider end-->
                </div>
                <!-- similar-goods end-->

                <?php } ?>

                </div>
                <!-- wrap-center end-->

<?php get_footer( 'shop' ); ?>
