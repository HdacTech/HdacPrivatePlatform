package com.hdac.common;

import java.security.MessageDigest;

public class HashUtil
{
	public static String SHA256(String str)
	{
		try
		{
			MessageDigest sh = MessageDigest.getInstance("SHA-256"); 
			sh.update(str.getBytes()); 

			byte byteData[] = sh.digest();

			StringBuilder sb = new StringBuilder(); 
			for (byte b : byteData)
			{
				sb.append(String.format("%02X", b & 0xff)); 
			}
			return sb.toString();
		}
		catch (Exception e)
		{
		}
		return null;
	}
}