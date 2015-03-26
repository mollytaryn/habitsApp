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

    habits.getMoreInstancesData = function(cb) {
      $http
        .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/-JlH2RXT7msVzqLXT2I3/instances.json')
        .success(function(data) {
          cb(data);
        });
    };


    // habits.showMoreInstances = function(id, cb) {
    //   var month = new Date().getMonth() + 1;
    //   var day = new Date().getDate();
    //   var year = new Date().getFullYear();
    //   var dateUrl = year + '/' + month + '/' + day;
    //   var data = {};
    //   data[day] = count;
    //
    //   $http
    //     .get(FBURL + '/users/' + fb.getAuth().uid + '/habits/more/' + id + '/instances/' + dateUrl + '.json')
    //     .success(function(count) {
    //       if (count) {
    //         habits.appendMoreInstances(id, count);
    //       } else {
    //         count = 0;
    //       }
    //       cb(count);
    //     });
    // };

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
      var dateUrl = year + '/' + month;

      habits.getMoreInstances(id, function(count) {
        habits.appendMoreInstances(id, count);
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
      var dateUrl = year + '/' + month;

      habits.getLessInstances(id, function(count) {
        habits.appendLessInstances(id, count);
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
