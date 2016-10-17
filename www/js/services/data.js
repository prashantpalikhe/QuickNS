(function() {
    'use strict';

    angular
        .module('quikns')
        .factory('data', dataFactory)
        .constant('API_BASE_URL', 'http://quikns.prashantpalikhe.com:3002/api')
        .filter('highlight', function($sce) {
            return function(text, phrase) {
                if (phrase) {
                    text = text.replace(
                        new RegExp('(' + phrase + ')', 'gi'),
                        '<span class="highlighted">$1</span>'
                    );
                }

                return $sce.trustAsHtml(text)
            }
        });

    function dataFactory($http, API_BASE_URL) {
        return {
            getNearbyTrainStations: getNearbyTrainStations,
            getDepartures: getDepartures,
            searchStations: searchStations
        };

        function getNearbyTrainStations(coords) {
            return $http
                .get(API_BASE_URL + '/train-stations-nearby/' + coords.latitude + '/' + coords.longitude)
                .then(function(response) {
                    return response.data;
                });
        }

        function getDepartures(station) {
            return $http
                .get(API_BASE_URL + '/departures/' + encodeURIComponent(station))
                .then(function(response) {
                    return response.data;
                });
        }

        function searchStations(query) {
            return $http
                .get(API_BASE_URL + '/train-stations-search/' + query)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();