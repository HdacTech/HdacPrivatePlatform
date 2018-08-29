package com.hdac.dao.member;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberDao
{
	public void setSqlSession(SqlSession sqlSession);
	public List<Map<String, Object>> getMemberList();
	public Map<String, Object> getMember(Map<String, Object> paramMap);
	public int createMember(Map<String, Object> paramMap);
	public int insertSeedWords(Map<String, Object> paramMap);
	public List<String> getSeed(Map<String, Object> paramMap);
}