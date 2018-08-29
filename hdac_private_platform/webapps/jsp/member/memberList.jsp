<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"
%><%@page import="java.util.List
				, java.util.Map
"%><%
String _CSS_PATH_		= "/explorer/css";

List<Map<String, Object>> list = (List<Map<String, Object>>)request.getAttribute("data");
%><!DOCTYPE html>
<html lang="kr">
<head>
        <meta charset="UTF-8"/>
        <title>simple spring</title>
        <link rel="stylesheet" type="text/css" href="<%=_CSS_PATH_ %>/semantic.min.css">
</head>
<body>
	<div id="wrapper">
		<div class="inline field">
			<span><%=request.getProtocol() %></span>
			<div class="ui red tag label">
				프로토콜
			</div>
		</div>
  		<div>
  			<table class="ui celled striped table">
				<thead>
    				<tr>
						<th>사용자번호</th>
						<th>아이디</th>
						<th>이름</th>
						<th>비밀번호</th>
						<th>등급</th>
						<th>사용여부</th>
    				</tr>
    			</thead>
				<tbody><%
if (list != null)
{
	for (Map<String, Object> map : list)
	{
%>
					<tr>
						<td><%=map.get("user_no") %></td>
						<td><%=map.get("user_id") %></td>
						<td><%=map.get("username") %></td>
						<td><%=map.get("password") %></td>
						<td><%=map.get("grade") %></td>
						<td><%=map.get("status") %></td>
					</tr><%
	}
}
%>
				</tbody>
  			</table>
  		</div>
		<div id="footer"></div>
	</div>
</body>
</html>