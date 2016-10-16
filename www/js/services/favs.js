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

            favs.splice(favs.indexOf(station), 1);
            localStorage.setItem('favs', JSON.stringify(favs));
        }

        function has(station) {
            var favs = list();

            return favs.includes(station);
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