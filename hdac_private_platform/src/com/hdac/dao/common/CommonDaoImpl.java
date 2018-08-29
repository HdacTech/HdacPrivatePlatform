package com.hdac.dao.common;

import java.util.HashMap;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.hdac.common.StringUtil;

@Repository
public class CommonDaoImpl implements CommonDao
{
	private SqlSession sqlSession;

	@Override
	public void setSqlSession(SqlSession sqlSession)
	{
		this.sqlSession = sqlSession;
	}

	@Override
	public long getSeqMember()
	{
		Map<String, Object> map = new HashMap<String, Object>();
		sqlSession.insert("common.insert", map);

		return Long.parseLong(StringUtil.nvl(map.get("seq_val"), "0"));
	}
}