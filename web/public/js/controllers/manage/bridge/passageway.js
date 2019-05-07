'use strict';
app.controller('ModalInstanceCtrl', ['$scope','$http', '$modalInstance', 'items', function ($scope,$http, $modalInstance, items) {

    var apple_selected, tree, treedata_avm, treedata_geography;
    $scope.my_tree_handler = function (branch) {
        console.log(branch)
        if (branch.level == 1) {
            $scope.loadHtml = 'tpl/modal/passagewayDetail.html';
        }
        else if(branch.level == 3) {
            $scope.loadHtml = 'tpl/modal/bridgePier.html';
        }

    };
    console.log(items);

    
    $scope.data = {};

    async function selInfo() {
        let url = '/passageway/passagewayinfo/selInfo';
        try {
            var res = await $http.post(url, items);

            console.log(res.data[0]);
            $scope.data = res.data[0];


        } catch (e) {
            console.log("get data err" + e);
        }
    }

    selInfo();

    //返回结构
    async function test() {
        let url = `/passageway/passagewayinfo/tree?PassagewayID=${items.PassagewayID}&PassagewayName=${items.PassagewayName}`;
        try {
            var res = await $http.get(url);
            console.log(res.data);
            $scope.my_data=res.data;
        } catch (e) {
            console.log("get data err" + e);
        }
    }
    // async function init(){
    //     await test();
    //     $scope.my_data = treedata_avm;
    // }
    test();
    //人行通道基础信息修改
    $scope.ok=async function(){
        if(confirm('你确定要修改此通道吗？')){
            console.log($scope.data.PassagewayName);
            let url =  `/passageway/passagewayinfo/update`;
            try {
                var res = await $http.post(url, $scope.data);
    
                console.log(res.data);
                selInfo();
            } catch (e) {
                console.log("get data err" + e);
            }
        }
       
    }
   /*  treedata_avm = [
        {
            bridgeId: 1,
            label: "团体通道",
            children: [
                {
                    typeId: 1,
                    label: "主体构造物"
                },
                {
                    typeId: 2,
                    label: "出入口",
                    children: [
                        {abutmentId: 1, label: "出入口1"},
                        {abutmentId: 2, label: "出入口2"}
                    ]
                },
                {
                    typeId: 3,
                    label: "道面",
                    children: [
                        {spanId: 1, label: "道面1"},
                        {spanId: 2, label: "道面2"}
                    ]
                },
                {
                    typeId: 4,
                    label: "排水设施"
                },
                {
                    typeId: 5,
                    label: "附属设施"
                }
            ]
        }
    ];
    $scope.my_data = treedata_avm; */
    $scope.loadHtml ='tpl/modal/passagewayDetail.html';
}]);
app.controller('manageBridgePassageway_controller', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {

    async function info() {
        let url = '/passageway/passagewayinfo/select';

        try {
            var res = await $http.get(url);

            console.log(res.data);

        } catch (e) {
            console.log("get data err" + e);
        }

        $scope.$apply(function () {
            $scope.passagewayInfo  = res.data;
        });

    }
    info();

    $scope.remove = async function (index) {
        console.log(index);
        let url = `/passageway/passagewayinfo/delete?PassagewayID=${$scope.passagewayInfo[index].PassagewayID}`;
        try {
            var res = await $http.get(url);

            console.log(res.data);
            info();

        } catch (e) {
            console.log("get data err" + e);
        }
    };

    $scope.clickPassageway = function (index) {

        var modalInstance = $modal.open({
            templateUrl: "myModalContent.html",
            controller: "ModalInstanceCtrl",
            size: "lg",
            resolve: {
                items: function () {
                    return $scope.passagewayInfo[index]
                }
            }
        });

        modalInstance.result.then(
            function (selectedItem) {
                $scope.selected = selectedItem;
            },
            function () {
                $log.info("Modal dismissed at: " + new Date());
            }
        );
    }

}])