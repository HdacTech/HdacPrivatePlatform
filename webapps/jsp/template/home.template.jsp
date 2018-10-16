<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ include file="./gnb.template.jsp"
%><script id="body_header" type="text/x-Handlebars-template">
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
	<div class="ui primary button" data-click="Y" data-name="hdac" data-method="{{GET_RAW_TRANSACTION}}">
		Check
	</div>
</div>
</script>