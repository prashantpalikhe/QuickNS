(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('AppController', AppController);

    function AppController($scope, $http, $q, $ionicLoading, $state) {
        var ctrl = this;

        ctrl.activate = activate;
        ctrl.findDepartures = findDepartures;

        activate();

        function findDepartures(station) {
            $state.go('departures', {station: station});
        }

        function activate() {
            $ionicLoading.show({
                template: 'Finding stations near you...'
            });

            getCurrentLocation()
                .then(getNearbyTrainStations)
                .finally(function() {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        function getCurrentLocation() {
            return $q(function(resolve) {
                navigator.geolocation.getCurrentPosition(function(position) {
                     resolve(position.coords);
                });
            });
        }

        function getNearbyTrainStations(coords) {
            return $http
                .get('http://api.pixelscamp.prashantpalikhe.com:3001/api/nts/' + coords.latitude + '/' + coords.longitude)
                .then(onSuccess);

            function onSuccess(response) {
                var results = response.data.results;

                if (results) {
                    ctrl.stations = results.map(function(result) {
                        return result.name;
                    });
                }
            }
        }
    }
})();

