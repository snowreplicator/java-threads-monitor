<%@include file="/jsp/init.jsp"%>
<%@page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>

    <div id="<portlet:namespace/>javaThreadsMonitorPortletWrapper">
        <div>
            Java Threads Monitor Portlet
        </div>


        <%-- табулятор --%>
        <liferay-util:include servletContext="<%= this.getServletContext() %>" page="/jsp/tabulator.jsp">
        </liferay-util:include>
    </div>

    <%@ include file="/jsp/js.jspf" %>
