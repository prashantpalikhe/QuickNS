(function() {
    'use strict';

    angular
        .module('quickns')
        .controller('DeparturesController', DeparturesController);

    function DeparturesController($filter, $scope, $stateParams, $ionicLoading, $cordovaSocialSharing, data) {
        var ctrl = this;

        ctrl.error = null;
        ctrl.departures = null;
        ctrl.placeholders = new Array(10);
        ctrl.station = $stateParams.station;

        ctrl.activate = activate;
        ctrl.share = share;

        $scope.$on('$ionicView.afterEnter', activate);

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
        
        function share(departure) {
            var message = departure.eindbestemming + '\n';
            message += departure.treinsoort + '\n';

            if (departure.routetekst) {
                message += 'via ' + departure.routetekst + '\n';
            }

            message += 'Om ' + $filter('date')(departure.vertrektijd, 'HH:mm');

            if (departure.vertrekvertraging) {
                message += '(' + departure.vertrekvertragingtekst +')'
            }

            message += '\n';

            if (departure.vertrekspoor._) {
                message += 'Spoor ' + departure.vertrekspoor._;
            }

            $cordovaSocialSharing
                .share(message, 'Vertrek info');
        }
    }
})();