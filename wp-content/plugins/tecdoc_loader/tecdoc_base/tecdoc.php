<?php
	$tecdoc_db_link = mysql_connect('localhost', 'root', '1234rewq!') or die('shit');
	mysql_set_charset ( 'utf8', $tecdoc_db_link );
	mysql_select_db('tecdoc', $tecdoc_db_link) or die('db shit');

	function getArticleIDbyCodeTecDocDB($code, $tecdoc_db_link){
		$result = mysql_query("SELECT * FROM articles WHERE ART_ARTICLE_NR = '" . $code . "'", $tecdoc_db_link) OR DIE('bad query');
		$row = mysql_fetch_assoc($result);
		if($row){
			return $row['ART_ID'];
		}
	}
	function getCategoryNameTecDocDB($id_article, $tecdoc_db_link){
		$result = mysql_query("SELECT
								ART_ARTICLE_NR, SUP_BRAND, DES_TEXTS.TEX_TEXT AS ART_COMPLETE_DES_TEXT, DES_TEXTS2.TEX_TEXT AS ART_DES_TEXT, DES_TEXTS3.TEX_TEXT AS ART_STATUS_TEXT
								FROM ARTICLES
								INNER JOIN DESIGNATIONS ON DESIGNATIONS.DES_ID = ART_COMPLETE_DES_ID AND DESIGNATIONS.DES_LNG_ID = 16
								INNER JOIN DES_TEXTS ON DES_TEXTS.TEX_ID = DESIGNATIONS.DES_TEX_ID
								LEFT JOIN DESIGNATIONS AS DESIGNATIONS2 ON DESIGNATIONS2.DES_ID = ART_DES_ID AND DESIGNATIONS2.DES_LNG_ID = 16
								LEFT JOIN DES_TEXTS AS DES_TEXTS2 ON DES_TEXTS2.TEX_ID = DESIGNATIONS2.DES_TEX_ID
								INNER JOIN SUPPLIERS ON SUP_ID = ART_SUP_ID
								INNER JOIN ART_COUNTRY_SPECIFICS ON ACS_ART_ID = ART_ID
								INNER JOIN DESIGNATIONS AS DESIGNATIONS3 ON DESIGNATIONS3.DES_ID = ACS_KV_STATUS_DES_ID AND DESIGNATIONS3.DES_LNG_ID = 16
								INNER JOIN DES_TEXTS AS DES_TEXTS3 ON DES_TEXTS3.TEX_ID = DESIGNATIONS3.DES_TEX_ID
								WHERE ART_ID = '" . $id_article . "';", $tecdoc_db_link);
		$row = mysql_fetch_assoc($result);
		if($row){
			return $row['ART_COMPLETE_DES_TEXT'];
		}
	}
	function getCharacteristicsTecDocDB($id_article, $tecdoc_db_link){
		$result = mysql_query("SELECT DES_TEXTS.TEX_TEXT AS CRITERIA_DES_TEXT, IFNULL(DES_TEXTS2.TEX_TEXT, ACR_VALUE) AS CRITERIA_VALUE_TEXT
								FROM ARTICLE_CRITERIA
								LEFT JOIN DESIGNATIONS AS DESIGNATIONS2 ON DESIGNATIONS2.DES_ID = ACR_KV_DES_ID
								LEFT JOIN DES_TEXTS AS DES_TEXTS2 ON DES_TEXTS2.TEX_ID = DESIGNATIONS2.DES_TEX_ID
								LEFT JOIN CRITERIA ON CRI_ID = ACR_CRI_ID 
								LEFT JOIN DESIGNATIONS ON DESIGNATIONS.DES_ID = CRI_DES_ID
								LEFT JOIN DES_TEXTS ON DES_TEXTS.TEX_ID = DESIGNATIONS.DES_TEX_ID
								WHERE	ACR_ART_ID = '" . $id_article . "' AND (DESIGNATIONS.DES_LNG_ID IS NULL OR DESIGNATIONS.DES_LNG_ID = 16) 
								AND (DESIGNATIONS2.DES_LNG_ID IS NULL OR DESIGNATIONS2.DES_LNG_ID = 16);", $tecdoc_db_link);
		while ($row = mysql_fetch_assoc($result)) {
		    $data_array[] = array("characteristics_name" => $row["CRITERIA_DES_TEXT"],
		    					  "characteristics_value" => $row["CRITERIA_VALUE_TEXT"]);
		}
		return $data_array;
	}
	function getImageTecDocDB($id_article, $tecdoc_db_link){
		$result = mysql_query("SELECT CONCAT(  'images/TOF_GRA_DATA_',  GRA_TAB_NR, '/',  GRA_GRD_ID, '.',  IF(LOWER(DOC_EXTENSION)='jp2', 'jpg', LOWER(DOC_EXTENSION)) ) AS PATH
									FROM  LINK_GRA_ART
									INNER JOIN GRAPHICS ON GRA_ID = LGA_GRA_ID
									INNER JOIN DOC_TYPES ON DOC_TYPE = GRA_DOC_TYPE
									WHERE LGA_ART_ID = '" . $id_article . "' AND (GRA_LNG_ID = 16 OR GRA_LNG_ID = 255) AND GRA_DOC_TYPE <> 2
									ORDER BY  GRA_GRD_ID;", $tecdoc_db_link);
		$row = mysql_fetch_assoc($result);
		if($row){
			return $row['PATH'];
		}
	}

	function getBrands($tecdoc_db_link){
		$result = mysql_query("SELECT MFA_ID, MFA_BRAND 
								FROM MANUFACTURERS 
								ORDER BY MFA_BRAND;", $tecdoc_db_link);
		$row = mysql_fetch_assoc($result);
		while ($row = mysql_fetch_assoc($result)) {
		    $data_array[] = array("ID" => $row["MFA_ID"],
		    					  "name" => $row["MFA_BRAND"]);
		}
		return $data_array;
	}

	function getModels($brand_id, $tecdoc_db_link){
		$result = mysql_query("SELECT MOD_ID, TEX_TEXT AS MOD_CDS_TEXT, MOD_PCON_START, MOD_PCON_END
								FROM MODELS 
								INNER JOIN COUNTRY_DESIGNATIONS ON CDS_ID = MOD_CDS_ID 
								INNER JOIN DES_TEXTS ON TEX_ID = CDS_TEX_ID 
								WHERE MOD_MFA_ID = " . $brand_id . " AND CDS_LNG_ID = 16 
								ORDER BY MOD_CDS_TEXT;", $tecdoc_db_link);
		$row = mysql_fetch_assoc($result);
		while ($row = mysql_fetch_assoc($result)) {
		    $data_array[] = array("ID" => $row["MOD_ID"],
		    					  "name" => $row["MOD_CDS_TEXT"]);
		}
		return $data_array;
	}

	function getYears($model_id, $tecdoc_db_link){
		$result = mysql_query("SELECT MOD_ID, TEX_TEXT AS MOD_CDS_TEXT, MOD_PCON_START, MOD_PCON_END
								FROM MODELS 
								INNER JOIN COUNTRY_DESIGNATIONS ON CDS_ID = MOD_CDS_ID 
								INNER JOIN DES_TEXTS ON TEX_ID = CDS_TEX_ID 
								WHERE CDS_LNG_ID = 16 AND MOD_ID = " . $model_id . "
								ORDER BY MOD_CDS_TEXT;", $tecdoc_db_link);
		$row = mysql_fetch_assoc($result);
		while ($row = mysql_fetch_assoc($result)) {
		    $data_array[] = array("start_date" => $row["MOD_PCON_START"],
		    					  "end_date" => $row["MOD_PCON_END"]);
		}
		return $data_array;
	}

	function getModifications($model_id, $start_date, $end_date, $tecdoc_db_link){
		$result = mysql_query("SELECT	 TYP_ID, MFA_BRAND, DES_TEXTS7.TEX_TEXT AS MOD_CDS_TEXT, DES_TEXTS.TEX_TEXT AS TYP_CDS_TEXT, TYP_PCON_START, TYP_PCON_END, TYP_CCM, TYP_KW_FROM, TYP_KW_UPTO, TYP_HP_FROM, TYP_HP_UPTO, TYP_CYLINDERS, ENGINES.ENG_CODE, DES_TEXTS2.TEX_TEXT AS TYP_ENGINE_DES_TEXT, DES_TEXTS3.TEX_TEXT AS TYP_FUEL_DES_TEXT, IFNULL(DES_TEXTS4.TEX_TEXT, DES_TEXTS5.TEX_TEXT) AS TYP_BODY_DES_TEXT, DES_TEXTS6.TEX_TEXT AS TYP_AXLE_DES_TEXT, TYP_MAX_WEIGHT
								FROM TYPES INNER JOIN MODELS ON MOD_ID = TYP_MOD_ID 
								INNER JOIN MANUFACTURERS ON MFA_ID = MOD_MFA_ID INNER JOIN COUNTRY_DESIGNATIONS AS COUNTRY_DESIGNATIONS2 ON COUNTRY_DESIGNATIONS2.CDS_ID = MOD_CDS_ID AND COUNTRY_DESIGNATIONS2.CDS_LNG_ID = 16 
								INNER JOIN DES_TEXTS AS DES_TEXTS7 ON DES_TEXTS7.TEX_ID = COUNTRY_DESIGNATIONS2.CDS_TEX_ID INNER JOIN COUNTRY_DESIGNATIONS ON COUNTRY_DESIGNATIONS.CDS_ID = TYP_CDS_ID AND COUNTRY_DESIGNATIONS.CDS_LNG_ID = 16 
								INNER JOIN DES_TEXTS ON DES_TEXTS.TEX_ID = COUNTRY_DESIGNATIONS.CDS_TEX_ID LEFT JOIN DESIGNATIONS ON DESIGNATIONS.DES_ID = TYP_KV_ENGINE_DES_ID AND DESIGNATIONS.DES_LNG_ID = 16 
								LEFT JOIN DES_TEXTS AS DES_TEXTS2 ON DES_TEXTS2.TEX_ID = DESIGNATIONS.DES_TEX_ID
								LEFT JOIN DESIGNATIONS AS DESIGNATIONS2 ON DESIGNATIONS2.DES_ID = TYP_KV_FUEL_DES_ID AND DESIGNATIONS2.DES_LNG_ID = 16 
								LEFT JOIN DES_TEXTS AS DES_TEXTS3 ON DES_TEXTS3.TEX_ID = DESIGNATIONS2.DES_TEX_ID
								LEFT JOIN LINK_TYP_ENG ON LTE_TYP_ID = TYP_ID 
								LEFT JOIN ENGINES ON ENG_ID = LTE_ENG_ID
								LEFT JOIN DESIGNATIONS AS DESIGNATIONS3 ON DESIGNATIONS3.DES_ID = TYP_KV_BODY_DES_ID AND DESIGNATIONS3.DES_LNG_ID = 16 
								LEFT JOIN DES_TEXTS AS DES_TEXTS4 ON DES_TEXTS4.TEX_ID = DESIGNATIONS3.DES_TEX_ID
								LEFT JOIN DESIGNATIONS AS DESIGNATIONS4 ON DESIGNATIONS4.DES_ID = TYP_KV_MODEL_DES_ID AND DESIGNATIONS4.DES_LNG_ID = 16 
								LEFT JOIN DES_TEXTS AS DES_TEXTS5 ON DES_TEXTS5.TEX_ID = DESIGNATIONS4.DES_TEX_ID
								LEFT JOIN DESIGNATIONS AS DESIGNATIONS5 ON DESIGNATIONS5.DES_ID = TYP_KV_AXLE_DES_ID AND DESIGNATIONS5.DES_LNG_ID = 16 
								LEFT JOIN DES_TEXTS AS DES_TEXTS6 ON DES_TEXTS6.TEX_ID = DESIGNATIONS5.DES_TEX_ID
								WHERE TYP_MOD_ID = " . $model_id . " AND TYP_PCON_START > " . $start_date . " AND TYP_PCON_END < " . $end_date . "
								ORDER BY TYP_CDS_TEXT;", $tecdoc_db_link);
		$row = mysql_fetch_assoc($result);
		while ($row = mysql_fetch_assoc($result)) {
		    $data_array[] = array("ID" => $row["TYP_ID"],
		    					  "name" => $row["TYP_CDS_TEXT"]);
		}
		return $data_array;
	}

	if($_POST['quick_post']){
		switch ($_POST['quick_post']) {
			case 'get_models':
				$models = getModels($_POST['brand_id'], $tecdoc_db_link);
				echo json_encode($models);
				break;
		}
	}
