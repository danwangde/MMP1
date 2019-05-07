app.controller('managePublicDiseases_controller',['$scope','$http','$modal','$log',function ($scope,$http,$modal,$log) {

    async function getSCInfo() {
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

    getSCInfo();


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

