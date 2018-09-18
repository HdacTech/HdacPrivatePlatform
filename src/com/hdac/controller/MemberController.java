package com.hdac.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.hdac.auth.Auth;
import com.hdac.auth.AuthService;
import com.hdac.common.BeanUtil;
import com.hdac.common.JsonUtil;
import com.hdac.common.StringUtil;
import com.hdac.service.member.MemberService;
import com.hdac.service.member.MemberServiceImpl;

@Controller
public class MemberController
{
	@RequestMapping(value="/member.hdac", method=RequestMethod.GET)
	public ModelAndView home(HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView view = new ModelAndView("member/memberList");

        MemberService service = (MemberService)BeanUtil.getBean(MemberServiceImpl.class);
		view.addObject("data", service.getMemberList());

		return view;
	}

	@RequestMapping(value="/member/create.hdac", method=RequestMethod.GET)
	public ModelAndView createForm(HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView view = new ModelAndView("member/create");
		return view;
	}

	@RequestMapping(value="/member/create.hdac", method=RequestMethod.POST)
	public ModelAndView createAjax(HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView view = new ModelAndView("/commonAjax");

		String userId	= StringUtil.nvl(request.getParameter("user_id"));
		String userName	= StringUtil.nvl(request.getParameter("user_name"));
		String password	= StringUtil.nvl(request.getParameter("password"));

		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("userId", userId);
		paramMap.put("userName", userName);
		paramMap.put("password", password);
		paramMap.put("createUser", "1000000");

		MemberService service = (MemberService)BeanUtil.getBean(MemberServiceImpl.class);
		Map<String, Object> resultMap = service.createMember(paramMap);

		view.addObject("jsonStr", JsonUtil.toJsonString(resultMap).toString());

		return view;
	}

	@RequestMapping(value="/member/login.hdac", method=RequestMethod.GET)
	public ModelAndView loginForm(HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView view = new ModelAndView("member/login");
		return view;
	}

	@RequestMapping(value="/member/login.hdac", method=RequestMethod.POST)
	public ModelAndView loginAjax(HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView view = new ModelAndView("/commonAjax");

		String userId	= StringUtil.nvl(request.getParameter("user_id"));
		String password	= StringUtil.nvl(request.getParameter("password"));

		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("userId", userId);
		paramMap.put("password", password);

		MemberService service = (MemberService)BeanUtil.getBean(MemberServiceImpl.class);
		Map<String, Object> resultMap = service.getMember(paramMap);

		if ("true".equals(resultMap.get("success")))
		{
			Auth auth = AuthService.getAuth();
			auth.setAuth(request, response, resultMap);
		}

		view.addObject("jsonStr", JsonUtil.toJsonString(resultMap).toString());

		return view;
	}

	@RequestMapping(value="/member/logout.hdac", method=RequestMethod.POST)
	public ModelAndView logoutAjax(HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView view = new ModelAndView("/commonAjax");
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", "false");

		Auth auth = AuthService.getAuth();
		if (auth.isAuth(request, response))
		{
			auth.removeAuth(request, response);
			resultMap.put("success", "true");
		}

		view.addObject("jsonStr", JsonUtil.toJsonString(resultMap).toString());
		return view;
	}
}