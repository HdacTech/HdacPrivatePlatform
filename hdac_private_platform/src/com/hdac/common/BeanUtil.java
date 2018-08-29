package com.hdac.common;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class BeanUtil
{
	public static Object getBean(Class<?> className)
	{
		return getBean(StringUtil.toSmallLetter(className.getSimpleName(), 0, 1), className);
	}
	public static Object getBean(String beanName, Class<?> className)
	{
		AnnotationConfigApplicationContext contxt = new AnnotationConfigApplicationContext(className);
		Object obj = contxt.getBean(beanName);
		contxt.close();

		return obj;
	}
}