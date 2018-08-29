package com.hdac.common;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class CipherUtil
{
	public static String AesEncode(String str, String key)
	{
		try
		{
			byte[] ip = getIp(key);
			SecretKeySpec keySpec = getSecretKeySpec();

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(ip));

			byte[] encrypted = cipher.doFinal(str.getBytes("UTF-8"));
			return toHexString(encrypted);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}
 
	public static String AesDecode(String str, String key)
	{
		try
		{
			byte[] ip = getIp(key);
			SecretKeySpec keySpec = getSecretKeySpec();

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(ip));
 
			byte[] byteStr = toByteArray(str);
			return new String(cipher.doFinal(byteStr), "UTF-8");
 		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}

	private static byte[] getIp(String key)
	{
		while (key.length() < 16)
			key += "|" + key;
			
		return key.substring(0, 16).getBytes();
	}
	private static SecretKeySpec getSecretKeySpec()
	{
		byte[] keyBytes = new byte[16];
		return new SecretKeySpec(keyBytes, "AES");
	}
	private static String toHexString(byte[] bytes)
	{
		StringBuilder sb = new StringBuilder(); 
		for (byte b : bytes)
		{
			sb.append(String.format("%02X", b & 0xff)); 
		}

		return sb.toString();
	}
	private static byte[] toByteArray(String str)
	{
		byte[] bytes = new byte[str.length() / 2];
		for (int i = 0; i < bytes.length; i++)
		{
			bytes[i] = (byte)Integer.parseInt(str.substring(i * 2, i * 2 + 2), 16);
		}
		return bytes;
	}
}