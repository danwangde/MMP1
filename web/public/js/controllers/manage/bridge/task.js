app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
    $scope.update = items;

    $scope.ok = function() {
        $modalInstance.close({
            message: 'ok',
            data:function () {
                if($scope.total.title=='insert'){
                    return ''
                }
                else{
                    return $scope.update
                }
            }
        })
    };
    $scope.cancel = function() {
        $modalInstance.close({
            message:'cancel'
        });
    };

}]);
app.controller('manageBridgeTask_controller', ['$scope', '$http', '$filter','$modal', '$log', function ($scope, $http,$filter, $modal, $log) {



    $scope.search = function () {
        $scope.sel = [
            {value:0,name:'梁桥'},
            {value:1,name:'桁架桥'}
        ];
        $scope.maintainInfo = $filter('search')($scope.maintainInfo,$scope.key,$scope.name,$scope.type);
    };
    async function info(){
        let url = '/maintain/task/select';

        try{
            var res = await $http.get(url);

            console.log(res.data);

        } catch(e){
            console.log("get data err" + e);
        }


        $scope.$apply(function () {
            $scope.maintainInfo =res.data;
        });

    }
    info();
    $scope.items = {BridgeID:'',Cycle:'',Frequency:'',PatrolUnit:''};
    $scope.update=function(item){
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: '',
            resolve: {
                items: function () {
                    $scope.items=item;
                    return $scope.items;
                }

            }
        });

        modalInstance.result.then(async function (rs) {
            if(rs.message=='ok'){
                let url ='/maintain/task/update';
                try{
                    var res = await $http.post(url,$scope.items);
                    info();
                }catch (e) {
                    console.log('update data err'+e);
                }
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
}]);