<?php

session_start();

	require_once('LiqPay.php');

	add_action('wp_ajax_send_sms', 'send_sms_by_turbo_sms');
	add_action('wp_ajax_nopriv_send_sms', 'send_sms_by_turbo_sms');

	add_action('wp_ajax_get_liqpay_button', 'reset_liqpay_form');
	add_action('wp_ajax_nopriv_get_liqpay_button', 'reset_liqpay_form');

	add_action('wp_ajax_send_one_email', 'send_one_email_by_mailgun');
	add_action('wp_ajax_nopriv_send_one_email', 'send_one_email_by_mailgun');

	add_action('wp_ajax_subscribe', 'subscribe_autodoctor');
	add_action('wp_ajax_nopriv_subscribe', 'subscribe_autodoctor');

	add_action('wp_ajax_get_newletters_list', 'get_newletters_list_autodoctor');
	add_action('wp_ajax_nopriv_get_newletters_list', 'get_newletters_list_autodoctor');

	add_action('wp_ajax_get_subscribers_list', 'get_subscribers_list_autodoctor');
	add_action('wp_ajax_nopriv_get_subscribers_list', 'get_subscribers_list_autodoctor');

	add_action('wp_ajax_send_all_subscribers', 'send_all_subscribers_autodoctor');
	add_action('wp_ajax_nopriv_send_all_subscribers', 'send_all_subscribers_autodoctor');

	add_action('wp_ajax_get_news', 'get_news_autodoctor');
	add_action('wp_ajax_nopriv_get_news', 'get_news_autodoctor');
	
	add_action('wp_ajax_add_new_feedback', 'add_new_feedback');
	add_action('wp_ajax_nopriv_add_new_feedback', 'add_new_feedback');

    add_action('wp_ajax_add_one_product_in_bag', 'add_one_product_in_bag');
    add_action('wp_ajax_nopriv_add_one_product_in_bag', 'add_one_product_in_bag');

    add_action('wp_ajax_delete_one_product_in_bag', 'delete_one_product_in_bag');
    add_action('wp_ajax_nopriv_delete_one_product_in_bag', 'delete_one_product_in_bag');

    add_action('wp_ajax_delete_product_in_bag', 'delete_product_in_bag');
    add_action('wp_ajax_nopriv_delete_product_in_bag', 'delete_product_in_bag');

    add_action('wp_ajax_change_user_data', 'change_user_data');
    add_action('wp_ajax_nopriv_change_user_data', 'change_user_data');

    add_action('wp_ajax_feedback_error', 'feedback_error');
    add_action('wp_ajax_nopriv_feedback_error', 'feedback_error');

    add_action('wp_ajax_search', 'search');
    add_action('wp_ajax_nopriv_search', 'search');

    add_action('wp_ajax_delete_feedback', 'delete_feedback');
    add_action('wp_ajax_nopriv_delete_feedback', 'delete_feedback');

    add_action('wp_ajax_create_new_order', 'create_new_order');
    add_action('wp_ajax_nopriv_create_new_order', 'create_new_order');

    add_action( 'after_setup_theme', 'custom_login' );


    function change_name($name) {
        return 'Avtodoctor';
    }

    add_filter('wp_mail_from_name','change_name');

    function change_email($email) {
        return 'support@avtodoctor.com.ua';
    }

    add_filter('wp_mail_from','change_email');


	function get_news_autodoctor(){
		$args_count = array(
                    'category' => '7,8'
                );
        $posts_count = get_posts( $args );

        if(!$_POST['offset']){
        	$offset = ( $_POST['page'] * 20 ) - 20;
        }else{
        	$offset = ( ( $_POST['page'] * 20 ) - 20 ) + $_POST['offset'];
        }
        $args = array(
                    'posts_per_page' => 20,
                    'category' => '7,8',
                    'offset' => $offset
                );
        $posts_array = get_posts( $args );
        $news_array = array('data' => array(),
        					'all_count' => count($posts_count));
        foreach ( $posts_array as $post ){
        	$post_categories = wp_get_post_categories( $post->ID );
				
			$cat = get_category( $post_categories[0] );
				
            if($cat->cat_ID == 7){
            	$one_new_ui = create_new_ui($post, 50);
            }else{
            	$one_new_ui = create_new_ui($post, 25);
            }           
            $news_array['data'][] = array('category' => $cat->cat_ID == 7 ? 'big' : 'little',
                                  		  'new' => $one_new_ui);                                 
        } //end foreach
        echo json_encode($news_array);
        wp_die();
	}

	function create_new_ui($post, $size){
		$one_new_ui = '<div data-id = "' . $post->ID . '" data-type = "news" class="col col_' . $size . '">
                        <a href="' . get_option('home') . '/all-news/new/?new=' . $post->ID . '">
                          <div class="img">'; 
        if (wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full )) {
            $image_source = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full );
            $one_new_ui .= '<img src="' . $image_source[0] . '" alt="thumbnail" />';
        }
        else {
            $one_new_ui .= '<img src="' . get_bloginfo('template_directory') . '/static/img/content/243x189.jpg' . '" alt="thumbnail" />';
        }
        $one_new_ui .= '</div>
                        <div class="wrap-text">
                            
                                <div class="text">
                                    <p>' . $post->post_title . '</p>
                                </div>
                                <div class="data">
                                    <div class="item">
                                        <span>Новости</span>
                                    </div>
                                    <div class="item">
                                        <span>' . get_the_date( 'd.m.y', $post->ID ) . '</span>
                                    </div>
                                </div>                                                            
                            </div>
                        </a>
                    </div>';
        return $one_new_ui;
	}

	function create_article_ui($post, $size){
		$one_new_ui = '<div data-id = "' . $post->ID . '" data-type = "articles" class="col col_' . $size . '">
                        <a href="' . get_option('home') . '/all-articles/article/?article=' . $post->ID . '">
                          <div class="img">'; 
        if (wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full )) {
            $image_source = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full );
            $one_new_ui .= '<img src="' . $image_source[0] . '" alt="thumbnail" />';
        }
        else {
            $one_new_ui .= '<img src="' . get_bloginfo('template_directory') . '/static/img/content/243x189.jpg' . '" alt="thumbnail" />';
        }
        $one_new_ui .= '</div>
                        <div class="wrap-text">
                            
                                <div class="text">
                                    <p>' . $post->post_title . '</p>
                                </div>
                                <div class="data">
                                    <div class="item">
                                        <span>Статьи</span>
                                    </div>
                                    <div class="item">
                                        <span>' . get_the_date( 'd.m.y', $post->ID ) . '</span>
                                    </div>
                                </div>                                                            
                            </div>
                        </a>
                    </div>';
        return $one_new_ui;
	}
	
	function create_new_category_block($cat, $size, $count, $brands){

        $children = get_term_children($cat->term_id, 'product_cat');

        $url = get_field('url_forward', 'product_cat_'.$cat->term_id); 
        if(!$url) { 
            if( empty( $children ) ) 
                $url = get_site_url().'/product-category/products/'.$cat->slug; 
            else 
                $url = get_site_url().'/subcategories?cat_id='.$cat->term_id; 
        }

        if (get_field('style', 'product_cat_'.$cat->term_id) == true)
            $style = 'style="color: white;"';

        $thumbnail_id = get_woocommerce_term_meta( $cat->term_id, 'thumbnail_id', true );
	    $image = wp_get_attachment_url( $thumbnail_id );
		if ($count == 0 || $count == 2|| $count == 4 || $count == 8 || count > 10)
            if ($size == 50)
			$one_new_category_block = '<div class="info-brand__row">';
        else
            $one_new_category_block = '<div class="info-brand__row info-brand__row info-brand__row_title">';

        if ($cat->cat_ID == 33)
            $one_new_category_block .= '<div style = "cursor:pointer" onclick="location.href=\''.get_site_url().'/'.$cat->slug.'\';" class="col col_'.$size.'">';

        else
		    $one_new_category_block .= '<div style = "cursor:pointer" onclick="location.href=\''.$url.'\';" class="col col_'.$size.'">';
		if ($size == 50 && $cat->cat_ID != 32)
		{
			$one_new_category_block .='
                                <div class="drop-menu">
                                    <ul>';
										foreach ($brands as $brand)
                                           $one_new_category_block .= '<li><a href="#">'.$brand.'</a>/</li>';
                                  $one_new_category_block .='</ul></div>';
		}
                            $one_new_category_block .='<div class="col__i">
                                    <div class="title">';
                             if ($cat->cat_ID == 33)
                                       $one_new_category_block .='<a href="'.get_site_url().'/'.$cat->slug.'/">';
                            else
                                        $one_new_category_block .='<a href="'.$url.'">';
                                          $one_new_category_block .= '<span '.$style.'>'.$cat->name.'</span>
                                        </a>
                                    </div>
                                    <div class="img">
                                        <img src="'.$image.'" alt="logo" />
                                    </div>
                                </div>
                            </div>';
		
	if ($count == 1 || $count == 3 || $count == 7 || $count >= 10) 
			$one_new_category_block .= '</div>
                        <!-- info-brand__row end-->';
        return $one_new_category_block;
	}

	function send_sms_by_turbo_sms($client_phone, $admin_phone, $client_text, $admin_text){

		$client_number = preg_replace('/\D/', '', $_POST['client_phone']);
	  	if(strlen($client_number) == 10){
	   		$client_number = "38".$client_number;
	  	}
	  	$admin_number = preg_replace('/\D/', '', $_POST['admin_phone']);
	  	if(strlen($admin_number) == 10){
	   		$admin_number = "38".$admin_number;
	  	}
		sendSMS(array('phone' => $client_number,
					  'text' => $_POST['client_text']));
		sendSMS(array('phone' => $admin_number,
					  'text' => $_POST['admin_text']));
		var_dump($_POST);
		wp_die();
	}

	function reset_liqpay_form(){
		$liqpay = new LiqPay('i17896066194', 'rZXNJhTplHVnsNr4GFANPgfW3sKhi5uLpg3Mf2Dc');
		$html = $liqpay->cnb_form(array(
			'version'        => '3',
			'amount'         => (int)$_POST['total_amount'],
			'currency'       => 'UAH',
			'description'    => 'Оплата покупки автодеталей в магазине Autodoctor',
			'order_id'       => time(),
			'server_url'	 => 'http://current.ua/my_orders/autodoctor/wordpress/test_page/',
			'result_url'     => 'http://current.ua/my_orders/autodoctor/wordpress/test_page/?success=1',
			'sandbox'		 => '1',
			'pay_way'		 => 'card, privat24'
		));
		echo $html;
		wp_die();
	}

	function send_one_email_by_mailgun($client_email_registration,$client_subject_registration,$client_message_registration){
		sendEmail(array('recipient' => $_POST['client_email_registration'],
					  	'subject' => $_POST['client_subject_registration'],
					  	'message' => $_POST['client_message_registration']));
		var_dump($_POST);
		wp_die();
	}

	function subscribe_autodoctor(){
		$result = subscribe_newsletters(array('email' => $_POST['email_subscribe'],
								  			 'id_newsletter' => $_POST['id_newsletter']));
		echo $result;
		wp_die();
	}

	function get_newletters_list_autodoctor(){
		$result = get_newletters_list();
		echo $result;
		wp_die();
	}

	function get_subscribers_list_autodoctor(){
		$result = get_subscribers_list($_POST['id_newsletter']);
		echo $result;
		wp_die();
	}

	function send_all_subscribers_autodoctor(){
		$result = json_decode( get_subscribers_list($_POST['id_newsletter']), true);
		var_dump($_POST['subscribe_text']);		
		for ($i=0; $i < count($result); $i++) { 
			sendEmail(array('recipient' => $result[$i]['email'],
						  	'subject' => $_POST['subscribe_subject'],
						  	'message' => $_POST['subscribe_text']));

		}
		wp_die();
	}
	
	add_action( 'wp_login_failed', 'pu_login_failed' ); // hook failed login

function pu_login_failed( $user ) {
  	// check what page the login attempt is coming from
  	$referrer = $_SERVER['HTTP_REFERER'];

  	// check that were not on the default login page
	if ( !empty($referrer) && !strstr($referrer,'wp-login') && !strstr($referrer,'wp-admin') && $user!=null ) {
		// make sure we don't already have a failed login attempt
		if ( !strstr($referrer, '?login=failed' )) {
			// Redirect to the login page and append a querystring of login failed
	    	wp_redirect( $referrer . '?login=failed');
	    } else {
	      	wp_redirect( $referrer );
	    }

	    exit;
	}
}

function custom_login() {

    if(!is_user_logged_in())
    {
    if ($_SESSION['user'] && $_SESSION['user_token'] && username_exists($_SESSION['user_email']))
    {
        $pwd = substr($_SESSION['user_token'], 0,15);
        $user_id = username_exists ($_SESSION['user_email']);
        wp_set_password ( $pwd, $user_id);

        $arr = array ();

        $arr['user_login'] = $_SESSION['user_email'];
        $arr['user_password'] = $pwd;
        $arr['remember'] = true;
        $user = wp_signon($arr, false);

        unset($_SESSION["user_email"]);
        unset($_SESSION['user']);
        unset($_SESSION['user_token']);
        session_destroy();

        if (is_wp_error($user))
            wp_redirect ($_SERVER['HTTP_REFERER'].'?login=failed');

        wp_redirect($_SERVER['HTTP_REFERER']);

        exit ();
    }
    else if (isset ($_POST['log']))
    {
        // check what page the login attempt is coming from
        $referrer = $_SERVER['HTTP_REFERER'];

        $error = false;

        if($_POST['log'] == '' || $_POST['pwd'] == '' )
        {
            $error = true;
        }

        // check that were not on the default login page
        if ( !empty($referrer) && !strstr($referrer,'wp-login') && !strstr($referrer,'wp-admin') && $error ) {

            // make sure we don't already have a failed login attempt
            if ( !strstr($referrer, '?login=failed') ) {
                // Redirect to the login page and append a querystring of login failed
                wp_redirect( $referrer . '?login=failed' );
            } else {
                wp_redirect( $referrer );
            }

            exit;

        }
    }
    }

}

function show_feedbacks_product ($product_id, $answer_id = -1)
{

	$feedback_data = array (
			'product_id' => $product_id,
			'feedback_location' => 'product'
							);
			$result_list = get_feedback_list ($feedback_data);

            $answer_cnt = 0;

        if ($result_list && $answer_id = -1)
                $new_feedback .= '<div class="media">';

			foreach ($result_list as $feedback_one)
			{
						$new_feedback .= '<div class="media-body">';

                        $new_feedback .= '<div class="info">
                                    <p>'.
                            $feedback_one->feedback
                            .'</p>
                                       </div>
											<div class="name">
                                           <b>'.$feedback_one->user_name.'.</b>
                                                <div class="data">'.$feedback_one->date.'</div>';
                                             $new_feedback .=  '<a href="" onclick="add_answer(\''.$feedback_one->user_name.', \' ,\''.$feedback_one->id_feedback.'\')" >Ответить</a>';
                                            if (current_user_can('administrator'))
                                $new_feedback .= '   <a href="" onclick="delete_feedback('.$feedback_one->id_feedback.')" >Удалить</a>
                                            </div>';
                    if ($answer_id != -1)
                        $answer_cnt++;

               show_feedbacks_product($product_id, $feedback_one->id_feedback);

/*
						foreach ($result_list as $feedback_answer)
						{
							if ($feedback_answer->answer_id == $feedback_one->id_feedback )
							{
								$new_feedback .= '<div class="media">';
				
								$new_feedback .= '<div class="media-body">';

								$new_feedback .= '<div class="info">
										<p>'.
                                       $feedback_answer->feedback
                                       .'</p>
                                       </div>
											<div class="name">
                                           <b>'.$feedback_answer->user_name.'.</b>
                                                <div class="data">'.$feedback_answer->date.'</div>
                                                <a href="" onclick="add_answer(\''.$feedback_one->user_name.', \' ,\''.$feedback_answer->id_feedback.'\')" >Ответить</a>';
                                if (current_user_can('administrator'))
                                $new_feedback .= '   <a href="" onclick="delete_feedback('.$feedback_one->id_feedback.')" >Удалить</a>

                                            </div>';
											
											$answer_cnt++;
							}
						}
						for ($i=0; $i<$answer_cnt; $i++)
							$new_feedback .= '</div></div>';
					}*/
			}
   // for ($i=0; $i<$answer_cnt; $i++)
        $new_feedback .= '</div></div>';

			echo $new_feedback;

}

function show_feedbacks ($feedback_location)
{
    $feedback_data = array (
        'feedback_location' => $feedback_location
    );
    $result_list = get_feedback_list ($feedback_data);

    foreach ($result_list as $feedback_one)
    {
    $new_feedback .=' <div class="col">
                                <p>'.$feedback_one->feedback.'
                                </p>
                                <b>'.$feedback_one->user_name.'. '.$feedback_one->auto_brand.' '.$feedback_one->model.'</b>
                            </div>
                            <!-- col end-->';
    }

   echo $new_feedback;

}

function add_new_feedback ()
{
	if ($_POST['feedback_location']=='product')
	{	 					$arr = array(
							'id_product' => $_POST['id_product'],
							'user_name' => $_POST['user_name'],
							'user_email' => $_POST['user_email'],
							'feedback' => $_POST['feedback_text'],
                            'feedback_location' => $_POST['feedback_location'],
                            'answer_id' => $_POST['answer_id']
								 
								 );
    }
    if ($_POST['feedback_location']=='home' || $_POST['feedback_location']=='services')
    {	 					$arr = array(

            'user_name' => $_POST['user_name'],
            'user_email' => $_POST['user_email'],
            'feedback' => $_POST['feedback_text'],
            'feedback_location' => $_POST['feedback_location'],
            'auto_brand' => $_POST['auto_brand'],
                                        );
    }
    add_feedback($arr);

    show_feedbacks_product($_POST['id_product']);


}

function feedback_error ()
{
    if ($_POST['error'] == 'error')
    {
    $error ='         <div class="feedback-error" >
         <a href="#" class="close">
                                        <span class="line1"></span>
                                        <span class="line2"></span>
                                    </a>
                                    <p>Необходимо исправить следующие ошибки: Email не является правильным E-Mail адресом.</p>
                                </div> ';
        echo $error;
    }
}

function delete_feedback ()
{
    del_feedback($_POST['id']);

    show_feedbacks_product($_POST['id_product']);
}

function show_bag ()
{
    global $woocommerce;

    $cart = $woocommerce->cart->get_cart_item_quantities( );

    foreach ($woocommerce->cart->get_cart() as $cart_item_key=>$cart_item)

        $array[] = $cart_item_key;

    $count = 0;

    foreach ($cart as $id=>$product_order)
    {
        $product = new WC_Product($id);

        $src = wp_get_attachment_image_src( get_post_thumbnail_id($id), 10);

    $bag .='<div class="row">
                                            <div class="col col_1">
                                                <img src="'.$src[0].'" alt="logo" width="50px" />
                                                <div class="info">
                                                    <p>'.$product->get_title().'</p>
                                                </div>
                                            </div>
                                            <div class="col col_2">
                                                <div class="counter">
                                                    <a href="" class="minus" id="minus" onclick="delete_one_product_in_bag(\''.$product->id.'\',\''.$array[$count].'\')" >-</a>
                                                    <input type="text" value="'.$product_order.'" />
                                                    <a href="" class="pluse" onclick="add_one_product_in_bag(\''.$product->id.'\')">+</a>

                                                </div>
                                            </div>
                                            <div class="col col_3">
                                                <p class="total">'.$product_order*$product->price.' грн.</p>
                                                <a href="#" onclick="delete_product_in_bag(\''.$product->id.'\',\''.$array[$count].'\')" class="delete"></a>
                                            </div>

                                        </div>
                                        <!-- row end-->';
        $count++;
    }

    echo $bag;
}

function show_bag_mini ()
{

    global $woocommerce;

    $cart = $woocommerce->cart->get_cart_item_quantities( );

    foreach ($woocommerce->cart->get_cart() as $cart_item_key=>$cart_item)

        $array[] = $cart_item_key;

    $count = 0;

    foreach ($cart as $id=>$product_order)
    {
        $product = new WC_Product($id);

        $src = wp_get_attachment_image_src( get_post_thumbnail_id($id), 10);

        $bag .= '<div class="col">
                <img src="'.$src[0].'" alt="logo" width="20px" />

                <p>'.$product->get_title().'</p>

                <div class="row">
                    <div class="item">
                        <p>'.$product_order.' шт.</p>
                    </div>
                    <div class="item">
                        <p>'.$product->price.' грн</p>
                    </div>
                </div>
            </div>
            <!-- col end-->';
    }
    echo $bag;
}

function delete_one_product_in_bag ()
{
    global $woocommerce;
    $cart = $woocommerce->cart->get_cart_item_quantities( );
    if ($cart[$_POST['id']] != 0)
    {
        $woocommerce->cart->set_quantity( $_POST['key'], $cart[$_POST['id']] - 1);
    $arr = array (
        'simple_cart_count' => $woocommerce->cart->cart_contents_count,
        'text_cart_count' => 'В корзине '.$woocommerce->cart->cart_contents_count.' товара на сумму '.$woocommerce->cart->subtotal.' грн',
        'total_price' => $woocommerce->cart->subtotal,
        'total' => $woocommerce->cart->subtotal.' грн'
    );
    echo json_encode($arr);
    wp_die();
    }
}

function delete_product_in_bag ()
{
    global $woocommerce;
    $woocommerce->cart->remove_cart_item($_POST['count']);
    $arr = array (
        'simple_cart_count' => $woocommerce->cart->cart_contents_count,
        'text_cart_count' => 'В корзине '.$woocommerce->cart->cart_contents_count.' товара на сумму '.$woocommerce->cart->subtotal.' грн',
        'total_price' => $woocommerce->cart->subtotal,
        'total' => $woocommerce->cart->subtotal.' грн'
    );
    echo json_encode($arr);
    wp_die();
}

function add_one_product_in_bag ()
{
    global $woocommerce;
    $woocommerce->cart->add_to_cart( $_POST['id'] );
    $arr = array (
    'simple_cart_count' => $woocommerce->cart->cart_contents_count,
    'text_cart_count' => 'В корзине '.$woocommerce->cart->cart_contents_count.' товара на сумму '.$woocommerce->cart->subtotal.' грн',
    'total_price' => $woocommerce->cart->subtotal,
    'total' => $woocommerce->cart->subtotal.' грн'
    );
    echo json_encode($arr);
    wp_die();
}

function change_user_data ()
{
    if ($_POST)
    {
    update_user_meta($_POST['ID'],'user_login', $_POST['login']);
    update_user_meta($_POST['ID'],'user_nicename', $_POST['login']);
    update_user_meta($_POST['ID'],'first_name', $_POST['first_name']);
    update_user_meta($_POST['ID'],'last_name', $_POST['last_name']);
    update_user_meta($_POST['ID'],'user_email', $_POST['email']);
    update_user_meta($_POST['ID'],'user_phone', $_POST['phone']);
        if ($_POST['address'] != '')
    update_user_meta($_POST['ID'],'address_delivery', $_POST['address']);
    update_user_meta($_POST['ID'],'number_delivery', $_POST['number_delivery']);
    update_user_meta($_POST['ID'],'user_city', $_POST['city']);
        $log = "Изминения сохранены.";
    }
    $user_data = get_userdata($_POST['ID']);
   if ($_POST['new_pass'] == $_POST['new_pass2'] && wp_check_password( $_POST['pass'], $user_data->user_pass, $_POST['ID']))
   {
       $log = "Данные и пароль успешно измененны.";
        wp_set_password( $_POST['new_pass'], $_POST['ID'] );
   }
    else if ($_POST['new_pass'])
     $log = "Не верный пароль или пароли не совпадают.";

    echo $log;
    wp_die();

}

function create_new_order ()
{
    global $woocommerce;

    $cart = $woocommerce->cart->get_cart_item_quantities( );

    $price_total = 0;

    foreach ($cart as $id=>$product_order)
    {
        $product = new WC_Product($id);

        $price_total += $product->price * $product_order;
    }
        $user_order = array (
        'user_id' => $_POST['user_id'],
        'date' => strftime ("%d %B, %H:%M"),
        'price_total' => $price_total,
        'delivery' => 1,
        'status_order' => 'Отправлен'
    );

    $mydb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);

    $mydb->insert('wp_user_orders', $user_order);

    $order_id = $mydb->insert_id;

    foreach ($cart as $id=>$product_order)
    {
        $product = new WC_Product($id);

        $order_info = array(
        'order_id' => $order_id,
        'product_id' => $product->id,
        'product_count' => $product_order,
        'price_one' => $product->price
    );

        $mydb->insert('wp_orders_info', $order_info);
    }

    $public_key = 'i9967170320';
    $private_key = 'UwYy4IAImsinIa4749chHRIH46NHECsaQKxXiCYW';

    $liqpay = new LiqPay($public_key , $private_key);

    $params = array(
        'action'         => 'pay',
        'version'        => '3',
        'public_key'     => $public_key,
        'amount'         => $price_total,
        'currency'       => 'UAH',
        'language'       => 'ru',
        'description'    => 'Покупка в магазине Автодоктор',
        'order_id'       => $order_id,
        'server_url'     => esc_url( get_template_directory_uri() ).'/liqpay_request.php',
        'result_url'     => get_site_url(),
        'sandbox'        => '1'
    );

    $data      = base64_encode( json_encode($params) );
    $signature = $liqpay->cnb_signature($params);

    $arr = array(
        'dat' => $data,
        'sign' => $signature
    );

    $woocommerce->cart->empty_cart();

    echo json_encode($arr);

    wp_die();
}

function show_orders($user_id)
{
    $mydb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);
    $order_data = $mydb->get_results( "SELECT order_id, date, price_total, delivery, status_order FROM wp_user_orders  WHERE user_id = ".$user_id);

    foreach ($order_data as $order)
    {
        $orders_info_list = $mydb->get_results( "SELECT order_id, product_id, product_count, price_one FROM wp_orders_info  WHERE order_id = ".$order->order_id);
    $orders .= '<div class="table">
                                        <div class="row row_t">
                                            <div class="col col_1">
                                                <p>
                                                    <b>№ '.$order->order_id.'</b>
                                                    <i>, '.$order->date.'</i>
                                                </p>
                                            </div>
                                            <div class="col col_2">
                                                <p>
                                                    <b>№ '.$order->order_id.'</b>
                                                </p>
                                            </div>
                                            <div class="col col_3">
                                                <p>
                                                    <b>Сумма</b>
                                                </p>
                                            </div>
                                        </div>
                                        <!-- row end-->';

                                        foreach ($orders_info_list as $order_info)
                                        {

                                             $product = new WC_Product($order_info->product_id);

                                             $src = wp_get_attachment_image_src( get_post_thumbnail_id($order_info->product_id), 10);

                                            $orders .= '<div class="row">
                                            <div class="col col_1">
                                                <img src="'.$src[0].'" alt="logo" width="50px" />
                                                <div class="info">
                                                    <p>'.$product->get_title().'</p>
                                                </div>
                                            </div>
                                            <div class="col col_2">
                                                <p>'.$order_info->product_count.' шт.</p>
                                            </div>
                                            <div class="col col_3">
                                                <p>'.$order_info->product_count * $order_info->price_one.' грн</p>
                                            </div>
                                        </div>
                                        <!-- row end-->';

                                        }
        if ($orders->delivery)
        {
                                        $orders .= '</div>
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
                                        </div>';
        }
                                       $orders .='<!-- row end-->
                                        <div class="row row_total">
                                            <div class="col col_1">
                                                <p>Статус заказа: '.$order->status_order.'</p>
                                            </div>
                                            <div class="col col_2">
                                                <p>Итого:
                                                    <span>'.$order->price_total.' </span>грн.</p>
                                            </div>
                                        </div>
                                    </div>';
    }
   echo $orders;
}

function show_brand_directory_upsells($id)
{
    $product = new WC_Product($id);
 $upsells = $product->get_upsells();

    $count = 0;

 foreach ($upsells as $upsell)
 {
     $product = new WC_Product($upsell);

     $one_product .= '<div id="upsell_item_'.$count.'" style = "cursor:pointer" onclick="location.href=\''.get_site_url().'/?post_type=product&p='.$product->id.'\';" class="col col_25" onmouseover="document.getElementById(\'upsell_item_'.$count.'\').className=\'col col_25 active-product\'" onmouseout="document.getElementById(\'upsell_item_'.$count.'\').className=\'col col_25\'">';

        if ($product->is_in_stock()) $one_product .= '
        <div class="info-a there">
                                            <span>
        Есть в наличии';  else $one_product .= '
        <div class="info-a none">
                                            <span>
        Нет в наличии';
     $src = wp_get_attachment_image_src( get_post_thumbnail_id($upsell), 10);
     $one_product .= '</span>
                                        </div>
                                        <div class="img">
                                            <img src="'.$src[0].'" alt="logo" />
                                        </div>
                                        <div class="wrap-info">
                                            <div class="title">
                                                <span>'.$product->get_title().'</span>
                                            </div>
                                            <div class="price">
                                                <i>Цена:</i>
                                                <b>'.$product->get_price().'</b>
                                                <i>грн</i>
                                            </div>
                                            <div class="buy">
                                                <a href="'.get_page_link().'?cart=add_to_cart&id='.$product->id.'" class="btn btn_dang">Купить</a>
                                            </div>

                                        </div>
                                    </div>';
     $count++;
 }
    foreach ($upsells as $upsell)
    {
        $product = new WC_Product($upsell);

        $one_product .= '<div id="upsell_item_'.$count.'" style = "cursor:pointer" onclick="location.href=\''.get_site_url().'/?post_type=product&p='.$product->id.'\';" class="col col_25" onmouseover="document.getElementById(\'upsell_item_'.$count.'\').className=\'col col_25 active-product\'" onmouseout="document.getElementById(\'upsell_item_'.$count.'\').className=\'col col_25\'">';

        if ($product->is_in_stock()) $one_product .= '
        <div class="info-a there">
                                            <span>
        Есть в наличии';  else $one_product .= '
        <div class="info-a none">
                                            <span>
        Нет в наличии';
        $src = wp_get_attachment_image_src( get_post_thumbnail_id($upsell), 10);
        $one_product .= '</span>
                                        </div>
                                        <div class="img">
                                            <img src="'.$src[0].'" alt="logo" />
                                        </div>
                                        <div class="wrap-info">
                                            <div class="title">
                                                <span>'.$product->get_title().'</span>
                                            </div>
                                            <div class="price">
                                                <i>Цена:</i>
                                                <b>'.$product->get_price().'</b>
                                                <i>грн</i>
                                            </div>
                                            <div class="buy">
                                                <a href="'.get_page_link().'?cart=add_to_cart&id='.$product->id.'" class="btn btn_dang">Купить</a>
                                            </div>

                                        </div>
                                    </div>';
        $count++;
    }


    echo $one_product;

}

function show_brand_directory_crossells($id)
{
    $product = new WC_Product($id);
    $crossells = $product->get_cross_sells();

    $count = 0;

    foreach ($crossells as $crossell)
    {
        $product = new WC_Product($crossell);

        $one_product .= '<div id="crossell_item_'.$count.'" style = "cursor:pointer" onclick="location.href=\''.get_site_url().'/?post_type=product&p='.$product->id.'\';" class="col col_25" onmouseover="document.getElementById(\'crossell_item_'.$count.'\').className=\'col col_25 active-product\'" onmouseout="document.getElementById(\'crossell_item_'.$count.'\').className=\'col col_25\'">';
        if ($product->is_in_stock()) $one_product .= '
        <div class="info-a there">
                                            <span>
        Есть в наличии';  else $one_product .= '
        <div class="info-a none">
                                            <span>
        Нет в наличии';
        $src = wp_get_attachment_image_src( get_post_thumbnail_id($crossell), 10);
        $one_product .= '</span>
                                        </div>
                                        <div class="img">
                                            <img src="'.$src[0].'" alt="logo" />
                                        </div>
                                        <div class="wrap-info">
                                            <div class="title">
                                                <span>'.$product->get_title().'</span>
                                            </div>
                                            <div class="price">
                                                <i>Цена:</i>
                                                <b>'.$product->get_price().'</b>
                                                <i>грн</i>
                                            </div>
                                            <div class="buy">
                                                <a href="'.get_page_link().'?cart=add_to_cart&id='.$product->id.'" class="btn btn_dang">Купить</a>
                                            </div>

                                        </div>
                                    </div>';
        $count++;
    }

    echo $one_product;

}

function set_num_products ()
{
    if (isset ($_GET['show_more']))
    {
        add_filter( 'loop_shop_per_page', create_function( '$cols', 'return $_GET[\'show_more\'];' ) );
    }
    else
    {
        add_filter( 'loop_shop_per_page', create_function( '$cols', 'return 20;' ) );
    }
}
add_action('num_paged', 'set_num_products');

do_action('num_paged');

function show_products_category()
{
    woocommerce_product_loop_start();

    woocommerce_product_subcategories();

    while ( have_posts() ) : the_post();

        wc_get_template_part( 'content', 'product' );

    endwhile; // end of the loop.

    woocommerce_product_loop_end();
}

function search ()
{
    $count = 0;
    if (!$_POST['s']=="")
    {
    $args = array(
        'posts_per_page' => -1,
        'post_type' => 'product'
    );

    $loop = new WP_Query( $args );


    while ( $loop->have_posts()) {
        $loop->the_post();
        global $product;

        $str = $product->get_title();
        $result = preg_match('/'.$_POST['s'].'/iu',$str,$found);
        $result_sku = preg_match('/'.$_POST['s'].'/iu',$product->get_sku(),$found);
        if ($result)
        {
            echo '<a href="'.$product->get_permalink().'">'.$str.'</a></br>';
            $count++;
        }
        if ($result_sku)
        {
            echo '<a href="'.$product->get_permalink().'">'.$product->get_sku().' - '.$str.'</a></br>';
            $count++;
        }
        if ($count>=20)
            exit();

    }
        $args = array(
            'posts_per_page' => -1,
            'category' => '7,8'
        );
        $posts = get_posts( $args );

        foreach($posts as $post)
        {
        $str = $post->post_title;
        $result = preg_match('/'.$_POST['s'].'/iu',$str,$found);
            if ($result)
            {
                echo  '<a href="' . get_option('home') . '/all-articles/article/?article=' . $post->ID . '">'.$str.'</a></br>';
                $count++;
            }
            if ($count>=20)
                exit();
        }

        $args = array(
            'posts_per_page' => -1,
            'category' => '15, 16'
        );
        $posts = get_posts( $args );

        foreach($posts as $post)
        {
            $str = $post->post_title;
            $result = preg_match('/'.$_POST['s'].'/iu',$str,$found);
            if ($result)
            {
                echo  '<a href="' . get_option('home') . '/all-news/new/?new=' . $post->ID . '">'.$str.'</a></br>';
                $count++;
            }
            if ($count>=20)
                exit();
        }

    }
    wp_die();

}

function register_user ()
{

    if ($_POST['reg_name'])
        $reg_name = $_POST['reg_name'];
    if ($_SESSION['user_email'])
        $reg_name = $_SESSION['user_email'];

    if ($reg_name != '')
    {
        $user_id = username_exists( $reg_name );

        if ($user_id && $_SESSION['user'])
            exit;

        if (!$user_id)
        {
            if ($_SESSION['user'])
            {
                $data_user = $_SESSION['user'];
                $data_user = $data_user->response[0];
                $first_name = $data_user->first_name;
                $last_name = $data_user->last_name;
                $pass = substr($_SESSION['user_token'], 0,15);
            }
            else
            {
                $pass = $_POST['reg_pass'];
                $first_name = $_POST['first_reg_name'];
                $last_name = $_POST['last_reg_name'];
            }

            $user_id = wp_create_user($reg_name, $pass, $reg_name);
            update_user_meta( $user_id, 'user_phone', $_POST['reg_phone'] );
            update_user_meta( $user_id, 'first_name', $first_name );
            update_user_meta( $user_id, 'last_name',  $last_name);
        }
        else echo 'Пользователь с таким логином уже существует!';
    }
}









