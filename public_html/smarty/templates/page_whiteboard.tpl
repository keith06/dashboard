<svg id="whiteboard">
	<rect x="0" y="0" width="300" height="300" fill="white"></rect>
 </svg>

<section id="controls">
	<a href="javascript:void(0)" id="control-pointer">pointer</a>
	<a href="javascript:void(0)" id="control-line">line</a>
	<a href="javascript:void(0)" id="control-rect">rect</a>
	<a href="javascript:void(0)" id="control-ellipse">ellipse/circle</a>
</section>

<section id="chat">
	<div id="chat-list"></div>
	<input type="text" name="message" id="chat-input" />
</section>


<script type="text/javascript">
	Whiteboard({literal}{{/literal} whiteboard_code: '{$template.whiteboard_code}' {literal}}{/literal});
</script>