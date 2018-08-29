package com.hdac.common;

public class StringUtil
{
	public static String nvl(Object obj)
	{
		return nvl(obj, "");
	}

	public static String nvl(Object obj, String defaultStr)
	{
		if (obj == null)
			return defaultStr;

		return obj.toString();
	}

	public static String toSmallLetter(String str, int beginIndex)
	{
		if (str == null)
			return str;

		return toSmallLetter(str, beginIndex, str.length());
	}

	public static String toSmallLetter(String str, int beginIndex, int endIndex)
	{
		if (str == null)
			return str;
		if (beginIndex < 0)
			return str;
		if (endIndex > str.length())
			return str;
		if (beginIndex > endIndex)
			return str;

		String small = str.substring(beginIndex, endIndex).toLowerCase();
		str = small.concat(str.substring(endIndex));

		return str;
	}

	public static String toHexString(String str)
	{
		if (str == null)
			return str;

		StringBuilder sb = new StringBuilder();
		int size = str.length();
		for (int i = 0; i < size; i++)
		{
			char ch = str.charAt(i);
			sb.append(String.format("%02X", (int)ch));
		}
		System.out.println("%%%%" + sb);
		return sb.toString();
	}
	
	public static String hexToString(String hexString) {
		String str = "";
				
		try {
			int len = hexString.length();
			byte[] data = new byte[len / 2];
			for (int i = 0; i < len; i += 2) {
				data[i / 2] = (byte) ((Character.digit(hexString.charAt(i), 16) << 4)
						+ Character.digit(hexString.charAt(i+1), 16));
			}
			str = new String(data, "utf-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return str;
	}
}