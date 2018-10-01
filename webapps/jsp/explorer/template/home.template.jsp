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
<script id="body_header" type="text/x-Handlebars-template">
<div class="main_button">
	<div class="ui blue labeled icon button" data-click="Y" data-name="hdac" data-method="{{LIST_BLOCKS}}">
		<i class="list icon"></i>
		list
	</div>
	<div class="ui green labeled icon button" data-click="Y" data-name="hdac" data-method="{{GET_BLOCKCHAIN_INFO}}">
		<i class="info circle icon"></i>
		info
	</div>
	<div class="ui orange labeled icon button" data-click="Y" data-name="tx_check">
		<i class="check circle outline icon"></i>
		tx check
	</div>
	<div class="ui pink labeled icon button" data-click="Y" data-name="hdac" data-method="{{GET_ADDRESS_BALANCES}}">
		<i class="money bill icon"></i>
		balance
	</div>
</div>
</script>
<script id="block_list" type="text/x-Handlebars-template">
<div class="main_table">
	<table class="ui celled striped table">
		<colgroup>
			<col width="50%"/>
			<col width="20%"/>
			<col width="20%"/>
			<col/>
		</colgroup>
		<thead>
   			<tr class="center aligned">
				<th>Block</th>
				<th>Height</th>
				<th>Age</th>
				<th>Transactions</th>
			</tr>
		</thead>
		<tbody>
		{{#each this}}
			<tr>
				<td><a href="javascript:;" data-click="Y" data-name="hdac" data-method="{{../method}}" data-hash="{{hash}}">{{hash}}</a></td>
				<td>{{height}}</td>
				<td>{{toGMT time}}</td>
				<td>{{txcount}}</td>
			</tr>
		{{/each}}
		</tbody>
	</table>
</div>
</script>
<script id="block_info" type="text/x-Handlebars-template">
<div class="main_table">
	<table class="ui celled striped table">
		<colgroup>
			<col width="30%"/>
			<col width="70%"/>
		</colgroup>
		<tbody>
			<tr>
				<td><b>chainname</b></td>
				<td>{{chainname}}</td>
			</tr>
			<tr>
				<td><b>difficulty</b></td>
				<td>{{difficulty}}</td>
			</tr>
			<tr>
				<td><b>headers</b></td>
				<td>{{headers}}</td>
			</tr>
			<tr>
				<td><b>chain</b></td>
				<td>{{chain}}</td>
			</tr>
			<tr>
				<td><b>protocol</b></td>
				<td>{{protocol}}</td>
			</tr>
			<tr>
				<td><b>chainwork</b></td>
				<td>{{chainwork}}</td>
			</tr>
			<tr>
				<td><b>reindex</b></td>
				<td>{{reindex}}</td>
			</tr>
			<tr>
				<td><b>verificationprogress</b></td>
				<td>{{verificationprogress}}</td>
			</tr>
			<tr>
				<td><b>blocks</b></td>
				<td>{{blocks}}</td>
			</tr>
			<tr>
				<td><b>bestblockhash</b></td>
				<td>{{bestblockhash}}</td>
			</tr>
		</tbody>
	</table>
</div>
</script>
<script id="block_detail" type="text/x-Handlebars-template">
<div class="sub_table" id="block_detail_table">
	<table class="ui celled striped table">
		<colgroup>
			<col width="30%"/>
			<col width="70%"/>
		</colgroup>
		<tbody>
			<tr>
				<td><b>bits</b></td>
				<td>{{bits}}</td>
			</tr>
			<tr>
				<td><b>chainwork</b></td>
				<td>{{chainwork}}</td>
			</tr>
			<tr>
				<td><b>difficulty</b></td>
				<td>{{difficulty}}</td>
			</tr>
			<tr>
				<td><b>miner</b></td>
				<td>{{miner}}</td>
			</tr>
			<tr>
				<td><b>size</b></td>
				<td>{{size}}</td>
			</tr>
			<tr>
				<td>
					<b>tx</b>
					{{#tx}}	
						<button class="ui button" style="float:right; margin-bottom:3px" data-click="Y" data-name="copy" data-tx="{{.}}">Copy</button><br>
					{{/tx}}
				</td>
				<td>
					{{#tx}}	
						<a id="copy_target" href="javascript:;" data-click="Y" data-name="hdac" data-method="{{../method}}" data-tx="{{.}}">{{.}}</a><br>
					{{/tx}}
				</td>
			</tr>
		</tbody>
	</table>
</div>
</script>
<script id="tx_check_form" type="text/x-Handlebars-template">
<div class="body_form">
	<div class="ui labeled input" style="width:602px;">
		<div class="ui label">txid</div>
		<input type="text" placeholder="input txid..." name="txid">
	</div>
	<div class="ui primary button" data-click="Y" data-name="hdac" data-method="{{GET_ADDRESS_TRANSACTION}}">
		Check
	</div>
	<table class="ui celled striped table" id="tx_tbody" style="display:none"></table>
</div>
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