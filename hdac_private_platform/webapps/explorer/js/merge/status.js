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
//			prefix			= $.parseJSON(data.prefix);
		};
		this.getSavedData = function()
		{
			var data = {};

			data.yPos		= $(window).scrollTop();
//			data.bInit		= bInit;
//			data.info		= JSON.stringify(info);
			data.result		= JSON.stringify(result);
//			data.prefix		= JSON.stringify(prefix);

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

				case 'move-home' :
					var url = '/main.hdac';
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
			if (_reqAjax)
				return;

			if (bInit)
			{
				var sync = $.parseJSON($("[name=sync]").val());
				var info = $.parseJSON($("[name=info]").val());
				var last = $.parseJSON($("[name=last]").val());

				console.log(sync);
				console.log(info);
				console.log(last);

				result.sync = sync;
				result.information = info;
				result.last = last;

				var node =
				{
					node	:
					[
						{ name	: 'Version',					value	: info.info.version,			},
						{ name	: 'Protocol version',			value	: info.info.protocolversion,	},
						{ name	: 'Blocks',						value	: info.info.blocks,				},
						{ name	: 'Time Offset',				value	: info.info.timeoffset,			},
						{ name	: 'Connections to other nodes',	value	: info.info.connections,		},
						{ name	: 'Mining Difficulty',			value	: info.info.difficulty,			},
						{ name	: 'Network',					value	: info.info.network,			},
						{ name	: 'Info Errors',				value	: info.info.errors,				},
					],
				};

				result.node = node.node;

				result.info =
				{
					conn	: info.info.connections,
					height	: info.info.blocks,
				};
			}

			if (typeof callbackFunc == "function")
				callbackFunc();
		};
		var showPage = function()
		{
/*
			var checkImageSize = function()
			{
				if (prefix.width == 0)
				{
					var testPrd = $('<section class="ot_contents"><div class="ot_content_wrap"><div class="ot_img_list"><div class="row"><div class="item_wrap col-xs-12 col-md-4"><a class="ot_item_thumb"><img id="prd_img">');

					var fakeBody = $("<body>").append(testPrd);
					$('html').prepend(fakeBody);

					prefix.width = $("#prd_img").width();
					prefix.prd = COMMON._IMAGE_.getThumbPrefixLlkt(prefix.width, null, false, 300);

					fakeBody.remove();
				}
			};
*/
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
/*
				HANDLEBARS.registerHelper('loop', function(v)
				{
					var html = new Array();
					for (var i = 0; i < v; i++)
					{
						html.push('<li>★</li>');
					}
					return html.join('');
				});
*/
			};

//			checkImageSize();
			registerHelpers();

			setHeader();
			setBlockChain();
//			setBlockList(true);
		};
		var setHeader = function()
		{
			var template = HANDLEBARS.compile($("#header-common").html());
			$("#wrap").prepend(template(result.info));
		};
		var setBlockChain = function()
		{
			var template = HANDLEBARS.compile($("#app-status").html());
			$("#status").html(template(result));

			template = HANDLEBARS.compile($("#node-table").html());
			$("#status").append(template(result.node));
		};
	};
	return new _M_();
});