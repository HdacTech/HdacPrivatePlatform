<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%
%><script id="header-common" type="text/x-Handlebars-template">
<div class="navbar navbar-default navbar-fixed-top">
	<div class="container">
		<div class="navbar-header">
			<a class="insight navbar-brand home logo focus" data-click="Y" data-name="move-home"></a>
		</div>

		<div class="navbar-collapse collapse">
			<ul class="nav navbar-nav">
				<li><a href="javascript:;" data-click="Y" data-name="move-blocks">Blocks</a></li>
				<li><a href="javascript:;" data-click="Y" data-name="move-status">Status</a></li>
			</ul>
			<span class="hidden-xs navbar-form navbar-left">
				<div class="form-group">
					<input id="search" type="text" class="form-control searchtext" placeholder="Search for block, transaction or address">
					<input type="button" class="searchbutton search"/>
				</div>
  				<div class="no_matching text-danger ng-hide"><span>No matching records found!</span></div>
			</span>
			<ul class="nav navbar-nav navbar-right">
				<li>
						<div class="status statusbox">
						<div class="pull-left">
							<span class="glyphicon glyphicon-ok" tooltip="Historic sync finished" tooltip-placement="bottom"> </span>
						</div>
						&nbsp; ·
						<span class="ng-binding"><strong class="ng-binding">Conn</strong> {{conn}}</span> ·
						<strong class="ng-binding">Height</strong> {{height}}
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
</script>