<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive.
 *
 * Override this template by copying it to yourtheme/woocommerce/archive-product.php
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $wp_query;
// get the query object
$cat_obj = $wp_query->get_queried_object();

if($cat_obj)    {
    $category_ID  = $cat_obj->term_id;
}

$term = get_term( $category_ID, 'product_cat' );

get_header( 'shop' ); ?>

		<div class="content-main">
                <div class="wrap-center">
                    <ul class="breadcrumb">
                        <li>
                            <a href="#">Интернет-магазин Autodoctor &rarr;
                            </a>
                        </li>
                        <li class="active"><?php woocommerce_page_title(); ?></li>
                    </ul>
                    <div class="main-title">
                        <span><?php woocommerce_page_title(); ?>
                            <i><?php echo $term->count; ?></i>
                        </span>
                    </div>
                    <div class="sorting">
                        <div  class="row">
                            <?php
                                $db = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);
                            ?>

                            <div class="col">
                                <select id="brand" class="select-inp" data-placeholder="Марка" onclick="select_filter('model',<?php echo $category_ID ?>)" onchange="$('#model').val('')">
                                    <option value="">ВСЕ</option>
                                    <?php
                                        $brands = $db->get_results("SELECT DISTINCT brand FROM wp_product_filters");
                                            foreach ($brands as $brand)
                                            {
                                                echo '<option value="'.$brand->brand.'">'.$brand->brand.'</option>';
                                            }
                                    ?>

                                </select>
                            </div>
                            <div class="col">
                                <select id="model" class="select-inp" data-placeholder="Модель" onclick="select_filter('year',<?php echo $category_ID ?> )">
                                    <option></option>
                                </select>
                            </div>
                            <div class="col">
                                <select id="year" class="select-inp" data-placeholder="Год выпуска" onclick="select_filter('modify', <?php echo $category_ID ?>)">
                                    <option></option>
                                </select>
                            </div>
                            <div class="col">
                                <select id="modify" class="select-inp" data-placeholder="Модификация" onclick="select_filter('done', <?php echo $category_ID ?>)">
                                    <option></option>

                                </select>
                            </div>

                            <div class="col">
                                <a href="#" class="btn btn_dang">Подобрать</a>
                            </div>
                        </div>
                        <div class="item">
                            <div class="col">
                                <p>Выводить:</p>
                                <select class="select-inp" data-placeholder="от дешевых к дорогим">
                                    <option>от дешевых к дорогим</option>
                                    <option value="WY">от дорогих к дешевым</option>

                                </select>
                            </div>

                        </div>
                    </div>
                    <!-- sorting end-->
                    <div class="brand-content">
                        <div id="brand-directory" class="brand-directory">
                            <?php
                            /*
                            $args = array(
                                'post_type' => 'product',
                                'posts_per_page' => 3,
                                'product_cat' => 'steering_gears'
                            );

                            $loop = new WP_Query( $args );

                            woocommerce_product_loop_start();

                            woocommerce_product_subcategories();


                            while ( $loop->have_posts()) {
                                $loop->the_post();

                                wc_get_template_part( 'content', 'product' );

                            }

                            woocommerce_product_loop_end();*/

                            show_products_category ();
                            ?>
                        </div>
                        <!--brand-directory end-->
                    </div>
                    <!-- brand-content end-->
                    <div class="more-preloader">
                        <a style="cursor:pointer" onclick="show_more_products(<?php if ($_GET['show_more']) echo $_GET['show_more']; else echo '0'; ?> , '<?php echo get_site_url().'/product-category/products/'.$cat_obj->slug; ?>')"  onsubmit = "return false;">
                            <span class="more" ></span>
                            <p>Загрузить больше товаров</p>
                        </a>
                    </div>
                    <div id="pagination-wrap" class="pagination-wrap">
                        <?php  wc_get_template_part( 'pagination' ); ?>
                    </div>
                    <!-- pagination-wrap end-->
                </div>
                <!-- wrap-center end-->
            </div>
        </div>
    </div>

<?php get_footer( 'shop' ); ?>
