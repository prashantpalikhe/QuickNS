(function() {
    'use strict';

    angular
        .module('quikns')
        .controller('AppController', AppController);

    function AppController($scope, $state, util, data, favs) {
        var ctrl = this;

        ctrl.stations = null;
        ctrl.favStations = null;
        ctrl.currentLocation = null;

        ctrl.isFaved = isFaved;
        ctrl.activate = activate;
        ctrl.toggleFav = toggleFav;
        ctrl.getDistance = getDistance;
        ctrl.goToDepartures = goToDepartures;

        activate();

        function activate() {
            util.getCurrentLocation()
                .then(function(location) {
                    return ctrl.currentLocation = location;
                })
                .then(data.getNearbyTrainStations)
                .then(function(stations) {
                    ctrl.stations = stations;
                })
                .finally(function() {
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

        function isFaved(station) {
            return favs.has(station);
        }

        function toggleFav(station) {
            if (isFaved(station)) {
                favs.remove(station);

            } else {
                favs.add(station);
            }

            ctrl.favStations = favs.list();
        }
    }
})();

