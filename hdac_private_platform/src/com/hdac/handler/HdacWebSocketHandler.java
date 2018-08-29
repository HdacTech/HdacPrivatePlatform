package com.hdac.handler;

import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.hdac.auth.Auth;
import com.hdac.auth.AuthService;
import com.hdac.common.BeanUtil;
import com.hdac.common.JsonUtil;
import com.hdac.common.StringUtil;
import com.hdac.service.hdac.HdacService;
import com.hdac.service.hdac.HdacServiceImpl;
import com.hdacSdk.hdacCoreApi.CommandUtils;

public class HdacWebSocketHandler extends TextWebSocketHandler
{
	public HdacWebSocketHandler()
	{
		super();
	}
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception
	{
		super.afterConnectionEstablished(session);
		System.out.println("connect!!");
	}
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
	{
		super.handleTextMessage(session, message);
		handle(session, message);
	}
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception
	{
		super.afterConnectionClosed(session, status);
		System.out.println("close!!");
	}

	private void handle(WebSocketSession session, TextMessage message) throws Exception
	{
		try
		{
			Map<String, Object> paramMap = JsonUtil.fromJsonString(message.getPayload());
			int method = Integer.parseInt(StringUtil.nvl(paramMap.get("method"), "0"));

			Auth auth = AuthService.getAuth();
			long userNo = auth.getAuth(session);
			if (userNo > -1)
				paramMap.put("userNo",	userNo);

			HdacService service = (HdacService)BeanUtil.getBean(HdacServiceImpl.class);
			Map<String, Object> resultMap = null;

			switch (method)
			{
				case CommandUtils.LIST_UNSPENT :
					resultMap = service.listUnspent(session, paramMap);
					break;

				case CommandUtils.GET_ADDRESS_BALANCES :
					resultMap = service.getAddressBalances(session, paramMap);
					break;

				case CommandUtils.GET_BLOCKCHAIN_INFO :
					resultMap = service.getBlockChainInfo(session, paramMap);
					break;

				case CommandUtils.LIST_BLOCKS :
					resultMap = service.listBlocks(session, paramMap);
					break;

				case CommandUtils.GET_BLOCK :
					resultMap = service.getBlock(session, paramMap);
					break;

				case CommandUtils.GET_TXOUT :
					resultMap = service.getTxOut(session, paramMap);
					break;

				case CommandUtils.GET_ADDRESS_TRANSACTION :
					resultMap = service.getAddressTransaction(session, paramMap);
					break;
			}

			String success = StringUtil.nvl(resultMap.get("success"));
			if ("false".equals(success))
			{
				session.sendMessage(new TextMessage(JsonUtil.toJsonString(resultMap).toString()));
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			session.sendMessage(new TextMessage("invalid protocol"));
		}
	}
}