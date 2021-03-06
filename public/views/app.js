'use strict';

angular.module('adminApp', [
    'ngCookies',
    'ngResource',
    'oitozero.ngSweetAlert',
    'ngDialog',
    'config',
    'angularMoment',
])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('errorInterceptor');
    }])

    .config(['$interpolateProvider', 
        function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }
    ])

    .factory('errorInterceptor', function ($q, $cookies, $location, $window, SweetAlert) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookies.get('access_token')) {
                    config.headers.Authorization = 'Bearer ' + $cookies.get('access_token');
                }
                return config;
            },

            responseError: function(response) {
                if(response.status === 403) {
                    // Intercept 403s and redirect you to login
                    $window.location.href = '/login';
                    // remove any stale tokens
                    $cookies.remove('access_token');
                    return $q.reject(response);
                } else if(response.status <= 0) {
                    // Intercept connection error
                    SweetAlert.swal({
                        title: 'Error',
                        text :'No connection to the API, please check your internet connection.' + 
                                'If the problem still persists, please contact tech support (admin@teknolands.com).' +
                            '\n' + '\n' + 'Click OK to reload this page.'
                    }, function () {
                        $window.location.reload();
                        return $q.reject(response);
                    });
                } else {
                    return $q.reject(response);
                }
            }
        };
    })

    .directive("maxTo", [function() {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function(scope, elem, attrs) {
                var max = parseInt(attrs.max);
                angular.element(elem).on("keyup", function(e) {
                    if (this.value > max) {
                        this.value = max;
                    }
                });
            }
        }
    }])

    .run(function ($rootScope, $cookies, config, $window, $http) {
        var isLoggedIn = function () {
            var token = $cookies.get('access_token');
            if (!token) {
                $window.location.href = '/login';
                return;
            }

            $http({
                method: "get",
                url: config.url + "api/common/user-info",
                headers: {
                   'Authorization': 'Bearer ' + token
                }
            }).then(function (response) {
                if (response.data && response.data.datas) {
                    $rootScope.dataUser = response.data.datas.user;
                    $rootScope.listMenu = [];
                    $rootScope.listMenuPoli = [];
                    if (response.data.datas.user.roles[0].perms) {
                        response.data.datas.user.roles[0].perms.forEach(function (val) {
                            if (!val.parent_id) {
                                $rootScope.listMenu.push(val);
                            }

                            if (val.parent_id) {
                                $rootScope.listMenu.push(val.parent);
                                
                                if (val.parent.name == 'penata_jasa') {
                                    $rootScope.listMenuPoli.push(val);
                                }
                            }

                            if (val.name == 'penata_jasa') {
                                $rootScope.listMenuPoli.push.apply($rootScope.listMenuPoli, val.childs);
                            }
                        });
                    }
                }
                return;
            }, function (response) {
                $window.location.href = '/login';
            });
        };

        if (window.location.href.indexOf("login") === -1) {
            isLoggedIn();
        }
    });