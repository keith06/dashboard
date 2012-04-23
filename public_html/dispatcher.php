<?php
require_once('config.php');
require_once('functions.php');
require_once('smarty/libs/Smarty.class.php');

// Start template engine
$smarty = new Smarty;
$smarty->setTemplateDir('smarty/templates');
$smarty->setCompileDir('smarty/templates_c');
$smarty->setCacheDir('smarty/cache');
$smarty->cache_lifetime = 120;

// Database handler
$db = new PDO('sqlite:' . $CONFIG['db']);

session_start();

$uri = $_SERVER['REQUEST_URI'];
error_log('test0');
if(preg_match('/^\/$/', $uri)) {
    include('page_main.php');
} elseif(preg_match('/\/new\/?$/', $uri)) {
    include('page_new.php');
} elseif(preg_match('/\/db\/([a-z0-9A-Z]{7})\/?$/', $uri, $dashboard_code)) {
    include('page_dashboard.php');
} elseif(preg_match('/\/ajax\/$/', $uri)) {
    include('page_ajax.php');
} elseif(preg_match('/\/stream\/$/', $uri)) {
    include('page_stream.php');
} else {
    header('Location: ' . $CONFIG['host'] . '/');
    exit;
}