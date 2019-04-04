app.controller('bridgeAssess_controller',['$scope','$http','$modal','$log',function ($scope,$http,$modal,$log){
    console.log(new Date());

    $scope.bridgeAssess = [
        {name:'张北路乌河桥',road:'线路1',grade:'A',score:'100',checkDate:'2019-3-26',evalDate:'2019-03-28',checkUnit:'山东省市政养护管理平台'},
        {name:'胜利路桥',road:'高速方向',grade:'A',score:'97.66',checkDate:'2019-3-26',evalDate:'2019-03-28',checkUnit:'山东省市政养护管理平台'},
        {name:'北园高架桥',road:'\t线路2',grade:'A',score:'97.66',checkDate:'2019-3-26',evalDate:'2019-03-28',checkUnit:'山东省市政养护管理平台'},
        {name:'淄川路桥',road:'高速方向',grade:'A',score:'97.66',checkDate:'2019-3-26',evalDate:'2019-03-28',checkUnit:'山东省市政养护管理平台'},
        {name:'\t舜耕路兴济河桥',road:'高速方向',grade:'A',score:'97.66',checkDate:'2019-3-26',evalDate:'2019-03-28',checkUnit:'山东省市政养护管理平台'},
    ];



    $scope.notice=function(item){
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                items: function () {
                    return item.name;
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
    $scope.title=items;

    $scope.data = [
        {data1:'2019-3-26',data2:'山东省市政养护管理平台',data3:'II',data4:'4',data5:'5',data6:'6',data7:'7',data8:'8',data9:'9',data10:'10',data11:'11',data12:'12',data13:'13',data14:'14',data15:'15'},
        {data1:'2019-3-26',data2:'山东省市政养护管理平台',data3:'II',data4:'4',data5:'5',data6:'6',data7:'7',data8:'8',data9:'9',data10:'10',data11:'11',data12:'12',data13:'13',data14:'14',data15:'15'},
        {data1:'2019-3-26',data2:'山东省市政养护管理平台',data3:'II',data4:'4',data5:'5',data6:'6',data7:'7',data8:'8',data9:'9',data10:'10',data11:'11',data12:'12',data13:'13',data14:'14',data15:'15'},
        {data1:'2019-3-26',data2:'山东省市政养护管理平台',data3:'II',data4:'4',data5:'5',data6:'6',data7:'7',data8:'8',data9:'9',data10:'10',data11:'11',data12:'12',data13:'13',data14:'14',data15:'15'},
        {data1:'2019-3-26',data2:'山东省市政养护管理平台',data3:'II',data4:'4',data5:'5',data6:'6',data7:'7',data8:'8',data9:'9',data10:'10',data11:'11',data12:'12',data13:'13',data14:'14',data15:'15'},
        {data1:'2019-3-26',data2:'山东省市政养护管理平台',data3:'II',data4:'4',data5:'5',data6:'6',data7:'7',data8:'8',data9:'9',data10:'10',data11:'11',data12:'12',data13:'13',data14:'14',data15:'15'}
    ];

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