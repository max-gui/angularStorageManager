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

                           /*
                           var enPsd = [];
                           for (var i = 0; i < $rootScope.password.length; i++) {
                             enPsd.push($rootScope.password.charCodeAt(i));
                           }

                           var enTime = [];
                           */

                           //new Date().getTime().toString().charCodeAt(0)

                           //$http.defaults.useXDomain = true;
                           //$http.defaults.headers.ContentType = "text/plain, charset=utf-8";
                           var encrypt = new JSEncrypt();
                           encrypt.setPublicKey(
                             "-----BEGIN PUBLIC KEY-----" +
                             "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC51FzMSexieGcfr2NJFT5QKcEz" +
                             "gzpH5PIbe4NwZOc0pMD1Ez9vI69rUPes4jVdbYIragj7bk3xKMhwZ9m5bVm7Lnov" +
                             "sBqjDO2Cm6vQyAw6jvHf3QjiM9j7io9JjVE/pNgZaECZhpN7XT8BPvM2C7w2Lftj" +
                             "S6zKOEjpdLQADVW2BwIDAQAB" +
                             "-----END PUBLIC KEY-----"
                           );
                           console.log(encrypt);

                           /*
                           $http.get('http://work/SycWeb/Login?userid=' +
                                     $state.params.name + '&pwd=' +
                                     encrypted
                                    ).
                           */
                           var encrypted = encrypt.encrypt($state.params.password);

                           $http.post('http://work/SycWeb/Login?userid=' + $state.params.name,
                                                 JSON.stringify(encrypted),
                                                 {timeout: 1500}).
                           success(function(data) {
                             if(data.Status == false){
                               $state.go("login");
                             }
                           }).
                           error(function(data,status){
                             $state.go("login");
                           });

                         }])
.controller('storageViewCtrl', ['$scope', '$stateParams','$http',
                                function($scope, $stateParams, $http) {
                                  $scope.storageNum = [1,2,3,4];
                                  //$scope.scrollFlag = false;
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
                                  $scope.loadMore = function(index) {
                                    if($scope.tmpLR[index].length > 0)
                                    {
                                      $scope.tabDataLR[index] =
                                        $scope.tabDataLR[index].concat($scope.tmpLR[index].splice(0,8));
                                    }

                                    if($scope.tmpLR[index].length == 0)
                                    {
                                      $scope.scrollFlag = true;
                                    }

                                  };
                                  */
                                  $scope.getStorageInfo = function(Hallno) {
                                    $http.get('http://work/SycWeb/GetPilesByHallno/' + Hallno).success(function(data) {
                                      var tabData= data.Data;
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
                                      //$scope.tabDataLR = [];
                                      //$scope.tabDataLR.push(tabColLeft);
                                      //$scope.tabDataLR.push(tabColRight);
                                      $scope.tmpLR = [];
                                      $scope.tmpLR.push(tabColLeft);
                                      $scope.tmpLR.push(tabColRight);
                                      $scope.tabDataLR = [];
                                      $scope.tabDataLR.push($scope.tmpLR[0].splice(0,8));
                                      $scope.tabDataLR.push($scope.tmpLR[1].splice(0,8));
                                    });
                                  }

                                }])
.controller('storeViewCtrl', ['$scope', '$stateParams', '$state', '$http',
                              function($scope, $stateParams, $state, $http) {

                                //$("[data-toggle=popover]").popover();
                                $scope.storeno = $state.params.storeno;
                                $scope.rowNum = [1];
                                //$scope.choosenRow = $scope.rowNum[0];
                                $scope.error = "hh";
                                $scope.dataToInsert = new Object();
                                $scope.dataToInsert.SLAB_NO = "";
                                $scope.dataToInsert.TIER_NO = 1;
                                $scope.dataToInsert.pile_no = $scope.storeno;
                                $('#moveAlert').hide();

                                $scope.slabInfo = {
                                  "steel_grade": "板坯钢种",
                                  "slab_thick": "板坯厚度",
                                  "slab_width": "板坯宽度",
                                  "slab_length": "板坯长度",
                                  "slab_weight": "板坯理重",
                                  "tier_no": "板坯层号",
                                  "roll_prg_no": "轧制计划",
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

                                $scope.treeOptions = {
                                  dropped : function(event) {
                                    var dataTmp = $scope.storeData;
                                    var sendLength = dataTmp.length;
                                    var dataToSend = [];
                                    var indexTmp;

                                    dataTmp.forEach(
                                      function(elem,index)
                                      {
                                        var eleTmp = {};

                                        indexTmp = sendLength - index;
                                        if(elem.tier_no != indexTmp){
                                          eleTmp.pile_no = elem.pile_no;
                                          eleTmp.slab_no  = elem.slab_no;
                                          eleTmp.tier_no = indexTmp;
                                          eleTmp.index = index;
                                          dataToSend.push(eleTmp);
                                        }
                                      }
                                    )

                                    if (dataToSend.length > 0){
                                      $scope.error = "";
                                      $http.post('http://work/SycWeb/MoveSlab',
                                                 dataToSend,
                                                 {timeout: 1500}).
                                      success(function(data) {
                                        if(data.Status == true){

                                          dataToSend.forEach(
                                            function(elem)
                                            {
                                              dataTmp[elem.index].tier_no = elem.tier_no;
                                            }
                                          )
                                          $('#moveAlert').hide();
                                        }
                                        else
                                        {
                                          $('#moveAlert').show();
                                          $scope.error = data.Message;

                                          $scope.hideOrNot = '';
                                        }
                                      }).
                                      error(function(data, status) {
                                        //$scope.hideOrNot = '';
                                        $('#moveAlert').show();
                                        $scope.error = "网络错误请重新提交，只需提起任意板坯并放在原处即可";
                                      });
                                    }
                                    return true;
                                  },
                                };

                                //$http.get('data/store' + $scope.storeno + '.json')
                                $http.get('http://work/SycWeb/GetSlabByPileNo/' +
                                          $scope.storeno).success(function(data) {
                                  data.Data.sort(mySortTIER_NO);
                                  $scope.storeData = data.Data;

                                  data.Data.forEach(
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
                                  $scope.error = '';
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

                                  $http.post('http://work/SycWeb/RequestSlab',
                                             getDataToSent,
                                             {timeout: 1500}).
                                  success(function(data) {
                                    if(data.Status == true){

                                      $('#addGetAlert').hide();
                                      $('#addGetModall').modal('hide');
                                    }
                                    else
                                    {
                                      $('#addGetAlert').show();
                                      $scope.error = data.Message;

                                      $scope.hideOrNot = '';
                                    }
                                  }).
                                  error(function(data, status) {
                                    //$scope.hideOrNot = '';
                                    $('#addGetAlert').show();
                                    $scope.error = "网络错误";
                                  });
                                }

                                //$scope.setChoosenRow = function(row)
                                //{
                                //  $scope.choosenRow = row;
                                //}

                                $scope.addToGet = function() {
                                  $scope.toGetData.push({"slab_id":""});
                                };

                                /*
                                $scope.remove = function(scope) {
                                  scope.remove();
                                };
                                */

                                $scope.myRemove = function(scope,index)
                                {
                                  $http.get("http://work/SycWeb/RemoveSlab?slabno=" +
                                            $scope.storeData[index].slab_no + "&pileno=" +
                                            $scope.storeData[index].pile_no + "&tierno=" +
                                            $scope.storeData[index].tier_no,$scope.dataToInsert,{timeout: 1500}).
                                  success(function(data) {
                                    if(data.Status == true){

                                      scope.remove();
                                      $scope.rowNum.pop();
                                    }
                                  }).
                                  error(function(data, status) {
                                  });
                                };

                                $scope.addSlabInit = function()
                                {
                                  $scope.dataToInsert.SLAB_NO = "";
                                  $scope.dataToInsertTIER_NO = 1;
                                  $('#addSlabAlert').hide();
                                  $scope.error = '';
                                }

                                $scope.addSlab = function() {
                                  //$scope.dataToInsert.SLAB_NO = "";
                                  //$scope.dataToInsert.TIER_NO = "";
                                  var addOrNot = true;
                                  $scope.storeData.forEach(
                                    function(elem)
                                    {
                                      if(elem.slab_no == $scope.dataToInsert.SLAB_NO)
                                      {
                                        $('#addSlabAlert').show();
                                        $scope.error = "这块板坯已经在本堆垛中";

                                        $scope.hideOrNot = '';
                                        addOrNot = false;
                                        return;
                                      }
                                    }
                                  )

                                  if(!addOrNot)
                                  {
                                    return
                                  }

                                  $http.post('http://work/SycWeb/InsertSlab',$scope.dataToInsert,{timeout: 1500}).
                                  success(function(data) {
                                    if(data.Status == true){

                                      $('#addSlabAlert').hide();
                                      $('#addSlabModall').modal('hide');

                                      $scope.storeData.splice($scope.storeData.length + 1 - $scope.dataToInsert.TIER_NO,
                                                              0,
                                                              data.Data).sort(mySortTIER_NO);
                                      $scope.rowNum.push($scope.storeData.length + 1);
                                    }
                                    else
                                    {
                                      $('#addSlabAlert').show();
                                      $scope.error = data.Message;

                                      $scope.hideOrNot = '';
                                    }
                                  }).
                                  error(function(data, status) {
                                    //$scope.hideOrNot = '';
                                    $('#addSlabAlert').show();
                                    $scope.error = "网络错误";
                                  });
                                };

                                  function mySortTIER_NO(a,b){
                                    return b.tier_no  - a.tier_no ;
                                  }
                                }]);
