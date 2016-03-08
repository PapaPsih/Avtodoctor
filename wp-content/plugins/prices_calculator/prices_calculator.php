<?php
	/*
	Plugin Name: Калькулятор цен
	Plugin URI: none
	Description: Плагин загрузки цен на услуги СТО для калькулятора цен на сайте Автодоктор
	Version: 3.1.5
	Author: WebUniverse
	Author URI: http://webuniverse.com.ua/
	*/
	define( 'prices_calculator_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	define( 'prices_calculator_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

	if ( ! function_exists( 'wp_handle_upload' ) ) {
	    require_once( str_replace(chr(92), '/', ABSPATH) . 'wp-admin/includes/file.php' );
	    
	}
	require_once( str_replace(chr(92), '/', ABSPATH) . 'wp-includes/pluggable.php');
	require_once('php_excel/Classes/PHPExcel.php');
	

	

	function addAdminPagePricesCalculator(){
		add_menu_page('Система анализа загруженного .xls файла и его разбор для Калькулятора цен', 
					 'Калькулятор цен', 
					 8, 
					 'prices_calculator', 
					 'pricesCalculatorOptionsPage');
	}

	function pricesCalculatorOptionsPage(){
		global $wpdb;

		echo '<h2>Система анализа загруженного .xls файла и его разбор для Калькулятора цен</h2>';

		if($_FILES['file']){
			$uploadedfile = $_FILES['file'];

			$upload_overrides = array( 'test_form' => false );

			$movefile = wp_handle_upload( $uploadedfile, $upload_overrides );

			if ( $movefile && !isset( $movefile['error'] ) ) {
			    echo "Успешно загруженный файл, файл: ";
			    echo $movefile['file'] . "<br><br>";
			    readXLSXDocument($wpdb, $movefile['file']);
			    //var_dump( $movefile);
			} else {
				echo "Ошибка: ";
			    echo $movefile['error'];
			}
		}

		if($_POST['delete']){
			$results = json_decode(json_encode($wpdb->get_results( 'SELECT pc_services.*  FROM pc_services 
																	WHERE pc_services.id_service = ' . $_POST['delete'] . ' LIMIT 1; ' )),true);
			$id_category = $results[0]['id_category'];
			$wpdb->query(
				"DELETE FROM pc_services WHERE id_service = '" . $_POST['delete'] . "'" 
			);
			$results = json_decode(json_encode($wpdb->get_results( 'SELECT pc_services.*  FROM pc_services 
																	WHERE pc_services.id_category = ' . $id_category . ' LIMIT 1; ' )),true);
			if(!$results){
				$wpdb->query(
					"DELETE FROM pc_categories WHERE id_category = '" . $id_category . "'" 
				);
			}
			echo "Успешно удалено!<br><br><br>";
		}

		

		echo '<h3>Загрузите Excel файл для его разбора системой:</h3><br>
			  <form  method = "POST" enctype = "multipart/form-data">
			  	<input type = "file" name = "file"><br><br><br>
			  	<input type = "submit" value = "Отправить">
			  </form><br><br>';

		echo "<h3>Имеющиейся данные:</h3><br>";
		

		$results = json_decode(json_encode($wpdb->get_results( 'SELECT pc_services.*, pc_categories.*  FROM pc_services 
																									   INNER JOIN pc_categories
															    ON pc_services.id_category = pc_categories.id_category' )),true);
		if($results){
			echo '<table border = "1"  cellspacing="2" cellpadding="10">
				  <tr>
					  <td><strong>Категория</strong></td>
					  <td><strong>Услуга</strong></td>
				      <td><strong>Стоимость</strong></td>
				      <td><strong>Удалить</strong></td>
				  </tr>';
			foreach ($results as $data) {
				echo '<tr>
						<td>' . $data['category'] . '</td>
						<td>' . $data['service'] . '</td>
						<td>' . $data['price'] . '</td>
						<td>
							<form method = "POST">
								<input type = "hidden" name = "delete" value = "' . $data['id_service'] . '">
								<input type = "submit" value = "Удалить">
							</form>
						</td>
					  </tr>';
			}
			echo '</table>';
		}



		
	}

	function readXLSXDocument($wpdb, $file_name){
		$inputFileName = $file_name;
		//  Read your Excel workbook
		try {
		    $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
		    $objReader = PHPExcel_IOFactory::createReader($inputFileType);
		    $objPHPExcel = $objReader->load($inputFileName);
		} catch (Exception $e) {
		    die('Error loading file "' . pathinfo($inputFileName, PATHINFO_BASENAME) 
		    . '": ' . $e->getMessage());
		}

		//  Get worksheet dimensions
		$sheet = $objPHPExcel->getSheet(0);
		$highestRow = $sheet->getHighestRow();
		$highestColumn = $sheet->getHighestColumn();

		for ($row = 2; $row <= $highestRow; $row++) {
		    $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, 
		    								NULL, 
		    								TRUE, 
		    								FALSE);
		    if($rowData[0]){
		    	echo 'Были произведены действия:<br>';
		    	foreach($rowData[0] as $k=>$v){
			    	if($k == 0){
			    		$service_category = $v;
			    	}else if($k == 1){
			    		$service = $v;
			    	}else if($k == 2){
			    		$service_price = $v;
			    		if(addPrices($wpdb, $service_category, $service, $service_price)){
			    			echo "Добавлено - Категория: " . $service_category . ". Услуга: " . $service . ". Стоимость = " . $service_price . "<br/>";
			    		}else{
			    			echo "Обновлено - Категория: " . $service_category . ". Услуга: " . $service . ". Стоимость = " . $service_price . "<br/>";
			    		}  		
			    	}		        
			    }
		    }
		}
	}

	function addPrices($wpdb, $category, $service, $price){
		
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

	add_action('admin_menu', 'addAdminPagePricesCalculator');


