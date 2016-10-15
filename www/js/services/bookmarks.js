(function() {
    'use strict';

    angular
        .module('quickns')
        .factory('bookmarks', bookmarksFactory);

    function bookmarksFactory() {
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

            var bookmarks = list();

            bookmarks.push(station);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }

        function remove(station) {
            if (!has(station)) {
                return;
            }

            var bookmarks = list();

            bookmarks.splice(bookmarks.indexOf(station), 1);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }

        function has(station) {
            var bookmarks = list();

            return bookmarks.includes(station);
        }
        
        function list() {
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

            if (!angular.isArray(bookmarks)) {
                bookmarks = [];
            }

            return bookmarks;
        }
    }
})();