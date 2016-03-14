<?php
/**
Plugin Name: Product Filter
Plugin URI: none
Description: Плагин для фильтрации товаров на странице товара категории
Version: 1.0.0
Author: WebUniverse
Author URI: http://webuniverse.com.ua/
*/
define( 'PRODUCT_FILTER_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'PRODUCT_FILTER_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

add_action('wp_ajax_select_filter', 'select_filter');
add_action('wp_ajax_nopriv_select_filter', 'select_filter');

function select_products ($category, $brand = '', $model = '', $year = '', $modify = '')
{
    $mydb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);

    if ($category)
    {
        if ($modify != '')
            $result_products = $mydb->get_results("SELECT id_product FROM wp_product_filters WHERE modify = '".$modify."' AND model = '".$model."' AND brand = '".$brand."' AND cat_id = ".$category." AND start_year <= ".$year." <= end_year");
        else if ($year != '')
            $result_products = $mydb->get_results("SELECT id_product FROM wp_product_filters WHERE model = '".$model."' AND brand = '".$brand."' AND cat_id = ".$category." AND start_year <= ".$year." <= end_year");
        else if ($model != '')
            $result_products = $mydb->get_results("SELECT id_product FROM wp_product_filters WHERE model = '".$model."' AND brand = '".$brand."'");
        else if ($brand != '')
            $result_products = $mydb->get_results("SELECT id_product FROM wp_product_filters WHERE brand = '".$brand."'");
    return $result_products;
    }
}

function select_filter ()
{
    $db = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);

    if ($_POST['filter'] == 'model')
    {
        $models = $db->get_results("SELECT DISTINCT model FROM wp_product_filters WHERE brand = '".$_POST['brand']."'");

        $model_list .= '<option value="">ВСЕ</option>';
        foreach ($models as $model)
            $model_list .= '<option value="'.$model->model.'">'.$model->model.'</option>';

        echo $model_list;

        $result = select_products($_POST['cat_id'], $_POST['brand']);
        var_dump($result);

        wp_die();
    }
    if ($_POST['filter'] == 'year')
    {
        $years = $db->get_results("SELECT DISTINCT start_year FROM wp_product_filters WHERE model = '".$_POST['model']."' AND brand= '".$_POST['brand']."'");
        $min_year = min($years);
        $years = $db->get_results("SELECT DISTINCT end_year FROM wp_product_filters WHERE model = '".$_POST['model']."' AND brand= '".$_POST['brand']."'");
        $max_year = max($years);
        $years_list .= '<option value="">ВСЕ</option>';
        for ($i=$min_year->start_year; $i<=$max_year->end_year; $i++)
            $years_list .= '<option >'.$i.'</option>';

        echo $years_list;

        $result = select_products($_POST['cat_id'], $_POST['brand'], $_POST['model']);
        var_dump($result);

        wp_die();
    }
    if ($_POST['filter'] == 'modify')
    {
        $modifys = $db->get_results("SELECT DISTINCT modify FROM wp_product_filters WHERE model = '".$_POST['model']."' AND brand= '".$_POST['brand']."' AND start_year <='".$_POST['year']."'<= end_year");

        $modify_list .= '<option value="">ВСЕ</option>';
        foreach ($modifys as $modify)
            $modify_list .= '<option >'.$modify->modify.'</option>';

        echo $modify_list;

        $result = select_products($_POST['cat_id'], $_POST['brand'], $_POST['model'],$_POST['year'] );
        var_dump($result);
        wp_die();
    }

    if ($_POST['filter'] == 'done')
    {
        $result = select_products($_POST['cat_id'], $_POST['brand'], $_POST['model'],$_POST['year'] , $_POST['modify']);
        var_dump($result);
        wp_die();
    }
}

add_action('wp_ajax_select_filters_feedback', 'select_filters_feedback');
add_action('wp_ajax_nopriv_select_filters_feedback', 'select_filters_feedback');

function select_filters_feedback ()
{
    include TECDOC_LOADER_PLUGIN_DIR.'tecdoc_base/tecdoc.php';
    $data_array = getModels($_POST['brand_id'], $tecdoc_db_link);
    foreach ($data_array as $id=>$value)
    {
        echo '<option value="'.$id.'">'.$value['name'].'</option>';
    }
}