angular
  .module('habitracker')
  .factory('habitFactory', habitFactory);

  function habitFactory($http, $route, FBURL) {
    var habits = {};
    var fb = new Firebase(FBURL);

    habits.findAll = function(cb) {

      $http
        .get(FBURL + '/users/' + fb.getAuth().uid + '/habits.json')
        .success(function(data) {
          cb(data);
        });
    };

    habits.create = function(data, cb) {
      $http
        .post(FBURL + '/users/' + fb.getAuth().uid + '/habits/.json', data)
        .success(function (res) {
          cb(res);
          console.log('sent');
        });
    };

    habits.getInstances = function(id, cb) {
      $http
        .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/' + id + '/instances/.json')
        .success(function(data) {
          // $route.reload();
          cb(data);
        });
    };

    habits.updateInstances = function (id, direction, cb) {
      habits.getInstances(id, function(data) {
        $http
          .put(FBURL + '/users/' + fb.getAuth().uid + '/habits/' + id + '/instances/.json', data + direction)
          .success(function (res) {
            if (typeof cb === 'function') {
              // $route.reload();
              cb(res);
            }
          });
        });
    };

    // habits.newDay = function (id, cb) {
    //   var time = moment();
    //   console.log(time);
    // }
    return habits;
  }
