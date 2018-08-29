<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@include file="./include/incHead.jsp"
%><%@page import="java.util.Map
"%><%
String data = (String)request.getAttribute("data");
%>
</head>
<body>
<input type="hidden" name="data" value="<%=data.replace("\"", "&quot;") %>"/>
<div id="wrapper">
	<div id="view_body" class="view_body" style="display:none">
		<div class="view_body_btnarea">
			<button id="btn_list"
				class="ui-button ui-widget ui-corner-all body_btn"
				style="background: #00b8f1;" data-click="Y" data-name="hdac" data-ui="btnList">
				<img src="<%=_CSS_DOMAIN%>/explorer/css/images/c_btn_list_icon.png"
					style="width: 14px; height: 14px; margin-left: -5px"></img>&nbsp;list
			</button>
			<button id="btn_info"
				class="ui-button ui-widget ui-corner-all body_btn"
				style="background: #8ebd00; margin-left: 30px;" data-click="Y"
				data-name="hdac" data-ui="btnInfo">
				<img src="<%=_CSS_DOMAIN%>/explorer/css/images/c_btn_info_icon.png"
					style="width: 14px; height: 14px; margin-left: -5px"></img>&nbsp;info
			</button>
			<button id="btn_check"
				class="ui-button ui-widget ui-corner-all body_btn"
				style="background: #FE9A2E; margin-left: 30px;" data-click="Y"
				data-name="hdac" data-ui="btnCheck">
				<img src="<%=_CSS_DOMAIN%>/explorer/css/images/c_btn_info_icon.png"
					style="width: 14px; height: 14px; margin-left: -5px"></img>&nbsp;tx check
			</button>
			<button id="btn_bal"
				class="ui-button ui-widget ui-corner-all body_btn"
				style="background: #FE2E9A; margin-left: 30px;" data-click="Y"
				data-name="hdac">
				<img src="<%=_CSS_DOMAIN%>/explorer/css/images/c_btn_info_icon.png"
					style="width: 14px; height: 14px; margin-left: -5px"></img>&nbsp;balance
			</button>
		</div>
		<div id="view_list" class="view_body_tablearea">
			<table id="list_table" class="ui celled striped table"
				style="border: 0; height: 530px; font-size: 15px; margin-bottom:10%">
				<colgroup>
					<col width="50%">
					<col width="20%">
					<col width="20%">
					<col width="*">
				</colgroup>
				<thead>
					<tr>
						<th>Block</th>
						<th>Height</th>
						<th>Age</th>
						<th>Transations</th>
					</tr>
				</thead>
				<tbody id="list_tbody">
				</tbody>
			</table>
		</div>
		<div id="view_info" class="view_body_tablearea" style="display: none">
			<table id="info_table" class="ui celled striped table"
				style="border: 0; height: 530px; font-size: 15px; margin-bottom:10%">
				<colgroup>
					<col width="40%">
					<col width="60%">
				</colgroup>
				<tbody id="info_tbody">
				</tbody>
			</table>
		</div>
		<div id="view_check" class="view_body_tablearea" style="display: none">
			<button class="ui-button ui-widget ui-corner-left header_input"
							style="width: 60px; margin-top: 5px; background:#f6f6f6">txid</button>
			<input class="ui-button ui-widget ui-corner-right header_input"
							placeholder="input txid" name="txid" style="width:80%; margin-top: 5px; margin-left: -4px; background:#f6f6f6"/>
			<button id="btn_txcheck"
					class="ui-button ui-widget ui-corner-all header_input"
					style="width: 100px; margin-left: 2px; background: #138fce; color: white"
					data-click="Y" data-name="hdac">Check</button>
			<table id="tx_table" class="ui celled striped table"
				style="border: 0; height: 530px; font-size: 15px; margin-bottom:10%">
				<colgroup>
					<col width="30%">
					<col width="70%">
				</colgroup>
				<tbody id="tx_tbody">
				</tbody>
			</table>		
		</div>
	</div>
	<div id="detail_info" name="detail_info" style="display:none;">
		<table class="ui celled striped table" style="height:100%">
			<tbody style="text-align:center">
				<tr>
					<td><b>bits</b></td>
					<td id="detail_bits"></td>
				</tr>
				<tr>
					<td><b>chainwork</b></td>
					<td id="detail_chainwork"></td>
				</tr>
				<tr>
					<td><b>difficulty</b></td>
					<td id="detail_difficulty"></td>
				</tr>
				<tr>
					<td><b>miner</b></td>
					<td id="detail_miner"></td>
				</tr>
				<tr>
					<td><b>size</b></td>
					<td id="detail_size"></td>
				</tr>
				<tr>
					<td><b>tx</b></td>
					<td id="detail_tx"></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<%@ include file="./include/incFooterScript.jsp" %>
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
		'home'			: 'home' + _JS_MINIFY,
    },
   	urlArgs : _JS_PARAM_,
});
requirejs(
[
	'jquery',
	'jquery_ui',
	'common',
	'home',
], function($, ui, common, home)
{
	$(document).ready(function()
	{
		common.init(home, "Hdac.home");
	});
});

</script>
</body>
</html>