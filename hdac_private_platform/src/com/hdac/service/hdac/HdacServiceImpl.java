package com.hdac.service.hdac;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.json.JSONArray;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import com.hdac.common.BeanUtil;
import com.hdac.common.HashUtil;
import com.hdac.common.HdacUtil;
import com.hdac.common.SqlMapConfig;
import com.hdac.common.StringUtil;
import com.hdac.dao.member.MemberDao;
import com.hdac.dao.member.MemberDaoImpl;
import com.hdac.dto.HdacRpcHandlerDto;
import com.hdacSdk.hdacCoreApi.HdacCommand;
import com.hdacSdk.hdacWallet.HdacWallet;

@Service
public class HdacServiceImpl implements HdacService
{
	@Override
	public Map<String, Object> listUnspent(WebSocketSession session, Map<String, Object> paramMap)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", false);

		SqlSession sqlSession = SqlMapConfig.getSqlSession();

		try
		{
			MemberDao memberDao = (MemberDao)BeanUtil.getBean(MemberDaoImpl.class);
			memberDao.setSqlSession(sqlSession);

			Map<String, Object> from	= getUserInfo(memberDao, paramMap);
			HdacWallet fromWallet		= getWallet(from);

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("userNo", paramMap.get("to"));

			Map<String, Object> to		= getUserInfo(memberDao, param);
			HdacWallet toWallet			= getWallet(to);

			long amount					= Long.parseLong(StringUtil.nvl(paramMap.get("amount"), "0"));
			String textdata				= StringUtil.nvl(paramMap.get("textdata"), "");

			HdacRpcHandlerDto dto = new HdacRpcHandlerDto();
			dto.setWebSocketSession(session);
			dto.setFromWallet(fromWallet);
			dto.setToWallet(toWallet);
			dto.setAmount(amount);
			dto.setHexData(textdata/*StringUtil.toHexString(textdata)*/);

			HdacCommand hdacCommand = HdacUtil.getHdacCommand(dto);
			if (hdacCommand != null)
			{
				List<String> addr_list = fromWallet.getHdacWalletAddresses();
				JSONArray addrs = new JSONArray();

				for (String addr : addr_list)
					addrs.put(addr);

				hdacCommand.listunspent(HdacUtil._BLOCK_MIN_NUM_, HdacUtil._BLOCK_MAX_NUM_, addrs);
			}
			resultMap.put("success", true);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
		}
		finally
		{
			sqlSession.close();
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> getAddressBalances(WebSocketSession session, Map<String, Object> paramMap)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", false);

		SqlSession sqlSession = SqlMapConfig.getSqlSession();

		try
		{
			MemberDao memberDao = (MemberDao)BeanUtil.getBean(MemberDaoImpl.class);
			memberDao.setSqlSession(sqlSession);

			Map<String, Object> from	= getUserInfo(memberDao, paramMap);
			HdacWallet fromWallet		= getWallet(from);

			HdacRpcHandlerDto dto = new HdacRpcHandlerDto();
			dto.setWebSocketSession(session);
			dto.setFromWallet(fromWallet);

			HdacCommand hdacCommand = HdacUtil.getHdacCommand(dto);
			if (hdacCommand != null)
			{
				hdacCommand.getaddressbalances(fromWallet.getHdacAddress(), HdacUtil._BLOCK_USER_MIN_NUM_, "true");
			}
			resultMap.put("success", true);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
		}
		finally
		{
			sqlSession.close();
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> getBlockChainInfo(WebSocketSession session, Map<String, Object> paramMap)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", false);

		try
		{
			HdacRpcHandlerDto dto = new HdacRpcHandlerDto();
			dto.setWebSocketSession(session);

			HdacCommand hdacCommand = HdacUtil.getHdacCommand(dto, false);
			if (hdacCommand != null)
			{
				hdacCommand.getblockchaininfo();
				resultMap.put("success", true);
			}
			else
			{
				resultMap.put("message", "hdac command is not initialized");
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> listBlocks(WebSocketSession session, Map<String, Object> paramMap)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", false);

		try
		{
			HdacRpcHandlerDto dto = new HdacRpcHandlerDto();
			dto.setWebSocketSession(session);

			HdacCommand hdacCommand = HdacUtil.getHdacCommand(dto, false);
			if (hdacCommand != null)
			{
				hdacCommand.listblocks("-10", "false");
				resultMap.put("success", true);
			}
			else
			{
				resultMap.put("message", "hdac command is not initialized");
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> getBlock(WebSocketSession session, Map<String, Object> paramMap)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", false);

		try
		{
			HdacRpcHandlerDto dto = new HdacRpcHandlerDto();
			dto.setWebSocketSession(session);

			HdacCommand hdacCommand = HdacUtil.getHdacCommand(dto, false);
			if (hdacCommand != null)
			{
				hdacCommand.getblock(StringUtil.nvl(paramMap.get("hash")), "true");
				resultMap.put("success", true);
			}
			else
			{
				resultMap.put("message", "hdac command is not initialized");
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> getTxOut(WebSocketSession session, Map<String, Object> paramMap)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", false);

		try
		{
			HdacRpcHandlerDto dto = new HdacRpcHandlerDto();
			dto.setWebSocketSession(session);

			HdacCommand hdacCommand = HdacUtil.getHdacCommand(dto, false);
			if (hdacCommand != null)
			{
				hdacCommand.gettxout(StringUtil.nvl(paramMap.get("tx")), "0", "false");
				resultMap.put("success", true);
			}
			else
			{
				resultMap.put("message", "hdac command is not initialized");
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> getAddressTransaction(WebSocketSession session, Map<String, Object> paramMap)
	{
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("success", false);

		SqlSession sqlSession = SqlMapConfig.getSqlSession();

		try
		{
			MemberDao memberDao = (MemberDao)BeanUtil.getBean(MemberDaoImpl.class);
			memberDao.setSqlSession(sqlSession);

			Map<String, Object> from	= getUserInfo(memberDao, paramMap);
			HdacWallet fromWallet		= getWallet(from);

			String txid					= StringUtil.nvl(paramMap.get("txid"), "");

			HdacRpcHandlerDto dto = new HdacRpcHandlerDto();
			dto.setWebSocketSession(session);
			dto.setFromWallet(fromWallet);

			HdacCommand hdacCommand = HdacUtil.getHdacCommand(dto);
			if (hdacCommand != null)
			{
				hdacCommand.getaddresstransaction(fromWallet.getHdacAddress(), txid, "false");
			}
			resultMap.put("success", true);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
		}
		finally
		{
			sqlSession.close();
		}
		return resultMap;
	}

	private Map<String, Object> getUserInfo(MemberDao memberDao, Map<String, Object> paramMap) throws Exception
	{
		Map<String, Object> user = memberDao.getMember(paramMap);
		if (user == null)
		{
			throw new Exception("invalid user");
		}
		List<String> seedWords = memberDao.getSeed(paramMap);
		if (seedWords == null)
		{
			throw new Exception("invalid seed words");
		}

		user.put("seed", seedWords);
		return user;
	}

	@SuppressWarnings("unchecked")
	private HdacWallet getWallet(Map<String, Object> user)
	{
		String userId		= StringUtil.nvl(user.get("user_id"));
		List<String> seed	= HdacUtil.decodeSeed((List<String>)user.get("seed"), userId);
		HdacWallet wallet	= HdacUtil.getHdacWallet(seed, HashUtil.SHA256(userId));

		return wallet;
	}
}