angular
  .module('habitracker')
  .factory('habitFactory', habitFactory);

  function habitFactory($http, FBURL) {
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
          cb(data);
        });
    };

    habits.updateInstances = function (id, direction, cb) {
      habits.getInstances(id, function(data) {
        $http
          .put(FBURL + '/users/' + fb.getAuth().uid + '/habits/' + id + '/instances/.json', data + direction)
          .success(function (res) {
            if (typeof cb === 'function') {
              cb(res);
              console.log('update ')
            }
          });
        });
    };
    return habits;
  }

//   return {
//     findAll: function(cb) {
//       var fb = new Firebase(FBURL);
//       $http
//         .get(FBURL + '/users/' + fb.getAuth().uid + '/habits.json')
//         .success(function (data) {
//           cb(data);
//         });
//     },
//
//     create: function(FBURL, postObj) {
//       var fb = new Firebase(FBURL);
//       $http
//         .post(FBURL + '/users/' + fb.getAuth().uid + '/habits/.json', postObj)
//         .success (function () {
//           console.log('sent');
//         });
//     },
//
//     updateInstances: function(FBURL, postObj, cb) {
//       var fb = new Firebase(FBURL);
//       $http
//         .put(FBURL + '/users/' + fb.getAuth().uid + '/habits/' + uuid + '.json', postObj)
//         .success(function (data) {
//           cb(data);
//           console.log('updated instances!');
//         });
//     }
//   };
// }
