define([], function(){
    "use strict";

    var service = function page1Service($q, baseService){
        // arguments.callee.prototype = baseService; // 报错
        // service.prototype = baseService; // 无效, 只有实例化前对构造函数的prototype赋值，生成实例的原型才是所赋的对象
        // page1Service.prototype = baseService; // 无效，page1Service===service
        this.__proto__ = baseService; // 目前发现唯一可实现原型继承的方式

        this.getData = function(){
            return "Page1 Data";
        };
    };
    service.$inject = ["$q", "module1.base.service"]

    // var injector = angular.injector(["module1.base"]);
    // injector.has("module1.base.service"); // true
    // var baseService = injector.get("module1"); // 报错
    // service.prototype = baseService;

    var module = angular.module("module1");
    module.lazyService("module1.page1.service", service);
})