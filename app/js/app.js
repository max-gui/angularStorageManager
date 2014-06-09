'use strict';


// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.router',
  'ui.sortable',
  'ui.tree',
  'infinite-scroll',
  'dataServices'
]).
config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          //$urlRouterProvider.when('/loginPage', {templateUrl: 'partials/loginPage.html', controller: 'loginCtrl'});
          //$urlRouterProvider.when('/funcPage/:name/:password', {templateUrl: 'partials/funcPage.html', controller: 'funcCtrl'});
          //$urlRouterProvider.when('/storageViewPage', {templateUrl: 'partials/storageViewPage.html', controller: 'storageViewCtrl'});
          //$urlRouterProvider.when('/storeViewPage/:storeno', {templateUrl: 'partials/storeViewPage.html', controller: 'storeViewCtrl'});
          //$urlRouterProvider.otherwise({redirectTo: '/loginPage'});

          // For any unmatched url, redirect to /state1
          $urlRouterProvider.otherwise("/loginPage");

          //
          // Now set up the states
          $stateProvider
          .state('login', {
            url: "/loginPage",
            templateUrl: "partials/loginPage.html",
            controller: 'loginCtrl'
          }).
          state('navTemplate', {
            url: "/navTemplate",
            templateUrl: "partials/navTemplate.html",
            controller: ''//'funcCtrl'
          }).
          state('navTemplate.func', {
            url: "/funcPage",
            templateUrl: "partials/funcPage.html",
            controller: 'funcCtrl'
          }).
          state('navTemplate.storageView', {
            url: "/storageViewPage",
            templateUrl: "partials/storageViewPage.html",
            controller: 'storageViewCtrl'
          }).
          state('navTemplate.storeView', {
            url: "/storeViewPage/:storeno",
            templateUrl: "partials/storeViewPage.html",
            controller: 'storeViewCtrl'
          });
        }]).
directive('popover', function() {
  return function(scope, elem) {
    elem.popover();
  }
});

