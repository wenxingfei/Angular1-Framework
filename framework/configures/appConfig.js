define(["lazyLoad"], function(lazyLoad){
    "use strict";

    var configArr = [{
        name: "module1FW",
        scripts: {
            modules: ["business/module1/configures/module1Config.js"]
        }
    }];

    var module = angular.module("appConfig", []);
    lazyLoad.makeLazy(module).setRouterConfig(configArr);
    return module;
});