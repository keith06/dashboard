<?php /* Smarty version Smarty-3.1.8, created on 2012-04-21 23:16:13
         compiled from "smarty/templates/page.tpl" */ ?>
<?php /*%%SmartyHeaderCode:18204992214f93239d448017-64638793%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '8153e3f0640efe6d084b5cc8dcf5bc1a326f4f43' => 
    array (
      0 => 'smarty/templates/page.tpl',
      1 => 1335042686,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '18204992214f93239d448017-64638793',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_4f93239d46fbe7_29575235',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_4f93239d46fbe7_29575235')) {function content_4f93239d46fbe7_29575235($_smarty_tpl) {?><!doctype html>
<html>
<head>
 <title>Dashboard</title>

 <link rel="stylesheet/css" type="text/css" href="css/reset.css">
 <link rel="stylesheet/less" type="text/css" href="css/style.less">
 <script type="text/javascript" src="js/lesscss.js"></script>
 <script type="text/javascript" src="js/dashboard.js"></script>
</head>

<body>
<canvas id="dashboard"></canvas>

<section class="chat">
 <div class="messages"></div>
 <input type="text" name="message"/>
</section>
</body>
</html><?php }} ?>