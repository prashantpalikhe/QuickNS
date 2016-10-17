(function() {
    'use strict';

    angular
        .module('quikns')
        .factory('util', utilFactory);

    function utilFactory($q, $ionicPlatform, $cordovaGeolocation) {
        return {
            getCurrentLocation: getCurrentLocation
        };

        function getCurrentLocation() {
            return $q(function(resolve, reject) {
                 $ionicPlatform.ready(function() {
                     $cordovaGeolocation
                         .getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
                         .then(function(position) {
                             resolve(position.coords);
                         })
                         .catch(function(error) {
                             reject(error);
                         });
                 });
            });
        }
    }
})();