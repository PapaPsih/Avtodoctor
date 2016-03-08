<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'autodoctor');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', '');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Au.88NGDEw@gAYDOHdvc+5#XiFKl3j7Me8,~{|0DCb%E) zI>0t9)@=HK 4%Yf`P');
define('SECURE_AUTH_KEY',  '1k=J+7F!:3PCUX79NG hX,9;+kn_ k#Z!n5#xiBDQM@}YBa..sC05u)f4VZv@Z@/');
define('LOGGED_IN_KEY',    '.RwIfM=$y.66Gp7DJ8L=!-.t?X+0;Nlo+itrUtkDRviAgQ(OwwZ)9#pF-x-ypyC#');
define('NONCE_KEY',        'C+-i-{*^d>tG!Ge>H3AnZ#9X%*J^x:x:0%WI?gA<Biv5Rg93/:5y[{p jGvHW:V4');
define('AUTH_SALT',        'FnX#EQx{j}PMV~.tjr,$iy _^V.R5wk=Qe5hPt 8*T-,|vw/3n-Hb$IzL`OnqXLl');
define('SECURE_AUTH_SALT', 'Jv(3)XNssibC<S(bD)%s?5C,y4daGI2T{`wv?gbpFx+)y7JOG2_fzkXC,cF+MeAl');
define('LOGGED_IN_SALT',   'fOHb&f@En@S#H-E/|@(>Qg(h)2rphJqng~])ym<x}UteALa)@8ysh[kYlL955_Wi');
define('NONCE_SALT',       '.#7on:u|19q?=GdeOJ1?S5%5Ci| [6|8=)]FZ`OYV)%L:}=h606v5SD4E]P_Z* $');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 * 
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
