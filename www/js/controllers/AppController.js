(function() {
    'use strict';

    angular
        .module('quikns')
        .controller('AppController', AppController);

    function AppController($scope, $ionicLoading, $state, util, data) {
        var ctrl = this;

        ctrl.currentLocation = null;
        ctrl.stations = null;

        ctrl.activate = activate;
        ctrl.getDistance = getDistance;
        ctrl.goToDepartures = goToDepartures;

        activate();

        function activate() {
            $ionicLoading.show({
                template: 'Zoekt stations in de buurt...',
                delay: 1000
            });

            util.getCurrentLocation()
                .then(function(location) {
                    return ctrl.currentLocation = location;
                })
                .then(data.getNearbyTrainStations)
                .then(function(stations) {
                    ctrl.stations = stations;
                })
                .finally(function() {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
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

