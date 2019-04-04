'use strict';


app.controller('manage_controller', ['$scope', '$window','$state', function ($scope, $window,$state) {
    var navNum=2;
    if($scope.app.globalInfo.userInfo.userType ==1){
        navNum=5;
    }else{
        navNum=2;
    }
     $scope.managedata = [
        {name:'子系统',content:[{name: '数据总览', path: 'app.manageDataTotal',nav:0}, {name: '城市桥梁', path: 'app.manageBridgeIndex', nav: 1}, {name:'市政道路',path:''},{name:'城市隧道',path:''}]},
        {name:'公共模块',content:[{name:'管理模块',path:'app.managePublicComponents',nav:navNum},{name:'考核模块'},{name:'审核模块'}]},
        {name:'验收模块',content:[{name:'验收模块',path:''}]},
        {name:'检测平台',content:[{name:'检测平台',path:''}]},
        {name:'电子地图',content:[{name:'电子地图',path:''}]}
     ];

    $scope.focus = 0;
    $scope.content=$scope.managedata[0].content;
    $scope.clickGL=function(index){
        $scope.focus = index;
        $scope.content=$scope.managedata[index].content;
    };
    $scope.clickItem=function(item){
        $scope.app.globalInfo.nav=item.nav;
        $state.go(item.path);
    };



}]);