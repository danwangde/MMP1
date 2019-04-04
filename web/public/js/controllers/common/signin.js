'use strict';

/* Controllers */
app.controller('signin_controller', ['$scope', '$http', '$state','$window', function ($scope, $http, $state,$window) {

    $scope.winowHeight = {
        "height": $window.innerHeight  + 'px'
    };

    $scope.user = {username:1,password:1};
    $scope.authError = null;

    $scope.login = function () {

        if($scope.user.username==1){
            $scope.app.globalInfo.userInfo={
                userType:1,
                username:1
            };
            $state.go('manage');
        }else if($scope.user.username==2){
            $scope.app.globalInfo.userInfo={
                userType:2,
                username:2
            };
            $state.go('manage');
        }else if($scope.user.username==3){
            $scope.app.globalInfo.userInfo={
                userType:3,
                username:3
            };
            $state.go('office');
        }else if($scope.user.username==4){
            $scope.app.globalInfo.userInfo={
                userType:4,
                username:4
            };
            $state.go('office');
        }else{
            $scope.authError='用户名不正确'
        }

        // var loginUrl = '/Login?username=' + $scope.user.username + "&password=" + $scope.user.password;
        // $http.get(loginUrl)
        //     .then(function (response) {
        //             if (response.data.state == 'ok') {
        //                 sessionStorage.setItem("token", response.data.state);
        //                 sessionStorage.setItem("msg", JSON.stringify(response.data.msg));
        //                 $state.go('control');
        //             }
        //             else if (response.data.state == 'err') {
        //                 $scope.authError = response.data.msg;
        //             }
        //         }, function (x) {
        //
        //         }
        //     );


    };

}]);
