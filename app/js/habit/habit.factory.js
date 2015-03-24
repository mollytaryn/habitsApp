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

    // habits.getMoreInstances = function(id, cb) {
    //   $http
    //     .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/number.json')
    //     .success(function(data) {
    //       cb(data);
    //     });
    // };

    habits.createMoreInstances = function (id, cb) {
      var data = {date: new Date()}
      $http
        .post(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/.json', data)
        .success(function (res) {
            $route.reload();
            cb(res);
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

    // habits.getLessInstances = function(id, cb) {
    //   $http
    //     .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/.json')
    //     .success(function(data) {
    //       cb(data);
    //     });
    // };

    habits.createLessInstances = function (id, cb) {
      var data = {date: new Date()}
      $http
        .post(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/' + id + '/instances/.json', data)
        .success(function (res) {
            $route.reload();
            cb(res);
        });
    };
    return habits;
  }
