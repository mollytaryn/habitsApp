angular
  .module('habitracker')
  .factory('habitFactory', habitFactory);

  function habitFactory($http, $route, FBURL) {
    var habits = {};
    var fb = new Firebase(FBURL);

    /////////MORE/////////

    habits.findMore = function(cb) {
      $http
        .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/more.json')
        .success(function(data) {
          cb(data);
        });
    };

    habits.createMore = function(data, cb) {
      $http
        .post(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/.json', data)
        .success(function (res) {
          cb(res);
          console.log('sent');
        });
    };

    habits.getMoreInstances = function(id, cb) {
      $http
        .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/.json')
        .success(function(data) {
          cb(data);
        });
    };

    habits.updateMoreInstances = function (id, direction, cb) {
      habits.getMoreInstances(id, function(data) {
        $http
          .put(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/.json', data + direction)
          .success(function (res) {
            if (typeof cb === 'function') {
              $route.reload();
              cb(res);
            }
          });
        });
    };

    /////////LESS/////////

    habits.findLess = function(cb) {
      $http
        .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/less.json')
        .success(function(data) {
          cb(data);
        });
    };

    habits.createLess = function(data, cb) {
      $http
        .post(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/.json', data)
        .success(function (res) {
          cb(res);
          console.log('sent');
        });
    };

    habits.getLessInstances = function(id, cb) {
      $http
        .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/' + id + '/instances/.json')
        .success(function(data) {
          cb(data);
        });
    };

    habits.updateLessInstances = function (id, direction, cb) {
      habits.getLessInstances(id, function(data) {
        $http
          .put(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/' + id + '/instances/.json', data + direction)
          .success(function (res) {
            if (typeof cb === 'function') {
              $route.reload();
              cb(res);
            }
          });
        });
    };
    return habits;
  }
