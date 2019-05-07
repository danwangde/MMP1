'use strict';
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http', '$filter', 'items', '$compile', function ($scope, $modalInstance, $http, $filter, items, $compile) {
    var html, template, mobileDialogElement;
    $scope.bigImg = function (num) {
        if (num == 1) {
            html = "<img src='../img/4.jpg' style='max-width:80%;margin-left:50%;margin-top:50px;transform: translate(-50%, -0%);' >";
        } else if (num == 2) {
            html = "<img src='../img/signinbg1.jpg' style='max-width:80%;margin-left:50%;margin-top:50px;transform: translate(-50%, -0%);' >";
        }
        template = angular.element(html);
        mobileDialogElement = $compile(template)($scope);

        angular.element("#bigImg").append(mobileDialogElement);
    };
    $scope.clickImg = function () {

        if (mobileDialogElement) {
            mobileDialogElement.remove();
        }
    };
    $scope.lookVideo = function () {
        html = "<video style='max-width:80%;max-height:800px;margin-left:50%;margin-top:50px;transform: translate(-50%, -0%);' controls><source src='../img/ceshi.mp4' type='video/mp4'></source></video>";
        template = angular.element(html);
        mobileDialogElement = $compile(template)($scope);

        angular.element("#bigImg").append(mobileDialogElement);
    };
    /* ..................................................................................................................................... 生成桥结构树 */
    async function test() {
        let url = `/bridge/bridgeinfo/tree?BridgeID=${items.BridgeID}&BridgeName=${items.BridgeName}`;
        try {
            var res = await $http.get(url);
            console.log(res.data);
            $scope.my_data=res.data;
        } catch (e) {
            console.log("get data err" + e);
        }
    }
    test();
     /* ..................................................................................................................................... 返回桥基本信息 */
    $scope.data = {};
    async function selInfo() {
        let url = '/bridge/bridgeinfo/selInfo';
        try {
            var res = await $http.post(url, items);

            console.log(res.data);
            $scope.data = res.data[0];


        } catch (e) {
            console.log("get data err" + e);
        }
    }
    selInfo();
    $scope.loadHtml = 'tpl/modal/bridgeDetail.html';
    $scope.my_tree_handler = function (branch) {

        if (branch.level == 1) {
            $scope.loadHtml = 'tpl/modal/bridgeDetail.html';
        } else if (branch.level == 2) {
            $scope.loadHtml = 'tpl/modal/bridgeLine.html';
        } else if (branch.level == 4 && branch.spanId) {
            $scope.loadHtml = 'tpl/modal/bridgeSpan.html';
        } else if (branch.level == 4 && branch.abutmentId) {
            $scope.loadHtml = 'tpl/modal/bridgePier.html';
        }

    };

    /* ..................................................................................................................................... 修改桥基本信息确认 */
    $scope.ok=async function(){
        if(confirm('你确定要修改此桥梁吗？')){
            console.log($scope.data.BridgeName);
            let url =  `/bridge/bridgeinfo/update`;
            try {
                var res = await $http.post(url, $scope.data);

                console.log(res.data);
                selInfo();
            } catch (e) {
                console.log("get data err" + e);
            }
        }
    }

    //建造历史
    async function his() {
        let url = '/bridge/history/select';
        try {
            let res = await $http.post(url, items);
            for (let [index, item] of res.data.entries()) {
                item.BuildDate = get_date_str(new Date(res.data[index].BuildDate));
            }
            $scope.history = res.data;
        } catch (e) {
            console.log('get data err' + e);
        }
    }
    his();
    $scope.hisData = {
        type: '',
        date: ''
    };
    $scope.search = function () {

        //$scope.buildType='改扩建';
        $scope.history = $filter('BriHis')($scope.history, $scope.hisData.type, $scope.hisData.date);

        console.log($scope.buildType);
        console.log(111111);
    }


    function get_date_str(Date) {
        var Y = Date.getFullYear();
        var M = Date.getMonth() + 1;
        M = M < 10 ? '0' + M : M; // ??????0
        var D = Date.getDate();
        D = D < 10 ? '0' + D : D;
        var H = Date.getHours();
        H = H < 10 ? '0' + H : H;
        var Mi = Date.getMinutes();
        Mi = Mi < 10 ? '0' + Mi : Mi;
        var S = Date.getSeconds();
        S = S < 10 ? '0' + S : S;
        return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
    }



}]);
app.controller('manageBridgeInfo_controller', ['$scope', '$http', '$filter', '$modal', '$log', '$compile', function ($scope, $http, $filter, $modal, $log, $compile) {

    $scope.search = function () {
        $scope.sel = [{
                value: 0,
                name: '梁桥'
            },
            {
                value: 1,
                name: '桁架桥'
            }
        ];

        $scope.bridgeInfo = $filter('search')($scope.bridgeInfo, $scope.key, $scope.name, $scope.type);
    };
    async function info() {
        let url = '/bridge/bridgeinfo/select';

        try {
            var res = await $http.get(url);

        } catch (e) {
            console.log("get data err" + e);
        }

        $scope.$apply(function () {
            $scope.bridgeInfo = res.data;
        });

    }
    info();

    $scope.remove = async function (index) {
        let url = '/bridge/bridgeinfo/delete';
        try {
            var res = await $http.post(url, $scope.bridgeInfo[index]);

            console.log(res.data);
            info();

        } catch (e) {
            console.log("get data err" + e);
        }
    };

    $scope.clickBridge = function (index) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                items: function () {
                    return $scope.bridgeInfo[index]
                }

            }
        });
        modalInstance.result.then(function (selectedItem) {

            console.log(selectedItem)
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


}]);