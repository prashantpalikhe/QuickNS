(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('DeparturesController', DeparturesController);

    function DeparturesController($scope, $stateParams, $ionicLoading, data) {
        var ctrl = this;

        ctrl.error = null;
        ctrl.departures = null;
        ctrl.placeholders = new Array(10);
        ctrl.station = $stateParams.station;

        ctrl.activate = activate;

        $scope.$on('$ionicView.afterEnter', activate);

        function activate() {
            $ionicLoading.show({
                template: 'Getting departures for station',
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