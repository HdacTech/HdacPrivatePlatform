define(["jquery", "handlebars", "common"], function($, HANDLEBARS, COMMON)
{
	"use strict";

	var _M_ = function()
	{
		var yPos = 0;
		var bInit = true;
		var _reqAjax = false;

		var _DEFINE_ =
		{
			url				: '/member/login.hdac',
		};
		var info =
		{
			block_template	: null,
		};
		var result =
		{
			info			: null,
			sync			: null,
			information		: null,
			last			: null,
		};

		this.initData = function(data)
		{
			yPos			= data.yPos;
//			bInit			= data.bInit;
//			info			= $.parseJSON(data.info);
			result			= $.parseJSON(data.result);
		};
		this.getSavedData = function()
		{
			var data = {};

			data.yPos		= $(window).scrollTop();
//			data.bInit		= bInit;
//			data.info		= JSON.stringify(info);
			data.result		= JSON.stringify(result);

			return data;
		};
		this.init = function()
		{
			showPage();
			bInit = false;
		};
		this.resume = function()
		{
			showPage();
		};
		this.handleClick = function(e, $trgt, callbackFunc)
		{
			var checkField = function()
			{
				if ($("[name=user_id]").val().trim() == '')
					return false;
				if ($("[name=password]").val().trim() == '')
					return false;
			};
			var loginMember = function()
			{
				if (_reqAjax)
					return;

				if (checkField() == false)
					return;

				var data = $("[name=form]").serialize();
				var opt =
				{
					type		: 'post',
					dataType	: 'json',
					url			: _DEFINE_.url,
					cache		: false,
					data		: data,
				};
				$.ajax(opt).done(function(data, state, xhr)
				{
					if (data && (data.success == 'true'))
					{
						var dlg = openDialog("Login Success");
						dlg.on("dialogclose", function(){
							var url = "/home.hdac";
							COMMON._COMMON_.MovePage(url, true);
						});	
					}
					else
						var dlg = openDialog("Login Fail");
						_reqAjax = false;
				});
				_reqAjax = true;
			};

			var data = $trgt.data(), name = data.name;
			switch (name)
			{
				case 'login' :
					loginMember();
					break;
					
				case 'login_view' :
					var url = '/member/login.hdac';
					COMMON._COMMON_.MovePage(url, true);
					break;
					
				case 'join' :
					var url = '/member/create.hdac';
					COMMON._COMMON_.MovePage(url, true);
					break;

				default :
					if (typeof callbackFunc == "function")
						callbackFunc(e, $trgt);
					break;
			}
		};
		this.getYpos = function()
		{
			return yPos;
		};
		this.getInit = function()
		{
			return bInit;
		};

		var getDataList = function(page_no, bInit, callbackFunc)
		{

		};
		var showPage = function()
		{
			$("#header_title").html("LOGIN");
			$("#header_title").css("display", "block");
			$("#header_inputarea").css("display", "none");
			
			$("#view_body").css("display", "none");
		};
	};
	return new _M_();
});