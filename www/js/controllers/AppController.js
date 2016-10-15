(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('AppController', AppController);

    function AppController($scope, $http, $q, $ionicLoading, $state) {
        var ctrl = this;

        ctrl.currentLocation = null;

        ctrl.activate = activate;
        ctrl.getDistance = getDistance;
        ctrl.goToDepartures = goToDepartures;

        activate();

        function activate() {
            $ionicLoading.show({
                template: 'Finding stations near you...',
                delay: 1000
            });

            getCurrentLocation()
                .then(getNearbyTrainStations)
                .then(function(stations) {
                    ctrl.stations = stations;
                })
                .finally(function() {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        function getCurrentLocation() {
            return $q(function(resolve) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    resolve(position.coords);
                    ctrl.currentLocation = position.coords;
                });
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
            return getDistanceFromLatLonInKm(
                ctrl.currentLocation.latitude,
                ctrl.currentLocation.longitude,
                station.geometry.location.lat,
                station.geometry.location.lng
            );
        }

        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lon2-lon1);
            var a =
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon/2) * Math.sin(dLon/2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
            return d.toFixed(2);
        }

        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }
    }
})();

