package com.hdac.handler;

import org.bitcoinj.core.ECKey;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.hdac.common.HdacUtil;
import com.hdac.common.StringUtil;
import com.hdac.dto.HdacRpcHandlerDto;
import com.hdacSdk.hdacCoreApi.CommandUtils;
import com.hdacSdk.hdacCoreApi.RpcHandler;
import com.hdacSdk.hdacWallet.HdacTransaction;


public class HdacRpcHandler implements RpcHandler
{
	private HdacRpcHandlerDto dto;

	public void setHdacRpcHandlerDto(HdacRpcHandlerDto dto)
	{
		this.dto = dto;
	}

	@Override
	public void onError(int method, String errMsg, int ceeCode)
	{
		System.out.println("error : " + errMsg + "," + method + "," + ceeCode);
		if (errMsg != null)
		{
			switch (errMsg)
			{
				case "null" :
				case "" :
					break;

				default :
					HdacUtil.sendMessage(this.dto.getWebSocketSession(), method, false, errMsg);
					break;
			}
		}			
	}

	@Override
	public void onResponse(int method, JSONObject data)
	{
		try
		{
			switch (method)
			{
				case CommandUtils.LIST_UNSPENT :

					// raw transaction 생성
					String raw_tx = getRawTransaction(data);
					System.out.println("####" + raw_tx);
					// raw transaction 전송
					this.dto.getHdacCommand().sendrawtransaction(raw_tx);

					HdacUtil.sendMessage(this.dto.getWebSocketSession(), method, true, "raw transaction 전송 완료");
					break;

				case CommandUtils.GET_ADDRESS_BALANCES :
				case CommandUtils.GET_BLOCKCHAIN_INFO :
				case CommandUtils.LIST_BLOCKS :
				case CommandUtils.GET_BLOCK :
				case CommandUtils.GET_TXOUT :
					HdacUtil.sendMessage(this.dto.getWebSocketSession(), method, true, data);
					break;
				case CommandUtils.GET_ADDRESS_TRANSACTION :
					JSONObject resultData = data.getJSONObject("result");
					String hexString = resultData.get("data").toString().substring(2, resultData.get("data").toString().length()-2);
					String convString = StringUtil.hexToString(hexString);
					resultData.put("data", convString);
					data.put("result", resultData);
				default :
					HdacUtil.sendMessage(this.dto.getWebSocketSession(), method, true, data);
					break;
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			HdacUtil.sendMessage(this.dto.getWebSocketSession(), method, false, e.getMessage());
		}
	}

	private String getRawTransaction(JSONObject data) throws Exception
	{
		HdacTransaction transaction = new HdacTransaction(this.dto.getFromWallet());

		JSONArray utxos;
		// listunspent result로 부터 utxos 가져오기
		long balance = 0;
		try
		{
			utxos = data.getJSONArray("result");
			// utxos로 부터 balance 가져오기
			for (int i = 0; i < utxos.length(); i++)
			{
				JSONObject utxo = utxos.getJSONObject(i);
				balance += utxo.getLong("amount");
			}
		}
		catch (JSONException e)
		{
			e.printStackTrace();
			return null;
		}

		System.out.print("balance " + balance + "\n");

		//coin 전송이 가능한지 check
		long fee = (long)(0.1 * Math.pow(10, 8));	// 0.03
		balance = (long)(balance * Math.pow(10, 8));
		long send_amount = (long)(this.dto.getAmount() * Math.pow(10, 8));								
		long remain = balance - send_amount - fee;

		if (remain >= 0)
		{
			transaction.addOutput(this.dto.getToWallet().getHdacAddress(), send_amount);
			transaction.addOutput(this.dto.getFromWallet().getHdacAddress(), remain);
			transaction.addOpReturnOutput(this.dto.getHexData().getBytes("UTF-8"));
			try
			{
				for (int i = 0; i < utxos.length(); i++)
				{
					JSONObject utxo = utxos.getJSONObject(i);
					ECKey sign = this.dto.getFromWallet().getHdacSigKey(utxo.getString("address"));
					if (sign != null)
						transaction.addSignedInput(utxo, sign);
				}
			}
			catch (JSONException e)
			{
				e.printStackTrace();
			}
			String raw_tx = transaction.getTxBuilder().build().toHex();
			System.out.print("raw_tx " + raw_tx + "\n");
			return raw_tx;
		}
		throw new Exception("available balance is zero");
	}
}