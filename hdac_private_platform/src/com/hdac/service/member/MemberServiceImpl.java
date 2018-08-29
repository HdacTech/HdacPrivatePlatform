package com.hdac.service.member;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hdac.common.BeanUtil;
import com.hdac.common.HashUtil;
import com.hdac.common.HdacUtil;
import com.hdac.common.SqlMapConfig;
import com.hdac.common.StringUtil;
import com.hdac.dao.common.CommonDao;
import com.hdac.dao.common.CommonDaoImpl;
import com.hdac.dao.member.MemberDao;
import com.hdac.dao.member.MemberDaoImpl;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService
{
	@Override
	public List<Map<String, Object>> getMemberList()
	{
		SqlSession sqlSession = SqlMapConfig.getSqlSession();

		try
		{
			MemberDao memberDao = (MemberDao)BeanUtil.getBean(MemberDaoImpl.class);
			memberDao.setSqlSession(sqlSession);
			return memberDao.getMemberList();
		}
		finally
		{
			sqlSession.close();
		}
	}

	@Override
	public Map<String, Object> createMember(Map<String, Object> paramMap)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", "false");

		SqlSession sqlSession = SqlMapConfig.getSqlSession(false);

		try
		{
			MemberDao memberDao = (MemberDao)BeanUtil.getBean(MemberDaoImpl.class);
			memberDao.setSqlSession(sqlSession);

			Map<String, Object> user = memberDao.getMember(paramMap);
			if (user == null)
			{
				CommonDao commonDao = (CommonDao)BeanUtil.getBean(CommonDaoImpl.class);
				commonDao.setSqlSession(sqlSession);

				long userNo = commonDao.getSeqMember();
				if (userNo > 0)
				{
					paramMap.put("userNo", userNo);

					String userId = StringUtil.nvl(paramMap.get("userId"));
					List<String> seed = HdacUtil.getSeedWord(HashUtil.SHA256(userId));
					if (seed != null)
					{
						List<String> encSeed = HdacUtil.encodeSeed(seed, userId);
						paramMap.put("seedWords", encSeed);

						int ret = memberDao.createMember(paramMap);
						if (ret > 0)
						{
							ret = memberDao.insertSeedWords(paramMap);
							if (ret > 0)
							{
								sqlSession.commit();
								resultMap.put("success", "true");
							}
							else
							{
								throw new Exception("");
							}
						}
						else
						{
							throw new Exception("");
						}
					}
					else
					{
						throw new Exception("");
					}
				}
			}
		}
		catch (Exception e)
		{
			sqlSession.rollback();
			e.printStackTrace();
		}
		finally
		{
			sqlSession.close();
		}

		return resultMap;
	}

	@Override
	public Map<String, Object> loginMember(Map<String, Object> paramMap)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", "false");

		SqlSession sqlSession = SqlMapConfig.getSqlSession();

		try
		{
			MemberDao memberDao = (MemberDao)BeanUtil.getBean(MemberDaoImpl.class);
			memberDao.setSqlSession(sqlSession);

			Map<String, Object> user = memberDao.getMember(paramMap);
			if (user != null)
			{
				resultMap.put("userNo", user.get("user_no"));
				resultMap.put("userId", user.get("user_id"));
				resultMap.put("success", "true");
			}
		}
		finally
		{
			sqlSession.close();
		}

		return resultMap;
	}
}