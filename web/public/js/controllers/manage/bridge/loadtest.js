app.controller('manageBridgeLoadtest_controller', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
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