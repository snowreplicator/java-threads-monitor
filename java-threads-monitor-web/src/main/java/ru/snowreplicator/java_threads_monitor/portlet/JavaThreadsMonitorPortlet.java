package ru.snowreplicator.java_threads_monitor.portlet;

import javax.portlet.Portlet;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Modified;

import ru.snowreplicator.java_threads_monitor.api.constants.JavaThreadsMonitorKeys;
import ru.snowreplicator.java_threads_monitor.api.util.ThreadUtil;

@Component(
        immediate = true,
        property = {
                "com.liferay.portlet.display-category=category.snowreplicator",
                "com.liferay.portlet.css-class-wrapper=snowreplicator-portlet",
                "com.liferay.portlet.header-portlet-css=/css/main.css?v=2021_02_14___2",
                "com.liferay.portlet.instanceable=false",
                "com.liferay.portlet.add-default-resource=true",
                "javax.portlet.display-name=Java Threads Monitor Portlet",
                "javax.portlet.init-param.template-path=/",
                "javax.portlet.init-param.view-template=/jsp/view.jsp",
                "javax.portlet.name=" + JavaThreadsMonitorKeys.JAVA_THREADS_MONITOR_PORTLET,
                "javax.portlet.resource-bundle=content.Language",
                "javax.portlet.security-role-ref=power-user,user"
        },
        service = Portlet.class
)
public class JavaThreadsMonitorPortlet extends MVCPortlet {
    private static Log _log = LogFactoryUtil.getLog(JavaThreadsMonitorPortlet.class);

    @Activate
    @Modified
    protected void activate() {
        _log.info("JavaThreadsMonitorPortlet module - activating");
        //ThreadUtil.runMonitorProcess();
        _log.info("JavaThreadsMonitorPortlet module - activated");
    }

    @Deactivate
    @Modified
    protected void deactivate() {
        _log.info("JavaThreadsMonitorPortlet module - deactivating");
        //ThreadUtil.stopMonitorProcess();
        _log.info("JavaThreadsMonitorPortlet module - deactivated");
    }

}