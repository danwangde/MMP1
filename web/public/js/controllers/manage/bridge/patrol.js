app.controller('manageBridgePatrol_controller', ['$scope', '$http','$filter', '$modal', '$log', function ($scope, $http,$filter, $modal, $log) {
    /*$scope.patrolInfo = [{
        BridgeID: '1',
        BridgeName: '胜利路桥',
        startTime:'2019-03-01',
        endTime:'2019-03-31',
        sumNum:'5',
        doNum:'4',
        maintainDept: '天桥区住房和城乡建设局',
        name:'许浩'

    }];*/
    
        $scope.search = function () {
           
            $scope.patrolInfo = $filter('special')($scope.patrolInfo,$scope.createTime,$scope.name,$scope.briname,$scope.company);
        };


    function get_date_str(Date) {
        var Y = Date.getFullYear();
        var M = Date.getMonth() + 1;
        M = M < 10 ? '0' + M : M; // ??????0
        var D = Date.getDate();
        D = D < 10 ? '0' + D : D;
       
        return Y + '-' + M + '-' + D ;
    }

    async function info() {
        let url = '/maintain/patrol/select';

        try {
            var res = await $http.get(url);
            console.log(res.data);

        } catch (e) {
            console.log("get data err" + e);
        }


        $scope.$apply(function () {
            for (let [index, item] of res.data.entries()) {
                item.StartTime = get_date_str(new Date(res.data[index].StartTime));
                item.EndTime = get_date_str(new Date(res.data[index].EndTime));
            }

            $scope.patrolInfo = res.data;
        });

    }
    info();

    $scope.data = {date1:'2019-04-11'}
}]);