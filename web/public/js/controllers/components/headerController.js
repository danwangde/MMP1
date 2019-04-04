'use strict';

/* Controllers */

app.controller('header_controller', ['$scope', '$rootScope', '$http', '$window',  '$state',  function ($scope, $rootScope, $http, $window,$state) {
    function getUrl(address='office'){
        switch($scope.app.globalInfo.userInfo.userType)
        {
            case 1:
                address ='manage';
                break;
            case 2:
                address = 'manage';
                break;
            case 3:
                address = 'office';
                break;
            case 4:
                address = 'office';
                break;
        }
        return address
    }
    $scope.address=getUrl();
}]);



