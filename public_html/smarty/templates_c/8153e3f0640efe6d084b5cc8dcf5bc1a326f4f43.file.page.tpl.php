<?php /* Smarty version Smarty-3.1.8, created on 2012-04-22 13:41:09
         compiled from "smarty/templates/page.tpl" */ ?>
<?php /*%%SmartyHeaderCode:900829214f932666edd349-45558934%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '8153e3f0640efe6d084b5cc8dcf5bc1a326f4f43' => 
    array (
      0 => 'smarty/templates/page.tpl',
      1 => 1335094868,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '900829214f932666edd349-45558934',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_4f932666f0a9c8_83007220',
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_4f932666f0a9c8_83007220')) {function content_4f932666f0a9c8_83007220($_smarty_tpl) {?><!doctype html>
<html>
<head>
 <title>Dashboard</title>

 <link rel="stylesheet/css" type="text/css" href="/css/reset.css">
 <link rel="stylesheet/less" type="text/css" href="/css/style.less">
 <script type="text/javascript" src="/js/lesscss.js"></script>
 <script type="text/javascript" src="/js/dashboard.js"></script>
 <script type="text/javascript" src="/js/prototype.js"></script>
</head>

<body>
	<?php echo $_smarty_tpl->getSubTemplate ("page_".($_smarty_tpl->tpl_vars['page']->value).".tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

</body>
</html><?php }} ?>