define(["lazyLoad", "../common/baseModule"], function(lazyLoad, baseModule){
    "use strict";
     
    var configArr = [{
        name: "module1",
        template: "<div ui-view></div>"
    }, {
        name: "module1.page1",
        url: "/module1/page1",
        templateUrl: "business/module1/views/page1.html",
        scripts: {
            controllers: ["business/module1/controllers/page1Ctrl"],
            services: ["business/module1/services/page1Service"]
        }
    }, {
        name: "module1.page2",
        url: "/module1/page2",
        templateUrl: "business/module1/views/page2.html",
        scripts: {
            controllers: ["business/module1/controllers/page2Ctrl"],
            services: ["business/module1/services/page2Service"]
        }
    }];

    var module = angular.module("module1", [baseModule.name]);
    lazyLoad.makeLazy(module).setRouterConfig(configArr);
    return module;
});