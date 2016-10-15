(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('DeparturesController', DeparturesController);

    function DeparturesController($scope, $http, $stateParams, $ionicLoading) {
        var ctrl = this;

        ctrl.loading = true;
        ctrl.loaders = new Array(10);
        ctrl.departures = null;
        ctrl.error = null;

        ctrl.activate = activate;
        ctrl.station = $stateParams.station;

        $scope.$on('$ionicView.afterEnter', activate);

        function activate() {
            $ionicLoading.show({
                template: 'Getting departures for station',
                delay: 1000
            });

            getDepartures(ctrl.station)
                .then(function(departures) {
                    ctrl.departures = departures;
                })
                .catch(function(error) {
                    ctrl.error = error.message;
                })
                .finally(function() {
                    ctrl.loading = false;

                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        function getDepartures(station) {
            station = station.toLowerCase();

            if (station.includes('station')) {
                station = station.slice(0, station.indexOf('station')).trim();
            }

            return $http
                .get('http://api.pixelscamp.prashantpalikhe.com:3001/api/departures/' + station)
                .then(function(response) {
                    var data = response.data;

                    if (data.error) {
                        throw new Error(data.error.message[0]);
                    }

                    return data.actuelevertrektijden.vertrekkendetrein;
                });
        }
    }
})();