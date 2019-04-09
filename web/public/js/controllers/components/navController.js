'use strict';

/* Controllers */

app.controller('nav_controller', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    const nav1=[
        {name: '首页', url: 'app.manageBridgeIndex',state:'app.manageBridgeIndex'},
        {name: '基本信息', url: '',state:'app.basic', children: [{name: '桥梁信息', url: 'app.basic.manageBridgeInfo'}, {name: '人行通道信息', url: 'app.basic.manageBridgePassageway'}, {name: '基础信息统计', url: 'app.basic.manageInfoStatistics'}]},
        {name: '养护维修', url: '', state:'app.maintain',children: [{name: '任务管理', url: 'app.maintain.manageBridgeTask'}, {name: '日常巡查', url: 'app.maintain.manageBridgePatrol'},{name:'工单管理',url:'app.maintain.manageBridgeOrder'},{name:'方案审核',url:'app.maintain.manageBridgeScheme'},{name:'检查验收',url:'app.maintain.manageBridgeCheck'},{name:'竣工结算',url:'app.maintain.manageBridgeCost'}]},
        {name: '检测管理', url: '',state:'app.echeck', children: [{name:'检测计划',url:'app.echeck.manageBridgePlan'},{name:'常规检测',url:'app.echeck.manageBridgeRegular'},{name:'结构性能检测',url:'app.echeck.manageBridgeStructural'},{name:'荷载试验',url:'app.echeck.manageBridgeLoadtest'}]},
        {name:'技术评估', url: '',state:'assessment',children:[{name:'桥梁BIC',url:'app.assessment.bridgeAssessment'},{name:'人行通道',url:'app.assessment.passageAssessment'}]},
        {name:'统计报表', url: '1'},
        {name:'健康检测', url: '1'},

        {name:'GIS地图',state:'app.manageBridgeMap', url: 'app.manageBridgeMap'},
        {name:'病害库', url: 'app.manageBridgeDisBank'},
        {name:'单价库', url: 'app.manageBridgePrice'},
        {name:'数据导出', url: 'app.manageDataOut'}
    ];
    const nav2=[
        {name:'部门管理',url:'1'},
        {name:'用户管理',url:'1'},
        {name:'资料管理',url:'1'},
        {name:'通知公告',url:'1'},
        {name:'备忘录',url:'1'}
    ];
    const nav5=[
        {name:'部门管理',url:'1'},
        {name:'用户管理',url:'1'},
        {name:'资料管理',url:'app.managePublicDataManage'},
        {name:'通知公告',url:'app.managePublicNotice'},
        {name:'区域管理',url:'1'},
        {name:'字典管理',state:'app.managePublicDicMag',url:'app.managePublicDicMag'},
        {name:'系统日志',state:'app.managePublicJournal',url:'app.managePublicJournal'},
        {name:'备忘录',state:'app.managePublicMemo',url:'app.managePublicMemo'},
        {name:'病害库',state:'app.managePublicDiseases',url:'app.managePublicDiseases'},
        {name:'构件库',state:'app.managePublicComponents',url:'app.managePublicComponents'}

    ];
    const nav3=[
        {name:'待办检测',state:'app.echeckBridgeBacklog',url:'app.echeckBridgeBacklog'},
        {name: '桥梁信息',state:'app.echeckBridgeInfo', url: 'app.echeckBridgeInfo'},
        {name: '人行通道信息',state:'app.echeckPassageInfo' ,url: 'app.echeckPassageInfo'},
        {name:'常规检测',state:'app.echeckBridgeRegular',url:'app.echeckBridgeRegular'},
        {name:'结构性能检测',state:'app.echeckBridgeStructural',url:'app.echeckBridgeStructural'},
        {name:'荷载试验',state:'app.echeckBridgeLoadTest',url:'app.echeckBridgeLoadTest'},
        {name:'GIS地图',state:'app.echeckBridgeMap',url:'app.echeckBridgeMap'},
        {name:'通知公告',state:'app.echeckMemo',url:'app.echeckNotice'},
        {name:'备忘录',state:'app.echeckMemo',url:'app.echeckMemo'}
    ];
    const nav4=[
        {name:'待办养护',url:'1'},
        {name: '桥梁信息', url: '1'},
        {name: '人行通道信息', url: '1'},
        {name:'日常巡查',url:'1'},
        {name:'病害上报',url:'1'},
        {name:'工单信息',url:'1'},
        {name:'养护方案',url:'1'},
        {name:'竣工申请',url:'1'},
        {name:'GIS地图',url:'1'},
        {name:'通知公告',url:'1'},
        {name:'备忘录',url:'1'}
    ];
     $scope.navList=eval('nav'+$scope.app.globalInfo.nav);

}]);