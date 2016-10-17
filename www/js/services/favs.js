(function() {
    'use strict';

    angular
        .module('quikns')
        .factory('favs', favsFactory);

    function favsFactory() {
        return {
            add: add,
            remove: remove,
            has: has,
            list: list
        };

        function add(station) {
            if (has(station)) {
                return;
            }

            var favs = list();

            favs.push(station);
            localStorage.setItem('favs', JSON.stringify(favs));
        }

        function remove(station) {
            if (!has(station)) {
                return;
            }

            var favs = list();

            var favIndex = favs.findIndex(function(favedStation) {
                return favedStation.code === station.code;
            });

            favs.splice(favIndex, 1);
            localStorage.setItem('favs', JSON.stringify(favs));
        }

        function has(station) {
            var favs = list();

            var fav = favs.find(function(favedStation) {
                return favedStation.code === station.code;
            });

            return fav !== undefined;
        }

        function list() {
            var favs = JSON.parse(localStorage.getItem('favs'));

            if (!angular.isArray(favs)) {
                favs = [];
            }

            return favs;
        }
    }
})();