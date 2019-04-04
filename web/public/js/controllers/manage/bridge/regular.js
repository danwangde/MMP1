app.controller('manageBridgeRegular_controller', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
    $scope.regularInfo = [{
        Type: '人行通道',
        bridgename:'团体通道',
        CheckDate: '2019-03-01',
        CheckUsers: '张筱筱',
        CheckDept: '山东省市政养护管理平台',
        CheckReport:'检测报告.pdf',
        BelongTask : '2018秋季巡查计划2',
        BCI:'100'

    }];
    $scope.showTable=false;
    $scope.show=function(){
        $scope.showTable=!$scope.showTable
    }
    $scope.openModal=function(){
       $modal.open({
            templateUrl: 'structureModal.html',
            size: 'lg',
            resolve: {
                items: function () {
                    // return $scope.maintainInfo[index];
                }

            }
        });
    }
    $scope.showDisease=function(){
        $modal.open({
            templateUrl: 'diseaseModal.html',
            size: 'lg',
            resolve: {
                items: function () {
                    // return $scope.maintainInfo[index];
                }

            }
        });
    }

}])