angular
    .module('quikns', ['ionic', 'ngCordova'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();

                // StatusBar.overlaysWebView(false);
                // StatusBar.backgroundColorByHexString('#ffc917');
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('index', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'HomeController',
                controllerAs: '$ctrl'
            })

            .state('departures', {
                url: '/departures/:station',
                templateUrl: 'templates/departures.html',
                controller: 'DeparturesController',
                controllerAs: '$ctrl'
            })

            .state('search', {
                url: '/search',
                templateUrl: 'templates/search.html',
                controller: 'SearchController',
                controllerAs: '$ctrl'
            });

        $urlRouterProvider.otherwise('/');
    });
