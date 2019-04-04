app.controller('manageInfoStatistics_controller',['$scope', '$http', '$location', function ($scope, $http, $location) {



    async function bridgedataquery(){
        let url = '/bridgedataquery/select';
        try{
            var response = await $http.get(url);
            console.log(response);
        }catch (e) {
            console.log('get bridgedataquery err'+e);
        }
        $scope.$apply(function () {
            $scope.classific=response.data;
        })

    }
    bridgedataquery();
    $scope.lineOptions=options();
    function options(){

        let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['钢结构拱桥','梁桥','钢筋混凝土拱桥','圬工拱桥（有上部结构）','圬工拱桥(无上部结构)','人行天桥(钢桁架桥)','悬臂+挂梁','桁架桥','人行天桥(梁桥)','钢构桥']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:[
                        {value:335, name:'钢结构拱桥', selected:true},
                        {value:679, name:'梁桥'},
                        {value:1548, name:'钢筋混凝土拱桥'}
                    ]
                },
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['40%', '55%'],

                    data:[
                        {value:335, name:'钢结构拱桥'},
                        {value:310, name:'圬工拱桥（有上部结构）'},
                        {value:234, name:'圬工拱桥(无上部结构)'},
                        {value:135, name:'人行天桥(钢桁架桥)'},
                        {value:1048, name:'悬臂+挂梁'},
                        {value:251, name:'桁架桥'},
                        {value:147, name:'人行天桥(梁桥)'},
                        {value:104, name:'钢构桥'}
                    ]
                }
            ]
        };
        return option;
    }
}]);