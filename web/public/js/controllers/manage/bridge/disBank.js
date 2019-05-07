app.controller('manageBridgeDisBank_controller',['$scope','$http','$filter','$modal','$log',function ($scope,$http,$filter,$modal,$log) {


    $scope.search = function () {
        console.log($scope.damageType);
        $scope.disBank = $filter('disease')($scope.disBank,$scope.Type,$scope.CompType,$scope.DamageType);
    };
    async function getDisInfo() {
        let url = '/disease/select';
        try{
            var res =await $http.get(url);
            $scope.$apply(function () {
                $scope.disBank=res.data;
            })
        }catch(e){
            console.log('get data err'+e)
        }

    }

    getDisInfo();

    $scope.belongType = [
        {value:'0',name:'桥梁构件'},
        {value:'1',name:'人行通道构件'}
    ];

    $scope.notice=function(item){
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: '',
            resolve: {
                items: function () {
                    return item;
                }

            }
        });

        modalInstance.result.then(function (rs) {
            $scope.selected = rs;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

}]);
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
    console.log(items);

    $scope.ok = function() {
        $modalInstance.close({
            message: 'ok',
            data: {

            }
        })
    };
    $scope.cancel = function() {
        $modalInstance.close({
            message:'cancel'
        });
    };

}]);

