(function() {
    'use strict';

    angular
        .module('quikns')
        .factory('data', dataFactory)
        .constant('API_BASE_URL', 'http://quikns.prashantpalikhe.com:3002/api');

    function dataFactory($http, API_BASE_URL) {
        return {
            getNearbyTrainStations: getNearbyTrainStations,
            getDepartures: getDepartures
        };

        function getNearbyTrainStations(coords) {
            return $http
                .get(API_BASE_URL + '/train-stations-nearby/' + coords.latitude + '/' + coords.longitude)
                .then(function(response) {
                    return response.data.results;
                });
        }

        function getDepartures(station) {
            return $http
                .get(API_BASE_URL + '/departures/' + encodeURIComponent(station))
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();