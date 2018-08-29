package com.hdac.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.hdac.auth.Auth;
import com.hdac.auth.AuthService;

public class AdminUserCheckInterceptor extends HandlerInterceptorAdapter
{
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
		Auth auth = AuthService.getAuth();
		if (auth.isAuth(request, response))
			response.sendRedirect("/home.hdac");

		return true;
    }
}