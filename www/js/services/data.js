(function() {
    'use strict';

    angular
        .module('quickns')
        .factory('data', dataFactory)
        .constant('API_BASE_URL', 'http://quikns.prashantpalikhe.com:3002/api');

    function dataFactory($q, $http, API_BASE_URL) {
        return {
            getNearbyTrainStations: getNearbyTrainStations,
            getDepartures: getDepartures
        };

        function getNearbyTrainStations(coords) {
            return $http
                .get(API_BASE_URL + '/train-stations-nearby/' + coords.latitude + '/' + coords.longitude)
                .then(function(response) {
                    if (!angular.isArray(response.data.results) || !response.data.results.length) {
                        return $q.reject();
                    }

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