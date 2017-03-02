define([], function(){
    "use strict";

    var service = function(){
        
    };

    var module = angular.module("module1");
    module.lazyService("module1.page2.service", service);
})