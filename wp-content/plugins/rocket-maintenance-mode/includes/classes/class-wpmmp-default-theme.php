<?php

class Wpmmp_Default_Theme extends Wpmmp_Theme_Handler {

	protected $name = 'Simple - Default Theme';

	protected $description = 'Simple and beautiful maintenance mode theme';

	protected $id = 'default';

	protected $path = '';

	protected $template_name = 'default';

	function init() {

		$this->path =  WPMMP_PLUGIN_VIEW_DIRECTORY . 'themes/default/template.php';
	
	}

}
