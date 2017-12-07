/**
 * Created by JHernandezAlvarado on 2/13/2017.
 */


(function () {
    'use strict';

    var app = angular.module('app'),
        serviceId = 'jAppSettings';

    app.constant(serviceId, {
        cloudPath: 'https://api.williamsact.org/',
            localPath: 'http://localhost:51624/'
        }
    )
})();

//