angular
  .module('habitracker')
  .config(authConfig)
  .run(privateRoutes)
  .constant('FBURL', 'https://habitracker.firebaseio.com');

function authConfig($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    });
}

function privateRoutes($rootScope, $location, authFactory) {
  $rootScope.$on('routeChangeStart', function (event, nextRoute) {
    $rootScope.user = authFactory.getAuth();

    if (loginRequired()) {
      $location.path('/login');
    }

    function loginRequired() {
      return nextRoute.$$route && nextRoute.$$route.private && !authFactory.isLoggedIn();
    }
  });
}
