"use strict";

require.config({
    // baseUrl: "./",
    paths: {
        "text": "framework/libs/require-text",
        "json": "framework/libs/require-json",
        "ui-router": "framework/libs/angular-ui-router",
        "ocLazyLoad": "framework/libs/ocLazyLoad",
        "lazyLoad": "framework/lazyLoad"
    }
});

require(["framework/app"], function(app){
    angular.bootstrap(document.getElementsByTagName('html'), [app.name]);
});