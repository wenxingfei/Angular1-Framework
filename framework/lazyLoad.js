define([
    "ui-router",
    "ocLazyLoad"
], function(uiRouter, ocLazyLoad){
    "use strict";
    var injector = angular.injector(["ng"]);
    var $q = injector.get("$q");
    var _$ocLazyLoad;

    var lazy = angular.module("lazy", ["ui.router", "oc.lazyLoad"]);    
    lazy.run(function($ocLazyLoad){
        _$ocLazyLoad = $ocLazyLoad;
    });   
    lazy.makeLazy = function(module){        
        module.config(function($provide, $compileProvider, $controllerProvider, $filterProvider, $animateProvider){
            module.lazyProvider = makeRegister($provide.provider);
            module.lazyService = makeRegister($provide.service);
            module.lazyFactory = makeRegister($provide.factory);
            module.lazyValue = makeRegister($provide.value);
            module.lazyConstant = makeRegister($provide.constant);
            module.lazyDirective = makeRegister($compileProvider.directive);
            module.lazyController = makeRegister($controllerProvider.register);
            module.lazyFilter = makeRegister($filterProvider.register);
            module.lazyAnimate = makeRegister($animateProvider.register);
        });
        module.setRouterConfig = function(routerConfig){
            if(!angular.isArray(routerConfig)) return;
            var deferred = $q.defer();
            // 定义requirejs模块加载完成的回调函数, 通过在模块路径末尾加上“!”的形式声明依赖时，会执行此函数
            // 目的是为了在执行$state.go的跳转前确保$stateProvider.state(definition)路由定义执行完毕
            module.load = function(name, req, onLoad, config){
                deferred.promise.then(function(){
                    onLoad(module);
                });
            };
            module.config(function($stateProvider, $urlRouterProvider){
                angular.forEach(routerConfig, function(item){
                    var definition = parseToStateDefinition(item);
                    $stateProvider.state(definition); 
                });
                deferred.resolve();
            });
        };
        _$ocLazyLoad.inject(module.name);
        return module;
    };

    function makeRegister(registionMethod){
        return function(name, constructor){
            registionMethod(name, constructor);
        };
    };

    function parseToStateDefinition(configItem){
        var definition = angular.copy(configItem);
        if(!definition["scripts"]) return definition;
        definition.resolve = definition.resolve  || {};
        definition.resolve.deps = function($q){
            var scripts = definition.scripts;
            var promises = [];
            // promises.push(load(scripts["modules"]));
            promises.push(load(scripts["controllers"]));
            promises.push(load(scripts["services"]));
            promises.push(load(scripts["factories"]));
            promises.push(load(scripts["providers"]));
            promises.push(load(scripts["directives"]));
            promises.push(load(scripts["filters"]));
            promises.push(load(scripts["values"]));
            promises.push(load(scripts["constants"]));
            promises.push(load(scripts["animates"]));
            promises.push(load(scripts["js"]));
            if(scripts["css"] && scripts["css"].length){
                var urls = _.map(scripts["css"], function(url){
                    return /^css!/.test(url) ? url : "css!" + url;
                });
                promises.push(load(urls));
            }
            return $q.all(promises);                
        }  
        return definition;              
    }

    function load(urls){
        if(!urls || !urls.length) return $q.resolve();
        var deferred = $q.defer();
        require(urls, function(){
            deferred.resolve();
        }, function(){
            deferred.reject();
        });
        return deferred.promise;
    }

    return lazy;
});