'use strict';

app.controller('manageBridgeScheme_controller', ['$scope', '$http','$filter','$q','$timeout', '$modal', '$log', function ($scope, $http,$filter,$q,$timeout, $modal, $log) {
     $scope.search = function () {
         $scope.schemeInfo = $filter('scheme')($scope.schemeInfo,$scope.num,$scope.name,$scope.submit,$scope.selState);
     };

    async function selData(){
        let url = '/maintain/scheme/select';
        try{
            let res = await $http.get(url);
           $scope.$apply(function () {
               $scope.schemeInfo = res.data;
           })
        }catch(e){
            console.log('get data err'+e);
        }
    }
    selData();
   $scope.update = async function () {
       try{
           console.log($scope.path);
           let res = await $http.post('/maintain/scheme/update', {file:'1556180171308-AngularJS权威教程 .pdf'});
           console.log(res);
       }catch(e){
           console.log('get data err'+e);
       }
   };
    $scope.clickOrder = function (index) {
        $scope.focus = index;
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: '',
            resolve: {
                items: function () {
                    return $scope.orderInfo[index]
                }

            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    /*$scope.del =async function(item){
        $timeout(async ()=>{

            try{
                let res = await  $http.post('/maintain/scheme/del', item);
                console.log(item);
            }catch (e) {
                console.log('err'+e)
            }
        },5000)

    };*/

    $scope.btn =async function (item,id){
        console.log(id);
       let fd = new FormData();
       let upload_file = document.getElementById(id).files[0];
       console.log(upload_file);
       fd.append('file',upload_file);
       try{
            let response =await  $http.post('/maintain/scheme/ce',fd,{ headers: {'Content-Type':undefined}, transformRequest: angular.identity});
            item.file = response.data.filename;

           let res = await $http.post('/maintain/scheme/update', item);
           await selData();

       }catch(e){
           console.log('err'+e);
       }
    };
}]);

