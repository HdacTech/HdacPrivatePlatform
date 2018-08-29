package com.hdac.dao.member;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDaoImpl implements MemberDao
{
	private SqlSession sqlSession;

	@Override
	public void setSqlSession(SqlSession sqlSession)
	{
		this.sqlSession = sqlSession;
	}

	@Override
	public List<Map<String, Object>> getMemberList()
	{
		return sqlSession.selectList("member.list");
	}

	@Override
	public Map<String, Object> getMember(Map<String, Object> paramMap)
	{
		return sqlSession.selectOne("member.select", paramMap);
	}

	@Override
	public int createMember(Map<String, Object> paramMap)
	{
		return sqlSession.insert("member.insert", paramMap);
	}

	@Override
	public int insertSeedWords(Map<String, Object> paramMap)
	{
		return sqlSession.insert("member.insertSeedWords", paramMap);
	}

	@Override
	public List<String> getSeed(Map<String, Object> paramMap)
	{
		return sqlSession.selectList("member.getSeedList", paramMap);
	}
}