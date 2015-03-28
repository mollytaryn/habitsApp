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

    habits.createMoreInstances = function (id, cb) {
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      var year = new Date().getFullYear();
      var dateUrl = year + '/' + month;

      habits.getMoreInstances(id, function(count) {
        var data = {};
        data[day] = count;

        $http
          .patch(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/'+ dateUrl + '.json', data)
          .success(function (res) {
            cb(res);
        });
      });
    };

    habits.getMoreInstances = function(id, cb) {
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      var year = new Date().getFullYear();
      var dateUrl = year + '/' + month + '/' + day;

      $http
        .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/' + dateUrl + '.json')
        .success(function(count) {
          if (count) {
            count++;
          } else {
            count = 1;
          }
          cb(count);
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

    habits.createLessInstances = function (id, cb) {
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      var year = new Date().getFullYear();
      var dateUrl = year + '/' + month;

      habits.getLessInstances(id, function(count) {
        var data = {};
        data[day] = count;

        $http
          .patch(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/' + id + '/instances/'+ dateUrl + '.json', data)
          .success(function (res) {
            cb(res);
        });
      });
    };

    habits.getLessInstances = function(id, cb) {
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      var year = new Date().getFullYear();
      var dateUrl = year + '/' + month + '/' + day;

      $http
        .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/' + id + '/instances/' + dateUrl + '.json')
        .success(function(count) {
          if (count) {
            count++;
          } else {
            count = 1;
          }
          cb(count);
        });
    };
    return habits;
  }
