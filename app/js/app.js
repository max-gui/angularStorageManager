'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/loginPage', {templateUrl: 'partials/loginPage.html', controller: 'loginCtrl'});
  $routeProvider.when('/funcPage/:name/:password', {templateUrl: 'partials/funcPage.html', controller: 'funcCtrl'});
  $routeProvider.when('/storageViewPage', {templateUrl: 'partials/storageViewPage.html', controller: 'storageViewCtrl'});
  $routeProvider.otherwise({redirectTo: '/loginPage'});
}]);
