<?php
/**
 * @package WordPress
 * @subpackage clean
 * Template name: Подкатегории
 */
?>
<?php include "header.php";?>

<?php

if ($_GET['cat_id'])
{
$args = array(
    'taxonomy'     => 'product_cat',
    'orderby'      => 'name',
    'parent'     => $_GET['cat_id'],
    'show_count'   => 0,
    'pad_counts'   => 0,
    'hierarchical' => 1,
    'title_li'     => '',
    'hide_empty'   => 0
);

$all_categories = get_categories( $args );

$term = get_term( $_GET['cat_id'], 'product_cat' );
}
?>

<div class="content-main">
    <div class="wrap-center">
        <ul class="breadcrumb">
            <li>
                <a href="#">Автодоктор &rarr;</a>
            </li>
            <li class="active"><?php  echo $term->name; ?></li>
        </ul>
        <div class="main-title">
                <span><?php echo $term->name; ?>
                    <i><?php echo count($all_categories); ?></i>
                </span>
        </div>

        <div class="new-brand categories">
            <div class="new-brand__row">
                <div class="col-wrap">
                    <?php

                    if ($_GET['cat_id'])
                    {

                    foreach ($all_categories as $cat)
                    {
                        $thumbnail_id = get_woocommerce_term_meta( $cat->term_id, 'thumbnail_id', true );
                        $image = wp_get_attachment_url( $thumbnail_id );

                        $children = get_term_children($cat->term_id, 'product_cat');

                        if( empty( $children ) )
                            $url = get_site_url().'/product-category/products/'.$cat->slug;
                        else
                            $url = get_site_url().'/subcategories?cat_id='.$cat->term_id;

                    $cat_block .= '<div class="col col_25" style="cursor: pointer" onclick="location.href=\''.$url.'\'">
                        <div class="img">
                            <img src="'.$image.'" alt="logo" />
                        </div>
                        <div class="delivery-text">
                            <div class="delivery-text_title">
                                <span>'.$cat->name.'</span>
                            </div>
                        </div>
                    </div>';
                    }
                    echo $cat_block;
                    }
                    ?>

                </div>
            </div>
            <!-- new-brand__row end-->
        </div>
        <!-- new-brand end-->
    </div>
    <!-- wrap-center end-->
</div>

<?php get_footer( 'shop' ); ?>
