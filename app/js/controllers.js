'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('loginCtrl', ['$scope','$http',
    function($scope, $http) {

  }])
  .controller('funcCtrl', ['$scope', '$routeParams','$http',
    function($scope, $routeParams, $http) {
      $scope.name = $routeParams.name;
      $scope.password = $routeParams.password;

      $http.get('data/up.json').success(function(data) {
        $scope.res = data;
      });

  }])
  .controller('storageViewCtrl', ['$scope', '$routeParams','$http',
    function($scope, $routeParams, $http) {
      $scope.storageNum = [1,2,3,4];
      $scope.tabData =
        [
          {
            "row": 1,
            "col": 1,
            "number": "11",
            "num": 10,
            "state": 1
          }
        ];

      var tabData =
          [
            {
              "row": 1,
              "col": 2,
              "number": "12",
              "num": 10,
              "state": 0
            },
            {
              "row": 2,
              "col": 1,
              "number": "21",
              "num": 10,
              "state": 1
            },
            {
              "row": 2,
              "col": 2,
              "number": "22",
              "num": 10,
              "state": 0
            },
            {
              "row": 3,
              "col": 2,
              "number": "22",
              "num": 10,
              "state": 0
            },
            {
              "row": 1,
              "col": 1,
              "number": "11",
              "num": 10,
              "state": 1
            }

          ];


      function mySortRow(a,b){
        return a.row - b.row;
      }
      function mySortCol(a,b){
        return a.Col - b.Col;
      }
      tabData.sort(mySortRow);
      tabData.sort(mySortCol);
      tabData;
      var tabColLeft = [],tabColRight = [];
      var tabDataLR = [];
      tabData.forEach(
        function(data){
          var tmp = new Object();

          if(data.state == 0)
          {
            data.state = "success";
          }
          else
          {
            data.state = "danger";
          }

          if(data.col == 1)
          {
            tmp.left = data;
          }
          else
          {
            tmp.right = data;
          }
          tabDataLR.push(tmp);
        }
      );
      tabColLeft;
      tabColRight;
      tabDataLR;
      $scope.tabDataLR = tabDataLR;

      $scope.getStorageInfo = function(pileno) {
        $http.get('data/pilo' + pileno + '.json').success(function(data) {
        $scope.tabData = data;
      });
    }

  }])
  .controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);
