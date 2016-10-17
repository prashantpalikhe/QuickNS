(function() {
    'use strict';

    angular
        .module('quikns')
        .controller('SearchController', SearchController);
    
    function SearchController($state, data) {
        var ctrl = this;

        ctrl.stations = null;

        ctrl.searchStations = searchStations;
        ctrl.goToDepartures = goToDepartures;

        function searchStations(query) {
            ctrl.stations = null;

            if (!query) {
                return false;
            }

            return data.searchStations(query)
                .then(function(stations) {
                    ctrl.stations = stations;
                });
        }

        function goToDepartures(station) {
            $state.go('departures', {station: station});
        }
    }
})();