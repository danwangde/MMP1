app.controller('manageBridgePatrol_controller', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
    $scope.patrolInfo = [{
        BridgeID: '1',
        BridgeName: '胜利路桥',
        startTime:'2019-03-01',
        endTime:'2019-03-31',
        sumNum:'5',
        doNum:'4',
        maintainDept: '天桥区住房和城乡建设局',
        name:'许浩'

    }];
}])