define([], function(){
    "use strict";

    var module = angular.module("module1.base", []);
    module.service("module1.base.service", function(){
        // 此服务用于编写公共函数

        this.getBaseData = function(){
            return "Base Data";
        };
    });
    
    return module;
})