angular
  .module('habitracker')
  .factory('authFactory', authFactory)

function authFactory(FBURL) {
  return {
    isLoggedIn: function() {
      var fb = new Firebase(FBURL);
      return !!fb.getAuth();
    },
    getAuth: function() {
      var fb = new Firebase(FBURL);
      return fb.getAuth();
    },
    login: function(user, cb) {
      var fb = new Firebase(FBURL);
      fb.authWithPassword(user, cb);
    },
    register: function(user, cb) {
      var fb = new Firebase(FBURL);
      fb.createUser(user, cb);
    },
    resetPassword: function(user, cb) {
      var fb = new Firebase(FBURL);
      fb.resetPassword(user, cb);
    }
  };
}
