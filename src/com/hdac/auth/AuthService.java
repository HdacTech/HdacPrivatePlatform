package com.hdac.auth;

import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.web.socket.WebSocketSession;

import com.hdac.common.CipherUtil;
import com.hdac.common.CookieUtil;
import com.hdac.common.StringUtil;

public class AuthService implements Auth
{
	private static final String _LOGIN_COOKIE_	= "__cust";
	private static final String _LOGIN_KEY_		= "HdacTechnologyAG";

	private AuthService()
	{
	}

	private static class LazyHolder
	{
		public static final AuthService instance = new AuthService();
	}

	public static AuthService getAuth()
	{
		return LazyHolder.instance;
	}

	@Override
	public void setAuth(HttpServletRequest request, HttpServletResponse response, Map<String, Object> resultMap)
	{
		String userNo = StringUtil.nvl(resultMap.get("userNo"));
		String encrypt = CipherUtil.AesEncode(userNo, _LOGIN_KEY_);
		CookieUtil.createSessionCookie(request, response, _LOGIN_COOKIE_, encrypt);
	}

	@Override
	public void removeAuth(HttpServletRequest request, HttpServletResponse response)
	{
		Cookie cookie = CookieUtil.getCookie(request, response, _LOGIN_COOKIE_);
		if (cookie != null)
		{
			cookie.setPath("/");
			cookie.setValue("");
			cookie.setMaxAge(0);

		    response.addCookie(cookie);
		}
	}
	
	@Override
	public boolean isAuth(HttpServletRequest request, HttpServletResponse response)
	{
		Cookie cookie = CookieUtil.getCookie(request, response, _LOGIN_COOKIE_);
		if (cookie != null)
			return true;

		return false;
	}

	@Override
	public long getAuth(HttpServletRequest request, HttpServletResponse response)
	{
		String value = CookieUtil.getCookieValue(request, response, _LOGIN_COOKIE_);
		return decrypt(value);
	}

	@Override
	public long getAuth(WebSocketSession session)
	{
		String value = getValue(session, _LOGIN_COOKIE_);
		return decrypt(value);
	}

	private long decrypt(String value)
	{
		if (value != null)
		{
			String decrypt = CipherUtil.AesDecode(value, _LOGIN_KEY_);
			try
			{
				return Long.parseLong(decrypt);
			}
			catch (Exception e)
			{
			}
		}
		return -1;		
	}

	private String getValue(WebSocketSession session, String name)
	{
		HttpHeaders headers = session.getHandshakeHeaders();
		List<String> list = headers.get("cookie");

		for (String str : list)
		{
			String[] s1 = str.split(";");
			for (String s : s1)
			{
				String[] s2 = s.trim().split("=");
				if (name.equals(s2[0]))
				{
					return s2[1].trim();
				}
			}
		}
		return null;
	}
}