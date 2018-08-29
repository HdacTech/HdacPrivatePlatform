package com.hdac.common;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieUtil
{
	public static void createSessionCookie(HttpServletRequest request, HttpServletResponse response, String name, String value)
	{
		createCookie(request, response, name, value, -1);
	}
	public static void createCookie(HttpServletRequest request, HttpServletResponse response, String name, String value)
	{
		createCookie(request, response, name, value, 30 * 60);
	}
	public static void createCookie(HttpServletRequest request, HttpServletResponse response, String name, String value, int expiry)
	{
		Cookie cookie = new Cookie(name, value);
		cookie.setMaxAge(expiry);
		cookie.setPath("/");
//		cookie.setDomain(".hdac.com");
		cookie.setHttpOnly(true);

		response.addCookie(cookie);
	}

	public static Cookie getCookie(HttpServletRequest request, HttpServletResponse response, String name)
	{
		Cookie[] cookies = request.getCookies();
		if (cookies != null)
		{
			for (Cookie cookie : cookies)
			{
				if (name.equals(cookie.getName()))
					return cookie;
		    }
		}
		return null;
	}

	public static String getCookieValue(HttpServletRequest request, HttpServletResponse response, String name)
	{
		Cookie cookie = getCookie(request, response, name);
		if (cookie != null)
			return cookie.getValue();

		return null;
	}
}