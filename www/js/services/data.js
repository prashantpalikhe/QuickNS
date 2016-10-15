(function() {
    'use strict';

    angular
        .module('quickns')
        .factory('data', dataFactory);

    function dataFactory($q, $http) {
        return {
            getNearbyTrainStations: getNearbyTrainStations,
            getDepartures: getDepartures
        };

        function getNearbyTrainStations(coords) {
            return $http
                .get('http://api.pixelscamp.prashantpalikhe.com:3001/api/nts/' + coords.latitude + '/' + coords.longitude)
                .then(function(response) {
                    if (!angular.isArray(response.data.results) || !response.data.results.length) {
                        return $q.reject();
                    }

                    return response.data.results;
                });
        }

        function getDepartures(station) {
            if (!angular.isString(station)) {
                return $q.reject();
            }

            station = station.toLowerCase();

            if (station.includes('station')) {
                station = station.slice(0, station.indexOf('station')).trim();
            }

            return $http
                .get('http://api.pixelscamp.prashantpalikhe.com:3001/api/departures/' + station)
                .then(function(response) {
                    var data = response.data;

                    if (data.error) {
                        return $q.reject(data.error.message);
                    }

                    return data.actuelevertrektijden.vertrekkendetrein;
                });
        }
    }
})();