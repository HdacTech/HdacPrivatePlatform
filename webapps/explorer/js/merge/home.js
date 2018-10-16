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
			ws_url			: 'ws://localhost:80/echo-ws', 
			logout_url		: '/member/logout.hdac',
		};
		var info =
		{
			sock			: null,
			template		: null,
		};
		var result =
		{
			list			: null,
			user			: 0,
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
			getDataList(1, true, function()
			{
				showPage();
				bInit = false;
			});
		};
		this.resume = function()
		{
			showPage();
		};
		this.handleClick = function(e, $trgt, callbackFunc)
		{
			var data = $trgt.data();
			var logout = function()
			{
				var opt =
				{
					type		: 'post',
					dataType	: 'json',
					url			: _DEFINE_.logout_url,
					cache		: false,
				};
				$.ajax(opt).done(function(data, state, xhr)
				{
					if (data && (data.success == 'true'))
					{
						showPopup(null, 'logout', function()
						{
							var url = "/home.hdac";
							COMMON._COMMON_.MovePage(url, true);
						});	
					}
					else
					{
						showPopup('Fail', 'logout failed');
					}
				});
			};
			var sendWebSocket = function(param)
			{
				var connectWebSocket = function(callbackFunc)
				{
					if (!info.sock)
					{
						info.sock = new WebSocket(_DEFINE_.ws_url);
						info.sock.onopen = function()
						{
							console.log('open');
	
							if (typeof callbackFunc == "function")
								callbackFunc();
						};
						info.sock.onmessage = function(e)
						{
							var getMessage = function(data)
							{
								if (data.message)
									return data.message;
								return JSON.stringify(data);
							};

							var data = $.parseJSON(e.data);
							console.log(data);
							if (data.success == false)
							{
								if (data.message)
								{
									console.log(typeof data.message);
									try
									{
										var code = $.parseJSON(data.message);
										showPopup('Fail', code.message);
									}
									catch (e)
									{
										console.log(e);
										showPopup('Fail', data.message);
									}
								}
							}
							else
							{
								switch (data.method)
								{
									case COMMON._METHOD_.GET_RAW_TRANSACTION :
										if (data.result && (data.result.length > 0))
										{
											showPopup(null, 'Tx : ' + data.result);
										}
										break;
										
									case COMMON._METHOD_.SEND_RAW_TRANSACTION :
										console.log(data);
//										showPopup(null, 'Select a destination to send.');
										break;
										
									case COMMON._METHOD_.GET_ADDRESS_BALANCES :
										if (data.result && (data.result.length > 0))
										{
											showPopup(null, 'Balance : ' + data.result[0].qty);
										}
										break;

									case COMMON._METHOD_.GET_BLOCKCHAIN_INFO :
										setBlockInfo(data);
										break;

									case COMMON._METHOD_.LIST_BLOCKS :
										setBlockList(data);
										break;

									case COMMON._METHOD_.GET_BLOCK :
										setBlockDetail(data);
										break;

									case COMMON._METHOD_.GET_TXOUT :
										console.log(data.result);
										if (data.result && data.result.scriptPubKey)
										{
											showPopup('Address', JSON.stringify(data.result.scriptPubKey.addresses));
										}
										break;
                    
									case COMMON._METHOD_.LIST_UNSPENT :
										break;

									default :
										showPopup(null, getMessage(data));
										break;
								}
							}
							_reqAjax = false;
						};
						info.sock.onclose = function()
						{
							console.log('close');
							info.sock = null;
						};
					}
				};

				if (_reqAjax)
					return;

				var jsonStr = JSON.stringify(param);
				console.log(jsonStr);
				if (info.sock)
				{
					_reqAjax = true;
					info.sock.send(jsonStr);
				}
				else
				{
					connectWebSocket(function()
					{
						_reqAjax = true;
						info.sock.send(jsonStr);
					});
				}
			};
			var getAddressBalances = function(param)
			{
				if (result.user.userNo > -1)
				{
					sendWebSocket(param);
				}
				else
				{
					showPopup(null, 'You can use it after login.');
				}
			};
			var getRawTransaction = function(param)
			{
				console.log(param);
				if (param.tx == '')
				{
					showPopup(null, 'Please enter txid.');
					return;
				}
				sendWebSocket(param);
			};
			var method = function(method, data)
			{
				var param =
				{
					method		: method,
				};
				switch (method)
				{
					case COMMON._METHOD_.LIST_UNSPENT :
						param.amount	= $("[name=amount]").val();
						param.to		= $("[name=to]").val();
						param.textdata	= $("[name=textarea]").val();

						if (result.user.userNo > -1)
						{
							if (param.to == '')
							{
								showPopup(null, 'Select a destination to send.');
								return;
							}
							sendWebSocket(param);
						}
						else
						{
							showPopup(null, 'You can use it after login.');
						}
						break;

					case COMMON._METHOD_.GET_ADDRESS_BALANCES :
						getAddressBalances(param);
						break;

					case COMMON._METHOD_.GET_BLOCKCHAIN_INFO :
					case COMMON._METHOD_.LIST_BLOCKS :
						sendWebSocket(param);
						break;

					case COMMON._METHOD_.GET_BLOCK :
						param.hash		= data.hash;
						sendWebSocket(param);
						break;

					case COMMON._METHOD_.GET_TXOUT :
						param.tx		= data.tx;
						sendWebSocket(param);
						break;

					case COMMON._METHOD_.GET_RAW_TRANSACTION :
						param.method = COMMON._METHOD_.GET_TXOUT;

						param.tx		= $("[name=txid]").val();
						getRawTransaction(param);
						break;
				}
			};

			var data = $trgt.data(), name = data.name;
			switch (name)
			{
				case 'login' :
					var url = '/member/login.hdac';
					COMMON._COMMON_.MovePage(url, true);
					break;

				case 'logout' :
					logout();
					break;

				case 'join' :
					var url = '/member/create.hdac';
					COMMON._COMMON_.MovePage(url, true);
					break;

				case 'hdac' :
					method(data.method, data);
					break;

				case 'tx_check' :
					showTxCheckForm();
					break;
					
				case 'copy' :
					copyText(data);
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
		var is_ie = function()
		{
			  if(window.navigator.userAgent.toLowerCase().indexOf("chrome") == -1) return true;
			  return false;
		}
		var copyText = function(data)
		{
			if(is_ie()) {
			    window.clipboardData.setData("Text", data.tx);
			    alert("Copy Success");
			    return;
			}
			window.prompt('Copy the text below using Ctrl+c', data.tx);
		}
		var getDataList = function(page_no, bInit, callbackFunc)
		{
			var data = $.parseJSON($("[name=data]").val());

			result.list		= data.list;
			result.user		= data.user;

			if (typeof callbackFunc == "function")
				callbackFunc();
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
				HANDLEBARS.registerHelper('toGMT', function(time)
				{
					var diff = Math.ceil((new Date() - new Date(time * 1000)) / 1000);
					if (diff < 60)
						return diff + " seconds ago";

					diff = Math.ceil(diff / 60);
					if (diff < 60)
						return diff + " minutes ago";

					diff = Math.ceil(diff / 60);
					if (diff < 24)
						return diff + " hours ago";

					diff = Math.ceil(diff / 24);
					return diff + " days ago";
				});
			};

			registerHelpers();
			setHeader();

			$('.ui.dropdown').dropdown();
		};
		var setHeader = function()
		{
			var setMenu = function()
			{
				var template = HANDLEBARS.compile($("#header-menu").html());
				$("#menu").html(template(result.user));
			};
			var setForm = function()
			{
				result.method = COMMON._METHOD_.LIST_UNSPENT;

				if (result.user.userNo > -1)
				{
					var template = HANDLEBARS.compile($("#header_form").html());
					$("#form").html(template(result)).show();
				}
			};
			var setBodyHeader = function()
			{
				var template = HANDLEBARS.compile($("#body_header").html());
				$("#main_header").html(template(COMMON._METHOD_));
			};

			setMenu();
			setForm();
			setBodyHeader();

			console.log(result);
		};
		var setBlockList = function(data)
		{
			if (data.result && (data.result.length > 0))
			{
				data.result.method = COMMON._METHOD_.GET_BLOCK;

				var template = HANDLEBARS.compile($("#block_list").html());
				$("#main_body").html(template(data.result.reverse()));
			}
		};
		var setBlockInfo = function(data)
		{
			if (data.result)
			{
				var template = HANDLEBARS.compile($("#block_info").html());
				$("#main_body").html(template(data.result));
			}
		};
		var setBlockDetail = function(data)
		{
			if (data.result)
			{
				var result = data.result;

				$("#block_detail_table").remove();

				var $cont = $('[data-method=' + data.method + '][data-hash=' + result.hash + ']');
				if ($cont.length > 0)
				{
					data.result.method = COMMON._METHOD_.GET_TXOUT;

					var template = HANDLEBARS.compile($("#block_detail").html());
					$cont.after(template(data.result));
				}
			}
		};
		var showTxCheckForm = function()
		{
			var template = HANDLEBARS.compile($("#tx_check_form").html());
			$("#main_body").html(template(COMMON._METHOD_));
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