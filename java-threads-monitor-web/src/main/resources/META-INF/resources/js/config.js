;(function () {
    console.log('pre 000');
    if (!Liferay.SnowReplicator) Liferay.SnowReplicator = new Object();
    if (!Liferay.SnowReplicator.ThreadsMonitor) Liferay.SnowReplicator.ThreadsMonitor = new Object();
    if (!Liferay.SnowReplicator.ThreadsMonitor.Web) Liferay.SnowReplicator.ThreadsMonitor.Web = new Object();
    if (!Liferay.SnowReplicator.ThreadsMonitor.Util) Liferay.SnowReplicator.ThreadsMonitor.Util = new Object();
    if (!Liferay.SnowReplicator.ThreadsMonitor.Web.Tabulator) Liferay.SnowReplicator.ThreadsMonitor.Web.Tabulator = new Object();
    console.log('pre 111');

    AUI().applyConfig({
        groups: {

            'java-threads-monitor-web': {
                base: MODULE_PATH + '/js/',
                combine: true,
                modules: {
                    /*
                    'tabulator-css': {
                        path: 'tabulator/css/tabulator.min.css?v=20210214_1',
                        requires: []
                    },*/

                    'java-threads-monitor-web-util': {
                        path: 'util.js' + '?v=' + new Date().getTime(),
                        requires: ['aui-base']
                    },

                    'java-threads-monitor-web-main': {
                        path: 'main.js' + '?v=' + new Date().getTime(),
                        requires: [
                            'aui-base',
                            'aui-component',
                            'aui-io-request',
                            'autocomplete-list',
                            'autocomplete-filters',
                            'datasource-io',
                            'liferay-alert',
                            'liferay-portlet-url',
                            'java-threads-monitor-web-util'
                        ]
                    }

                },
                root: MODULE_PATH + '/js/'
            }
        }
    });

        Liferay.Loader.addModule({
            dependencies: [],
            name: 'tabulator',
            path: MODULE_PATH + '/js/tabulator/js/tabulator.min.js?v=20210214_1'
        });

        Liferay.SnowReplicator.ThreadsMonitor.Web.Tabulator = function (callback) {
            AUI().use('tabulator-css', function () {
                Liferay.Loader.require('tabulator', callback);
            });
        }

})();