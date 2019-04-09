app.controller('managePublicDataManage_controller',['$scope','$http',function($scope,$http){
    console.log('data');
    $scope.disBank = [
        {
            diseaseType:'市政桥梁病害库',
            diseaseConType:'桥梁构件',
            diseaseDate:'2019-04-08',
            DamageType:'桥梁病害信息',
            DiseaseDef:'leo'
        },
        {
            diseaseType:'市政桥梁病害库',
            diseaseConType:'人行通道构件',
            diseaseDate:'2019-04-08',
            DamageType:'人行通道信息',
            DiseaseDef:'benben',
        }
    ];

    $scope.damageType = [
        {value:'0',name:'桥梁'},
        {value:'1',name:'人行通道'},
        {value:'2',name:'隧道'},
        {value:'3',name:'市政道路'}
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

    

    $scope.save = function() {    
        let fd = new FormData();
        let file = document.querySelector('input[type=file]').files[0];
        fd.append('file', file); 
         $http({
              method:'POST',
              url:"/test",
              data: fd,
              headers: {'Content-Type':undefined},
              transformRequest: angular.identity 
               })   
              .success( function ( response )
                       {
                       //上传成功的操作
                       alert("uplaod success");
                       }); 
 
     }

}])