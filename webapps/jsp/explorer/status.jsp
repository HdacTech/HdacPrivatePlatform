<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@include file="./include/incHead.jsp"
%><%
String sync = (String)request.getAttribute("sync");
String info = (String)request.getAttribute("info");
String last = (String)request.getAttribute("last");
%>
</head>
<body>
<input type="hidden" name="sync" value="<%=sync.replace("\"", "&quot;") %>"/>
<input type="hidden" name="info" value="<%=info.replace("\"", "&quot;") %>"/>
<input type="hidden" name="last" value="<%=last.replace("\"", "&quot;") %>"/>
<div id="wrap">
	<section class="container">
		<div class="ng-scope">
			<div class="page-header">
				<h1><span class="ng-scope">Application Status</span></h1>
			</div>
			<div id="status" class="row">
			</div>
		</div>
	</section>
</div>
<%@ include file="./include/incFooterScript.jsp" %>
<%@ include file="./template/status.template.jsp" %>
<script type="text/javascript">
requirejs.config(
{
	baseUrl : _JS_PATH_,
	paths :
	{
		'jquery'		: JsUrl.jquery,
		'handlebars'	: JsUrl.handlebars,
		'common'		: JsUrl.common,
		'status'		: 'status' + _JS_MINIFY,
    },
	urlArgs : _JS_PARAM_,
});
requirejs(
[
	'jquery',
	'common',
	'status',
], function($, common, status)
{
	$(document).ready(function()
	{
		common.init(status, "Hdac.status");
	});
});
</script>
</body>
</html>