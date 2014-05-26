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

                           $http.get('http://192.168.58.122/SYC_WCF/SYCService/Login(' +
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
                                  /*
                                  $scope.loadMore = function() {
                                    $scope.tabDataLR[0] = $scope.tabDataLR[0].concat($scope.tmpLR[0].splice(0,8));
                                    $scope.tabDataLR[1] = $scope.tabDataLR[1].concat($scope.tmpLR[1].splice(0,8));

                                  };
                                  */
                                  $scope.getStorageInfo = function(Hallno) {
                                    $http.get('http://192.168.58.122/SYC_WCF/SYCService/GetPilesByHallno(' + Hallno + ')').success(function(data) {
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
                                          //tabDataLR.push(tmp);
                                        }
                                      );

                                      //$scope.tabDataLR = tabDataLR;
                                      $scope.tabDataLR = [];
                                      $scope.tabDataLR.push(tabColLeft);
                                      $scope.tabDataLR.push(tabColRight);
                                      //$scope.tmpLR = [];
                                      //$scope.tmpLR.push(tabColLeft);
                                      //$scope.tmpLR.push(tabColRight);
                                      //$scope.tabDataLR = [];
                                      //$scope.tabDataLR.push($scope.tmpLR[0].splice(0,8));
                                      //$scope.tabDataLR.push($scope.tmpLR[1].splice(0,8));
                                    });
                                  }

                                }])
.controller('storeViewCtrl', ['$scope', '$stateParams', '$state', '$http',
                              function($scope, $stateParams, $state, $http) {

                                //$("[data-toggle=popover]").popover();
                                $scope.storeno = $state.params.storeno;
                                $scope.rowNum = [1];
                                $scope.choosenRow = $scope.rowNum[0];
                                $scope.error = "hh";
                                $scope.dataToInsert = new Object();
                                $scope.dataToInsert.SLAB_NO = "";
                                $scope.dataToInsert.TIER_NO = 1;

                                $scope.slabInfo = {
                                  "steel_grade": "板坯钢种",
                                  "slab_thick": "板坯厚度",
                                  "slab_width": "板坯宽度",
                                  "slab_length": "板坯长度",
                                  "slab_weight": "板坯理重",
                                  "tier_no": "板坯层号",
                                  "coil_no": "钢卷号",
                                  "st_no": "出钢记号",
                                  "slab_status": "板坯状态",
                                  "slab_attribute": "板坯属性",
                                  "hcr_flag": "hcr标志",
                                  "heat_no": "炉次号",
                                  "yc_flag": "余材坯",
                                  "order_no": "生产订单号",
                                  "act_weight": "实际重量",
                                  "yard_no": "合格标志",
                                  "plant_no": "铸机号"
                                };

                                //$http.get('data/store' + $scope.storeno + '.json')
                                $http.get('http://192.168.58.122/SYC_WCF/SYCService/GetSlabByPileNo(' +
                                          $scope.storeno + ')').success(function(data) {
                                  data.sort(mySortTIER_NO);
                                  $scope.storeData = data;

                                  data.forEach(
                                    function(elem,index)
                                    {
                                      $scope.rowNum.push(index + 2);
                                    }
                                  )
                                });

                                $scope.addGetInit = function()
                                {
                                  $scope.toGetData = [{"slab_id":""}];
                                  $scope.hideOrNot = 'hide';
                                  $('#addGetAlert').hide();

                                }

                                $scope.toGet = function()
                                {
                                  var getDataToSent = [];
                                  $scope.toGetData.forEach(
                                    function(elem){
                                      if(elem.slab_id != ""){
                                        getDataToSent.push(elem.slab_id);
                                      }
                                    }
                                  )

                                  var dataObj = {
                                      "BoolValue":true,
                                      "StringValue":"String content"
                                    };

                                  var json = JSON.stringify(dataObj);

                                  $http.post('http://192.168.8.22/webapplication2/api/default1',{
	"BoolValue":true,
	"StringValue":"String content"
},{timeout: 300}).
                                  success(function(data) {
                                    if(data = ""){

                                      $('#addGetAlert').hide();
                                      $('#addGetModall').modal('hide');
                                    }
                                    else
                                    {
                                      $('#addGetAlert').show();
                                      $scope.error = data;

                                      $scope.hideOrNot = '';
                                    }
                                  }).
                                  error(function(data, status) {
                                    //$scope.hideOrNot = '';
                                    $('#addGetAlert').show();
                                    $scope.error = "网络错误";
                                  });
                                }

                                $scope.setChoosenRow = function(row)
                                {
                                  $scope.choosenRow = row;
                                }

                                $scope.addToGet = function() {
                                  $scope.toGetData.push({"slab_id":""});
                                };

                                /*
                                $scope.remove = function(scope) {
                                  scope.remove();
                                };
                                */

                                $scope.myRemove = function(scope)
                                {
                                  scope.remove();
                                  $scope.rowNum.pop();
                                };

                                $scope.addSlabInit = function()
                                {
                                  $scope.dataToInsert.SLAB_NO = "";
                                  $scope.dataToInsertTIER_NO = 1;
                                  $('#addGetAlert').hide();
                                }

                                $scope.addSlab = function() {
                                  $http.post('http://192.168.58.122/SYC_WCF/SYCService/InsertSlab',$scope.dataToInsert,{timeout: 300}).
                                  success(function(data) {
                                    if(data = ""){

                                      $('#addSlabAlert').hide();
                                      $('#addSlabModall').modal('hide');
                                    }
                                    else
                                    {
                                      $('#addSlabAlert').show();
                                      $scope.error = data;

                                      $scope.hideOrNot = '';
                                    }
                                  }).
                                  error(function(data, status) {
                                    //$scope.hideOrNot = '';
                                    $('#addSlabAlert').show();
                                    $scope.error = "网络错误";
                                  });

                                  $scope.storeData.splice($scope.storeData.length + 1 - TIER_NO,0,
                                                          {
                                                            "SLAB_NO": "SLAB_NO",
                                                            "STEEL_GRADE": "Q345GJC-Z15",
                                                            "SLAB_THICK": 300,
                                                            "SLAB_WIDTH": 1810,
                                                            "SLAB_LENGTH": 2840,
                                                            "SLAB_WEIGHT": 11982,
                                                            "PILE_NO": "H1022",
                                                            "TIER_NO": 10,
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
                                    return b.tier_no  - a.tier_no ;
                                  }
                                }])
                                .controller('MyCtrl1', [function() {

                                }])
                                .controller('MyCtrl2', [function() {

                                }]);
