<?php
defined('BASEPATH') OR exit('No direct script access allowed');


$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

$route['app/login'] = 'Auth/login';
$route['app/users'] = 'UsersCtrl/users';
$route['app/users/(:num)'] = 'UsersCtrl/users/$1';
$route['app/users/limit/(:num)/(:num)'] = 'UsersCtrl/users/$1/$2';
$route['app/users/state'] = 'UsersCtrl/changeState';

$route['app/tags'] = 'TagsCtrl/tags';
$route['app/tags/(:num)'] = 'TagsCtrl/tags/$1';
$route['app/tags/limit/(:num)/(:num)'] = 'TagsCtrl/tags/$1/$2';

$route['app/news'] = 'NewsCtrl/news';
$route['app/news/(:num)'] = 'NewsCtrl/news/$1';
$route['app/news/limit/(:num)/(:num)'] = 'NewsCtrl/news/$1/$2';