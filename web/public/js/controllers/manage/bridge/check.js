app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
    console.log(items)

}]);
app.controller('manageBridgeCheck_controller', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
    /*$scope.checkInfo = [{
        ID: '1',
        diseaseName: '人行道平板碎裂',
        BridgeName: '胜利路桥',
        maintainDept: '天桥区住房和城乡建设局',
        name:'单连春',
        site : '祊河路(与柳青河西路交汇西138米)',
        sum: '110.42',state:0
    },
        {
            ID: '1',
            diseaseName: '人行道平板碎裂',
            BridgeName: '胜利路桥',
            maintainDept: '天桥区住房和城乡建设局',
            name:'单连春',
            site : '祊河路(与柳青河西路交汇西138米)',
            sum: '110.42',state:1
        }];*/

    async function selData(){
        let url = '/maintain/check/select';
        try{
            let res = await $http.get(url);
            $scope.$apply(function () {
                $scope.checkInfo = res.data;
            })
        }catch(e){
            console.log('get data err'+e);
        }
    }
    selData();
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