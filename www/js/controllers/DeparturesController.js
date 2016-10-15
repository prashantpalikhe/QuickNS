(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('DeparturesController', DeparturesController);

    function DeparturesController($scope, $stateParams, $ionicLoading, data, bookmarks) {
        var ctrl = this;

        ctrl.error = null;
        ctrl.departures = null;
        ctrl.placeholders = new Array(10);
        ctrl.station = $stateParams.station;

        ctrl.isBookmarked = isBookmarked;
        ctrl.toggleBookmark = toggleBookmark;
        ctrl.activate = activate;

        $scope.$on('$ionicView.afterEnter', activate);

        function isBookmarked() {
            return bookmarks.has(ctrl.station);
        }

        function toggleBookmark() {
            isBookmarked() ? bookmarks.remove(ctrl.station) : bookmarks.add(ctrl.station);
        }

        function activate() {
            $ionicLoading.show({
                template: 'Vertrektijden ophalen...',
                delay: 1000
            });

            data.getDepartures(ctrl.station)
                .then(function(departures) {
                    ctrl.departures = departures;
                })
                .catch(function(error) {
                    ctrl.error = error;
                })
                .finally(function() {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
    }
})();