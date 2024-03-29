(function() {
    'use strict';

    angular
        .module('quikns')
        .filter('highlight', function($sce) {
            return function(text, phrase) {
                if (phrase) {
                    text = text.replace(
                        new RegExp('(' + phrase + ')', 'gi'),
                        '<span class="highlighted">$1</span>'
                    );
                }

                return $sce.trustAsHtml(text)
            }
        });
})();