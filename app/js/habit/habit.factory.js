angular
  .module('habitracker')
  .factory('habitFactory', habitFactory);

function habitFactory($http, FBURL) {
  var fb = new Firebase(FBURL);
  var habit = {};

  habit.findAll = function(cb) {
    $http
      .get(FBURL + '/users/' + fb.getAuth().uid + '/habits.json')
      .success(function(data) {
        cb(data);
      });
  };

  habit.create = function(data, cb) {
    $http
      .post(FBURL + '/users/' + fb.getAuth().uid + '/habits/.json', data)
      .success(function (res) {
        cb(res);
        console.log('sent');
      });
  };

  habit.getInstances = function (id, cb) {
    var url = BASE_URL + '/users/' + fb.getAuth().uid + '/habits/' + id + '/instances/.json';
    $http
      .get(url)
      .success(function(data) {
        cb(data);
        console.log('success');
      });
  };

  habit.updateInstances = function (id, direction, cb) {
    var url = BASE_URL + '/users/' + fb.getAuth().uid + '/habits/' + id + '/instances/.json';

    habit.getInstances(id, function(data) {
      $http
        .put(url, data + direction)
        .success(function (res) {
          if (typeof cb === 'function') {
            cb(res);
            console.log('success');
          }
        });
      });
  };
  return habit;
}
