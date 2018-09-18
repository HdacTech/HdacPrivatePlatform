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
			url				: '/member/create.hdac',
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
				if ($("[name=user_name]").val().trim() == '')
					return false;
				if ($("[name=password]").val().trim() == '')
					return false;
			};
			var createMember = function()
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
						showPopup(null, 'create success', function()
						{
							var url = "/home.hdac";
							COMMON._COMMON_.MovePage(url, true);
						});	
					}
					else
					{
						showPopup('Fail', 'create failed');
					}
					_reqAjax = false;
				});
				_reqAjax = true;
			};

			var data = $trgt.data(), name = data.name;
			switch (name)
			{
				case 'login' :
					var url = '/member/login.hdac';
					COMMON._COMMON_.MovePage(url, true);
					break;
	
				case 'join' :
					var url = '/member/create.hdac';
					COMMON._COMMON_.MovePage(url, true);
					break;

				case 'submit' :
					createMember();
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
			var registerHelpers = function()
			{
				HANDLEBARS.registerHelper('chk', function(userNo, options)
				{
					if (userNo > -1)
						return options.fn(this);
					return options.inverse(this);
				});
			};

			registerHelpers();
			setHeader();
			setInput();

			$('.ui.dropdown').dropdown();
		};
		var setHeader = function()
		{
			var setMenu = function()
			{
				var template = HANDLEBARS.compile($("#header-menu").html());
				$("#menu").html(template());
			};

			setMenu();
		};
		var setInput = function()
		{
			$("[name=user_id]").focus();
			$("[name=password]").keyup(function(e)
			{
				if (e.keyCode == 13)
				{
					$("[data-name=login]").trigger("click");
				}
			});
		};
		var showPopup = function(header, content, callbackFunc)
		{
			var message =
			{
				header		: header,
				content		: content,
			};

			if (info.template == null)
			{
				info.template = HANDLEBARS.compile($("#modal_popup").html());
			}

			$("#modal").html(info.template(message));
			$("#ui_modal").modal(
			{
				onHide		: function()
				{
					if (typeof callbackFunc == "function")
						callbackFunc();
				}
			}).modal('show');
		};
	};
	return new _M_();
});