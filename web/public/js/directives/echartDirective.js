var app = angular.module('app');

app.directive('line', function() {
    return {
        scope: {
            options:"="

        },
        restrict: 'AE',
        template: '<div style="height:240px;width:100%;padding-bottom:0px;box-shadow: rgb(221, 221, 221) 0px 0px 10px;"></div>',
        replace: true,
        link: function(scope, element, attrs, controller) {
            scope.myChart = echarts.init(element[0], null,{render:'svg'});
            scope.myChart.setOption(scope.options);

            scope.$watch('options',function(newValue, oldValue, scope){
                if (newValue!==oldValue){

                    scope.myChart.setOption(newValue,false);

                }
            },true)
        },

    }


});

app.directive('line1', function() {
    return {
        scope: {
            options:"="

        },
        restrict: 'AE',
        template: '<div  style="height:400px;width:100%;padding-bottom:0px;box-shadow: rgb(221, 221, 221) 0px 0px 10px;"></div>',
        replace: true,
        link: function(scope, element, attrs, controller) {
            scope.myChart = echarts.init(element[0]);
            scope.myChart.setOption(scope.options);

            scope.$watch('options',function(newValue, oldValue, scope){
                if (newValue!==oldValue){

                    scope.myChart.setOption(newValue,true);

                }
            },true)
        },

    }
});

app.directive('line2', function() {
    return {
        scope: {
            options:"="

        },
        restrict: 'AE',
        template: '<div  style="height:300px;width:500px;padding-bottom:0px;box-shadow: rgb(221, 221, 221) 0px 0px 10px;"></div>',
        replace: true,
        link: function(scope, element, attrs, controller) {
            scope.myChart = echarts.init(element[0]);

            scope.$watch('options',function(newValue, oldValue, scope){
                if (newValue!==oldValue){

                    scope.myChart.setOption(newValue,true);

                }
            },true)
        },

    }


});
