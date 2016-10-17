(function() {
    'use strict';

    angular
        .module('quikns')
        .controller('AppController', AppController);

    function AppController($state, $cordovaToast, favs) {
        var ctrl = this;

        ctrl.favStations = favs.list();

        ctrl.isFaved = isFaved;
        ctrl.toggleFav = toggleFav;
        ctrl.goToDepartures = goToDepartures;

        function isFaved(station) {
            return favs.has(station);
        }

        function toggleFav(station, toast) {
            toast = toast === true;

            if (isFaved(station)) {
                favs.remove(station);
                toast && $cordovaToast.show(station.name + ' is verwijdered uit favorieten', 2000, 'bottom');

            } else {
                favs.add(station);
                toast && $cordovaToast.show(station.name + ' is toegevoegd aan favorieten', 2000, 'bottom');
            }

            ctrl.favStations = favs.list();
        }

        function goToDepartures(stationName) {
            $state.go('departures', {station: stationName});
        }
    }
})();