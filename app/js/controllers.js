'use strict';

/* Controllers */


angular.module('myApp.controllers', []).directive('popover', function() {
  return function(scope, elem) {
    elem.popover();
  }
})
.controller('loginCtrl', ['$scope','$http',
                          function($scope, $http) {

                          }])
.controller('funcCtrl', ['$scope', '$rootScope', '$state', '$http',
                         function($scope, $rootScope, $state, $http) {
                           $rootScope.name = $state.params.name;
                           $rootScope.password = $state.params.password;

                           //$http.defaults.useXDomain = true;
                           //$http.defaults.headers.ContentType = "text/plain, charset=utf-8";

                           $http.get('http://192.168.58.122/SYCService/Login(' +
                                     $state.params.name + ',' +
                                     $state.params.password + ')'
                                    ).
                           success(function(data) {
                             if(data.user_name == undefined){
                               $state.go("login");
                             }
                           });

                         }])
.controller('storageViewCtrl', ['$scope', '$stateParams','$http',
                                function($scope, $stateParams, $http) {
                                  $scope.storageNum = [1,2,3,4];
                                  /*
                                  $scope.tabData =
                                    [
                                    {
                                      "row": 1,
                                      "col": 1,
                                      "number": "1",
                                      "num": 10,
                                      "state": 1
                                    }
                                  ];

                                  var tabData =
                                      [
                                        {
                                          "row": 1,
                                          "col": 2,
                                          "number": "1",
                                          "num": 10,
                                          "state": 0
                                        },
                                        {
                                          "row": 2,
                                          "col": 1,
                                          "number": "1",
                                          "num": 10,
                                          "state": 1
                                        },
                                        {
                                          "row": 2,
                                          "col": 2,
                                          "number": "1",
                                          "num": 10,
                                          "state": 0
                                        },
                                        {
                                          "row": 3,
                                          "col": 2,
                                          "number": "1",
                                          "num": 10,
                                          "state": 0
                                        },
                                        {
                                          "row": 1,
                                          "col": 1,
                                          "number": "1",
                                          "num": 10,
                                          "state": 1
                                        }

                                      ];

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
                                        tabColLeft.push(data);
                                      }
                                      else
                                      {
                                        tmp.right = data;
                                        tabColRight.push(data);
                                      }
                                      tabDataLR.push(tmp);
                                    }
                                  );
                                  tabColLeft;
                                  tabColRight;
                                  tabDataLR;
                                  //$scope.tabDataLR = tabDataLR;
                                  $scope.tabDataLR = [];
                                  $scope.tabDataLR.push(tabColLeft);
                                  $scope.tabDataLR.push(tabColRight);

                                  $scope.getStorageInfo = function(pileno) {
                                    $http.get('data/pilo' + pileno + '.json').success(function(data) {
                                      $scope.tabData = data;
                                    });
                                  }
*/
                                  function mySortRow(a,b){
                                    return a.row_no - b.row_no;
                                  }

                                  function mySortCol(a,b){
                                    return a.col_no - b.col_no;
                                  }

                                  $scope.getStorageInfo = function(pileno) {
                                    $http.get('http://192.168.58.122/SYCService/GetPilesByHallno(' + pileno + ')').success(function(data) {
                                      var tabData= data;
                                      tabData.sort(mySortRow);
                                      //tabData.sort(mySortCol);
                                      var tabColLeft = [],tabColRight = [];
                                      var tabDataLR = [];
                                      tabData.forEach(
                                        function(data){
                                          var tmp = new Object();

                                          if(data.lock_status  == 0)
                                          {
                                            data.state = "success";
                                          }
                                          else
                                          {
                                            data.state = "danger";
                                          }

                                          if(data.col_no == 1)
                                          {
                                            tmp.left = data;
                                            tabColLeft.push(data);
                                          }
                                          else
                                          {
                                            tmp.right = data;
                                            tabColRight.push(data);
                                          }
                                          tabDataLR.push(tmp);
                                        }
                                      );

                                      //$scope.tabDataLR = tabDataLR;
                                      $scope.tabDataLR = [];
                                      $scope.tabDataLR.push(tabColLeft);
                                      $scope.tabDataLR.push(tabColRight);
                                    });
                                  }

                                }])
.controller('storeViewCtrl', ['$scope', '$stateParams','$http',
                              function($scope, $stateParams, $http) {

                                //$("[data-toggle=popover]").popover();
                                $scope.storeno = $stateParams.storeno;
                                $scope.rowNum = [1];
                                $scope.choosenRow = $scope.rowNum[0];
                                $scope.toGetData = [
                                  {
                                    SLAB_NO : ""
                                  }
                                ];
                                $scope.rr = [];

                                $http.get('data/store' + $scope.storeno + '.json').success(function(data) {
                                  data.sort(mySortTIER_NO);
                                  $scope.storeData = data;

                                  data.forEach(
                                    function(elem,index)
                                    {
                                      $scope.rowNum.push(index + 2);
                                    }
                                  )
                                });

                                $scope.setChoosenRow = function(row)
                                {
                                  $scope.choosenRow = row;
                                }

                                $scope.addToGet = function() {
                                  $scope.toGetData.push({SLAB_NO:""});
                                };

                                $scope.remove = function(scope) {
                                  //scope.remove();
                                };

                                $scope.myRemove = function(scope)
                                {
                                  scope.remove();
                                  $scope.rowNum.pop();
                                };

                                $scope.add = function(SLAB_NO, TIER_NO) {
                                  $scope.storeData.splice($scope.storeData.length + 1 - TIER_NO,0,
                                                          {
                                                            "SLAB_NO": SLAB_NO,
                                                            "STEEL_GRADE": "Q345GJC-Z15",
                                                            "SLAB_THICK": 300,
                                                            "SLAB_WIDTH": 1810,
                                                            "SLAB_LENGTH": 2840,
                                                            "SLAB_WEIGHT": 11982,
                                                            "PILE_NO": "H1022",
                                                            "TIER_NO": TIER_NO,
                                                            "COIL_NO": "",
                                                            "ST_NO": "",
                                                            "SLAB_STATUS": "000",
                                                            "SLAB_ATTRIBUTE": "00000000",
                                                            "HCR_FLAG": 0,
                                                            "HEAT_NO": "",
                                                            "YC_FLAG": 0,
                                                            "ORDER_NO": "",
                                                            "ACT_WEIGHT": 0,
                                                            "YARD_NO": "",
                                                            "PLANT_NO": 1
                                                          }).sort(mySortTIER_NO);
                                  $scope.rowNum.push($scope.storeData.length + 1);
                                };

                                function mySortTIER_NO(a,b){
                                  return b.TIER_NO - a.TIER_NO;
                                }
                              }])
.controller('MyCtrl1', [function() {

}])
.controller('MyCtrl2', [function() {

}]);
