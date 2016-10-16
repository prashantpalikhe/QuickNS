(function() {
    'use strict';

    angular
        .module('quikns')
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
            var message = departure.destination + '\n';
            message += departure.trainType + '\n';

            if (departure.via) {
                message += 'via ' + departure.via + '\n';
            }

            message += departure.time;

            if (departure.delay) {
                message += '(' + departure.delay +')'
            }

            message += '\n';

            if (departure.platform) {
                message += 'Spoor ' + departure.platform;
            }

            $cordovaSocialSharing
                .share(message, 'Vertrek info');
        }
    }
})();