package ru.snowreplicator.java_threads_monitor.api.constants;

import java.util.Locale;
import java.util.ResourceBundle;

import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.ResourceBundleLoader;
import com.liferay.portal.kernel.util.ResourceBundleLoaderUtil;

public class JavaThreadsMonitorKeys {

    public static final String JAVA_THREADS_MONITOR_PORTLET = "ru_snowreplicator_java_threads_monitor_portlet_JavaThreadsMonitorPortlet";
    public static final String JAVA_THREADS_MONITOR_NAMESPACE = "_" + JAVA_THREADS_MONITOR_PORTLET + "_";

    public static ResourceBundle getResourceBundle(Locale locale) {
        ResourceBundleLoader resourceBundleLoader = ResourceBundleLoaderUtil.getResourceBundleLoaderByServletContextName("java-threads-monitor-web");
        if (resourceBundleLoader == null) {
            resourceBundleLoader = ResourceBundleLoaderUtil.getPortalResourceBundleLoader();
        }
        return resourceBundleLoader.loadResourceBundle(locale.getLanguage());
    }

    public static String translate(Locale locale, String key) {
        return LanguageUtil.get(getResourceBundle(locale), key);
    }

    public static String translateRu(String key) {
        Locale locale = LocaleUtil.fromLanguageId("ru_RU");
        return LanguageUtil.get(getResourceBundle(locale), key);
    }

    public static String translate(Locale locale, String key, Object[] arguments) {
        return LanguageUtil.format(getResourceBundle(locale), key, arguments);
    }

}