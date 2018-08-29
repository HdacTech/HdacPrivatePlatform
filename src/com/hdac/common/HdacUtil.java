package com.hdac.common;

import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.ibatis.io.Resources;
import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.hdac.dto.HdacRpcHandlerDto;
import com.hdac.handler.HdacRpcHandler;
import com.hdacSdk.hdacCoreApi.HdacApiManager;
import com.hdacSdk.hdacCoreApi.HdacCommand;
import com.hdacSdk.hdacCoreApi.HdacRpcClient;
import com.hdacSdk.hdacCoreApi.RpcHandler;
import com.hdacSdk.hdacWallet.HdacCoreAddrParams;
import com.hdacSdk.hdacWallet.HdacWallet;
import com.hdacSdk.hdacWallet.HdacWalletManager;
import com.hdacSdk.hdacWallet.HdacWalletUtils;
import com.hdacSdk.hdacWallet.HdacWalletUtils.NnmberOfWords;

public class HdacUtil
{
	public static final String _BLOCK_MIN_NUM_		= "0";
	public static final String _BLOCK_MAX_NUM_		= "9999999";
	public static final String _BLOCK_USER_MIN_NUM_	= "1";

	private static String rpcIp;
	private static String rpcPort;
	private static String rpcUser;
	private static String rpcPassword;
	private static String chainName;

	static
	{
		String resource = "config/hdac-rpc.properties";
        Properties properties = new Properties();

		try
		{
			Reader reader = Resources.getResourceAsReader(resource);
			properties.load(reader);

			rpcIp		= properties.getProperty("rpcIp");
			rpcPort		= properties.getProperty("rpcPort");
			rpcUser		= properties.getProperty("rpcUser");
			rpcPassword	= properties.getProperty("rpcPassword");
			chainName	= properties.getProperty("chainName");
			
			reader.close();
		}
		catch (Exception e)
		{
			System.out.println("hdac rpc 오류 : " + e);
		}
	}

	public static List<String> getSeedWord(String passPhrase)
	{
		HdacWalletUtils.NnmberOfWords[] num =
		{
			NnmberOfWords.MNEMONIC_12_WORDS,
			NnmberOfWords.MNEMONIC_15_WORDS,
			NnmberOfWords.MNEMONIC_18_WORDS,
			NnmberOfWords.MNEMONIC_21_WORDS,
			NnmberOfWords.MNEMONIC_24_WORDS,
		};
		int rand = (int)(Math.random() * 5);
		List<String> seedWords = HdacWalletUtils.getRandomSeedWords(num[rand]);

   		HdacWallet hdacWallet = getHdacWallet(seedWords, passPhrase);

   		if (hdacWallet.isValidWallet())
   			return seedWords;

   		return null;
	}

	public static HdacWallet getHdacWallet(List<String> seedWords, String passPhrase)
	{
		HdacCoreAddrParams params = new HdacCoreAddrParams(false);	// hdac network parameter (true : public network / false : private network)
		return HdacWalletManager.generateNewWallet(seedWords, passPhrase, params);
	}

	public static List<String> encodeSeed(List<String> seed, String key)
	{
		List<String> encSeed = new ArrayList<String>();
		for (String word : seed)
		{
			encSeed.add(CipherUtil.AesEncode(word, key));
		}
		return encSeed;
	}

	public static List<String> decodeSeed(List<String> seed, String key)
	{
		List<String> decSeed = new ArrayList<String>();
		for (String word : seed)
		{
			decSeed.add(CipherUtil.AesDecode(word, key));
		}
		return decSeed;
	}

	public static HdacCommand getHdacCommand(HdacRpcHandlerDto dto) throws Exception
	{
		return getHdacCommand(dto, true);
	}
	public static HdacCommand getHdacCommand(HdacRpcHandlerDto dto, boolean checkWallet) throws Exception
	{
		if (checkWallet && (dto.getFromWallet() == null))
			return null;

		// 새로운 rpc client 생성
		HdacRpcClient rpc_client = createHdacRpcClient(null);

		HdacCommand hdacCommand = new HdacCommand(rpc_client);
		HdacRpcHandler rpcHandler = new HdacRpcHandler();

		dto.setHdacCommand(hdacCommand);
		rpcHandler.setHdacRpcHandlerDto(dto);

		// handler 정의 및 적용
		hdacCommand.setRpcHandler(rpcHandler);

		return hdacCommand;
	}

	public static void sendMessage(WebSocketSession session, int method, boolean success, String message)
	{
		String resultStr = "";
		try
		{
			JSONObject jsonStr = new JSONObject();
			jsonStr.put("message",  message);
			jsonStr.put("success", success);
			jsonStr.put("method", method);

			resultStr = jsonStr.toString();
		}
		catch (Exception e)
		{
			e.printStackTrace();
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("success", success);
			result.put("message", message);
			result.put("method", method);

			resultStr = JsonUtil.toJsonString(result).toString();
		}

		System.out.println(resultStr);

		try
		{
			session.sendMessage(new TextMessage(resultStr));
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}

	public static void sendMessage(WebSocketSession session, int method, boolean success, JSONObject jsonStr)
	{
		if (jsonStr != null)
		{
			try
			{
				jsonStr.put("success", success);
				jsonStr.put("method", method);

				session.sendMessage(new TextMessage(jsonStr.toString()));
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
		}
	}

	private static HdacRpcClient createHdacRpcClient(RpcHandler handler) throws Exception
	{
   		HdacApiManager hdacMCMgr = new HdacApiManager();
   		HdacRpcClient hdacRpcClient = hdacMCMgr.newRPCClient(rpcIp, rpcPort, rpcUser, rpcPassword, chainName, handler);

    	return hdacRpcClient;
    }
}