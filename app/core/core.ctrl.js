/**
 * Created by JHernandezAlvarado on 2/9/2017.
 */

(function () {
    'use strict';

    var controllerId = "CoreCtrl",
        app = angular.module('app');

    app.controller(controllerId, ['common', 'datacontext', 'jUserAccount', 'jCurrentUser',
        CoreClass]);

    function CoreClass(common, datacontext, jUserAccount, jCurrentUser) {
        var vm = this;

        vm.coreCtrlMessage = 'This is the Core Class Ctrl';
        vm.loginError = '';
        vm.ccIsLoggedIn = function () {
            return jCurrentUser.getProfile().isLoggedin;
        };

        vm.userData = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.ccLoginFn = function () {
            vm.userData.grant_type = 'password';
            vm.userData.username = vm.userData.email;

            jUserAccount.login.loginUser(vm.userData, function (data) {
                console.log(data);
                vm.userData.password = '';
                vm.loginError = '';
                jCurrentUser.setProfile(vm.userData.username, data.access_token);
                vm.userData.get_username = function () {
                    return jCurrentUser.getProfile().username;
                }
            }, function (err) {
                vm.loginError = "There has been a login error: \n" + err;
            });
        };

        vm.ccLogoutFn = function () {
            console.log("jha - logout function invoked.");
            jUserAccount.logout.logoutUser(vm.userData, function () {
                console.log("jha - successfully logged out.");
            })
        };

        vm.ccRegisterFn = function () {

        };
    }
})();