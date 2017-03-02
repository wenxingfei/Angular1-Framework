define([
    "lazyLoad"
], function(lazyLoad){
    "use strict";

    var modulePath = {
        "module1": "business/module1/configures/module1Config"
    };

    var app = angular.module("myApp", [lazyLoad.name]);
    app.controller("appController", function($scope, $state, $timeout){
        $scope.navs = {
            curItem: null,
            items: [{
                name: "页面一",
                state: "module1.page1",
                module: "module1"
            }, {
                name: "页面二",
                state: "module1.page2",
                module: "module1"
            }],
            onItemClick: function(item){
                this.curItem = item;
                require([modulePath[item.module] + "!"], function(module){                 
                    $state.go(item.state, {});
                });
            }
        };
    })

    return app;
});