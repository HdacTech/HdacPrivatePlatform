<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@include file="../include/incHead.jsp"
%><%
%>
</head>
<body>
	<div id="wrapper">
		<div id="view_list" class="view_body_tablearea">
			<div>
				<form name="form" onsubmit="return false;">
					<div class="join_area">
						<button class="ui-button ui-widget ui-corner-left header_input" style="width:60px; margin-top:5px; background:#f6f6f6">ID</button>
						<input type="text" name="user_id" class="ui-button ui-widget ui-corner-right header_input login_area_input"/><br>
						<button class="ui-button ui-widget ui-corner-left header_input" style="width:60px; margin-top:5px; background:#f6f6f6">NAME</button>
						<input type="text" name="user_name" class="ui-button ui-widget ui-corner-right header_input login_area_input"/><br>
						<button class="ui-button ui-widget ui-corner-left header_input" style="width:60px; margin-top:5px; background:#f6f6f6">PW</button>
						<input type="password" name="password" class="ui-button ui-widget ui-corner-right header_input login_area_input"/>
					</div>
				</form>
	  		</div><br>
			<button class="ui-button ui-widget ui-corner-all body_btn join_area" style="background:#00b8f1; width:392px" data-click="Y" data-name="submit">Create Account</button>
		</div>
	</div>
<%@ include file="../include/incFooterScript.jsp" %>
<script type="text/javascript">
requirejs.config(
{
	baseUrl : _JS_PATH_,
	paths :
	{
		'jquery'		: JsUrl.jquery,
		'jquery_ui'		: JsUrl.jquery_ui,
		'handlebars'	: JsUrl.handlebars,
		'common'		: JsUrl.common,
		'create'		: 'create' + _JS_MINIFY,
    },
	urlArgs : _JS_PARAM_,
});
requirejs(
[
	'jquery',
	'jquery_ui',
	'common',
	'create',
], function($, ui, common, create)
{
	$(document).ready(function()
	{
		common.init(create, "Hdac.create");
	});
});
</script>
</body>
</html>