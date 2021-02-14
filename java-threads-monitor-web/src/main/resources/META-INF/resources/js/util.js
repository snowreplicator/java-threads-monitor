AUI.add(
    'java-threads-monitor-web-util',
    function (A) {
        console.log('111 util');

        var Util = {

            JAVA_THREADS_MONITOR_PORTLET: 'ru_snowreplicator_java_threads_monitor_portlet_JavaThreadsMonitorPortlet',

            // переводы пагинатора
            getPaginatorLanguages: function () {
                console.log('util - getPaginatorLanguages!!!');
                var languages =
                    {
                        'ru': {
                            'pagination': {
                                'page_size': Liferay.Language.get('page_size_pagination'),
                                'first': Liferay.Language.get('first_pagination'),
                                'first_title': Liferay.Language.get('first_title_pagination'),
                                'last': Liferay.Language.get('last_pagination'),
                                'last_title': Liferay.Language.get('last_title_pagination'),
                                'prev': Liferay.Language.get('prev_pagination'),
                                'prev_title': Liferay.Language.get('prev_title_pagination'),
                                'next': Liferay.Language.get('next_pagination'),
                                'next_title': Liferay.Language.get('next_title_pagination')
                            }
                        }
                    };
                return languages;
            }

        };

        console.log('2222 util');
        Liferay.SnowReplicator.ThreadsMonitor.Util = Util;
    },
    '',
    {
        requires: ['aui-base']
    }
);