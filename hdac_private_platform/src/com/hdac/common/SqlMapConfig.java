package com.hdac.common;

import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class SqlMapConfig
{
	private static SqlSessionFactory sqlSession;

	static
	{
		String resource = "config/mybatis-config.xml";

		try
		{
			Reader reader = Resources.getResourceAsReader(resource);
			sqlSession = new SqlSessionFactoryBuilder().build(reader);
			reader.close();
		}
		catch (Exception e)
		{
			System.out.println("SqlMapConfig 오류 : " + e);
		}
	}

	public static SqlSession getSqlSession()
	{
		return getSqlSession(true);
	}
	public static SqlSession getSqlSession(boolean autoCommit)
	{
		return sqlSession.openSession(autoCommit);
	}
}