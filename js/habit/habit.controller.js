angular
  .module('habitracker')
  .controller('HabitController', HabitController);

function HabitController($http, $location, $rootScope, $route, $scope, habitFactory) {

  var vm = this;

  function todaysCount(habit) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var date = month + '-' + day;

    return habit.instances[date];
  };

  vm.setupPage = function() {
    $location.path('/setup');
  };

  vm.mainPage = function() {
    $location.path('/habit');
  };

  /////////GOOD HABITS/////////

  habitFactory.findGoodHabit(function (habits) {
    vm.data1 = habits;

    vm.config = {
      tooltips: true,
      labels: true
    };

    Object.keys(habits).forEach(function (id) {

      vm.data1[id].obj = (habits[id].instances);
      vm.data1[id].daysTracked = [];
      $.each(vm.data1[id].obj, function(value, index) {
        vm.data1[id].daysTracked.push(index);
      });

      vm.data1[id].total = 0;
      $.each(vm.data1[id].daysTracked, function () {
        vm.data1[id].total += this;
      });

      vm.data1[id].average = Math.round(vm.data1[id].total / vm.data1[id].daysTracked.length * 100)/100;

      vm.data1[id].todaysCount = todaysCount(habits[id]);

      vm.data1[id].goodHabitChartData = {
        data: []
      };

      var ins = $.map(habits[id].instances, function(value, index) {
        vm.data1[id].goodHabitChartData.data.push({x: [index], y: [value]})
      });
    });
  });

  vm.addGoodHabit = function() {
    habitFactory.createGoodHabit(vm.newGoodHabit, function(res) {
      $route.reload();
    });
  };

  vm.createGoodHabitInstances = function(id) {
    habitFactory.createGoodHabitInstances(id, function(res) {
      $route.reload();

    });
  };

  vm.noGoodHabitInstances = function(id) {
    habitFactory.noGoodHabitInstances(id, function(res) {
    });
  };

  vm.editGoodHabit = function(id) {
    habitFactory.editGoodHabit(id, vm.updateGoodHabit, function(res) {
      $route.reload();
    });
  };

  vm.deleteGoodHabit = function(id) {
    habitFactory.deleteGoodHabit(id, function () {
      delete vm.data1[id];
    });
  };

  /////////BAD HABITS/////////

  habitFactory.findBadHabit(function (habits) {
    vm.data2 = habits;

    vm.config = {
      tooltips: true,
      labels: true
    };

    Object.keys(habits).forEach(function (id) {

      vm.data2[id].obj = (habits[id].instances);
      vm.data2[id].daysTracked = [];
      $.each(vm.data2[id].obj, function(value, index) {
        vm.data2[id].daysTracked.push(index);
      });

      vm.data2[id].total = 0;
      $.each(vm.data2[id].daysTracked, function () {
        vm.data2[id].total += this;
      });

      vm.data2[id].average = Math.round(vm.data2[id].total / vm.data2[id].daysTracked.length * 100)/100;

      vm.data2[id].todaysCount = todaysCount(habits[id]);

      vm.data2[id].badHabitChartData = {
        data: []
      };

      var ins = $.map(habits[id].instances, function(value, index) {
        vm.data2[id].badHabitChartData.data.push({x: [index], y: [value]})
      });

    });

  });

  vm.addBadHabit = function() {
    habitFactory.createBadHabit(vm.newBadHabit, function(res) {
      $route.reload();
    });
  };

  vm.createBadHabitInstances = function(id) {
    habitFactory.createBadHabitInstances(id, function(res) {
      $route.reload();
    });
  };

  vm.noBadHabitInstances = function(id) {
    habitFactory.noBadHabitInstances(id, function(res) {
      console.log('missed day');
    });
  };

  vm.editBadHabit = function(id) {
    habitFactory.editBadHabit(id, vm.updateBadHabit, function(res) {
      $route.reload();
    });
  };

  vm.deleteBadHabit = function(id) {
    habitFactory.deleteBadHabit(id, function () {
      delete vm.data2[id];
    });
  };

  /////////LOGOUT/////////

  vm.logout = function() {
    habitFactory.logout(function() {
      console.log('Logged out');
      delete $rootScope.user;
      $location.path('/login');
      $scope.$apply();
    });
  };
}
