app.controller('manageComponentPrice_controller',['$scope','$http','$filter','$modal','$log',function ($scope,$http,$filter,$modal,$log) {

    $scope.search = function () {//查询
        $scope.compontPrice = $filter('price')($scope.compontPrice,$scope.type,$scope.name);
    };


    async function selPrice(){   //查表 获取数据
        let url = '/price/select';
        try{
            var res =await $http.get(url);
            console.log(res.data);
        }catch(e){
            console.log('get data err'+e)
        }
        $scope.$apply(function () {
            $scope.compontPrice = res.data;
        })
    }

    selPrice();

    $scope.items =  {ComponentType:'',ComponentName:'',BelonStruct:'',RepairPrice:''};
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
                   if(size.ComponentType=='' && size.ComponentName=='' && size.BelonStruct=='' && size.RepairPrice==''){
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

        modalInstance.result.then(async function (rs) {
            if(rs.message=='ok'){  //新增
               if ($scope.items.title=='insert'){
                  let url = '/price/insert';
                  try{
                      var res = await $http.post(url,$scope.items);
                      selPrice();
                  }catch (e) {
                      console.log('get data err'+e)
                  }
               }
               else{ //修改
                   let url = '/price/update';
                   try{
                       var res = await $http.post(url,$scope.items);
                       selPrice();
                   }catch (e) {
                       console.log('get data err'+e)
                   }
               }
            }
            $scope.items =  {ComponentType:'',ComponentName:'',BelonStruct:'',RepairPrice:''};

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.componentRemove =async function (item) {
        if (confirm("您确定删除该单价信息") == true) { //删除信息
            console.log(item);
            let url = '/price/delete?id='+item.id;
            try{
                var res = await $http.get(url);
                await selPrice();
            }catch (e) {
                console.log('get data err'+e)
            }
        }else{
            return false;
        }

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
