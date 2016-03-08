<?php
/**
Plugin Name: Maintenance Mode
Plugin URI: http://rocketplugins.com/wordpress-maintenance-mode-plugin/
Description: Adds a responsive maintenance page to your site that lets visitors know your site is down. 
Author: Muneeb
Author URI: http://rocketplugins.com/wordpress-maintenance-mode-plugin/
Version: 2.1
Copyright: 2013 Muneeb ur Rehman http://muneeb.me
**/

require plugin_dir_path( __FILE__ ) . 'config.php';

require WPMMP_PLUGIN_INCLUDE_DIRECTORY . 'functions.php';

load_wpmmp();

