<?php

  $url = 'pricevlad_20160114_130853_Contr_7725-11CSV.csv';
  $csvData = file_get_contents($url);
  $lines = explode("\n", $csvData);
  $needle_array = array();
  for ($i=1; $i < count($lines); $i++) { //отсчет со второй строки, не берем во внимание заголовки
    $column = explode('";"', $lines[$i]);
    if($column[0] != ''){ //исключаем возможность пустых строк, как бывает в файлах с разделителями
      $needle_array[] = array('code' => $column[0],
                              'brand' => $column[1],
                              'title' => $column[2],
                              'article' => $column[3],
                              'price' => $column[4],
                              'in_stock' => $column[5],
                              'in_stock_needle' => $column[6],
                              'comment' => $column[7]);
    }    
  }
  
  for ($i=0; $i < count($needle_array); $i++) {
    $line = $i . '.'; 
    foreach ($needle_array[$i] as $key => $value) {
      $line .= ' ' . $key . ' - ' . $value;
    }
    echo $line . "<br>";
  }
?>
