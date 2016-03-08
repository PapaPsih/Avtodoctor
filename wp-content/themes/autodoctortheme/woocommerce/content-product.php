<?php
/**
 * The template for displaying product content within loops.
 *
 * Override this template by copying it to yourtheme/woocommerce/content-product.php
 *
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.4.0
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product, $woocommerce_loop;

// Store loop count we're currently on
if ( empty( $woocommerce_loop['loop'] ) ) {
	$woocommerce_loop['loop'] = 0;
}

// Store column count for displaying the grid
if ( empty( $woocommerce_loop['columns'] ) ) {
	$woocommerce_loop['columns'] = apply_filters( 'loop_shop_columns', 4 );
}

// Ensure visibility
if ( ! $product || ! $product->is_visible() ) {
	return;
}

// Increase loop count
$woocommerce_loop['loop']++;

// Extra post classes
$classes = array();
if ( 0 == ( $woocommerce_loop['loop'] - 1 ) % $woocommerce_loop['columns'] || 1 == $woocommerce_loop['columns'] ) {
	$classes[] = 'first';
}
if ( 0 == $woocommerce_loop['loop'] % $woocommerce_loop['columns'] ) {
	$classes[] = 'last';
}
global $id;
?>
<div id="product_item_<?php echo $id; ?>" class="col col_25" onmouseover="document.getElementById('product_item_<?php echo $id; ?>').className='col col_25 active-product'" onmouseout="document.getElementById('product_item_<?php echo $id; ?>').className='col col_25'">
	<a href="<?php the_permalink(); ?>">
    <div class="<?php if ($product->is_in_stock()) echo 'info-a there'; else echo 'info-a none'; ?>">
        <span><?php if ($product->is_in_stock()) echo "Есть в наличии"; else echo "Нет в наличии"; ?></span>
    </div>
    <div class="img" style="height: 300px">
        <?php do_action( 'woocommerce_before_shop_loop_item_title' ); ?>
    </div>
    <div class="wrap-info" style="height: 210px">
        <div class="title">
            <span><?php echo the_title(); ?></span>
        </div>
        <div class="price">
            <i>Цена:</i>
            <b><?php do_action( 'woocommerce_after_shop_loop_item_title' ); ?></b>
            <i>грн</i>
        </div>
        <div class="buy">
            <?php do_action( 'woocommerce_after_shop_loop_item' ); ?>
        </div>

    </div>
    </a>
</div>

<?php
/*
$one_product .= '<div id="product_item_'.$id.'" class="col col_25" onmouseover="document.getElementById(\'product_item_'.$id.'\').className=\'col col_25 active-product\'" onmouseout="document.getElementById(\'product_item_'.$id.'\').className=\'col col_25\'">
    <a href="'.the_permalink().'">
        <div class="';
if ($product->is_in_stock()) $one_product .='info-a there'; else $one_product .= 'info-a none';
$one_product .= '">
        <span>';
        if ($product->is_in_stock()) $one_product .= "Есть в наличии"; else $one_product .= "Нет в наличии";
$one_product .= '</span>
        </div>
        <div class="img">
            '.do_action( 'woocommerce_before_shop_loop_item_title' ).'
        </div>
        <div class="wrap-info">
            <div class="title">
                <span>'.do_action( 'woocommerce_shop_loop_item_title' ).'</span>
            </div>
            <div class="price">
                <i>Цена:</i>
                <b>'.do_action( 'woocommerce_after_shop_loop_item_title' ).'</b>
                <i>грн</i>
            </div>
            <div class="buy">
                '.do_action( 'woocommerce_after_shop_loop_item' ).'
            </div>

        </div>
    </a>
</div>';

echo $one_product;
*/
?>