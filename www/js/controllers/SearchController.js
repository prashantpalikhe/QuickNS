(function() {
    'use strict';

    angular
        .module('quikns')
        .controller('SearchController', SearchController);
    
    function SearchController($state, $cordovaToast, $timeout, favs, data) {
        var ctrl = this;

        ctrl.stations = null;
        ctrl.searching = false;

        ctrl.isFaved = isFaved;
        ctrl.toggleFav = toggleFav;
        ctrl.searchStations = searchStations;
        ctrl.goToDepartures = goToDepartures;

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

        function goToDepartures(station) {
            $state.go('departures', {station: station});
        }

        function isFaved(station) {
            return favs.has(station);
        }

        function toggleFav(station) {
            if (isFaved(station)) {
                favs.remove(station);
                $cordovaToast.show(station.name + ' is verwijdered uit favorieten', 2000, 'bottom');

            } else {
                favs.add(station);
                $cordovaToast.show(station.name + ' is toegevoegd aan favorieten', 2000, 'bottom');
            }
        }

    }
})();