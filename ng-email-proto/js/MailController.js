angular.module('app')
    .controller('MailController', function ($scope, $location, $routeParams, MailUtility) {
        var emails = MailUtility.getMails();
        $scope.mailId1 = $routeParams.id;

        for (var i = 0; i < emails.length; i++) {
            var cv = emails[i];
            if(cv.id.toString() === $routeParams.id.toString()) {
                $scope.mailText = cv.text;
                $scope.mailSubject = cv.subject;
                $scope.mailTo = cv.to;
                break; // stop iterating over the loop
            }
        }

        if (!$routeParams.id) {
            $location.path('/');
        }
    });
