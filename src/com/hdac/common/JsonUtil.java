package com.hdac.common;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONException;
import org.json.JSONObject;

public class JsonUtil
{
	public static JSONObject toJsonString(Map<String, Object> map)
    {
		JSONObject jsonObject = new JSONObject();
		try
		{
			for (Map.Entry<String, Object> entry : map.entrySet())
			{
				String key = entry.getKey();
				Object value = entry.getValue();

				jsonObject.put(key, value);
			}
		}
		catch (JSONException e)
		{
			e.printStackTrace();
		}
        return jsonObject;
    }

	public static Map<String, Object> fromJsonString(String str)
	{
		Map<String, Object> map = new HashMap<String, Object>();               
		if ((str != null) && (str.length() > 2))
		{
			String value = str.substring(1, str.length() - 1);
			String[] split = value.split(",");

			for(String pair : split)
			{
				String[] entry = pair.split(":");
				String key = removeQuot(entry[0]);
				String val = removeQuot(entry[1]);

				map.put(key, val);
			}
		}
		return map;
	}

	private static String removeQuot(String str)
	{
		Pattern p = Pattern.compile("^\"(.+)\"$");
		Matcher m = p.matcher(str);

		if (m.find())
			return m.group(1);

		return str;
	}
}