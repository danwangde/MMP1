'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams', '$location',
            function ($rootScope, $state, $stateParams, $location) {
                // $rootScope.$on('$stateChangeStart', function (event, toState) {
                //     if (!(sessionStorage.getItem("token"))) {
                //         $location.path("/signin")
                //     } else {
                //         $rootScope.$state = $state;
                //         $rootScope.$stateParams = $stateParams;
                //     }
                // });
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }

        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .otherwise('/signin');
                $stateProvider

                    .state('app', {
                        abstract: true,
                        url: '/app',
                        
                        templateUrl: 'tpl/common/app.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                 
                                    return uiLoad.load(['js/controllers/components/appController.js']);
                                }]
                        }
                    })
                    .state('app_full', {
                        abstract: true,
                        url: '/app_full',
                       
                        templateUrl: 'tpl/common/app_full.html'
                    })
                    .state('ceshi', {
                        url: 'http://47.92.89.74:3000/#/access/signin'
                    })

                    // 登录页面
                    .state('signin', {
                        url: '/signin',
                        
                        templateUrl: 'tpl/common/signin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    
                                    return uiLoad.load(['js/controllers/common/signin.js'
                                    ]);
                                }]
                        }
                    })
                    // 管理功能选择页面
                    .state('manage', {
                        url: '/manage/:ul',
                     
                        templateUrl: 'tpl/common/manage.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                 
                                    return uiLoad.load(['js/controllers/common/manage.js']);
                                }]
                        }
                    })
                    // 检测和养护功能选择页面
                    .state('office', {
                        url: '/office/:ul',
                     
                        templateUrl: 'tpl/common/office.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    
                                    return uiLoad.load(['js/controllers/common/office.js']);
                                }]
                        }
                    })
                    // 管理 桥梁 首页
                    .state('app.manageBridgeIndex', {
                        url: '/manageBridgeIndex',
                    
                        templateUrl: 'tpl/manage/bridge/index.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                 
                                    return uiLoad.load(['js/controllers/manage/bridge/index.js'
                                    ]);
                                }]
                        }
                    })
                    // 管理 桥梁 基本信息
                    .state('app.basic', {
                        url: '/basic',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.basic.manageBridgeInfo', {
                        url: '/manageBridgeInfo',
                     
                        templateUrl: 'tpl/manage/bridge/bridge.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/manage/bridge/bridge.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.basic.manageBridgePassageway', {
                        url: '/manageBridgePassageway',
                        templateUrl: 'tpl/manage/bridge/passageway.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/manage/bridge/passageway.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.basic.manageInfoStatistics', {
                        url: '/manageInfoStatistics',
                        templateUrl: 'tpl/manage/bridge/statistics.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/manage/bridge/statistics.js'
                                    ]);
                                }]
                        }
                    })
                    // 管理 桥梁 养护
                    .state('app.maintain', {
                        url: '/maintain',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })

                    .state('app.maintain.manageBridgeTask', {
                        url: '/manageBridgeTask',
                        templateUrl: 'tpl/manage/bridge/task.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/task.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.maintain.manageBridgePatrol', {
                        url: '/manageBridgePatrol',
                        templateUrl: 'tpl/manage/bridge/patrol.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/patrol.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.maintain.manageBridgeOrder', {
                        url: '/manageBridgeOrder',
                        templateUrl: 'tpl/manage/bridge/order.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/order.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.maintain.manageBridgeScheme', {
                        url: '/manageBridgeScheme',
                        templateUrl: 'tpl/manage/bridge/scheme.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/scheme.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.maintain.manageBridgeCheck', {
                        url: '/manageBridgeCheck',
                        templateUrl: 'tpl/manage/bridge/check.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/check.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.maintain.manageBridgeCost', {
                        url: '/manageBridgeCost',
                        templateUrl: 'tpl/manage/bridge/cost.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/cost.js'
                                    ]);
                                }]
                        }
                    })
                    // 管理 桥梁 检测
                    .state('app.echeck', {
                        url: '/echeck',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.echeck.manageBridgePlan', {
                        url: '/manageBridgePlan',
                        templateUrl: 'tpl/manage/bridge/plan.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/plan.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.echeck.manageBridgeRegular', {
                        url: '/manageBridgeRegular',
                        templateUrl: 'tpl/manage/bridge/regular.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/regular.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.echeck.manageBridgeStructural', {
                        url: '/manageBridgeStructural',
                        templateUrl: 'tpl/manage/bridge/structural.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/structural.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.echeck.manageBridgeLoadtest', {
                        url: '/manageBridgeLoadtest',
                        templateUrl: 'tpl/manage/bridge/loadtest.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/loadtest.js'
                                    ]);
                                }]
                        }
                    })
                    // 管理 桥梁 技术评估
                    .state('app.assessment', {
                        url: '/assessment',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.assessment.bridgeAssessment',{
                        url:'/bridgeAssessment',
                        templateUrl:'tpl/manage/bridge/bridgeAssessment.html',
                        resolve:{
                            deps:['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/bridgeAssessment.js'])
                                }]
                        }
                    })
                    .state('app.assessment.passageAssessment',{
                        url:'/passageAssessment',
                        templateUrl:'tpl/manage/bridge/passageAssessment.html',
                        resolve:{
                            deps:['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/passageAssessment.js'])
                                }]
                        }
                    })

                    // 桥梁 GIS地图
                    .state('app.manageBridgeMap',{
                        url:'/manageBridgeMap',
                        templateUrl:'tpl/manage/bridge/GISMap.html',
                        resolve:{
                            deps:['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/manage/bridge/GISMap.js'])
                                }]
                        }
                    })
                    //管理 桥梁 病害库
                    .state('app.manageBridgeDisBank',{
                        url:'manegeBridgeDisease',
                        templateUrl:'tpl/manage/bridge/disBank.html',
                        resolve:{
                            deps:'uiLoad',
                            function(uiLoad){
                                return uiLoad.load(['js/controllers/manage/bridge/disBank.js'])
                            }
                        }
                    })

                    //管理 桥梁 单价库
                    .state('app.manageBridgePrice',{
                        url:'manageBridgePrice',
                        templateUrl:'tpl/manage/bridge/componentPrice.html',
                        resolve:{
                            deps:'uiLoad',
                            function(uiLoad){
                                return uiLoad.load(['js/controllers/manage/bridge/componentPrice.js'])
                            }
                        }
                    })

                    //管理 桥梁 数据导出
                    .state('app.manageDataOut',{
                        url:'manageDataOut',
                        templateUrl:'tpl/manage/bridge/dataOut.html',
                        resolve:{
                            deps:'uiLoad',
                            function(uiLoad){
                                return uiLoad.load(['js/controllers/manage/bridge/dataOut.js'])
                            }
                        }
                    })

                    // 管理 公共 管理
                    .state('app.managePublicOffice', {
                        url: '/managePublicOffice',
                    
                        templateUrl: 'tpl/manage/pubcoms/office.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                
                                    return uiLoad.load(['js/controllers/manage/pubcoms/office.js'
                                    ]);
                                }]
                        }
                    })
                     // 管理 公共 系统日志
                     .state('app.managePublicJournal', {
                        url: '/managePublicJournal',
                    
                        templateUrl: 'tpl/manage/pubcoms/journal.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                
                                    return uiLoad.load(['js/controllers/manage/pubcoms/journal.js'
                                    ]);
                                }]
                        }
                    })
                     // 管理 公共 备忘录
                     .state('app.managePublicMemo', {
                        url: '/managePublicMemo',
                    
                        templateUrl: 'tpl/manage/pubcoms/memo.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                
                                    return uiLoad.load(['js/controllers/manage/pubcoms/memo.js'
                                    ]);
                                }]
                        }
                    })


                       // 管理 公共 病害库
                       .state('app.managePublicDiseases', {
                        url: '/managePublicDiseases',
                    
                        templateUrl: 'tpl/manage/pubcoms/diseases.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                
                                    return uiLoad.load(['js/controllers/manage/pubcoms/diseases.js'
                                    ]);
                                }]
                        }
                    })


                     // 管理 公共 构件库
                     .state('app.managePublicComponents', {
                        url: '/managePublicComponents',
                    
                        templateUrl: 'tpl/manage/pubcoms/components.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                
                                    return uiLoad.load(['js/controllers/manage/pubcoms/components.js'
                                    ]);
                                }]
                        }
                    })


                    // 检测 桥梁 待办
                    .state('app.echeckBridgeBacklog', {
                        url: '/echeckBridgeBacklog',
                   
                        templateUrl: 'tpl/echeck/ewaitTask.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/echeck/ewaitTask.js'
                                    ]);
                                }]
                        }
                    })
                    
                    // 检测 桥梁 桥梁信息
                    .state('app.echeckBridgeInfo', {
                        url: '/echeckBridgeInfo',
                   
                        templateUrl: 'tpl/echeck/bridgeInfo.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/echeck/bridgeInfo.js'
                                    ]);
                                }]
                        }
                    })
                      
                    // 检测 桥梁 人行通道信息
                    .state('app.echeckPassageInfo', {
                        url: '/echeckPassageInfo',
                   
                        templateUrl: 'tpl/echeck/passageInfo.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/echeck/passageInfo.js'
                                    ]);
                                }]
                        }
                    })
                      // 检测 桥梁 常规检测
                      .state('app.echeckBridgeRegular', {
                        url: '/echeckBridgeRegular',
                   
                        templateUrl: 'tpl/echeck/regular.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/echeck/regular.js'    
                                    ]);
                                }]
                        }
                    })

                      // 检测 桥梁 结构性能检测
                      .state('app.echeckBridgeStructural', {
                        url: '/echeckBridgeStructural',
                   
                        templateUrl: 'tpl/echeck/structural.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/echeck/structural.js'    
                                    ]);
                                }]
                        }
                    })

                     // 检测 桥梁 荷载试验  
                     .state('app.echeckBridgeLoadTest', {
                        url: '/echeckBridgeLoadTest',
                   
                        templateUrl: 'tpl/echeck/loadtest.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/echeck/loadtest.js'    
                                    ]);
                                }]
                        }
                    })

                      // 检测 桥梁 GIS地图  
                      .state('app.echeckBridgeMap', {
                        url: '/echeckBridgeMap',
                   
                        templateUrl: 'tpl/echeck/map.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/echeck/map.js'    
                                    ]);
                                }]
                        }
                    })
                      // 检测 桥梁 通知公告
                      .state('app.echeckNotice', {
                        url: '/echeckNotice',
                   
                        templateUrl: 'tpl/echeck/notice.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/echeck/notice.js'
                                    ]);
                                }]
                        }
                    })
                       // 检测 桥梁 备忘录
                       .state('app.echeckMemo', {
                        url: '/echeckMemo',
                   
                        templateUrl: 'tpl/echeck/memo.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/echeck/memo.js'
                                    ]);
                                }]
                        }
                    })
                    // 养护 桥梁 待办
                    .state('app.maintainBridgeBacklog', {
                        url: '/maintainBridgeBacklog',
                        
                        templateUrl: 'tpl/maintain/mwaitTask.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                  
                                    return uiLoad.load(['js/controllers/maintain/mwaitTask.js'
                                    ]);
                                }]
                        }
                    })

                    .state('app.404', {
                        url: '/404',
                 
                        templateUrl: 'tpl/common/404.html'
                    });

            }
        ]
    );
