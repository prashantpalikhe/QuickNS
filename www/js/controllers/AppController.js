(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('AppController', AppController);

    function AppController($scope, $http, $ionicLoading, $state, util) {
        var ctrl = this;

        ctrl.currentLocation = null;
        ctrl.stations = null;

        ctrl.activate = activate;
        ctrl.getDistance = getDistance;
        ctrl.goToDepartures = goToDepartures;

        activate();

        function activate() {
            $ionicLoading.show({
                template: 'Finding stations near you...',
                delay: 1000
            });

            util.getCurrentLocation()
                .then(function(location) {
                    return ctrl.currentLocation = location;
                })
                .then(getNearbyTrainStations)
                .then(function(stations) {
                    ctrl.stations = stations;
                })
                .finally(function() {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        function getNearbyTrainStations(coords) {
            return $http
                .get('http://api.pixelscamp.prashantpalikhe.com:3001/api/nts/' + coords.latitude + '/' + coords.longitude)
                .then(function(response) {
                    return response.data.results;
                });
        }

        function goToDepartures(station) {
            $state.go('departures', {station: station});
        }

        function getDistance(station) {
            return util.getDistanceBetweenPoints(
                ctrl.currentLocation.latitude,
                ctrl.currentLocation.longitude,
                station.geometry.location.lat,
                station.geometry.location.lng
            );
        }
    }
})();

