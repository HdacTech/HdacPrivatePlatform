<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@include file="../include/incHead.jsp"
%><%
%>
</head>
<body>
<div id="modal"></div>
<div id="wrap">
	<header class="header">
		<div class="header_inner">
			<div class="header_logo">
				<h1>
					<span class="logo focus" data-click="Y" data-name="home"></span>
				</h1>
			</div>
			<div class="header_menu" id="menu"></div>
		</div>
		<div class="header_title">
			<span class="title">JOIN</span>
		</div>
	</header>
	<section class="main">
		<div class="input_form">
			<form name="form" onsubmit="return false;">
				<div class="ui huge labels">
					<div class="ui label one_hundred">ID</div>
					<div class="ui input three_hundred">
						<input type="text" name="user_id">
					</div>
					<br/>
					<div class="ui label one_hundred">NAME</div>
					<div class="ui input three_hundred">
						<input type="text" name="user_name">
					</div>
					<br/>
					<div class="ui label one_hundred">PW</div>
					<div class="ui input three_hundred">
						<input type="password" name="password">
					</div>
					<br/>
					<input type="button" class="ui fluid primary button" data-click="Y" data-name="submit" value="Create Account"/>
				</div>
			</form>
		</div>
	</section>
</div>
<%@ include file="../include/incFooterScript.jsp" %>
<%@ include file="../template/gnb.template.jsp" %>
<script type="text/javascript">
requirejs.config(
{
	baseUrl : _JS_PATH_,
	paths :
	{
		'jquery'		: JsUrl.jquery,
		'semantic'		: JsUrl.semantic,
		'handlebars'	: JsUrl.handlebars,
		'common'		: JsUrl.common,
		'create'		: 'create' + _JS_MINIFY,
    },
    shim :
    {
        semantic :
        {
            deps: ['jquery'],
        },
    },
	urlArgs : _JS_PARAM_,
});
requirejs(
[
	'jquery',
	'semantic',
	'common',
	'create',
], function($, semantic, common, create)
{
	$(document).ready(function()
	{
		common.init(create, "Hdac.create");
	});
});
</script>
</body>
</html>