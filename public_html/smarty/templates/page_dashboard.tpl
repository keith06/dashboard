<svg id="dashboard">
 	<ellipse id="redcircle" cx="50" cy="50" rx="50" ry="50" fill="red" />
 	<rect id="rectangle" width="30" height="20" x="80" y="40" fill="#0000ff" />
 </svg>

<section id="controls">
 	<a href="javascript:void(0)" id="control-line">line</a>
	<a href="javascript:void(0)" id="control-rect">rect</a>
 	<a href="javascript:void(0)" id="control-ellipse">ellipse/circle</a>
</section>

<section id="chat">
	<div id="chat-list"></div>
	<input type="text" name="message" id="chat-input" />
</section>


<script type="text/javascript">
	Dashboard({literal}{{/literal} dashboard_code: '{$template.dashboard_code}' {literal}}{/literal});
</script>