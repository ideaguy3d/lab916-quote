angular.module('app', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partial/list.html',
                controller: 'ListController'
            })
            .when('/create', {
                templateUrl: 'partial/create.html',
                controller: 'CreateController'
            })
            .when('/mail/:id', {
                templateUrl: 'partial/mail.html',
                controller: 'MailController'
            })
            .otherwise('/');
    });
