(function() {
    'use strict';

    angular
        .module('quikns')
        .controller('DeparturesController', DeparturesController);

    function DeparturesController($scope, $stateParams, $ionicActionSheet, $cordovaSocialSharing, data) {
        var ctrl = this;
        var viewEntered = false;

        ctrl.error = null;
        ctrl.departures = null;
        ctrl.placeholders = new Array(10);
        ctrl.station = $stateParams.station;

        ctrl.activate = activate;
        ctrl.showOptions = showOptions;

        activate();

        $scope.$on('$ionicView.afterEnter', function() {
            viewEntered = true;
        });

        function activate() {
            data.getDepartures(ctrl.station)
                .then(function(departures) {
                    if (viewEntered) {
                        ctrl.departures = departures;

                    } else {
                        $scope.$on('$ionicView.afterEnter', function() {
                            ctrl.departures = departures;
                        });
                    }
                })
                .catch(function(error) {
                    ctrl.error = error;
                })
                .finally(function() {
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
                message += '(' + departure.delay + ')'
            }

            message += '\n';

            if (departure.platform) {
                message += 'Spoor ' + departure.platform;
            }

            $cordovaSocialSharing.share(message, 'Vertrek info');
        }

        function showOptions(departure) {

            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: 'Deel'}
                ],
                titleText: departure.destination,
                cancelText: 'Annuleren',
                cancel: function() {
                    hideSheet();
                },
                buttonClicked: function(index) {
                    if (index === 0) {
                        share(departure);
                    }
                }
            });
        }
    }
})();