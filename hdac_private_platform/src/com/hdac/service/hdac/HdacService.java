package com.hdac.service.hdac;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
public interface HdacService
{
	public Map<String, Object> listUnspent(WebSocketSession session, Map<String, Object> paramMap);
	public Map<String, Object> getAddressBalances(WebSocketSession session, Map<String, Object> paramMap);
	public Map<String, Object> getBlockChainInfo(WebSocketSession session, Map<String, Object> paramMap);
	public Map<String, Object> listBlocks(WebSocketSession session, Map<String, Object> paramMap);
	public Map<String, Object> getBlock(WebSocketSession session, Map<String, Object> paramMap);
	public Map<String, Object> getTxOut(WebSocketSession session, Map<String, Object> paramMap);
	public Map<String, Object> getAddressTransaction(WebSocketSession session, Map<String, Object> paramMap);
}