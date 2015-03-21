angular
  .module('habitracker')
  .controller('AuthController', AuthController)

var fbURL = "https://habitracker.firebaseio.com";

function AuthController($rootScope, $scope, $location, authFactory, FBURL) {
  this.user = {};

  this.login = function() {
    authFactory.login(this.user, function(err, authData) {
      if (err) {
        console.log(err);
      } else {
        console.log('Success', authData);
        $rootScope.user = authData;
        $location.path('/habit');
        $scope.$apply();
      }
    });
  };

  this.firstLogin = function() {
    authFactory.firstLogin(this.user, function(err, authData) {
      if (err) {
        console.log(err);
      } else {
        console.log('Success', authData);
        $rootScope.user = authData;
        $location.path('/welcome');
        $scope.$apply();
      }
    });
  };

  this.register = function() {
    authFactory.register(this.user, function(err, authData) {
      if (err && err.code === "EMAIL_TAKEN") {
        this.login();
      } else if (err) {
        console.log(err);
      } else {
        console.log('Registered new user!', authData);
        this.firstLogin();
      }
    });
  };

  this.resetPassword = function() {
    authFactory.resetPassword(this.user, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent!");
      }
    });
  };
};
