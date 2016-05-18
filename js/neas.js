// neas.js

    // create the module and name it angVenture
        // also include ngRoute for all our routing needs
    var angVenture = angular.module('angVenture', ['ngRoute']);

    // configure our routes
    angVenture.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the index page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the index page
            .when('/home', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            //projects
            .when('/projects', {
                templateUrl : 'pages/projects.html',
                controller  : 'projectController'
            })

            // route for the resume page
            .when('/resume', {
                templateUrl : 'pages/resume.html',
                controller  : 'resumeController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });

            // use the HTML5 History API
       		$locationProvider.html5Mode(true);
    });

    // create the controller and inject Angular's $scope
    angVenture.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Site currently under construction =)';
        $scope.bodyStyles ={
            "background": "url(../images/bluesaybrook.jpg) no-repeat center center fixed", 
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover"
        }
    });

    angVenture.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    angVenture.controller('projectController', function($scope) {
        $scope.message = 'All da projects';
    });

    angVenture.controller('resumeController', function($scope) {
        $scope.message = 'Resume';
    });

    angVenture.controller('contactController', function($scope) {
        $scope.message = 'Contact stuffs';
    });