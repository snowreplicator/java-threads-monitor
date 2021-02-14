AUI.add(
    'java-threads-monitor-web-main',
    function (A) {
        console.log('main js');
        var Lang = A.Lang;

        var isBoolean = Lang.isBoolean;
        var isFunction = Lang.isFunction;
        var isNumber = Lang.isNumber;

        var STR_BLANK = '';

        var toInt = function (value) {
            return Lang.toInt(value, 10, 0);
        };

        var Util = Liferay.SnowReplicator.ThreadsMonitor.Util;
        console.log('main js 2');
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
                        console.log('main js 3');
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

                        console.log('util = ' + Util);
                        console.log('util.lang = ' + JSON.stringify(Util.getPaginatorLanguages()));
                        instance.createAndFillThreadsTabulator(new Object());
                    },

                    // создать табулятор и заполнить его данными
                    createAndFillThreadsTabulator: function (threadsParam) {
                        var instance = this;
                        var namespace = instance.get('namespace');

                        var columns = [
                            {title: 'stolbec 1',  field: 'vid',           width: 300 },
                            {title: 'stolbec 2',  field: 'regNum',        width: 110 },
                            {title: 'stolbec 3',  field: 'regDate',       width: 110 },
                        ];

                        var langs = Util.getPaginatorLanguages();
                        console.log('langs = ' + JSON.stringify(langs));

                        var tableData = new Object();
                        //var tabulatorPlace = namespace + 'tabulatorPlace';
                        var tabulatorPlace = '_ru_snowreplicator_java_threads_monitor_portlet_JavaThreadsMonitorPortlet_tabulatorPlace';

                        var configuration = {
                            tableData:    tableData || [],
                            columns:      columns,
                            //groupBy:      'category',
                            langs:        langs,
                            //locale:       '<%= LanguageUtil.get(request, "local-pagination") %>',
                            pagePlace:    tabulatorPlace,
                            //selectable:   true,
                            selectable:   false,
                            rowFormatter: function(row){
                                var data = row.getData();
                            },
                            rowClick:     function (e, row) {
                                var data = row.getData();
                                console.log('row click');
                            }
                        };

                        Liferay.Loader.require('tabulator', function(tabulator) {
                            instance.drawTabulator(configuration);
                        });
                    },

                    // нарисовать табулятор
                    drawTabulator: function (configuration) {
                        var instance = this;

                        Liferay.SnowReplicator.ThreadsMonitor.Web.Tabulator(function (tabulator) {
                            table = new tabulator('#' + configuration.pagePlace, {
                                data:       configuration.tableData,
                                //groupBy:    configuration.groupBy,
                                layout:     'fitColumns',
                                selectable: configuration.selectable,
                                addRowPos:  'top',
                                pagination: 'local',
                                tooltips:   true,
                                paginationSize: 10,
                                paginationSizeSelector: [ 5, 10, 25, 50, 75 ],
                                locale:     true,
                                resizableColumns: true,
                                columnHeaderVertAlign: configuration.columnHeaderVertAlign,
                                dataSorting: function() {
                                    xPosition = window.scrollX;
                                    yPosition = window.scrollY;
                                },
                                renderComplete: function() {
                                    window.scrollTo(xPosition, yPosition);
                                    if (configuration.renderComplete) {
                                        configuration.renderComplete.apply(this);
                                    }
                                },
                                columns:  configuration.columns,
                                langs:    configuration.langs,
                                rowClick: configuration.rowClick,
                                //rowDblClick: configuration.rowClick,
                                keybindings: false
                            });
                            table.setLocale(configuration.locale);
                            //instance.assignments = table;
                        });

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

        console.log('main js 4');
        Liferay.SnowReplicator.ThreadsMonitor.Web.MainJS = MainJS;
    },
    '',
    {
        requires: ['aui-base', 'aui-component', 'aui-io-request', 'liferay-alert', 'liferay-portlet-url', 'java-threads-monitor-web-util']
    }
);