(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('BookmarksController', BookmarksController);
    
    function BookmarksController($state, bookmarks) {
        var ctrl = this;

        ctrl.bookmarks = bookmarks.list();

        ctrl.goToDepartures = goToDepartures;
        ctrl.unBookmark = unBookmark;

        function goToDepartures(station) {
            $state.go('departures', {station: station});
        }

        function unBookmark(station) {
            bookmarks.remove(station);

            ctrl.bookmarks = bookmarks.list();
        }
    }
})();