(function() {
    'use strict';

    angular
        .module('quikns')
        .controller('HomeController', HomeController)

    function HomeController($scope, util, data) {
        var ctrl = this;

        ctrl.stations = null;

        ctrl.activate = activate;

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
    }
})();

