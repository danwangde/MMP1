'use strict';
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items',  function ($scope, $modalInstance, items) {
    $scope.items=items;
}]);
app.controller('manageBridgeOrder_controller', ['$scope', '$http','$filter', '$modal', '$log', function ($scope, $http,$filter, $modal, $log) {

    $scope.search = function () {
        $scope.orderInfo = $filter('order')($scope.orderInfo,$scope.name,$scope.time,$scope.disease,$scope.company,$scope.status);
    };
    async function getData(){
        let url ='/maintain/order/select';
        try{
            let res = await $http.get(url);
           $scope.$apply(function () {
               $scope.orderInfo = res.data;
           });
            console.log(res.data);
        }catch (e) {
            console.log('get data err'+e)
        }
    }
    getData();

    $scope.clickOrder = function (index) {
        $scope.focus = index;
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: '',
            resolve: {
                items: function () {
                    return $scope.orderInfo[index]
                }

            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);