<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ include file="gnb.template.jsp"
%><script id="blockchain-table" type="text/x-Handlebars-template">
<div class="col-xs-12 col-md-4 col-gray blockchain">
	<h2><span class="ng-scope">{{name}}</span></h2>
	<table class="table">
		<tbody>
		{{#each this}}
			<tr>
				<td><span class="ng-scope">{{name}}</span></td>
				<td class="text-right">{{num2CommaPoint value 2}}</td>
			</tr>
		{{/each}}
		</tbody>
	</table>
</div>
</script>
<script id="banner" type="text/x-Handlebars-template">
<div class="col-xs-12 col-md-2">
	<a href="http://www.hd-kasse.com/" target="_blank"">
		<span class="hidden-xs banner"></span>
	</a>
</div>
</script>
<script id="blocks-table" type="text/x-Handlebars-template">
<div class="col-xs-12 col-md-8">
	<h1><span class="ng-scope">Latest Blocks</span></h1>
	<table class="table table-hover table-striped fixed">
		<thead>
			<tr>
				<th><span class="ng-scope">Height</span></th>
				<th><span class="ng-scope">Age</span></th>
				<th class="text-right"><span class="ellipsis"><span class="ng-scope">Transactions</span></span></th>
				<th class="text-right"><span class="ng-scope">Size</span></th>
			</tr>
		</thead>
		<tbody id="latest-blocks">
			{{> blocks}}
		</tbody>
	</table>
	<div class="btn-more">
		<a href="blocks" class="btn btn-default"><span class="ng-scope">See all blocks</span></a>
	</div>
</div>
</script>
<script id="blocks-partial" type="text/x-Handlebars-template">
{{#each this}}
	<tr class="fader ng-scope">
		<td><a href="block/{{hash}}" class="ng-binding">{{height}}</a></td>
		<td><span class="ellipsis ng-binding">{{toGMT time}}</span></td>
		<td class="text-right ng-binding">{{txlength}}</td>
		<td class="text-right ng-binding">{{size}}</td>
	</tr>
{{/each}}
</script>