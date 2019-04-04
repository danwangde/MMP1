app.controller('manageDataOut_controller',['$scope','$http',function ($scope,$http) {
    console.log(123);


    $scope.selType = [
        {value:0,name:'桥梁基础信息'},
        {value:1,name:'桥梁构件信息'},
        {value:2,name:'桥梁检测信息'},
        {value:3,name:'桥梁养护信息'}
    ];
    $scope.addHtml = 'tpl/modal/dataList.html'

    $scope.selBridge = function () {
        switch ($scope.dataType) {
            case 0:
                $scope.addHtml = 'tpl/modal/dataList.html';
                break;
            case 1:
                $scope.addHtml = 'tpl/modal/dataComponent.html';
                break;
            case 2:
                $scope.addHtml = 'tpl/modal/dataCheck.html'
                break;
            case 3:
                $scope.addHtml = 'tpl/modal/dataCuring.html'
                break;
        }
    }
}]);