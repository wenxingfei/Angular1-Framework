define(["lazyLoad", "../common/baseModule"], function(lazyLoad, baseModule){
    "use strict";
     
    var configArr = [{
        name: "module1",
        // url: "/module1",
        template: "<div ui-view></div>",
        ncyBreadcrumb: {
            label: "模块一"
        }
    }, {
        name: "module1.page1",
        // url: "/page1",
        templateUrl: "business/module1/views/page1.html",
        scripts: {
            controllers: ["business/module1/controllers/page1Ctrl"],
            services: ["business/module1/services/page1Service"]
        },
        ncyBreadcrumb: {
            label: "页面一",
            parent: "module1"
        }
    }, {
        name: "module1.page2",
        // url: "/page2",
        templateUrl: "business/module1/views/page2.html",
        scripts: {
            controllers: ["business/module1/controllers/page2Ctrl"],
            services: ["business/module1/services/page2Service"]
        },
        ncyBreadcrumb: {
            label: "页面二",
            parent: "module1.page1"
        }
    }];

    var module = angular.module("module1", [baseModule.name]);
    lazyLoad.makeLazy(module).setRouterConfig(configArr);
    return module;
});