<?php /* Smarty version Smarty-3.1.8, created on 2012-04-22 22:37:42
         compiled from "smarty/templates/page_dashboard.tpl" */ ?>
<?php /*%%SmartyHeaderCode:16967594554f93ee4218d031-29553573%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5c39c2339a44b5474265bf9113880144000cee0d' => 
    array (
      0 => 'smarty/templates/page_dashboard.tpl',
      1 => 1335126927,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '16967594554f93ee4218d031-29553573',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_4f93ee4222c9a4_75683633',
  'variables' => 
  array (
    'template' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_4f93ee4222c9a4_75683633')) {function content_4f93ee4222c9a4_75683633($_smarty_tpl) {?><canvas id="dashboard"></canvas>

<section class="chat">
	<div class="messages" id="message-list"></div>
	<input type="text" name="message" id="message" />
</section>

<script type="text/javascript">
	$lDashboard = Dashboard({ dashboard: '<?php echo $_smarty_tpl->tpl_vars['template']->value['dashboard_code'];?>
' });
</script><?php }} ?>