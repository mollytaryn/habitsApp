angular
  .module('habitracker')
  .controller('AuthController', AuthController)

var fbURL = "https://habitracker.firebaseio.com";

function AuthController($rootScope, $scope, $location, authFactory, FBURL) {
  var vm = this;

  vm.user = {};

  vm.login = function() {
    authFactory.login(vm.user, function(err, authData) {
      if (err) {
        console.log(err);
      } else {
        console.log('Login success', authData);
        $rootScope.user = authData;
        $location.path('/habit');
        $scope.$apply();
      }
    });
  };

  vm.firstLogin = function() {
    authFactory.login(this.user, function(err, authData) {
      if (err) {
        console.log(err);
      } else {
        console.log('Login success', authData);
        $rootScope.user = authData;
        $location.path('/welcome');
        $scope.$apply();
      }
    });
  };

  vm.register = function() {
    authFactory.register(vm.user, function(err, authData) {
      if (err && err.code === "EMAIL_TAKEN") {
        vm.login();
      } else if (err) {
        console.log(err);
      } else {
        console.log('Registered and Logged in', authData);
        vm.firstLogin();
      }
    });
  };

  vm.resetPassword = function() {
    authFactory.resetPassword(vm.user, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent!");
      }
    });
  };
};
