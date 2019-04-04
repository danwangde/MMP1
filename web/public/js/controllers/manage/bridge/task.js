app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
    console.log(items)

}]);
app.controller('manageBridgeTask_controller', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
    $scope.maintainInfo = [{
        BridgeID: '1',
        BridgeNum: 'HT005',
        BridgeName: '胜利路桥',
        BridgeType: '梁桥',
        CuringGrade: 'I等',
        time: '365天',
        num: 5,
        maintainDept: '天桥区住房和城乡建设局'
    },
        {
            BridgeID: '2',
            BridgeNum: 'HT004',
            BridgeName: '八一路桥',
            BridgeType: '圬工拱桥（无拱上构造）',
            CuringGrade: 'II等',
            time: '30天',
            num: 5,
            maintainDept: '淄川区住房和城乡建设局'
        }];
    $scope.update=function(index){
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: '',
            resolve: {
                items: function () {
                    return $scope.maintainInfo[index];
                }

            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
}])