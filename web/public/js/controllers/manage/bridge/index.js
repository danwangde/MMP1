'use strict';
app.controller('manageBridgeIndex_controller', ['$scope', '$http', '$window', function ($scope, $http) {

    [$scope.bridgeInfo, $scope.totalItems, $scope.bridgeInfoNow]=[[],[],[]];
    [$scope.currentPage, $scope.itemsPerPage, $scope.maxSize] = [1,5,6];
    $scope.data1=  {
        name:'常规检测',
        type:'bar',
        barWidth:35,
        data:[11,27,6],

        label:{
            normal:{
                show:true,
                position:'top',
                textStyle:{
                    color:'black',
                    fontSize:11
                }
            }
        }

    };
    $scope.titles = [
        {title:'设施状况合格',data:'14座'},
        {title:'不合格',data:'0座'},
        {title:'合格率',data:'100%'},
        {title:'未评价',data:'43座'}
    ];

    $scope.data2 =[
        {name:'未修复病害',smooth:true,type:'line',data:[0,7,2,0,0,0,0,23,0,10,4,1]},
        {name:'已修复病害',smooth:true,type:'line',data:[0,4,13,5,20,8,4,0,2,10,12,1]},
        {name:'年度病害数量',smooth:true,type:'line',data:[6,7,21,8,9,8,10,20,4,8,12,4]},
    ];

    $scope.lineOptions=createOption('shadow',false,[],true, ['常规检测','日常巡查','荷载试验']);
    $scope.lineOptions.series.push($scope.data1);

    $scope.lineOptions2=createOption('line',true,['未修复病害','已修复病害','年度病害数量'],false,['2018-03','2018-04','2018-05','2018-06','2018-07','2018-08','2018-09','2018-10','2018-11','2018-12','2019-01','2019-02']);
    $scope.lineOptions2.series=$scope.data2;




    //查表TABLE_BRIDGE_INFO1 获取 BridgeName MainStructType CuringGrade
    async function bridgeInfo(){
        let url = '/bridgeInfo/select';
        try{
            var response = await $http.get(url);
            console.log(response.data);
        }
        catch (e) {
            console.log('get bridgeInfo err'+e);
        }

        $scope.$apply(function () {
            $scope.bridgeInfo = response.data;
            $scope.totalItems = $scope.bridgeInfo.length;
            getCurrentTimes();
        })

    }
    bridgeInfo();








    // 返回当前页对应的数据
    function getCurrentTimes() {

        var start = ($scope.currentPage - 1) * $scope.itemsPerPage;
        $scope.bridgeInfoNow = $scope.bridgeInfo.slice(start, start + $scope.itemsPerPage);
        console.log($scope.bridgeInfoNow);
    }

    // 切换分页
    $scope.changePage = function() {
        getCurrentTimes();
    };



    //构建option
    function createOption(type,isShow,legendData,boolen,x) {
        let lineOptions = {
            // 提示框，鼠标悬浮交互时的信息提示
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : type        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend:{
                show:isShow,
                data:legendData
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap:boolen,
                    data :x
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : []

        };
        return lineOptions;
    }
}])