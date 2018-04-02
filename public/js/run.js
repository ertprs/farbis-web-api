/*
angular.module('FarbisWebApp')
.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
*/

/**=========================================================
 * Module: RoutesRun
 =========================================================*/

 (function() {
    angular
        .module('FarbisWebApp')
        .run(appRun)
        .run(sessionRun);

    function appRun($rootScope, $state) {
        $rootScope.$state = $state;
    }
    appRun.$inject = ['$rootScope', '$state'];
    
    function sessionRun($rootScope, session) {
        $rootScope.session = session;
    }
    sessionRun.$inject = ['$rootScope', 'session'];
    
})();
