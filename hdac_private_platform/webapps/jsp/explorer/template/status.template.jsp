<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ include file="gnb.template.jsp"
%><script id="app-status" type="text/x-Handlebars-template">
<div class="col-xs-12 col-md-8">
	<h2><span class="ng-scope">Sync Status</span></h2>
	<table class="table ng-scope">
		<tbody>
			<tr>
				<td><span class="ng-scope">Sync Progress</span></td>
				<td>
					<div class="progress">
						<div class="progress-bar progress-bar-info" style="width:{{sync.syncPercentage}}%">
							<span class="ng-binding">{{sync.syncPercentage}}%
								<span class="ng-scope">Complete</span>
							</span>
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td><span class="ng-scope">Current Sync Status</span></td>
				<td class="text-right"> 
					<span class="ng-binding">{{sync.status}}</span>
				</td>
			</tr>
			<tr>
				<td><span class="ng-scope">Start Date</span></td>
				<td class="text-right"><time class="ng-binding">a few seconds ago</time></td>
			</tr>
			<tr>
				<td><span class="ng-scope">Initial Block Chain Height</span></td>
				<td class="text-right ng-binding">{{sync.blockChainHeight}}</td>
			</tr>
		</tbody>
	</table>
	<h2><span class="ng-scope">Last Block</span></h2>
	<table class="table ng-scope" style="table-layout: fixed">
		<thead class="ng-scope">
			<span class="text-warning ng-scope ng-hide" data-ng-show="!loaded &amp;&amp; !error"><span class="ng-scope">Loading...</span></span>
			<span class="text-danger ng-binding ng-scope ng-hide" data-ng-show="error"></span>
		</thead>
		<tbody>
			<tr>
				<td><span class="ng-scope">Last Block Hash (Hdacd)</span></td>
				<td class="text-right ellipsis"><a href="javascript:;" class="ng-binding" data-click="Y" data-name="move-block" data-block="{{last.lastblockhash}}">{{last.lastblockhash}}</a></td>
			</tr>
			<tr>
				<td><span class="ng-scope">Current Blockchain Tip (insight)</span></td>
				<td class="text-right ellipsis"><a href="javascript:;" class="ng-binding" data-click="Y" data-name="move-block" data-block="{{last.syncTipHash}}">{{last.syncTipHash}}</a></td>
			</tr>
		</tbody>
	</table>
</div>
</script>
<script id="node-table" type="text/x-Handlebars-template">
<div class="col-xs-12 col-md-4 col-gray">
	<h2><span class="ng-scope">Hdac node information</span></h2>
	<table class="table ng-scope">
		<tbody>
		{{#each this}}
			<tr>
				<td><span class="ng-scope">{{name}}</span></td>
				<td class="text-right ng-binding">{{value}}</td>
			</tr>
		{{/each}}
		</tbody>
	</table>
</div>
</script>