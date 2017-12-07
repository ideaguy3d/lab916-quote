/**
 * Created by Julius Alvarado on 3/3/2017.
 */

(function(){
    "use strict";

    var app = angular.module('app'),
        controllerId = 'CoreCtrl';

    app.controller(controllerId, [CoreCtrlClass]);

    function CoreCtrlClass() {
        var vm = this;
        vm.ccIsLoggedIn = false;


        vm.ccLoginFn = function(){
            vm.ccIsLoggedIn = !vm.ccIsLoggedIn;
        }
    }
}());



//

