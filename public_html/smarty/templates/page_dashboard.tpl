<canvas id="dashboard"></canvas>

<section class="chat">
	<div class="messages" id="message-list"></div>
	<input type="text" name="message" id="message" />
</section>

<script type="text/javascript">
	$lDashboard = Dashboard({literal}{{/literal} dashboard: '{$template.dashboard_code}' {literal}}{/literal});
</script>