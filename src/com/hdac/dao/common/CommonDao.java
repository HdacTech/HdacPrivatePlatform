package com.hdac.dao.common;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonDao
{
	public void setSqlSession(SqlSession sqlSession);
	public long getSeqMember();
}