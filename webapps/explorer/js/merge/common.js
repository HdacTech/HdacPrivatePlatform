define(["jquery"], function($)
{
	"use strict";

	var _M_ = function()
	{
		var _this = this;
		this._METHOD_ =
		{
			GET_ADDRESS_BALANCES	: 0x02,
			GET_ADDRESS_TRANSACTION : 0x03,
			LIST_UNSPENT			: 0x12,
			GET_BLOCK				: 0x0E,
			GET_BLOCKCHAIN_INFO		: 0x54,
			GET_RAW_TRANSACTION		: 0x58,
			GET_TXOUT				: 0x59,
			LIST_BLOCKS				: 0x5A,
			SEND_RAW_TRANSACTION	: 0x0B
		};

		this._URL_ = (function()
		{
			var _M_ = function()
			{
				this.isHtmlService = function()
				{
					var match = location.hostname.match(/^([^\s^\.]+)[\.]/);
					if (match && (match[1] == 'dev'))
						return false;
					return true;
				};
				this.checkUrl = function(url)
				{
					var appendHttp = function(url)
					{
						var match = url.match(/^((http[s]*:)*\/\/)+/);
						if (match)
						{
							if (match[2] == undefined)
								url = "http:" + url;
						}
						else
							url = "http://" + url;

						return url;
					};

					if (url)
					{
						url = appendHttp(url);

						var match = url.match(/^(http:\/\/)(([^:\/\s]+)[^\s]*)$/);
						if (match)
						{
							if (match[3].indexOf('stylewish.') > -1)
								return '//' + match[2];
						}
					}
					return url;
				};
				this.init = function()
				{
					this._HOME_URL_								= '/page.do';
					this._PRODUCT_DETAIL_URL_					= '/detail.do';

					if (this.isHtmlService())
					{
//						this._HOME_PC_URL_						= '/html/front/hotitem.html';
					}
				};
				this.init();
			};
			return new _M_();
		})();

		this._COMMON_COOKIE_ = (function()
		{
			var COOKIE_TYPE = new Array("CTT", "CTD", "CTP");
			var _M_ = function()
			{
				this.getCookie = function(type, name)
				{
					var index = COOKIE_TYPE.indexOf(type);
					if (index != -1)
					{
						var arg = type + "=";
						var alen = arg.length;
						var clen = document.cookie.length;
						var i = 0;

						while (i < clen)
						{
							var j = i + alen;
							if (document.cookie.substring(i, j) == arg)
								return this.getCookieVal(j, name);

							i = document.cookie.indexOf(" ", i) + 1;
							if (i == 0)
								break;
						}

						return "";
					}
				};
				this.getCookieVal = function(offset, name)
				{
					name = name || false;

					var endstr = document.cookie.indexOf(";", offset);
					if (endstr == -1)
						endstr = document.cookie.length;

					var val = document.cookie.substring(offset, endstr);
					if (name)
					{
						var values = decodeURIComponent(val).split("&");
						if (values.length > 0)
						{
							for (var i = 0; i < values.length; i++)
							{
								var t = values[i].split("=");
								if (name == t[0])
									return t[1];
							}
							return "";
						}
					}
					else
					{
						return val;
					}
				};
				this.setCookieVal = function(type, name, value)
				{
					var val = this.getCookie(type);
					if (val == '')
						return encodeURIComponent(name + "=" + value);

					var values = decodeURIComponent(val).split("&");
					var text = "", bMatch = false;
					for (var i = 0; i < values.length; i++)
					{
						var t = values[i].split("=");
						if (name == t[0])
						{
							text += "&" + encodeURIComponent(name + "=" + value);
							bMatch = true;
						}
						else
							text += "&" + encodeURIComponent(values[i]);
					}

					if (bMatch == false)
						text += "&" + encodeURIComponent(name + "=" + value);

					return text.substring(1);
				};
				this.getExpireTime = function(type)
				{
					switch (type)
					{
						case 'CTT' :
							return null;

						case 'CTD' :
							var expiredDate = new Date(parseInt(new Date().getTime() / 86400000) * 86400000 + 54000000); 
							expiredDate.setDate(expiredDate.getDate());
							return expiredDate;

						case 'CTP' :
							return new Date(2200, 12, 31);
					}
				};
				this.getDomain = function()
				{
					if (document.domain.match(/^stylewish\./) == null)
					{
						var index = document.domain.indexOf(".");
						if (index > -1)
							return document.domain.substring(index);
					}
					return document.domain;			
				};
				this.setCookie = function(type, name, value)
				{
					var expires = this.getExpireTime(type);
					var path = "/";
					var domain = this.getDomain();

					var cookie = type + "="
								+ this.setCookieVal(type, name, value)
								+ ";path=" + path
								+ ";domain=" + domain;

					if (expires != null)
						cookie += ";expires=" + expires.toGMTString();

					document.cookie = cookie;
				};
			};
			return new _M_();
		})();
 
		this._COMMON_ = (function()
		{
			var _M_ = function()
			{
				this.MovePage = function(url, changeHash, e)
				{
					_this._SESSION_.set("_ReLoad_", "Y");

					if ((typeof e != "undefined") && (e.which == 2))
						window.open(url, "_blank");
					else
					{
						if (changeHash)
							window.location.href = url;
						else
							location.replace(url);
					}
				};
				this.getParseParamValue = function(paramNm)
				{
					var href = location.search;
					if (href && (href.length > 1))
					{
						var params = href.substring(1).split("&");
						var len = params.length;

						var reg = new RegExp(paramNm + '=' + '(.+)', 'i');
						for (var i = 0; i < len; i++)
						{
							var match = params[i].match(reg);
							if (match)
								return match[1];
						}
					}

					return "";
				};
				this.isMobile = function()
				{
					return (this.isAndroid() || this.isIphone());
				};
				this.isAndroid = function()
				{
					if (navigator.userAgent.toLowerCase().match(/android/i))
						return true;
					return false;
				};
				this.isIphone = function()
				{
					if (navigator.userAgent.toLowerCase().match(/iphone/i))
						return true;
					return false;
				};
				this.checkReferrer = function()
				{
					var referrer = document.referrer;
					var match = referrer.match(/^(http[s]*:\/\/)(([^:\/\s]+)[^\s]*)$/);
					if (match)
					{
						if ((match[3].indexOf('wishlink.') > -1)
							|| (match[3].indexOf('1ten.') > -1))
						{
							return true;
						}
					}
					return false;
				};
				this.getMaxWidth = function()
				{
					return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				};
				this.getMaxHeight = function()
				{
					return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				};
			};
			return new _M_();
		})();

		this._SESSION_ = (function()
		{
			var _M_ = function()
			{
				var Storage = (function (win, doc)
				{
					return function (type, onStorage)
					{
						function init()
						{
				            this.type = type || 'session';
				            this.storage = win[this.type === 'local' ? 'localStorage' : 'sessionStorage'];
				            this.length = this.storage.length;

				            // events
				            this.onStorage = onStorage || function () { ; };

				            return this;
						};

						init.prototype =
						{
							set			: set,
							get			: get,
							remove		: remove,
							removeAll	: removeAll
						};

						return new init;
					};

					// 스토리지 key value 생성
					function set(key, value)
					{
						try
						{
							key = key || '';
							// JSON 객체담기
							value = value && value.constructor === Object ? JSON.stringify(value) : value;

							this.storage.setItem(key, value);
							this.length = this.storage.length;
						}
						catch (e)
						{
							console.log(e);
						}
					};

					// 스토리지 key value 가져오기
					function get(key)
					{
						var item = this.storage.getItem(key);
						try
						{	// JSON 객체 가져오기
							return JSON.parse(item).constructor === Object && JSON.parse(item);
						}
						catch (e)
						{
							return item;
						}
					};

					// 스토리지 삭제
					function remove(key)
					{
						this.storage.removeItem(key);

						this.length = this.storage.length;
						return this;
					};

					// 스토리지 전체 삭제
					function removeAll()
					{
						this.storage.clear();

						this.length = this.storage.length;
						return this;
					};
				})(window, document);

				var session = null;
				this.set = function(a, b)
				{
					session.set(a, b);
				};
				this.get = function(a)
				{
					return session.get(a);
				};
				this.remove = function(a)
				{
					session.remove(a);
				};
				this.removeAll = function()
				{
					session.removeAll();
				};
				this.init = function()
				{
					session = Storage('session');
				};

				this.init();
			};
			return new _M_();
		})();
 
		this.init = function(handle, key)
		{
			var _SELECTOR_CLICK_ = '[data-link]';
			$(document).on('mousedown', _SELECTOR_CLICK_, function(e)
			{
				if (e.which == 2)
					$(this).trigger({ type : 'click', which : e.which });
			});

			$(document)
			.on('click', '[data-click]', function(e)
			{
				var $this = $(this), data = $this.data();
				if ((handle != null) && (typeof handle.handleClick != "undefined"))
					handle.handleClick(e, $this, _this.handleClick);
					
				e.stopImmediatePropagation();
				e.stopPropagation();
			})
			.on('click', '[data-link]', function(e)
			{
				var $this = $(this), data = $this.data();
				var changeHash = (data.changeHash == 'N') ? false : true;

				if ((typeof data.pno != 'undefined') && (typeof data.param != 'undefined'))
				{
					_this._LOG_.logCollect(data.pno, data.param, function()
					{
						_this._SESSION_.set("_ReLoad_", "Y");
						_this._COMMON_.MovePage(data.link, changeHash, e);
					});
				}
				else
				{
					_this._SESSION_.set("_ReLoad_", "Y");
					_this._COMMON_.MovePage(data.link, changeHash, e);
				}

				e.stopImmediatePropagation();
				e.stopPropagation();
			})
			.bind('scroll', function(e)
			{
				if ((handle != null) && (typeof handle.scrollHandle != "undefined"))
					handle.scrollHandle(e);

				setTimeout(function()
				{
					var mH = _this._COMMON_.getMaxHeight();
					var maxSt = $(document).outerHeight() - mH + 1;
					var st = Math.min($(window).scrollTop(), maxSt);

					if (st > 2 * mH)
					{
						$(".topbtn").show();
					}
					else
					{
						$(".topbtn").hide();
					}
				}, 20);
			});

			var beforeUnload = function()
			{
				if ((handle != null) && (typeof handle.getSavedData != "undefined"))
				{
					var saveData = handle.getSavedData();
					if (saveData != null)
						_this._SESSION_.set(key, saveData);
				}
			};

			$(window)
			.on('beforeunload', function(e)
			{
				beforeUnload();
			}).on('pagehide', function(e)
			{
				beforeUnload();
			});

			// 사용자 정의 prototype handle init 전에 재정의 되어야함. 
			setCustPrototype();

			if (handle != null)
			{
				var obj = null;

				var _ReLoad_ = _this._SESSION_.get("_ReLoad_");
				_this._SESSION_.remove("_ReLoad_");

				if (_ReLoad_ == "Y")
					_this._SESSION_.remove(key);
				else
					obj = _this._SESSION_.get(key);

				var bInit = true;
				if ((obj != null) && (typeof obj == "object"))
				{
					handle.initData(obj);

					if (typeof handle.getInit == "function")
						bInit = handle.getInit();
				}

				if (bInit)
				{
					handle.init();
				}
				else
				{
					handle.resume();

					if (typeof handle.getYpos == "function")
					{
						var yPos = handle.getYpos();
						if (yPos > 0)
						{
							setTimeout(function()
							{
								$('html, body').animate({scrollTop: yPos}, 0);
							}, 600);
						}
					}
				}
			}
		};
		this.handleClick = function(e, $trgt)
		{
			var data = $trgt.data(), name = data.name;
			switch (name)
			{
				case 'go-back' :
					if (_this._COMMON_.checkReferrer())
						window.history.back();
					else
						_this._COMMON_.MovePage(_this._URL_._HOME_URL_, true);
					break;

				case 'scroll-top' :
					$(document).scrollTop(0);
					break;

				case 'home' :
					var url = "/home.hdac";
					_this._COMMON_.MovePage(url, true);
					break;
			}
		};
		
		var setCustPrototype = function()
		{
			String.prototype.getSubString = function(cnt)
			{
				var str = this;
			    var len = 0;
			    for (var i = 0; i < str.length; i++)
			    {
			        if (escape(str.charAt(i)).length > 4)
			            len++;

			        len++;
			        if (len > cnt)
			        {
			        	str = str.substring(0, i) + "...";
			        	break;
			        }
			    }
			    return str;
			};
			String.prototype.getSubStringChar = function(cnt)
			{
				var str = this;
			    var len = 0;
			    for (var i = 0; i < str.length; i++)
			    {
			        len++;
			        if (len > cnt)
			        {
			        	str = str.substring(0, i) + "...";
			        	break;
			        }
			    }
			    return str;
			};
			String.prototype.replaceSize = function(regex, replacement)
			{
				var str = this;
				if (window.devicePixelRatio > 1)
					replacement *= 2;

				return str.replace(regex, replacement);
			};
			String.prototype.num2Comma = function()
			{
				var n = this.replace(/,/g, "");
				var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
				n += '';                          // 숫자를 문자열로 변환

				while (reg.test(n)) 
					n = n.replace(reg, '$1' + ',' + '$2');

				return n;
			};			
			String.prototype.num2CommaCurrUnit = function()
			{
				var n = this.num2Comma();
				return n + '원';
			};
			String.prototype.point = function(num)
			{
				if ($.isNumeric(num))
					return parseFloat(this.getDataVal()).toFixed(num);
				return num;
			};
			String.prototype.getDataVal = function()
			{
				return this.replace(/\"/g, "\\\"");
			};
			String.prototype.toDate = function()
			{
				var dtStr = this;

				var year  = dtStr.substr(0, 4);
				var month = dtStr.substr(4, 2) - 1; // 1월=0,12월=11
				var day   = dtStr.substr(6, 2);

				var dt = new Date();
				if (dtStr.length == 8)
					dt = new Date(year, month, day);
				else if (dtStr.length == 10)
					dt = new Date(year, month, day, dtStr.substr(8, 2));
				else if (dtStr.length == 12)
					dt = new Date(year, month, day, dtStr.substr(8, 2), dtStr.substr(10, 2));
				else if (dtStr.length == 14)
					dt = new Date(year, month, day, dtStr.substr(8, 2), dtStr.substr(10, 2), dtStr.substr(12, 2));

				return dt;
			};
			String.prototype.formatTimeZone = function (f, offset)
			{
				var dt = this.toDate();

				if (offset != 9)
					dt.setHours(dt.getHours() + (offset - 9));

			    return dt.format4MW(f);
			};
			String.prototype.string = function(len)
			{
				var s = '', i = 0;
				while (i++ < len)
					s += this;
				return s;
			};
			String.prototype.zf = function(len)
			{
				return "0".string(len - this.length) + this;
			};
			String.prototype.nvl = function(str)
			{
				if (!this)
					return str;
				return this;
			};
			String.prototype.removeProtocol = function()
			{
				var match = this.match(/^(http[s]*:)(\/\/[^:\/\s]+[^\s]*)$/);
				if (match)
					return match[2];
				return this;
			};
			String.prototype.replaceHtmlTag = function()
			{
				return this.replace(/</g, '&lt;').replace(/ /g, '&nbsp;');
			};
			Number.prototype.zf = function(len)
			{
				return this.toString().zf(len);
			};
			Date.prototype.format = function(f)
			{
			   return this.format4MW();
			};
			Date.prototype.format4MW = function(f)
			{
			    if (!this.valueOf()) return " ";
			    var d = this;

			    return f.replace(/(yyyy|yy|MM|dd|HH|hh|mm|ss)/gi, function($1)
			    {
			        switch ($1)
			        {
			            case "yyyy"	: return d.getFullYear();
			            case "yy"	: return (d.getFullYear() % 1000).zf(2);
			            case "MM"	: return (d.getMonth() + 1).zf(2);
			            case "dd"	: return d.getDate().zf(2);
			            case "HH"	: return d.getHours().zf(2);
			            case "hh"	: return ((h = d.getHours() % 12) ? h : 12).zf(2);
			            case "mm"	: return d.getMinutes().zf(2);
			            case "ss"	: return d.getSeconds().zf(2);
			            default		: return $1;
			        }
			    });
			};
		};
	};
	return new _M_();
});