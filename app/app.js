﻿(function () {
    'use strict';
    
    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)
        'ngResource',       // for the ASP.NET Web API backend

        // Custom modules 
        'common',           // common functions, logger, spinner
        'common.bootstrap', // bootstrap dialog wrapper functions

        // 3rd Party Modules
        'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
    ]);
    
    // Handle routing errors and success events
    app.run(['$route', 'datacontext', 'jhaRouteMediator',
        function ($route, datacontext, jhaRouteMediator) {
            // Include $route to kick start the router.
            datacontext.prime();
            jhaRouteMediator.setRoutingHandlers();
        }]);        
})();