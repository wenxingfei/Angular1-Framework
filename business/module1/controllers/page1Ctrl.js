define([], function(){
    "use strict";

    var ctrl = ["$scope", "module1.page1.service", function($scope, page1Service){
        $scope.name = "Page1"
    }];

    var module = angular.module('module1');
    module.lazyController("module1.page1.ctrl", ctrl);
})