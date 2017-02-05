var frontend = angular.module('frontend', ['ngRoute', 'ngMaterial', 'ngCookies', 'ui.ace']);

// configure our routes
frontend.config(function($locationProvider, $routeProvider) {
    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'about.html',
            controller: 'aboutController'
        })

        // route for the about page
        .when('/admin', {
            templateUrl: 'admin.html',
            controller: 'adminController'
        })

});

// create the controller and inject Angular's $scope
frontend.controller('mainController', function($scope, $rootScope, $http) {
    $rootScope.isAdmin = null

    $http.get('/b/isadmin').then(
        function(response) {
            $rootScope.isAdmin = response.data.is_admin == true
        }
    )
});

frontend.controller('homeController', function($scope) {});

frontend.controller('aboutController', function($scope) {});

frontend.controller('adminController', function($scope, $rootScope, $http, $window, $cookies) {
    $rootScope.$watch('isAdmin', function(isAdmin) {
        if (isAdmin === false) {
            $window.location.href = '/b/admin/login/?next=/%23/admin';
        }
    })

    $scope.onKey = function(ev) {
        if (ev.ctrlKey == true && ev.code == 'Enter') {
            $scope.onRun()
        }
    }

    $scope.onRun = function() {
        console.log($scope.textareaValue)
        $scope.output = null
        $scope.errors = null
        $scope.traceback = null
        $http({
            method: 'POST',
            url: '/b/run',
            headers: {
                "X-CSRFToken": $cookies.get("csrftoken")
            },
            data: {
                'code': $scope.textareaValue
            }
        }).then(function successCallback(response) {
            console.log(response.data)
            $scope.output = response.data.output
            $scope.errors = response.data.errors
            $scope.traceback = response.data.traceback
        }, function errorCallback(response) {});
        // $http.post('/b/run', {'code': $scope.textareaValue }).then(function(response) {})
    }
});
