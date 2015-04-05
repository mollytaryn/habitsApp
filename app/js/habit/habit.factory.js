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

  habits.appendMoreInstances = function(id, data) {
    if (data) {
      $('#' + id).empty();
      $('#' + id).append('<div>' + data + '</div>');
    }
  };

  habits.createMoreInstances = function (id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();
    
    habits.getMoreInstances(id, function(count) {
      habits.appendMoreInstances(id, count);
      var data = {};
      data[year + '-' + month + '-' + day] = count;

      $http
        .patch(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/.json', data)
        .success(function (res) {
          cb(res);
      });
    });
  };

  habits.getMoreInstances = function(id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();
    var dateUrl = year + '-' + month + '-' + day;

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

  habits.noMoreInstances = function (id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();

    var data = {};
    data[year + '-' + month + '-' + day] = 0;

    $http
      .patch(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/.json', data)
      .success(function (res) {
        cb(res);
      });
  };

  habits.editMore = function(id, data, cb) {

    $http
      .put(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '.json', data)
      .success(function (res) {
        if (typeof cb === 'function') {
          cb(res);
        }
      });
  };

  habits.deleteMore = function(id, cb) {
    $http
      .delete(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '.json')
      .success(function() {
        cb();
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

  habits.appendLessInstances = function(id, data) {
    if (data) {
      $('#' + id).empty();
      $('#' + id).append('<div>' + data + '</div>');
    }
  };

  habits.createLessInstances = function (id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();
    var dateUrl = year + '-' + month + '-' + day;

    habits.getLessInstances(id, function(count) {
      habits.appendLessInstances(id, count);
      var data = {};
      data[year + '-' + month + '-' + day] = count;

      $http
        .patch(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/' + id + '/instances/.json', data)
        .success(function (res) {
          cb(res);
      });
    });
  };

  habits.getLessInstances = function(id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();
    var dateUrl = year + '-' + month + '-' + day;

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

  habits.noLessInstances = function (id, cb) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();

    var data = {};
    data[year + '-' + month + '-' + day] = 0;

    $http
      .patch(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/' + id + '/instances/.json', data)
      .success(function (res) {
        cb(res);
      });
  };

  habits.editLess = function (id, data, cb) {
    $http
      .put(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/' + id + '.json', data)
      .success(function (res) {
        if (typeof cb === 'function') {
          cb(res);
        }
      });
  };

  habits.deleteLess = function(id, cb) {
    $http
      .delete(FBURL + '/users/' + fb.getAuth().uid + '/habits/less/' + id + '.json')
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
