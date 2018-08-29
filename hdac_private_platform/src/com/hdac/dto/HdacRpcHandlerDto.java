package com.hdac.dto;

import org.springframework.web.socket.WebSocketSession;

import com.hdacSdk.hdacCoreApi.HdacCommand;
import com.hdacSdk.hdacWallet.HdacWallet;

public class HdacRpcHandlerDto
{
	private WebSocketSession webSocketSession;
	private HdacCommand hdacCommand;
	private HdacWallet fromWallet;
	private HdacWallet toWallet;
	private long amount;
	private String hexData;

	public WebSocketSession getWebSocketSession()
	{
		return webSocketSession;
	}
	public void setWebSocketSession(WebSocketSession webSocketSession)
	{
		this.webSocketSession = webSocketSession;
	}
	public HdacCommand getHdacCommand()
	{
		return hdacCommand;
	}
	public void setHdacCommand(HdacCommand hdacCommand)
	{
		this.hdacCommand = hdacCommand;
	}
	public HdacWallet getFromWallet()
	{
		return fromWallet;
	}
	public void setFromWallet(HdacWallet fromWallet)
	{
		this.fromWallet = fromWallet;
	}
	public HdacWallet getToWallet()
	{
		return toWallet;
	}
	public void setToWallet(HdacWallet toWallet)
	{
		this.toWallet = toWallet;
	}
	public long getAmount()
	{
		return amount;
	}
	public void setAmount(long amount)
	{
		this.amount = amount;
	}
	public String getHexData()
	{
		return hexData;
	}
	public void setHexData(String hexData)
	{
		this.hexData = hexData;
	}
}