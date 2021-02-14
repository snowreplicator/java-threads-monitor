AUI.add(
    'java-threads-monitor-web-main',
    function (A) {

        var Lang = A.Lang;

        var isBoolean = Lang.isBoolean;
        var isFunction = Lang.isFunction;
        var isNumber = Lang.isNumber;

        var STR_BLANK = '';

        var toInt = function (value) {
            return Lang.toInt(value, 10, 0);
        };

        var Util = Liferay.SnowReplicator.ThreadsMonitor.Util;

        var MainJS = A.Component.create(
            {
                ATTRS: {

                    id: {
                        value: STR_BLANK
                    },

                    p_p_auth: {
                        value: STR_BLANK
                    },

                    namespace: {
                        value: STR_BLANK
                    },

                    portletId: {
                        value: STR_BLANK
                    },

                    groupId: {
                        setter: toInt,
                        validator: isNumber
                    },

                    threadsMonitorDataJsonString: {
                        value: STR_BLANK
                    }
                },

                NAME: 'mainJS',

                constructor: function (config) {
                    var id = config.id;
                    config.contentBox = config.contentBox || '#' + id;
                    MainJS.superclass.constructor.apply(this, arguments);
                },

                get: function (id) {
                    var instance = this;
                    var mainJS = null;
                    if (instance._cache[id]) {
                        mainJS = instance._cache[id];
                    } else {
                        console.error('main.js - get object mainJS not found (id: ' + id + ')');
                    }
                    return mainJS;
                },

                prototype: {
                    initializer: function () {
                        var instance = this;
                        instance.bindUI();
                        MainJS.register(instance);
                        instance.afterLoad();
                    },

                    bindUI: function () {
                        var instance = this;
                        var contentBox = instance.get('contentBox');
                        var namespace = instance.get('namespace');

                    },

                    // действия после загрузки
                    afterLoad: function () {
                        console.log('after load');
                        var instance = this;
                        var namespace = instance.get('namespace');

                        var threadsMonitorData = instance.parseThreadsMonitorDataFromJsonString(instance.get('threadsMonitorDataJsonString'));
                        if (!threadsMonitorData) return;

                        var height = '500px';
                        var tableData = threadsMonitorData.threadsData.length > 0 ? threadsMonitorData.threadsData : new Array();
                        var columns =  threadsMonitorData.columnsData.columns;

                        var threadsMonitorDataConfiguration = {
                            tabulatorPlace: namespace + 'tabulatorPlace',
                            height: height,
                            columns: columns,
                            tableData: tableData
                        };

                        instance.drawTabulator(threadsMonitorDataConfiguration);
                    },

                    // нарисовать табулятор
                    drawTabulator: function (threadsMonitorDataConfiguration) {
                        var instance = this;
                        console.log('drawTabulator - threadsMonitorDataConfiguration = ' + JSON.stringify(threadsMonitorDataConfiguration));

                        Liferay.SnowReplicator.ThreadsMonitor.Tabulator(function (Tabulator) {

                            var threadsMonitorDataTable = new Tabulator('#' + threadsMonitorDataConfiguration.tabulatorPlace, {
                                height: threadsMonitorDataConfiguration.height,
                                data: threadsMonitorDataConfiguration.tableData,
                                columns: threadsMonitorDataConfiguration.columns
                            });

                            instance.set('threadsMonitorDataTable', threadsMonitorDataTable);
                        });
                    },

                    // получить данные по потокам из сериализованной json строки
                    parseThreadsMonitorDataFromJsonString: function (threadsMonitorDataJsonString) {
                        try {
                            var threadsMonitorData = JSON.parse(threadsMonitorDataJsonString);
                            return threadsMonitorData;
                        }
                        catch (e) {
                            console.error('main.js - parseThreadsMonitorDataFromJsonString() - parse exception: ' + e.name + ' ' + e.message);
                            console.error('No threads data available');
                        }
                        return null;
                    },

                    // получить объект табулятора списка процессов
                    getThreadsTabulator: function () {
                        var instance = this;
                        var namespace = instance.get('namespace');
                        return Liferay.component('namespace' + 'threadsTabulator');
                    },

                    // Получить строку табулятора
                    getThreadsTabulatorRow: function (processId) {
                        var instance = this;
                        var tabulator = instance.getThreadsTabulator();
                        if (tabulator) {
                            var tabulator = table.getRows();
                            for (var i = 0; i < rows.length; i++) {
                                if (rows[i].getData().processId == processId) {
                                    return rows[i];
                                }
                            }
                        }
                        return null;
                    }
                },

                register: function (obj) {
                    var instance = this;
                    var id = obj.get('id');
                    instance._cache[id] = obj;
                    Liferay.fire(
                        'mainJS:registered',
                        {
                            mainJS: obj
                        }
                    );
                },

                _cache: {}
            }
        );

        Liferay.SnowReplicator.ThreadsMonitor.Web.MainJS = MainJS;
    },
    '',
    {
        requires: ['aui-base', 'aui-component', 'aui-io-request', 'liferay-alert', 'liferay-portlet-url', 'java-threads-monitor-web-util']
    }
);