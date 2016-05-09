// neas.js

    // create the module and name it angVenture
        // also include ngRoute for all our routing needs
    var angVenture = angular.module('angVenture', ['ngRoute']);

    // configure our routes
    angVenture.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });

    // create the controller and inject Angular's $scope
    angVenture.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    angVenture.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    angVenture.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });