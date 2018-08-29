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
			var type = data.ui;
			if(type == "btnList"){
				$("#view_list").css("display","block");
				$("#view_info").css("display","none");
				$("#view_check").css("display","none");
			}else if(type == "btnInfo"){
				$("#view_list").css("display","none");
				$("#view_info").css("display","block");
				$("#view_check").css("display","none");
			}else if(type == "btnCheck"){
				$("#view_list").css("display","none");
				$("#view_info").css("display","none");
				$("#view_check").css("display","block");
			}
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
						var dlg = openDialog("Logout");
						dlg.on("dialogclose", function(){
							var url = "/home.hdac";
							COMMON._COMMON_.MovePage(url, true);
						});	
					}
					else
					{
						var dlg = openDialog("Logout Fail");
					}
				});
			};
			var focusReset = function(dlg){
				dlg.parents('.ui-dialog').attr('tabindex', -1)[0].focus();
			}
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
								openDialog("Fail<br>" + getMessage(data));
							}
							else
							{
								switch (data.method)
								{
									case COMMON._METHOD_.GET_ADDRESS_TRANSACTION :
										var result = data.result;
																			
										var tr = $("tr[name=tx_tr]");
										if(tr!=null) tr.remove();
															
										$.each(result, function(key, value){
											value = JSON.stringify(value);
											var tr = document.createElement('tr');
											var td_title = document.createElement('td');
											var td_value = document.createElement('td');
											$(tr).attr("name", "tx_tr");
											$(td_title).html('<b>'+key+'</b>');
											$(td_value).html(value);
											tr.appendChild(td_title);
											tr.appendChild(td_value);
											$("#tx_tbody").append(tr);
										});
										break;
										
									case COMMON._METHOD_.SEND_RAW_TRANSACTION :
										var msg = '';
										$.each(data, function(key, value){
											var line = key + " : " + value + "<br>";
											msg += line;
										});
										openDialog(msg, "info");
										break;
										
									case COMMON._METHOD_.GET_ADDRESS_BALANCES :
										if (data.result && (data.result.length > 0))
										{
											var result = data.result[0];
											openDialog("Balance : " + result.qty);
										}
										break;

									case COMMON._METHOD_.GET_BLOCKCHAIN_INFO :
										if (data.result)
										{
											var result = data.result;
																	
											var tr = $("tr[name=info_tr]");
											if(tr!=null) tr.remove();
																
											$.each(result, function(key, value){
												if(value == false) value = "false";
												else if(value == true) value == "true";
												var tr = document.createElement('tr');
												var td_title = document.createElement('td');
												var td_value = document.createElement('td');
												$(tr).attr("name", "info_tr");
												$(td_title).html('<b>'+key+'</b>');
												$(td_value).html(value);
												tr.appendChild(td_title);
												tr.appendChild(td_value);
												$("#info_tbody").append(tr);
											});
										}
										break;

									case COMMON._METHOD_.LIST_BLOCKS :
										if (data.result && (data.result.length > 0))
										{
											var result = data.result;
											console.log(result);
											setBlockList(result);
										}
										break;

									case COMMON._METHOD_.GET_BLOCK :
										if (data.result)
										{
											var result = data.result;
											var $cont = $('[data-method=' + data.method + '][data-hash=' + result.hash + ']');
											if ($cont.length > 0)
											{
												var dlg = $("#detail_info").dialog({
												   	title:"test",
													width:700,
													height:400,
												});
												focusReset(dlg);
												$("#detail_bits").html(result.bits);
												$("#detail_chainwork").html(result.chainwork);
												$("#detail_difficulty").html(result.difficulty);
												$("#detail_miner").html(result.miner);
												$("#detail_size").html(result.size);
												$("#detail_tx").html("");
												
												$.each(result.tx, function(index, tx)
												{
													var a_tx = document.createElement("a");
													$(a_tx).attr("href", "javascript:;");
													$(a_tx).attr("data-name", "hdac");
													$(a_tx).attr("data-click", "Y");
													$(a_tx).attr("data-method", COMMON._METHOD_.GET_TXOUT);
													$(a_tx).attr("data-tx", tx);
													$(a_tx).css("color", "blue");
													$(a_tx).html(tx);
													$("#detail_tx").append(a_tx).append('<br>');
												});
											}
										}
										break;

									case COMMON._METHOD_.GET_TXOUT :
										openDialog("Address : " + JSON.stringify(data.result.scriptPubKey.addresses));
										break;

									default :
										//alert(JSON.stringify(data));
										openDialog(getMessage(data));
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
						param.textdata	= $("[name=textdata]").val();
						if(result.user > -1){
							if (param.to == '')
							{
								openDialog("Select a destination to send.")
								return;
							}
							sendWebSocket(param);
						}else{
							openDialog("You can use it after login.");
						}
						break;

					case COMMON._METHOD_.GET_ADDRESS_BALANCES :
						if(result.user > -1){
							sendWebSocket(param);
						}else{
							openDialog("You can use it after login.");
						}
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

					case COMMON._METHOD_.GET_ADDRESS_TRANSACTION :
						param.txid		= $("[name=txid]").val();
						if(result.user > -1){
							if (param.txid == '')
							{
								openDialog("Please enter txid");
								return;
							}
							sendWebSocket(param);
						}else{
							openDialog("You can use it after login.");
						}
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
			var data = $.parseJSON($("[name=data]").val());

			result.list		= data.list;
			result.user		= data.user;

			if (typeof callbackFunc == "function")
				callbackFunc();
		};
		var showPage = function()
		{
//			setBlockList();
			setLogin();
		};
		var setBlockList = function(list)
		{
			var toGMT = function(time)
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
			};
						
			var tr = $("tr[name=list_tr]");
			if(tr!=null) tr.remove();
			
			var blocks = list.reverse();
			$.each(blocks, function(index, block)
			{
				var tr = document.createElement('tr');
				var td_block = document.createElement('td');
				var td_height = document.createElement('td');
				var td_age = document.createElement('td');
				var td_transations = document.createElement('td');
				var a_block = document.createElement('a');
										
				$(tr).attr("name", "list_tr");
				$(a_block).attr("href", "javascript:;");
				$(a_block).attr("data-click", "Y");
				$(a_block).attr("data-name", "hdac");
				$(a_block).attr("data-method", COMMON._METHOD_.GET_BLOCK);
				$(a_block).attr("data-hash", block.hash);
				$(a_block).html(block.hash);
										
				td_block.appendChild(a_block);
				$(td_height).html(block.height);
				$(td_age).html(toGMT(block.time));
				$(td_transations).html(block.txcount);
				
				tr.appendChild(td_block);
				tr.appendChild(td_height);
				tr.appendChild(td_age);
				tr.appendChild(td_transations);
				
				$("#list_tbody").append(tr);
			});
		};
		var setLogin = function()
		{
			$("#btn_send").attr("data-method", COMMON._METHOD_.LIST_UNSPENT);
			$("#btn_list").attr("data-method", COMMON._METHOD_.LIST_BLOCKS);
			$("#btn_info").attr("data-method", COMMON._METHOD_.GET_BLOCKCHAIN_INFO);
			$("#btn_bal").attr("data-method", COMMON._METHOD_.GET_ADDRESS_BALANCES);
			$("#btn_txcheck").attr("data-method", COMMON._METHOD_.GET_ADDRESS_TRANSACTION);
						
			$("#header_title").css("display", "block");
			$("#header_inputarea").css("display", "block");
			$("#view_body").css("display", "block");
			
			$("#btn_list").click();
						
			var html = '';
			if (result.user > -1)
			{
				$("#btn_login").html("<b>Logout<b>");
				$("#btn_login").attr("data-name", "logout");
				
				var curUser;	
				$.each(result.list, function(index, user)
				{
					html += '<option value="' + user.user_no + '">' + user.username + '</option>';
					if(result.user == user.user_no){
						curUser = user.user_id;
					}
				});
				$("#select_user").append(html);
				$("#btn_join").html("current user = " + curUser);
			}
			else
			{
				
			}
		};
	};
	return new _M_();
});