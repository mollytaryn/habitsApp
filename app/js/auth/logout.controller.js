angular
  .module('habitracker')
  .controller('LogoutController', LogoutController)

function LogoutController($rootScope, $scope, $location, authFactory) {
  authFactory.logout(function(err) {
      console.log('Logged out.');
      delete $rootScope.user;
      $location.path('/login');
      $scope.$apply();
  });
}
