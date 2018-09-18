<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@include file="./include/incHead.jsp"
%><%
String data = (String)request.getAttribute("data");
%>
</head>
<body>
<input type="hidden" name="data" value="<%=data.replace("\"", "&quot;") %>"/>
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
			<span class="title">HDAC</span>
		</div>
		<div class="header_form" id="form" style="display:none;"></div>
	</header>
	<section class="main">
		<div class="main_header" id="main_header">
		</div>
		<div class="main_body" id="main_body"></div>
	</section>
</div>
<%@ include file="./include/incFooterScript.jsp" %>
<%@ include file="./explorer/template/home.template.jsp" %>
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
		'home'			: 'home' + _JS_MINIFY,
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
	'home',
], function($, semantic, common, home)
{
	$(document).ready(function()
	{
		common.init(home, "Hdac.home");
	});
});

</script>
</body>
</html>