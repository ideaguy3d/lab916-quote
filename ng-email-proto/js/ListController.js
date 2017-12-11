angular.module('app')
    .controller('ListController', function ($scope, $location, MailUtility) {
        $scope.mails = MailUtility.getMails();

        $scope.viewMail = function (mail) {
            $location.url("mail/"+mail.id);
            console.log(mail);
        };
    });
