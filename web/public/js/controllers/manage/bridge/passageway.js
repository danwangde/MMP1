'use strict';
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

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

    treedata_avm = [
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
    $scope.my_data = treedata_avm;
    $scope.loadHtml ='tpl/modal/passagewayDetail.html';
}]);
app.controller('manageBridgePassageway_controller', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
    $scope.passagewayInfo = [
        {
            ID: "001",
            PassagewayName: "团体通道",
            Length: 1,
            Width: 1,
            High: 1,
            ManageUnit: "天桥区住房和城乡建设局"
        },
        {
            ID: "002",
            PassagewayName: "	经十路人行通道",
            Length: 200.0,
            Width: 15.0,
            High: 5.0,
            ManageUnit: "桓台县住房和城乡建设局"
        }
    ];
    $scope.clickPassageway = function (index) {

        var modalInstance = $modal.open({
            templateUrl: "myModalContent.html",
            controller: "ModalInstanceCtrl",
            size: "lg",
            resolve: {
                items: function () {
                    return $scope.items;
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