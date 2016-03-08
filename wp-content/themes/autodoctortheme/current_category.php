<?php
/**
* @package WordPress
* @subpackage clean
* Template name: Категория
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
                        <span><?php the_title(); ?>
                             </span>
                    </div>
                    <div class="sorting">
                        <div class="row">
                            <div class="col">
                                <select class="select-inp" data-placeholder="Год выпуска">
                                    <option></option>
                                    <option value="WY">Год выпуска</option>
                                    <option value="AL">Год выпуска</option>
                                    <option value="AL">Год выпуска</option>
                                </select>
                            </div>
                            <div class="col">
                                <select class="select-inp" data-placeholder="Марка">
                                    <option></option>
                                    <option value="WY">Марка</option>
                                    <option value="AL">Марка</option>
                                    <option value="AL">Марка</option>
                                </select>
                            </div>
                            <div class="col">
                                <select class="select-inp" data-placeholder="Модель">
                                    <option></option>
                                    <option value="WY">Модель</option>
                                    <option value="AL">Модель</option>
                                    <option value="AL">Модель</option>
                                </select>
                            </div>
                            <div class="col">
                                <select class="select-inp" data-placeholder="Модификация">
                                    <option></option>
                                    <option value="WY">Модификация</option>
                                    <option value="AL">Модификация</option>
                                    <option value="AL">Модификация</option>
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
                                    <option></option>
                                    <option value="WY">Модификация</option>
                                    <option value="AL">Модификация</option>
                                    <option value="AL">Модификация</option>
                                </select>
                            </div>
                            <div class="col col_2 align-right">
                                <p>Вид:</p>
                                <select class="select-inp" data-placeholder="списком">
                                    <option></option>
                                    <option value="WY">Модификация</option>
                                    <option value="AL">Модификация</option>
                                    <option value="AL">Модификация</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- sorting end-->
                   <div class="brand-content">
                        <div class="brand-directory">
						
							<li <?php wc_product_cat_class(); ?>>
	<?php do_action( 'woocommerce_before_subcategory', $category ); ?>
	
	<a href="<?php echo get_term_link( $category->slug, 'product_cat' ); ?>">

		<?php
			/**
			 * woocommerce_before_subcategory_title hook
			 *
			 * @hooked woocommerce_subcategory_thumbnail - 10
			 */
			do_action( 'woocommerce_before_subcategory_title', $category );
		?>

		<h3>
			<?php
				echo $category->name;

				if ( $category->count > 0 )
					echo apply_filters( 'woocommerce_subcategory_count_html', ' <mark class="count">(' . $category->count . ')</mark>', $category );
			?>
		</h3>

		<?php
			/**
			 * woocommerce_after_subcategory_title hook
			 */
			do_action( 'woocommerce_after_subcategory_title', $category );
		?>

	</a>

	<?php do_action( 'woocommerce_after_subcategory', $category ); ?>
</li>
                        </div>
                        <!--brand-directory end-->
                    </div>
                    <!-- brand-content end-->
					
                    <?php if(count($posts_array) == 20){ ?>
                        <div class="more-preloader">
                            <a href="#">
                                <span class="more"></span>

                                <p>Загрузить больше товаров</p>
                            </a>
                        </div>
                    <?php } ?>
                    <div class="pagination-wrap">
                        <nav>
                            <ul id = "pagination" class="pagination">
                                <?php if(count($posts_array) == 20){ ?>
                                
                                <?php }else{ ?>
                                    <li class="active">
                                        <a href="#">1</a>
                                    </li>
                                <?php } ?>
                            </ul>
                        </nav>
                    </div>
                    <!-- pagination-wrap end-->
                </div>
                <!-- wrap-center end-->
            </div>
            <?php include "footer.php"; ?>
        </div>
    </div>


</body>