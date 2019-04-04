'use strict';
app.controller('office_controller', ['$scope', '$window','$state', function ($scope, $window,$state) {

    const echeckdata=[{name: '城市桥梁', path: 'app.echeckBridgeBacklog', nav: 3}, {name:'市政道路',path:''},{name:'城市隧道',path:''}];
    const maintaindata=[{name: '城市桥梁', path: 'app.maintainBridgeBacklog', nav: 4}, {name:'市政道路',path:''},{name:'城市隧道',path:''}];
    if( $scope.app.globalInfo.userInfo.userType==3){
        $scope.tabs=echeckdata;

    }else{
        $scope.tabs=maintaindata;
    }
    $scope.clickTab=function(tab){
        $scope.app.globalInfo.nav=tab.nav;
        $state.go(tab.path);
    };


}])