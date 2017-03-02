"use strict";

require.config({
    // baseUrl: "./",
    paths: {
        "ui-router": "framework/libs/angular-ui-router",
        "ocLazyLoad": "framework/libs/ocLazyLoad",
        "lazyLoad": "framework/lazyLoad"
    }
});

require(["framework/app"], function(app){
    angular.bootstrap(document.getElementsByTagName('html'), [app.name]);
});