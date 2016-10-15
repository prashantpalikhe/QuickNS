(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('DeparturesController', DeparturesController);

    function DeparturesController($scope, $http, $stateParams, $ionicLoading) {
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

            getDepartures(ctrl.station)
                .then(function(departures) {
                    ctrl.departures = departures;
                })
                .catch(function(error) {
                    ctrl.error = error.message;
                })
                .finally(function() {
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