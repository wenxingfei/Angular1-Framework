define([
    "ui-router",
    "ocLazyLoad"
], function(uiRouter, ocLazyLoad){
    "use strict";
    var providers = {}, services = {};

    var lazy = angular.module("lazy", ["ui.router", "oc.lazyLoad"]);
    lazy.config(function($provide, $compileProvider, $controllerProvider, $filterProvider, $animateProvider, $injector){
        providers = {
            $provide: $provide,
            $compileProvider: $compileProvider,
            $controllerProvider: $controllerProvider,
            $filterProvider: $filterProvider,
            $animateProvider: $animateProvider,
            $injector: $injector
        };
    }).config(function($stateProvider, $urlRouterProvider){
        providers.$stateProvider = $stateProvider;
        providers.$urlRouterProvider = $urlRouterProvider;
    }).run(function($ocLazyLoad, $q){
        services.$ocLazyLoad = $ocLazyLoad;
        services.$q = $q;
    });
    lazy.makeLazy = function(module){        
        module.lazyProvider = makeRegister(providers.$provide.provider);
        module.lazyService = makeRegister(providers.$provide.service);
        module.lazyFactory = makeRegister(providers.$provide.factory);
        module.lazyDecorator = makeRegister(providers.$provide.decorator);
        module.lazyValue = makeRegister(providers.$provide.value);
        module.lazyConstant = makeRegister(providers.$provide.constant);
        module.lazyDirective = makeRegister(providers.$compileProvider.directive);
        module.lazyController = makeRegister(providers.$controllerProvider.register);
        module.lazyFilter = makeRegister(providers.$filterProvider.register);
        module.lazyAnimate = makeRegister(providers.$animateProvider.register);
        module.setRouterConfig = function(routerConfig){
            if(!angular.isArray(routerConfig)) return;
            angular.forEach(routerConfig, function(item){
                var definition = parseToStateDefinition(item);
                providers.$stateProvider.state(definition); 
            });
        };
        services.$ocLazyLoad.inject(module.name); //启动module以此执行module定义的config和run函数块。
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
            promises.push(load(scripts["controllers"]));
            promises.push(load(scripts["services"]));
            promises.push(load(scripts["factories"]));
            promises.push(load(scripts["providers"]));
            promises.push(load(scripts["decorators"]));            
            promises.push(load(scripts["directives"]));
            promises.push(load(scripts["filters"]));
            promises.push(load(scripts["values"]));
            promises.push(load(scripts["constants"]));
            promises.push(load(scripts["animates"]));
            promises.push(load(scripts["js"]));
            promises.push(load(scripts["css"], "css"));
            return $q.all(promises);                
        }  
        return definition;              
    }

    function load(urls, type){
        var $q = services.$q;
        if(!urls || !urls.length) return $q.resolve();
        if(type === "css"){
            var urls = _.map(urls, function(url){
                return /^css!/.test(url) ? url : "css!" + url;
            });
        }
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