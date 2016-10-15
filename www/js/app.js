angular
    .module('quickns', ['ionic', 'ngCordova'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('index', {
                url: '/',
                templateUrl: 'templates/index.html',
                controller: 'AppController',
                controllerAs: '$ctrl'
            })

            .state('departures', {
                url: '/departures/:station',
                templateUrl: 'templates/departures.html',
                controller: 'DeparturesController',
                controllerAs: '$ctrl'
            });

        $urlRouterProvider.otherwise('/');
    });
