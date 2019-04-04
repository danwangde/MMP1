app.controller('manageComponentPrice_controller',['$scope','$http','$modal','$log',function ($scope,$http,$modal,$log) {
    console.log('manageComponentPrice_controller');

    $scope.compontPrice = [
        {ComponentType:'桥梁构件',compontName:'主节点',superStructure:'跨',repairPrice:'100'},
        {ComponentType:'桥梁构件',compontName:'出入口',superStructure:'桥墩',repairPrice:'100'},
        {ComponentType:'人行通道构件',compontName:'主节点',superStructure:'桥台',repairPrice:'100'},
        {ComponentType:'桥梁构件',compontName:'主节点',superStructure:'抗震设施',repairPrice:'100'},
        {ComponentType:'桥梁构件',compontName:'主节点',superStructure:'跨',repairPrice:'100'}
    ];

    $scope.items =  {ComponentType:'',compontName:'',superStructure:'',repairPrice:''};
    $scope.componentUpdate=function(size){
        console.log(size);
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            backdrop: 'static',
            keyboard: false,
            size: '',
            resolve: {
                items: function () {
                   $scope.items=size;
                   if(size.ComponentType=='' && size.compontName=='' && size.superStructure=='' && size.repairPrice==''){
                       $scope.items.title='insert'
                   }
                   else{
                       $scope.items.title='update'
                   }
                   return {
                       items:$scope.items
                   }
                }

            }
        });

        modalInstance.result.then(function (rs) {
            if(rs.message=='ok'){
               if ($scope.items.title=='insert'){
                   $scope.compontPrice.push($scope.items);
               }
               else{
                   //$scope.items=rs.data;
               }
            }
            $scope.items =  {ComponentType:'',compontName:'',superStructure:'',repairPrice:''};

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.componentRemove = function (index) {
        $scope.compontPrice.splice(index,1);
    }


}]);

app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
    $scope.total=items.items;
    if( $scope.total.title=='insert'){
        $scope.titleName='新增单价信息'
    }else{
        $scope.titleName='修改单价信息'
    }

    $scope.ok = function() {
        $modalInstance.close({
            message: 'ok',
            data:function () {
                if($scope.total.title=='insert'){
                    return ''
                }
                else{
                    return $scope.total
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
