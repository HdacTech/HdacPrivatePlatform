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
			url				: '/getBlocks.hdac',
		};
		var info =
		{
			block_template	: null,
		};
		var result =
		{
			info			: null,
			blockchain		: null,
			information		: null,
			blocks			: null,
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
			var data = $trgt.data(), name = data.name;
			switch (name)
			{
				case 'move-blocks' :
					alert('blocks보러 가기');
					break;

				case 'move-status' :
					var url = '/status.hdac';
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
			if (bInit)
			{
				var sync = $.parseJSON($("[name=sync]").val());
				var info = $.parseJSON($("[name=info]").val());

				var blockChain =
				{
					blockchain	:
					[
						{ name	: 'Height',			value	: info.info.blocks,			},
						{ name	: 'Difficulty',		value	: info.info.difficulty,		},
						{ name	: 'Relay Fee',		value	: info.info.relayfee,		},
						{ name	: 'Avg Fee',		value	: 0,						},
						{ name	: 'Age',			value	: 0,						},
						{ name	: 'Block Count',	value	: 0,						},
					],
					information	:
					[
						{ name	: 'Avg Block Time(sec)',		value	: 0,			},
						{ name	: 'Avg Transactins per Block',	value	: 0,			},
						{ name	: 'Avg Size per Block',			value	: 0,			},
						{ name	: 'Amount Transferred',			value	: 0,			},
						{ name	: 'Amount Mined',				value	: 0,			},
						{ name	: 'Amount per Block',			value	: 0,			},
					],
				};

				blockChain.blockchain.name = "Blockchain";
				blockChain.information.name = "Block information";

				result.blockchain = blockChain.blockchain;
				result.information = blockChain.information;

				result.info =
				{
					conn	: info.info.connections,
					height	: info.info.blocks,
				};

				if (typeof callbackFunc == "function")
					callbackFunc();
			}
			else
			{
				if (_reqAjax)
					return;

				var param =
				{
					limit		: 5,
				};
				var opt =
				{
					type		: 'get',
					dataType	: 'json',
					url			: _DEFINE_.url,
					cache		: false,
					data		: param,
				};
				$.ajax(opt).done(function(data, state, xhr)
				{
					if (data && data.blocks)
						result.blocks = data.blocks;

					if (typeof callbackFunc == "function")
						callbackFunc();
	
					_reqAjax = false;
				});
				_reqAjax = true;
			}
		};
		var showPage = function()
		{
			var registerHelpers = function()
			{
				HANDLEBARS.registerHelper('num2CommaPoint', function(num, point)
				{
					num = parseFloat(num.toString().point(point));
					return num.toString().num2Comma();
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
			setBlockChain();
			setBlockList(true);
		};
		var setHeader = function()
		{
			var template = HANDLEBARS.compile($("#header-common").html());
			$("#wrap").prepend(template(result.info));
		};
		var setBlockChain = function()
		{
			var template = HANDLEBARS.compile($("#blockchain-table").html());
			$("#home").html(template(result.blockchain));
			$("#home").append(template(result.information));

			template = HANDLEBARS.compile($("#banner").html());
			$("#home").append(template());
		};
		var setBlockList = function(bInit)
		{
			getDataList(1, false, function()
			{
				if (bInit)
				{
					var template = HANDLEBARS.compile($("#blocks-table").html());
					HANDLEBARS.registerPartial("blocks", $("#blocks-partial").html());
					$("#home").append(template(result.blocks));
				}
				else
				{
					if (info.block_template == null)
						info.block_template = HANDLEBARS.compile($("#blocks-partial").html());

					$("#latest-blocks").html(info.block_template(result.blocks));
				}
			});

			setTimeout(function()
			{
//				setBlockList(false);
			}, 60000);
		};
	};
	return new _M_();
});