"use strict";

require.config({
    // baseUrl: "./",
    urlArgs: "ver=20170326",
    waitSeconds: 60,
    paths: {
        "text": "framework/libs/requirejs-text/text",
        "json": "framework/libs/requirejs-json/json",
        "ui-router": "framework/libs/angular-ui-router/release/angular-ui-router.min",
        "ocLazyLoad": "framework/libs/oclazyload/dist/ocLazyLoad.min",
        "breadcrumb": "framework/libs/angular-breadcrumb/dist/angular-breadcrumb",
        "lazyLoad": "framework/lazyLoad"
    }
});

require(["framework/app"], function(app){
    angular.bootstrap(document.getElementsByTagName('html'), [app.name]);
});