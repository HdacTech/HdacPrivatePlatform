<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><script id="header-menu" type="text/x-Handlebars-template">
<h2>
	<span class="join focus{{#chk userNo}} off{{/chk}}" data-click="Y" data-name="join">join</span>
	<span class="info{{#chk userNo}}{{else}} off{{/chk}}">current user = {{userId}}</span>
	<span class="login focus{{#chk userNo}} off{{/chk}}" data-click="Y" data-name="login">login</span>
	<span class="logout focus{{#chk userNo}}{{else}} off{{/chk}}" data-click="Y" data-name="logout">logout</span>
</h2>
</script>
<script id="header_form" type="text/x-Handlebars-template">
{{#chk user.userNo}}
<div class="header_send">
	<div class="ui selection dropdown" id="select_user" style="width:300px; height:40px;">
		<input type="hidden" name="to"/>
		<i class="dropdown icon"></i>
		<div class="default text">select user</div>
		<div class="menu">
		{{#each list}}
			<div class="item" data-value="{{user_no}}">{{username}}</div>
		{{/each}}
		</div>
	</div>
	<div class="ui right icon input" style="top:2px; width:300px; height:40px;">
		<input type="number" placeholder="input hdac..." name="amount" min="1" value="1">
		<i class="hdac icon"></i>
	</div>
	<div class="ui primary button" data-click="Y" data-name="hdac" data-method="{{method}}" style="width:100px; height:38px;">
		Send
	</div>
</div>
<div class="header_send">
	<div class="ui input" style="width:602px;">
		<input type="text" placeholder="input data..." name="textarea">
	</div>
</div>
{{/chk}}
</script>
<script id="modal_popup" type="text/x-Handlebars-template">
<div class="ui mini modal" id="ui_modal">
	<i class="close icon"></i>
{{#if header}}
	<div class="header">{{header}}</div>
{{/if}}
{{#if content}}
	<div class="content">
		<p>{{content}}</p>
	</div>
{{/if}}
	<div class="actions">
		<div class="ui ok button">OK</div>
	</div>
</div>
</script>