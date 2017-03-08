define([
    "lazyLoad"
], function(lazyLoad){
    "use strict";

    var app = angular.module("myApp", [lazyLoad.name]);
    app.constant("modulePaths", {
        "module1": "business/module1/configures/module1Config"
    });
    app.controller("appController", function($scope, $state, modulePaths){
        $scope.navs = {
            curItem: null,
            items: [],
            onItemClick: function(item){
                this.curItem = item;
                require([modulePaths[item.module]], function(module){                 
                    $state.go(item.state, {});
                });
            },
            init: function(){
                var self = this;
                require(["json!framework/jsons/menu.json"], function(menus){
                    $scope.$apply(function(){
                        self.items = menus;
                    });
                }); 
            }
        };

        $scope.navs.init();
    })

    return app;
});