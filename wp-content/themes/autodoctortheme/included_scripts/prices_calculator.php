<?php 
	include "db_data.php";

	class MySQLConnector{
		public $host = '';
		public $user = '';
		public $password = '';
		public $db = '';
		public $categoties_table = 'pc_categories';
		public $services_table = 'pc_services';
		public $descriptor;

		public function __construct($host, $user, $password, $db){
			$this->host = $host;
			$this->user = $user;
			$this->password = $password;
			$this->db = $db;
		}

		public function connectDB(){
			$this->descriptor = mysql_connect( $this->host, $this->user, $this->password ) OR DIE('was not connected');

			mysql_select_db( $this->db, $this->descriptor ) OR DIE('was not connected to DB');
		}


		public function getCategories(){
			$query = "SELECT pc_categories.*  FROM pc_categories";
            mysql_query( "SET CHARACTER SET UTF8", $this->descriptor );
			$result = mysql_query ( $query, $this->descriptor );
			
			while($row = mysql_fetch_array( $result )){
				$data_array[] = array('category' => $row['category'],
									  'id' => $row['id_category']);
			}

			return $data_array;
		}

		public function getServices($id_category){
			$query = "SELECT *  FROM pc_services WHERE id_category = " . $id_category;
            mysql_query( "SET CHARACTER SET utf8", $this->descriptor );
			$result = mysql_query ( $query, $this->descriptor );
			
			while($row = mysql_fetch_array( $result )){
				$data_array[] = array('service' => $row['service'],
									  'id' => $row['id_service'],
									  'price' => $row['price']);
			}

			return $data_array;
		}

		public function insertLead($lead_link){
			$query = "INSERT INTO " . $this->leads_table . "(lead_link) 
							 VALUES('" . $lead_link . "')";
			$result = mysql_query ( $query, $this->descriptor ) OR DIE('insert_error');
		}

	}

	if($_POST['name_query']){
		$mysql_object = new MySQLConnector($db_host, $db_user, $db_password, $db_name);
		$mysql_object->connectDB();


		switch ($_POST['name_query']) {
			case 'get_categories':
				echo json_encode($mysql_object->getCategories());
				break;
			case 'get_services':
				echo json_encode($mysql_object->getServices($_POST['id_category']));
				break;
		}
	}