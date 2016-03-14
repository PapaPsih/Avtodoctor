<?php
	ini_set("display_errors",1);
	
	/*
		Plugin Name: Загрузчик Tecdoc
		Plugin URI: none
		Description: Плагин для периобразования прайс-листа в документ с товарами, пригодными для сайта
		Version: 3.1.5
		Author: WebUniverse
		Author URI: http://webuniverse.com.ua/
	*/
	define( 'TECDOC_LOADER_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	define( 'TECDOC_LOADER_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

	wp_enqueue_script( 'jquery_tecdoc_loader', plugins_url('/js/jquery-1.11.2.min.js', __FILE__));
	wp_enqueue_script( 'tecdoc_loader',	plugins_url( '/js/tecdoc_loader.js', __FILE__ ) );

	if ( ! function_exists( 'wp_handle_upload' ) ) {
	    require_once( str_replace(chr(92), '/', ABSPATH) . 'wp-admin/includes/file.php' );
	    
	}

	add_action( 'admin_footer', 'my_action_javascript' );

	/*
	* Javascript-код, который вынесен пока в этот .php с целью ускорения работы. После завершения - вынести его в отдельный файл
	*/
	function my_action_javascript() { ?>
		<script type="text/javascript" >
		jQuery(document).ready(function($) {
			getProductsByCategoryCrossel();
		});

		/*
		 * my_action_javascript - получает все продукты заданной категории, 
		 * необходимо для выбора конкретного продукта и задания его ввиде кроссела для товара
		 */
		function getProductsByCategoryCrossel(){
			var data = {
				'action': 'get_products_by_category_id_ajax',
				'category_id': $('#crossel_categories_multi').val()
			};

			jQuery.post(ajaxurl, data, function(response) {
				var data = JSON.parse(response);
				if(!data.error){
					setUICrosselProducts(data); //задаем select с продуктами, выбранный из которых станет кросселом
				}else{
					console.log(data.error);
				}
			});
		}

		/*
		 * setUICrosselProducts - получает массив продуктов и формирует select с option'ами для него
 		 */
		function setUICrosselProducts(product_array){
			var ui = '';
			jQuery.each( product_array, function( key, val ) {
			  ui += '<option value = "' + product_array[key].id + '">' + product_array[key].name + '</option>';
			});
			$('#crossel_product').html(ui);
		}

		</script> <?php
	}

	//добавляем обработчик для ajax-запроса на строне сервера
	add_action( 'wp_ajax_get_products_by_category_id_ajax', 'get_products_by_category_id_ajax' );

	/*
	* get_products_by_category_id_ajax - получает список продуктов за ID их категории, которую функция получает в POST['category_id']
	*/
	function get_products_by_category_id_ajax() {
		global $wpdb; 

		$args = array(
			'post_type'             => 'product',
			'post_status'           => 'publish',
			'ignore_sticky_posts'   => 1,
			'posts_per_page'        => '1000',
			'meta_query'            => array(
			    array(
			        'key'           => '_visibility',
			        'value'         => array('catalog', 'visible'),
			        'compare'       => 'IN'
			    )
			),
			'tax_query'             => array(
			    array(
			        'taxonomy'      => 'product_cat',
			        'field' => 'term_id',
			        'terms'         => $_POST['category_id'],
			        'operator'      => 'IN'
			    )
			)
		);
		$products = new WP_Query($args);
		$needle_products = array();
		if ( $products->have_posts() ) {
			while ( $products->have_posts() ) : $products->the_post();
				$needle_products[] = array('id' => get_the_ID(),
										   'name' => get_the_title());
			endwhile;
			echo json_encode($needle_products); // возвращаем на клиент массив с полями id и name
		} else {
			echo json_encode(array('error' => 'Нет продуктов в этой категории'));
		}

		wp_die(); // необходимо, чтобы в ajax-ответе не было ничего лишнего после ответа
	}
	

	
	/*
     *  addAdminPageTecdocLoader - функция, для добавления плагина на административную страницу
	 */
	function addAdminPageTecdocLoader(){
		add_menu_page('Система анализа загруженного .xls файла и его разбор для Калькулятора цен', 
					 'Загрузчик Tecdoc', 
					 8, 
					 'tecdoc_loader', 
					 'TecdocLoaderOptionsPage');
	}

	function getItemListFormFileUsingDB($file_name){
		$mysqli = mysqli_connect('localhost', 'root', '1234rewq!', 'autodoctor');
		if (mysqli_connect_errno()) {
		  echo mysqli_connect_errno();
		}
	  	mysqli_query($mysqli, 'TRUNCATE TABLE import_data;');
	    $sql = "LOAD DATA LOCAL INFILE '" . realpath($file_name) . "'
	              INTO TABLE import_data
	              FIELDS TERMINATED BY ';'
	              ENCLOSED BY '\"'
	              LINES TERMINATED BY '\n'
	              STARTING BY '\"'
	              IGNORE 1 ROWS
	              (internal_code, brand, name, vendor_code, price, rest_store_default, sum_rest);";
	  	$result = mysqli_query($mysqli, $sql);
	  	if(!$result)
	    	echo "error: " . $mysqli->error . "<br>" . $sql;
	  	else
	    	echo "stunningly";
	    mysqli_close($mysqli);
	}

	function deleteItemsFromItemsTableByID($array){
		$mysqli = mysqli_connect('localhost', 'root', '1234rewq!', 'autodoctor');
		if (mysqli_connect_errno()) {
		  echo mysqli_connect_errno();
		}
		$counter = 0; 
	  	foreach ($array as $key => $value) {
	  		$query = 'DELETE FROM import_data WHERE vendor_code = "' . $value . '";';
			mysqli_query($mysqli, $query);
			$counter++;
	  	}
	  	return $counter;
	}

	/*
	 * TecdocLoaderOptionsPage - главная функция для построения всего User Interface на странице плагина и обработки POST-запросов. 
	 * С нее начинается вся логика плагина 
	 */
	function TecdocLoaderOptionsPage(){
		global $wpdb;

		echo '<h2>Формирование excel-файла, пригодного для сайта с помощью вашего прайс-листа и базы TecDoc</h2>';

		//POST-запрос на первичную обработку файла, без сохранения его данных. 
		if($_FILES['file']){
			$needle_categories = getAllSiteCategories();
			include "tecdoc_base/tecdoc.php";

			$uploadedfile = $_FILES['file'];

			$upload_overrides = array( 'test_form' => false );

			$movefile = wp_handle_upload( $uploadedfile, $upload_overrides );
			if ( $movefile && !isset( $movefile['error'] ) ) {				

			    echo "Успешно загруженный файл, файл: ";
			    echo $movefile['file'] . "<br><br>";

			    getItemListFormFileUsingDB($movefile['file']);

			    echo 'Выбрано опции: ';
			    if($_POST['tecdoc_connection'] == "1"){
			    	echo 'Связывать с TecDoc; Провести полный анализ(с обновлением старых)' . $_POST['tecdoc_connection'] . '.<br><br>';
			    	readXLSXDocumentTecDoc($wpdb, $tecdoc_db_link, $movefile['file'], $needle_categories, $_POST['tecdoc_connection']);
			    }else{
			    	echo 'Не связывать с Tecdoc(без апселов и кросселов); Провести полный анализ(с обновлением старых)' . $_POST['tecdoc_connection'] . '.<br><br>';
			    	readXLSXDocumentWithoutTecDoc($wpdb, $tecdoc_db_link, $movefile['file'], $needle_categories, $_POST['tecdoc_connection']);
			    }			    

			    //var_dump( $movefile);
			} else {
				echo "Ошибка: ";
			    echo $movefile['error'];
			}
		}

		//Обработка POST-запроса, который содержит всю информацию после первичной обработки и сохраняет всю информацию в БД Wordpress'а
		if($_POST['create_products']){
			switch($_POST['analysis_type']){
				case "1":
					/*			switch($_POST['tecdoc_connection']){
					case 1:
						switch ($_POST['products_tasks']) {
							case 'full_analysis_replace':*/
								echo date('H:i:s') . ' - Количество продуктов: ' . count($_POST['article']) . '<br>';
								/*$wpdb->query("DELETE relations.*, taxes.*, terms.*
												FROM wp_term_relationships AS relations
												INNER JOIN wp_term_taxonomy AS taxes
												ON relations.term_taxonomy_id=taxes.term_taxonomy_id
												INNER JOIN wp_terms AS terms
												ON taxes.term_id=terms.term_id
												WHERE object_id IN (SELECT ID FROM wp_posts WHERE post_type='product')");*/
								for($i = 0; $i < count($_POST['article']); $i++) { 
									echo $i . ' - ';
									echo '<br>';
									$product_array['title'] = $_POST['title'][$i];
									$product_array['image'] = $_POST['image'][$i];
									$product_array['article'] = $_POST['article'][$i];
									$product_array['price'] = $_POST['price'][$i];
									$product_array['in_stock'] = $_POST['in_stock'][$i];
									$term = get_term_by( 'id', $_POST['category_site'][$i], 'product_cat', 'ARRAY_A' );				
									$category_name = $term['name'];
									$product_array['category_site_id'] = $_POST['category_site'][$i];
									$product_array['category_site_name'] = $category_name;
									$product_array['description'] = $_POST['category_tecdoc'][$i];
									/*for ($j = 0; $j < count($_POST['characteristic_name'][$i]); $j++) { 
										$product_array['product_attributes'][$j] = array (
								            'name' => htmlspecialchars( stripslashes( $_POST['characteristic_name'][$i][$j] ) ),
								            'value' => $_POST['characteristic_value'][$i][$j],
								            'position' => 1,
								            'is_visible' => 1,
								            'is_variation' => 1,
								            'is_taxonomy' => 0
								        );
									}*/
									//addProduct($wpdb, $product_array);
								}
								$deleted_count = deleteItemsFromItemsTableByID($_POST['article']);
								echo date('H:i:s') . ' - Deleted products: ' . $deleted_count . '<br>';
								echo "<br>Все товары категории " . $product_array['category_site_name'] . "  успешно добавлены и обновлены<br>";							
	/*							break;
						}
						break;
				}*/
					break;
				case "2":
					for($i = 0; $i < count($_POST['article']); $i++) { 
						echo $i . ' - ';
						echo '<br>';
						$product_array['title'] = $_POST['title'][$i];
						$product_array['image'] = $_POST['image'][$i];
						$product_array['article'] = $_POST['article'][$i];
						$product_array['price'] = $_POST['price'][$i];
						$product_array['in_stock'] = $_POST['in_stock'][$i];
						$term = get_term_by( 'id', $_POST['category_site'][$i], 'product_cat', 'ARRAY_A' );				
						$category_name = $term['name'];
						$product_array['category_site_name'] = $category_name;
						$product_array['category_site_id'] = $_POST['category_site'][$i];
						$product_array['crosssells'] = $_POST['crosssells'][$i];
						$product_array['upsells'] = $_POST['upsells'][$i];
						saveUpsellsAndCrossselsDB($wpdb, $product_array['article'], $product_array['upsells'], $product_array['crosssells']);
						echo $i . " - ";
						var_dump($product_array);
						echo "<br>";
						//addProduct($wpdb, $product_array);
					}
					break;
			}
		}

		echo '<h3>Загрузите Excel файл для его разбора системой:</h3><br>			  			  
			  <form  method = "POST" enctype = "multipart/form-data">
			  	Связывать товары с TecDoc?<br>
			  	<select name = "tecdoc_connection">
				  	<option value = "1">Связывать с TecDoc</option>
				  	<option value = "2">Не связывать с Tecdoc(без апселов и кросселов)</option>
				  </select><br>
				  Что делать с товарами?<br>
				  <select name = "products_task">
				  	<option value = "update_prices">Обновить только цены</option>
				  	<option value = "add_and_update_products">Обновить существующие и добавить новые(без кросселов)</option>
				  	<option value = "replace">Удалить все старые и добавить только с прайса(без кросселов)</option>
				  	<option value = "full_analysis_replace">Провести полный анализ(с удалением старых)</option>
				  	<option value = "full_analysis_update">Провести полный анализ(с обновлением старых)</option>
				  </select><br><br>
			  	<input type = "file" name = "file"><br><br><br>
			  	<input type = "submit" value = "Загрузить прайс-лист">
			  </form><br><br>';	
	}

	function saveUpsellsAndCrossselsDB($wpdb, $article, $upsells, $crosssels){
		$results = json_decode(json_encode($wpdb->get_results( 'SELECT * FROM products_upsells_crosssels WHERE article = "' . $article . '"' )),true);
		if(!$results){
			$wpdb->insert( 
				'products_upsells_crosssels', 
				array( 
					'article' => $article,
					'crosssels' => $crosssels,
					'upsells' => $upsells
				)
			);
			$id = $wpdb->insert_id;
		}else{
			if($crosssels){
				$wpdb->update( 
					'products_upsells_crosssels', 
					array( 
						'crosssels' => $crosssels
					), 
					array( 'article' => $results[0]['article'] )
				);
			}
			if($upsells){
				$wpdb->update( 
					'products_upsells_crosssels', 
					array( 
						'upsells' => $upsells
					), 
					array( 'article' => $results[0]['article'] )
				);
			}
		}
	}

	/*
	 * addProduct - фукнция, которая сохраняет продукт в БД wordpress'a, используя стандартные фукнции его ядра.
     */
	function addProduct($wpdb, $product_array){
		echo $product_array['image'];
		$alternative_name_id = checkAlternativeCategoryName($wpdb, $product_array['description']);
		if(!$alternative_name_id){
			addAlternativeCategoryName($wpdb, $product_array['category_site_id'], $product_array['description']);
		}

		$post = array(
		     'post_content' => $product_array['description'],
		     'post_status' => "publish",
		     'post_title' => $product_array['title'],
		     'post_parent' => '',
		     'post_type' => "product",

	     );
	     $post_id = wp_insert_post( $post, $wp_error );
	     if($post_id){
	     	$thumbnail_id = save_image_with_url($product_array['image'], $post_id);
	     	set_post_thumbnail( $post_id, $thumbnail_id );
		 }
	     wp_set_object_terms( $post_id, $product_array['category_site_name'], 'product_cat' );
	     wp_set_object_terms($post_id, 'simple', 'product_type');

	     update_post_meta( $post_id, '_visibility', 'visible' );
	     update_post_meta( $post_id, '_stock_status', 'instock');
	     update_post_meta( $post_id, 'total_sales', '0');
	     update_post_meta( $post_id, '_downloadable', 'no');
	     update_post_meta( $post_id, '_virtual', 'no');
	     update_post_meta( $post_id, '_regular_price', $product_array['price'] );
	     update_post_meta( $post_id, '_sale_price', $product_array['price'] );
	     update_post_meta( $post_id, '_purchase_note', "" );
	     update_post_meta( $post_id, '_featured', "no" );
	     update_post_meta( $post_id, '_weight', "" );
	     update_post_meta( $post_id, '_length', "" );
	     update_post_meta( $post_id, '_width', "" );
	     update_post_meta( $post_id, '_height', "" );
	     update_post_meta( $post_id, '_sku', $product_array['article']);
	     update_post_meta( $post_id, '_product_attributes', array());//$product_array['product_attributes']);
	     update_post_meta( $post_id, '_sale_price_dates_from', "" );
	     update_post_meta( $post_id, '_sale_price_dates_to', "" );
	     update_post_meta( $post_id, '_price', $product_array['price'] );
	     update_post_meta( $post_id, '_sold_individually', "" );
	     update_post_meta( $post_id, '_manage_stock', "no" );
	     update_post_meta( $post_id, '_backorders', "no" );
	     update_post_meta( $post_id, '_upsell_ids', array('181') ); 
	     update_post_meta( $post_id, '_crosssell_ids', array() ); //Сюда добавлять все поулченные ID кросселов.
	     update_post_meta( $post_id, '_stock', $product_array['in_stock'] );
	}

	/*
	 * save_image_with_url - Скачивает иозбражение со стороннего сервера, сохраняет его в папку Wordpress 
	 * и возвращает его ID для привязки к товару.
	 */
	function save_image_with_url($url, $post_id) {
		
		$tmp = download_url( $url , 10 );
		$desc = "";
		$file_array = array();
		$id = false;
	
		@preg_match('/[^\?]+\.(jpg|jpe|jpeg|gif|png)/i', $url, $matches);
		
		$file_array['name'] = basename($matches[0]);
		$file_array['tmp_name'] = $tmp;
		$desc = $file_array['name'];
		
		if ( is_wp_error( $tmp ) ) {
			@unlink($file_array['tmp_name']);
			$file_array['tmp_name'] = '';
			return $id;
		}
	
		$id = media_handle_sideload( $file_array, $post_id, $desc );
	
		if ( is_wp_error($id) ) {
			@unlink($file_array['tmp_name']);
			return $id;
		}
		
		return $id;
	}

	/*
	 * getAllSiteCategories - получает список всех категорий товаров плагина Woocommerce(т.к. понятие категорий Woocommerce 
	 * и категорий самого Wordpress имеют некоторые отличия)
	 */
	function getAllSiteCategories(){
		  $needle_category_list = array();
		  $taxonomy     = 'product_cat';
		  $orderby      = 'name';  
		  $show_count   = 0;      // 1 for yes, 0 for no
		  $pad_counts   = 0;      // 1 for yes, 0 for no
		  $hierarchical = 1;      // 1 for yes, 0 for no   
		  $empty        = 0;

		  $args = array(
		         'taxonomy'     => $taxonomy,
		         'orderby'      => $orderby,
		         'show_count'   => $show_count,
		         'pad_counts'   => $pad_counts,
		         'hierarchical' => $hierarchical,
		         'hide_empty'   => $empty
		  );
		 $all_categories = get_categories( $args );
		 foreach($all_categories as $sub_category) {
            $result = getSubCategories($sub_category);
            	if($result !== false)
                	$needle_category_list[] = $result;    
         }
		 return $needle_category_list;
	}

	function getSubCategories($category_object){
		$needle_category_list = array();
		$category_id = $category_object->term_id;
		$args = array(
            'taxonomy'     => 'product_cat',
            'child_of'     => 0,
            'parent'       => $category_id,
            'orderby'      => 'name',
            'show_count'   => 0,
            'pad_counts'   => 0,
            'hierarchical' => 1,
            'hide_empty'   => 0
    	);
        $sub_cats = get_categories( $args );
        if($sub_cats) {
            foreach($sub_cats as $sub_category) {
            	$result = getSubCategories($sub_category);
            	if($result !== false)
                	$needle_category_list[] = $result;    
            }
            return count($needle_category_list) > 0 ? $needle_category_list : false; 
        }else{
        	return $category_id ? array('id' => $category_id, 'name' => $category_object->name) : false;
        }
	}

	/*
	 * setSelectListFromCategories - функция, которая создает select и options'ы для категорий продуктов.
	 * Можно задать класс для всего select'a, id и изначально выбранную категорию.
	 */
	function setSelectListFromCategories($categories_array, $id, $class, $id_selected_category){
		$id_code = $id ? ' id="' . $id . '" ' : '';
		$class_code = $class ? ' class="' . $class . '" ' : '';
		$categories_site_ui = '<select ' . $id_code . ' ' . $class_code . ' name = "category_site[' . $counter_product . ']">';
		foreach ($categories_array as $category_site) {
			$selected = '';
			if($id_selected_category !== false && $id_selected_category == $category_site['id']){
				$selected = 'selected';
			}
			$categories_site_ui .= '<option ' . $selected . ' value = "' . $category_site['id'] . '">' . $category_site['name'] . '</option>';
		}
		$categories_site_ui .= '</select>';
		return $categories_site_ui;
	}

	/*
	 * readXLSXDocumentTecDoc - Функция, в которой происходит первичная обработка и вывод обработанного 
	 * содержимого файла, полученного в форме загрузки
	 */
	function readXLSXDocumentTecDoc($wpdb, $tecdoc_db_link, $file_name, $categories_site_array, $analysis_type){
		//Загрузка excel/csv файла с помощью библиотеки PhpExcel - способ, который неактуальный для файлов больших размеров
		
		/*$inputFileName = $file_name;

		try {
		    $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
		    $objReader = PHPExcel_IOFactory::createReader($inputFileType);
		    $objReader->setReadDataOnly(true);
		    $objPHPExcel = $objReader->load($inputFileName);
		} catch (Exception $e) {
		    die('Error loading file "' . pathinfo($inputFileName, PATHINFO_BASENAME) 
		    . '": ' . $e->getMessage());
		}

		$sheet = $objPHPExcel->getSheet(0);
		$highestRow = $sheet->getHighestRow();
		$highestColumn = $sheet->getHighestColumn();*/

		$categories_site_ui_multi = setSelectListFromCategories($categories_site_array, 'multi_select_categories', false, false);
		$multi_select_categories = '<table>
			<tr>
				<td colspan="2">Задать категорию для выделенных товаров</td>
			</tr>
			<tr>
				<td>' . $categories_site_ui_multi . '</td><td><input type = "submit" onclick = "setMultiSelectCategory()" value = "Задать категорию"></td>
			</tr>
		</table>';
		echo $multi_select_categories;

		$crossel_categories_ui_multi = setSelectListFromCategories($categories_site_array, 'crossel_categories_multi', false, false);
		$crossel_categories_multi = '<table>
			<tr>
				<td colspan="3">Задать кросселы для выделенных товаров</td>
			</tr>
			<tr>
				<td>' . $crossel_categories_ui_multi . '</td><td><select id = "crossel_product"></select></td><td><input type = "submit" onclick = "getProductsByCategoryCrossel()" value = "Задать категорию"></td>
			</tr>
		</table><br>';
		echo $crossel_categories_multi;

		echo date('H:i:s') . ' - Товары, которые будут добавлено после подтверждения:<br>';
		    	echo '<form method = "POST" ecntype = "multipart/form-data">
		    		  <input type = "hidden" name = "create_products" value = "1">
		    		  <input type = "hidden" name = "analysis_type" value = "' . $analysis_type . '">
		    		  <table border = "1px groove black">
		    			<tr>
		    				<td><input onclick = "selectAllCheckboxes()" checked type = "checkbox" name = "all_checked_products"></td>
		    				<td>Полное имя</td>
		    				<td>Фото</td>
		    				<td>Артикул</td>
		    				<td>Стоимость</td>
		    				<td>В наличии</td>
		    				<td>Категория на сайте</td>
		    				<td>Категория в TecDoc</td>		    				
		    			</tr>';
						$counter_product = 0; 
									$mysqli = mysqli_connect('localhost', 'root', '1234rewq!', 'autodoctor');
									if (mysqli_connect_errno()) {
									  echo mysqli_connect_errno();
									}

						    		$query = "SELECT * FROM import_data";
									$output = mysqli_query($mysqli, $query);
									$current_category = '';
									$other_categories = array();
									$counter_current = 0; 
									while($row = mysqli_fetch_assoc($output)){
									  	$art_id = getArticleIDbyCodeTecDocDB($row[vendor_code], $tecdoc_db_link); //ID продукта за его артикулом
							    		$img = 'http://lagoda.freedomain.thehost.com.ua/' . getImageTecDocDB($art_id, $tecdoc_db_link);
							    		$category_tecdoc = getCategoryNameTecDocDB($art_id, $tecdoc_db_link);
							    		if($current_category == ''){
							    			$current_category = $category_tecdoc;
							    		}else{
							    			if($current_category == $category_tecdoc){
							    				$counter_current++;
							    				$characteristics_array = getCharacteristicsTecDocDB($art_id, $tecdoc_db_link);
									    		$characteristics_ui = '';
									    		if($characteristics_array){
									    			$characteristic_counter = 0;
									    			foreach ($characteristics_array as $characteristic) {
										    			$characteristics_ui .= '<input checked readonly type="checkbox" name="characteristic_name[' . $counter_product . '][]" value="' . 
										    				$characteristic['characteristics_name'] . '">' . $characteristic['characteristics_name'] . ':' . 
										    				$characteristic['characteristics_value'] . '<br>';
										    			$characteristics_ui .= '<input type = "hidden" name = "characteristic_value[' . $counter_product . '][]" value = "' . 
										    			$characteristic['characteristics_value'] . '">';
										    			$characteristic_counter++;
										    		}
									    		}			    		
									    						    		
									    		$red_style = '';
									    		$alternative_name_id = checkAlternativeCategoryName($wpdb, $category_tecdoc);
									    		if(!$alternative_name_id){
									    			$red_style = 'style = "border: 2px red groove"';
									    			$id_selected_category = false;
									    		}else{
									    			$id_selected_category = $alternative_name_id;
									    		}
									    		$categories_site_ui = setSelectListFromCategories($categories_site_array, false, 'product_category', $id_selected_category);
									    		echo '<tr class = "product_row" data-id = "' . $article . '" ' . $red_style . '>
									    				<td><input checked type = "checkbox" class = "checked_product" name = "checked_product[' . $counter_product . ']"></td>
									    				<td><input name = "title[' . $counter_product . ']" size = "12" value = "' . $row[name] . '"></td>
									    				<td><input type =  "hidden" name = "image[' . $counter . ']" value = "' . $img . '"><img width = "150px" src = "' . $img . '"/></td>
									    				<td><input name = "article[' . $counter_product . ']" size = "8" value = "' . $row[vendor_code] . '"></td>
									    				<td><input name = "price[' . $counter_product . ']" size = "5" value = "' . $row[price] . '"></td>
									    				<td><input name = "in_stock[' . $counter_product . ']" size = "2" value = "' . $row[sum_rest] . '"></td>
									    				<td>' . $categories_site_ui . '</td>
									    				<td><textarea name = "category_tecdoc[' . $counter_product . ']" cols = "15" rows = "3">' . $category_tecdoc . '</textarea></td>
									    			</tr>';
									    		/*echo '<tr class = "product_row" data-id = "' . $article . '" ' . $red_style . '>
									    				<td><input type = "checkbox" class = "checked_product" name = "checked_product[' . $counter_product . ']"></td>
									    				<td><input name = "title[' . $counter_product . ']" size = "12" value = "' . $row[name] . '"></td>
									    				<td><input type =  "hidden" name = "image[' . $counter . ']" value = "' . $img . '"><img width = "150px" src = "' . $img . '"/></td>
									    				<td><input name = "article[' . $counter_product . ']" size = "8" value = "' . $row[vendor_code] . '"></td>
									    				<td><input name = "price[' . $counter_product . ']" size = "5" value = "' . $row[price] . '"></td>
									    				<td><input name = "in_stock[' . $counter_product . ']" size = "2" value = "' . $row[sum_rest] . '"></td>
									    				<td>' . $categories_site_ui . '</td>
									    				<td><textarea name = "category_tecdoc[' . $counter_product . ']" cols = "15" rows = "3">' . $category_tecdoc . '</textarea></td>
									    				<td>' . $characteristics_ui . '</td>
									    			</tr>';*/
									    			$counter_product++;
							    			}else{
							    				$found = 0;
							    				for ($j = 0; $j < count($other_categories); $j++) { 
							    					if($category_tecdoc == $other_categories[$j] || $category_tecdoc == $current_category){
							    						$found = 1;
							    						break;
							    					}
							    				}
							    				if(!$found && $category_tecdoc != '')
							    					$other_categories[] = $category_tecdoc;							    				
							    			}
							    		}   		
							    		
							    		
									}
									mysqli_free_result($output);
									mysqli_close($mysqli);
		echo '</table>
		<input type = "submit" value = "Добавить товары">
		</form>';
		echo date('H:i:s') . ' - Текущая категория товаров(за версией TecDoc): ' . $current_category . '(' . $counter_current . ')<br>';
		echo 'Оставшиеся категории товаров(' . count($other_categories) . '): <br>';
		foreach ($other_categories as $key => $value) {
			echo $value . '<br>';
		}
		echo 'Количество товаров всего: ' . $counter_product;
	}

	/*
	 * readXLSXDocumentTecDoc - Функция, в которой происходит первичная обработка и вывод обработанного 
	 * содержимого файла, полученного в форме загрузки
	 */
	function readXLSXDocumentWithoutTecDoc($wpdb, $tecdoc_db_link, $file_name, $categories_site_array, $analysis_type){

		$categories_site_ui_multi = setSelectListFromCategories($categories_site_array, 'multi_select_categories', false, false);
		$all_brands = getBrands($tecdoc_db_link);

		$multi_select_categories = '<table>
			<tr>
				<td colspan="2">Задать категорию для выделенных товаров</td>
			</tr>
			<tr>
				<td>' . $categories_site_ui_multi . '</td><td><input type = "submit" onclick = "setMultiSelectCategory()" value = "Задать категорию"></td>
			</tr>
		</table>';
		echo $multi_select_categories;

		echo date('H:i:s') . ' - Товары, которые будут добавлено после подтверждения:<br>';
		echo '<form method = "POST" ecntype = "multipart/form-data">
			  <input type = "hidden" name = "create_products" value = "1">
			  <input type = "hidden" name = "analysis_type" value = "' . $analysis_type . '">
			  <table border = "1px groove black">
				<tr>
					<td><input onclick = "selectAllCheckboxes()" checked type = "checkbox" name = "all_checked_products"></td>
					<td>Полное имя</td>
					<td>Фото</td>
					<td>Артикул</td>
					<td>Стоимость</td>
					<td>В наличии</td>
					<td>Список сопутствующих</td>
					<td>Список аналогов</td>
					<td>Категория на сайте</td>
					<td>Марка</td>
    				<td>Модель</td>
    				<td>Год начала выпуска</td>
    				<td>Год окончания выпуска</td>
    				<td>Модификация</td>
				</tr>';
		$counter_product = 0; 
		$mysqli = mysqli_connect('localhost', 'root', '1234rewq!', 'autodoctor');
		if (mysqli_connect_errno()) {
		  echo mysqli_connect_errno();
		}

		$query = "SELECT * FROM import_data";
		$output = mysqli_query($mysqli, $query);
		$current_category = '';
		$other_categories = array();
		$counter_current = 0; 
		while($row = mysqli_fetch_assoc($output)){
    		//$img = 'http://lagoda.freedomain.thehost.com.ua/other_images/' . str_replace('_', ' ', $row[vendor_code]) . '.jpg'; // сделать здесь
    		$img = checkImageExist('http://lagoda.freedomain.thehost.com.ua/other_images/', $row[vendor_code]);
			$counter_current++;			    		
    		
    		$all_brands_ui = setUIOfArray($all_brands, 'brands', false, 'Выберите марку', 'ID', $row[vendor_code], 'getModels(\'' . $row[vendor_code] .'\')');				    		
    		$categories_site_ui = setSelectListFromCategories($categories_site_array, false, 'product_category', false);
    		echo '<tr class = "product_row" data-id = "' . $row[vendor_code] . '" ' . $red_style . '>
    				<td><input checked type = "checkbox" class = "checked_product" name = "checked_product[' . $counter_product . ']"></td>
    				<td><input name = "title[' . $counter_product . ']" size = "12" value = "' . $row[name] . '"></td>
    				<td><input type =  "hidden" name = "image[' . $counter . ']" value = "' . $img . '"><img width = "150px" src = "' . $img . '"/></td>
    				<td><input name = "article[' . $counter_product . ']" size = "8" value = "' . $row[vendor_code] . '"></td>
    				<td><input name = "price[' . $counter_product . ']" size = "5" value = "' . $row[price] . '"></td>
    				<td><input name = "in_stock[' . $counter_product . ']" size = "2" value = "' . $row[sum_rest] . '"></td>
    				<td><input name = "crosssells[' . $counter_product . ']" size = "8" value = "" placeholder = "Через запятую"></td>
    				<td><input name = "upsells[' . $counter_product . ']" size = "8" value = "" placeholder = "Через запятую"></td>
    				<td>' . $categories_site_ui . '</td>
    				<td>' . $all_brands_ui . '<br><input name = "brand[' . $counter_product . ']" size = "8" value = "" placeholder = "Марка"></td>
    				<td><input name = "model[' . $counter_product . ']" size = "8" value = "" placeholder = "Модель"></td>
    				<td><input name = "date_start[' . $counter_product . ']" size = "8" value = "" placeholder = "Год начала"></td>
    				<td><input name = "date_end[' . $counter_product . ']" size = "8" value = "" placeholder = "Год окончания"></td>
    				<td><input name = "modification[' . $counter_product . ']" size = "8" value = "" placeholder = "Модификация"></td>    				
    			</tr>';
    			$counter_product++;   		
    		
		}
		mysqli_free_result($output);
		mysqli_close($mysqli);
		echo '</table>
		<input type = "submit" value = "Добавить товары  в магазин">
		</form>';
		echo 'Количество товаров всего: ' . $counter_product;
	}

	function checkImageExist($link, $article){
		$img = checkImageFormat( $link . strtolower ( str_replace(' ', '_', $article ) ) );
		if( checkHttpExist ( $img ))
			return $img;
		$img = checkImageFormat( $link . str_replace(' ', '_', $article ) );
		if( checkHttpExist ( $img ))
			return $img;
		$img = checkImageFormat( $link . $article );
		if( checkHttpExist ( $img ))
			return $img;
		$img = checkImageFormat( $link . strtolower ( $article ) );
		if( checkHttpExist ( $img ))
			return $img;
	}

	function checkImageFormat($link){
		if(checkHttpExist ( $link . '.jpg' ))
			return $link . '.jpg';
		if(checkHttpExist ( $link . '.png' ))
			return $link . '.png';
		if(checkHttpExist ( $link . '.jpeg' ))
			return $link . '.jpeg';		
		if(checkHttpExist ( $link . '.gif' ))
			return $link . '.gif';
	}

	function checkHttpExist($link){
		$connection = curl_init($link);
		curl_setopt($connection, CURLOPT_NOBODY, true);
		curl_exec($connection);
		$return_code = curl_getinfo($connection, CURLINFO_HTTP_CODE);
		// $retcode >= 400 -> not found, $retcode = 200, found.
		curl_close($connection);
		if($return_code >= 400)
			return false;
		else
			return true;
	}

	function setUIOfArray($array, $class, $id, $first_value, $type_of_value, $parent_data_id, $onchange){
		$class_ui = $class ? 'class = "' . $class . '"' : '';
		$onchange_event = $onchange ? ' onchange = "' . $onchange . '"' : '';
		$select_input = '<select ' . $class_ui . ' ' . $onchange_event . '>
							<option value = "0">' . $first_value . '</option>';
		foreach ($array as $key) {
			$select_input .= '<option value = "' . $key[$type_of_value] . '">' . $key['name'] . '</option>';
		}
		$select_input .= '</select>';
		return $select_input;
	}

	
	/*
	 * checkAlternativeCategoryName
	 */
	function checkAlternativeCategoryName($wpdb, $alternative_name){
		$results = $wpdb->get_results( 'SELECT * FROM wu_alternative_category_names WHERE alternative_name = "' . $alternative_name . '" 
									ORDER BY  "id_alternative_category_name" DESC LIMIT 1', 'ARRAY_A' );
		if($results){
			$needle_id = $results[0]['id_category'];
		}else{
			$needle_id = 0;
		}
		return $needle_id;
	}

	function addAlternativeCategoryName($wpdb, $main_category_id, $alternative_name){
		$wpdb->insert( 
			'wu_alternative_category_names', 
			array( 
				'id_category' => $main_category_id,
				'alternative_name' => $alternative_name
			)
		);
	}

	function addPricesTecDoc($wpdb, $category, $service, $price){
		
		$added = false;

		$results = json_decode(json_encode($wpdb->get_results( 'SELECT * FROM pc_categories WHERE category = "' . $category . '"' )),true);
		if(!$results){
			$wpdb->insert( 
				'pc_categories', 
				array( 
					'category' => $category
				)
			);
			$id = $wpdb->insert_id;
		}else{
			$id = $results[0]['id_category'];
		}
		$results = json_decode(json_encode($wpdb->get_results( 'SELECT * FROM pc_services WHERE id_category = "' . $id . '" AND
																		service = "' . $service . '"' )), true);
		if(!$results){
			$wpdb->insert( 
				'pc_services', 
				array( 
					'id_category' => $id,
					'service' => $service,
					'price' => $price
				)
			);
			$added = true;
		}else{
			$wpdb->update( 
				'pc_services', 
				array( 
					'price' => $price
				), 
				array( 'id_service' => $results[0]['id_service'] )
			);
		}
		return $added;
	}

	add_action('admin_menu', 'addAdminPageTecdocLoader');


