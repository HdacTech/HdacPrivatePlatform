package com.hdac.auth;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.socket.WebSocketSession;

public interface Auth
{
	public void setAuth(HttpServletRequest request, HttpServletResponse response, Map<String, Object> resultMap);
	public void removeAuth(HttpServletRequest request, HttpServletResponse response);
	public boolean isAuth(HttpServletRequest request, HttpServletResponse response);
	public long getAuth(HttpServletRequest request, HttpServletResponse response);
	public long getAuth(WebSocketSession session);
}