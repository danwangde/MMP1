'use strict';
app.controller('managePublicJournal_controller', ['$scope', '$http', function ($scope, $http) {
    console.log(new Date());

    $scope.jourData = [{
            menu: '系统管理-安全管理-系统日志',
            user: 'benben',
            company: '山东省市政养护管理平台',
            URI: '/MMP/a/sys/log',
            submitType: 'GET',
            userIp: '192.168.1.51',
            date: '2019-4-8 10:17'
        },
        {
            menu: '系统管理-权限管理-权限分配',
            user: '超级管理员',
            company: '市中区级设施养护公司',
            URI: '/MMP/a//sys/role/',
            submitType: 'GET',
            userIp: '192.168.1.10',
            date: '2019-4-8 10:22'
        }
    ]

    let json = JSON.parse(JSON.stringify($scope.jourData));

    console.log(json);
}])