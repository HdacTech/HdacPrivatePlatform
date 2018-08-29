<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@include file="../include/incCssJSVer.jsp"
%><!doctype html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta http-equiv="Last-Modified" content="<%=new Date() %>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<meta name="format-detection" content="telephone=no"/>
	<title>hdac</title>
	<link rel="stylesheet" media="all" type="text/css" href="<%=_CSS_DOMAIN %>/explorer/css/semantic.min.css"/>
	<link rel="stylesheet" media="all" type="text/css" href="<%=_CSS_DOMAIN %>/explorer/css/custom.css"/>
	<link rel="stylesheet" type="text/css" href="<%=_CSS_DOMAIN %>/explorer/js/lib/jquery-ui-1.11.4/jquery-ui.structure.css"/>
	<link rel="stylesheet" type="text/css" href="<%=_CSS_DOMAIN %>/explorer/js/lib/jquery-ui-1.11.4/jquery-ui.css"/>
</head>
<script type="text/javascript">
function focusReset(dlg){
	dlg.parents('.ui-dialog').attr('tabindex', -1)[0].focus();
}
function openDialog(msg, type){
	var width = 450;
	var height = 350;
	
	var newDiv = document.createElement('div');
	$(newDiv).attr("id", "dlgobj");
	$("#dlg_common").append(newDiv);
	
	var dlg_div = document.createElement("div");
	var dlg_p = document.createElement("p");
	var dlg_btn = document.createElement("button");
	
	$(dlg_div).css({width : '100%', height : '100%'});
	$(dlg_div).attr("id", "dlgobj");
	
	$(dlg_p).attr("class", "dlg_content");
	$(dlg_p).html(msg);
	
	$(dlg_btn).attr("class","ui-button ui-widget ui-corner-all body_btn");
	$(dlg_btn).css({background : "#9e9e9e",
					width : "120px",
					left : "38%",
					top : "80%",
					position : "absolute"});
	$(dlg_btn).attr("onclick", "javascript:fn_confirm()");
	$(dlg_btn).html("OK");
	
	$(dlg_div).append(dlg_p);
	$(dlg_div).append(dlg_btn);
	
	if(type == "info"){
		width = 800;
		height = 370;
		$(dlg_p).css({"margin-top" : "-10%", "text-align" : "left"});
		$(dlg_btn).css("left", "45%");
	}
	
	var dlg = $("#dlgobj").dialog({
		resizable:false,
		modal:true,
		width:width,
		height:height
	}).html(dlg_div);
	focusReset(dlg);
	return dlg;
}
function fn_confirm(){
	var parent =  $(".ui-widget > #dlgobj").parent();
	var dlg = parent.children().last();
	dlg.trigger("dialogclose");
	dlg.remove();
}
</script>
<body>
	<div id="view_header" class="view_header">
		<div class="view_header_upper">
			<a href='/home.hdac' id="header_logo" class="header_btn header_text"
				style="cursor: pointer; margin-left: 477px;"><i class="img logo"
				style="margin-top: 40px"></i></a> 
				<a id="btn_join" href="javascript:"	class="header_btn header_text"
				style="margin-left: 700px; width: 23px;" data-click="Y"
				data-name="join">Join</a> 
				<a id="btn_login" href="javascript:" class="header_btn header_text"
				style="margin-left: 50px; width: 32px;" data-click="Y"
				data-name="login"><b>Login</b></a>
		</div>
		<div class="view_header_lower">
			<span id="header_title" class="header_text"
				style="padding-left: 887px; font-size: 30px; display: none">HDAC
				&nbsp;&nbsp;<!-- <a id="header_balance" class="header_text">0</a> -->
			</span>
			<div id="header_inputarea" class="view_header_input"
				style="display: none">
				<select id="select_user" class="ui-button ui-widget ui-corner-all" name="to"
					style="width: 332px; height: 47px;">
					<option value="">Select</option>
				</select>
				<button class="ui-button ui-widget ui-corner-left header_input"
					style="width: 60px; background: white">hdac</button>
				<input type="number"
					class="ui-button ui-widget ui-corner-right header_input"
					name="amount" min="1" value="1"
					style="width: 272px; margin-left: -4px"/>
				<button id="btn_send"
					class="ui-button ui-widget ui-corner-all header_input"
					style="width: 100px; margin-left: 2px; background: #138fce; color: white"
					data-click="Y" data-name="hdac">Send</button>
				<button class="ui-button ui-widget ui-corner-left header_input"
					style="width: 60px; margin-top: 5px; background: white">Data</button>
				<input class="ui-button ui-widget ui-corner-right header_input" name="textdata"
					style="width: 608px; margin-top: 5px; margin-left: -4px;" />
			</div>
		</div>
	</div>
	<div id="dlg_common" style="display:none;">
</div>
</body>