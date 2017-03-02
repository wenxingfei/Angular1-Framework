define([], function(){
    "use strict";

    var ctrl = ["$scope", "module1.page2.service", function($scope, page2Service){
        $scope.name = "Page2"
    }];

    var module = angular.module('module1');
    module.lazyController("module1.page2.ctrl", ctrl);
})