package ru.snowreplicator.java_threads_monitor.portlet;

import javax.portlet.Portlet;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import org.osgi.service.component.annotations.Component;

import ru.snowreplicator.java_threads_monitor.api.constants.JavaThreadsMonitorKeys;

@Component(
        immediate = true,
        property = {
                "com.liferay.portlet.display-category=category.snowreplicator",
                "com.liferay.portlet.css-class-wrapper=snowreplicator-portlet",
                "com.liferay.portlet.header-portlet-css=/css/main.css?ver_2021_02_14___1",
                "com.liferay.portlet.instanceable=false",
                "com.liferay.portlet.add-default-resource=true",
                "javax.portlet.display-name=Java Threads Monitor Portlet",
                "javax.portlet.init-param.template-path=/",
                "javax.portlet.init-param.view-template=/jsp/view.jsp",
                "javax.portlet.name=" + JavaThreadsMonitorKeys.JAVA_THREADS_MONITOR_PORTLET,
                "javax.portlet.default-namespace=" + JavaThreadsMonitorKeys.JAVA_THREADS_MONITOR_NAMESPACE,
                "javax.portlet.resource-bundle=content.Language",
                "javax.portlet.security-role-ref=power-user,user"
        },
        service = Portlet.class
)
public class JavaThreadsMonitorPortlet extends MVCPortlet {
    private static Log _log = LogFactoryUtil.getLog(JavaThreadsMonitorPortlet.class);

}