package com.hdac.service.member;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface MemberService
{
	public List<Map<String, Object>> getMemberList();
	public Map<String, Object> createMember(Map<String, Object> paramMap);
	public Map<String, Object> getMember(Map<String, Object> paramMap);
}