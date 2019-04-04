app.controller('echeckBridgeLoadTest_controller',['$scope','$modal','$http',function ($scope,$modal,$http) {
    $scope.showLoadtest=function(){
        $modal.open({
            templateUrl: 'loadtestModal.html',
            size: 'lg',
            resolve: {
                items: function () {
                    // return $scope.maintainInfo[index];
                }

            }
        });
    }
}])