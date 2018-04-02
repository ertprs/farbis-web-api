angular
    .module('FarbisWebApp')
    .factory('session', function($location, $state, $window) { // Validar Session
        return {
            validar: function() {
                var user = JSON.parse($window.localStorage.getItem('userData'));
                
                if (user == null) {
                    $location.path('/login');
                };
            }
        }
    });
