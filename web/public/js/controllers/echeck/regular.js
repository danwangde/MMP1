app.controller('echeckBridgeRegular_controller',['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
    $scope.regularInfo = [
        {
        Type: '人行通道',
        bridgename:'团体通道',
        CheckDate: '2019-03-01',
        CheckUsers: '张筱筱',
        CheckDept: '山东省市政养护管理平台',
        CheckReport:'检测报告.pdf',
        BelongTask : '2018秋季巡查计划2',
        BCI:'100'

    },
    {
        Type: '桥梁',
        bridgename:'胜利路桥',
        CheckDate: '2019-04-02',
        CheckUsers: '王奔飞',
        CheckDept: '西安敏文测控',
        CheckReport:'检测报告.pdf',
        BelongTask : '2019秋季巡查计划2',
        BCI:'99'

    }
];

    $scope.items ={Type:'',bridgename:'',CheckDate:'',CheckUsers:'',CheckDept:'',CheckReport:'',BelongTask:'',BCI:''};
    $scope.showTable=false;
    $scope.show=function(){
        $scope.showTable=!$scope.showTable
    }
    $scope.openModal=function(){
       $modal.open({
            templateUrl: 'structureModal.html',
            backdrop: 'static',
            keyboard: true,
            size: 'lg',
            resolve: {
                items: function () {
                    // return $scope.maintainInfo[index];
                }

            }
        });
    }
    $scope.showDisease=function(){
        $modal.open({
            templateUrl: 'diseaseModal.html',
            backdrop: 'static',
            keyboard: true,
            size: 'lg',
            resolve: {
                items: function () {
                   
                }

            }
        });
    }

    $scope.addRegular = function(size){
        var modalInstance =$modal.open({
            templateUrl:'regularModal.html',
            controller:'ModalInstanceCtrl',
            backdrop: 'static',
            keyboard: false,
            size:'',
            resolve:{
                items: function () {
                    $scope.items=size;
                    if(size.CheckDept==''){
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
        })
        modalInstance.result.then(function (rs) {
            if(rs.message=='ok'){
                if ($scope.items.title=='insert'){
                    $scope.regularInfo.push($scope.items);
                }
                else{
                    //$scope.items=rs.data;
                }
             }
             $scope.items ={Type:'',bridgename:'',CheckDate:'',CheckUsers:'',CheckDept:'',CheckReport:'',BelongTask:'',BCI:''};
           console.log(rs);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.removeRegular = function(index){
        $scope.regularInfo.splice(index,1)
    }
}])




app.controller('ModalInstanceCtrl',['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
   $scope.updateData = items.items;
  
   if( $scope.updateData.title=='insert'){
    $scope.titleName='新增检测信息'
}else{
    $scope.titleName='修改检测信息'
}
   $scope.ok = ()=>{
    $modalInstance.close({
        message: 'ok',
        data: {

        }
    })
   }

   $scope.cancel = ()=>{
    $modalInstance.close({
        message: 'cancle',
        data: {

        }
    })
   }
}])