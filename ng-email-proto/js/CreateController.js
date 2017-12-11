angular.module('app')
    .controller('CreateController', ['$scope', 'MailUtility',
        function ($scope, MailUtility) {
            $scope.newEmail = {};

            $scope.sendEmail = function () {
                MailUtility.createMail($scope.newEmail)
                //-- make sure email was added:
                console.log(MailUtility.getMails());
            };

            $scope.deleteEmail = function (id) {

            };

        }]
    );
