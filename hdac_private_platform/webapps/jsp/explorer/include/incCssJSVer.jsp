<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@page import="java.util.Date	
"%><%
String	_CSS_DOMAIN	= "";
String	_IMG_DOMAIN	= "";
String	_JS_DOMAIN	= "";

{	// http: 제거
	if (_CSS_DOMAIN.startsWith("http://"))
		_CSS_DOMAIN = _CSS_DOMAIN.replace("http://", "//");
	if (_IMG_DOMAIN.startsWith("http://"))
		_IMG_DOMAIN = _IMG_DOMAIN.replace("http://", "//");
	if (_JS_DOMAIN.startsWith("http://"))
		_JS_DOMAIN = _JS_DOMAIN.replace("http://", "//");
}
if ("https".equals(request.getScheme()))
{
	if (_IMG_DOMAIN.startsWith("http://"))
		_IMG_DOMAIN = _IMG_DOMAIN.replace("http://", "https://");
}

String CSSVer = "20180523_1";
String JSVer = "20180523_1";
%>