<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@include file="./include/incHead.jsp"
%><%
String sync = (String)request.getAttribute("sync");
String info = (String)request.getAttribute("info");
%>
</head>
<body>
<input type="hidden" name="sync" value="<%=sync.replace("\"", "&quot;") %>"/>
<input type="hidden" name="info" value="<%=info.replace("\"", "&quot;") %>"/>
<div id="wrap">
	<section class="container">
		<div class="ng-scope">
			<div id="home" class="row">
			</div>
		</div>
	</section>
</div>
<%@ include file="./include/incFooterScript.jsp" %>
<%@ include file="./template/main.template.jsp" %>
<script type="text/javascript">
requirejs.config(
{
	baseUrl : _JS_PATH_,
	paths :
	{
		'jquery'		: JsUrl.jquery,
		'handlebars'	: JsUrl.handlebars,
		'common'		: JsUrl.common,
		'main'			: 'main' + _JS_MINIFY,
    },
	urlArgs : _JS_PARAM_,
});
requirejs(
[
	'jquery',
	'common',
	'main',
], function($, common, main)
{
	$(document).ready(function()
	{
		common.init(main, "Hdac.main");
	});
});
</script>
</body>
</html>