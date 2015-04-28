angular
  .module('habitracker')
  .factory('habitFactory', habitFactory);

function habitFactory($http, $route, FBURL) {
  var habits = {};
  var fb = new Firebase(FBURL);
  habitURL = FBURL + '/users/' + fb.getAuth().uid + '/habits/'

  /////////GOOD HABITS/////////

  habits.findGoodHabit = function(cb) {
    $http
      .get(habitURL + 'goodhabit.json')
      .success(function(data) {
        cb(data);
      });
  };

  habits.createGoodHabit = function(data, cb) {
    $http
      .post(habitURL + 'goodhabit.json', data)
      .success(function (res) {
        cb(res);
        console.log('sent');
      });
  };

  habits.appendGoodHabitInstances = function(id, data) {
    if (data) {
      $('#' + id).empty();
      $('#' + id).append('<div>' + data + '</div>');
    }
  };

  habits.createGoodHabitInstances = function (id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();

    habits.getGoodHabitInstances(id, function(count) {
      habits.appendGoodHabitInstances(id, count);
      var data = {};
      data[month + '-' + day] = count;

      $http
        .patch(habitURL + 'goodhabit/' + id + '/instances/.json', data)
        .success(function (res) {
          cb(res);
      });
    });
  };

  habits.getGoodHabitInstances = function(id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var dateUrl = month + '-' + day;

    $http
      .get(habitURL + 'goodhabit/' + id + '/instances/' + dateUrl + '.json')
      .success(function(count) {
        if (count) {
          count++;
        } else {
          count = 1;
        }
        cb(count);
      });
  };

  habits.noGoodHabitInstances = function (id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();

    var data = {};
    data[month + '-' + day] = 0;

    $http
      .patch(habitURL + 'goodhabit/' + id + '/instances/.json', data)
      .success(function (res) {
        cb(res);
      });
  };

  habits.editGoodHabit = function(id, data, cb) {

    $http
      .put(habitURL + 'goodhabit/' + id + '.json', data)
      .success(function (res) {
        if (typeof cb === 'function') {
          cb(res);
        }
      });
  };

  habits.deleteGoodHabit = function(id, cb) {
    $http
      .delete(habitURL + 'goodhabit/' + id + '.json')
      .success(function() {
        cb();
      });
  };

  /////////BAD HABITS/////////

  habits.findBadHabit = function(cb) {
    $http
      .get(habitURL + 'badhabit.json')
      .success(function(data) {
        cb(data);
      });
  };

  habits.createBadHabit = function(data, cb) {

    $http
      .post(habitURL + 'badhabit.json', data)
      .success(function (res) {
        cb(res);
        console.log('sent');
      });
  };

  habits.appendBadHabitInstances = function(id, data) {
    if (data) {
      $('#' + id).empty();
      $('#' + id).append('<div>' + data + '</div>');
    }
  };

  habits.createBadHabitInstances = function (id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var dateUrl = month + '-' + day;

    habits.getBadHabitInstances(id, function(count) {
      habits.appendBadHabitInstances(id, count);
      var data = {};
      data[month + '-' + day] = count;

      $http
        .patch(habitURL + 'badhabit/' + id + '/instances/.json', data)
        .success(function (res) {
          cb(res);
      });
    });
  };

  habits.getBadHabitInstances = function(id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var dateUrl = month + '-' + day;

    $http
      .get(habitURL + 'badhabit/' + id + '/instances/' + dateUrl + '.json')
      .success(function(count) {
        if (count) {
          count++;
        } else {
          count = 1;
        }
        cb(count);
      });
  };

  habits.noBadHabitInstances = function (id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var data = {};
    data[month + '-' + day] = 0;

    $http
      .patch(habitURL + 'badhabit/' + id + '/instances/.json', data)
      .success(function (res) {
        cb(res);
      });
  };

  habits.editBadHabit = function (id, data, cb) {
    $http
      .put(habitURL + 'badhabit/' + id + '.json', data)
      .success(function (res) {
        if (typeof cb === 'function') {
          cb(res);
        }
      });
  };

  habits.deleteBadHabit = function(id, cb) {
    $http
      .delete(habitURL + 'badhabit/' + id + '.json')
      .success(function() {
        cb();
      });
  };

  habits.logout = function(cb) {
    var fb = new Firebase(FBURL);
    fb.unauth(cb);
  };
  return habits;
}
