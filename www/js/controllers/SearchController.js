(function() {
    'use strict';

    angular
        .module('quikns')
        .controller('SearchController', SearchController);
    
    function SearchController($timeout, data) {
        var ctrl = this;

        ctrl.stations = null;
        ctrl.searching = false;

        ctrl.searchStations = searchStations;

        function searchStations(query) {
            ctrl.stations = null;

            if (!query) {
                return false;
            }

            var timerId = $timeout(function() {
                ctrl.searching = true;
            }, 300);

            return data.searchStations(query)
                .then(function(stations) {
                    ctrl.stations = stations;
                })
                .finally(function() {
                    $timeout.cancel(timerId);
                    ctrl.searching = false;
                })
        }
    }
})();