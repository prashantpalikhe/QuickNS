(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('DeparturesController', DeparturesController);

    function DeparturesController($scope, $http, $stateParams, $ionicLoading, $ionicModal) {
        var ctrl = this;

        ctrl.activate = activate;
        ctrl.showDetails = showDetails;
        ctrl.station = $stateParams.station;

        activate();

        function activate() {
            $ionicLoading.show({
                template: 'Getting departures for station',
                delay: 1000
            });

            getDepartures(ctrl.station)
                .then(function(departures) {
                    ctrl.departures = departures;
                    console.log(departures);
                })
                .finally(function() {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });

            setupDetailsModal();
        }

        function setupDetailsModal() {
            $ionicModal.fromTemplateUrl('templates/detail.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                ctrl.modal = modal;
            });
        }

        function showDetails(departure) {
            console.log(departure);
            ctrl.selectedDeparture = departure;

            ctrl.modal.show();
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

                    return data.ActueleVertrekTijden.VertrekkendeTrein;
                });
        }

        $scope.$on('$destroy', function() {
            ctrl.modal.remove();
        });

        $scope.$on('modal.hidden', function() {
            ctrl.selectedDeparture = null;
        });
    }
})();