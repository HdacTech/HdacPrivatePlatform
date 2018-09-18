<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><script type="text/javascript">
var __IMG_DOMAIN="<%=_IMG_DOMAIN %>"
	, __CSS_DOMAIN="<%=_CSS_DOMAIN %>"
	, __JS_DOMAIN="<%=_JS_DOMAIN %>",	_JS_PATH_ = __JS_DOMAIN + "/explorer/js/min/",	_JS_MINIFY = ".min"
	, __JS_DOMAIN="",					_JS_PATH_ = __JS_DOMAIN + "/explorer/js/merge/",	_JS_MINIFY = ""
	, _JS_PARAM_ = "v=<%=JSVer %>";

var JsUrl =
{
	jquery	  	: __JS_DOMAIN + '/explorer/js/lib/jquery.min',
	semantic	: __JS_DOMAIN + '/explorer/js/lib/semantic.min',
	handlebars	: __JS_DOMAIN + '/explorer/js/lib/handlebars.amd.min',
	common	  	: _JS_PATH_ + 'common' + _JS_MINIFY,
};
</script>
<script src="<%=_JS_DOMAIN %>/explorer/js/lib/require.min.js"></script>