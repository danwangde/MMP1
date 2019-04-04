'use strict';
app.controller('echeckBridgeBacklog_controller', ['$scope', '$http', '$window', function ($scope, $http) {
    $scope.dataType = [
        {value:'0',name:'常规检测'},
        {value:'1',name:'结构性能'},
        {value:'2',name:'荷载试验'},
    ]
    $scope.backlog = [
        {type:'桥梁',taskType:'常规检测',taskTypeName:'胜利路桥',planName:'2019秋季巡查计划2',date:'2019-03-01到2019-03-29'},
        {type:'人行通道',taskType:'结构性能检测',taskTypeName:'胜利路桥',planName:'2019秋季巡查计划2',date:'2019-03-01到2019-03-29'},
        {type:'桥梁',taskType:'荷载试验',taskTypeName:'胜利路桥',planName:'2019秋季巡查计划2',date:'2019-03-20到2019-03-29'},
    ]
}])