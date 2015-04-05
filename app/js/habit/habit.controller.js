angular
  .module('habitracker')
  .controller('HabitController', HabitController);

function HabitController($http, $location, $rootScope, $route, $scope, habitFactory) {

  var vm = this;
  // vm.month = new Date().getMonth() + 1;
  // vm.day = new Date().getDate();
  // vm.date = vm.month + '-' + vm.day;

  function todaysCount(habit) {
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var year = new Date().getFullYear();
    var date = year + '-' + month + '-' + day;

    return habit.instances[date];
  };

  vm.setupPage = function() {
    $location.path('/setup');
  };

  vm.mainPage = function() {
    $location.path('/habit');
  };

  /////////MORE/////////

  habitFactory.findMore(function (habits) {
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

      vm.data1[id].average = vm.data1[id].total / vm.data1[id].daysTracked.length;

      vm.data1[id].todaysCount = todaysCount(habits[id]);

      vm.data1[id].moreChartData = {
        data: []
      };

      var ins = $.map(habits[id].instances, function(value, index) {
        vm.data1[id].moreChartData.data.push({x: [index], y: [value]})
      });
    });
  });

  vm.addMoreHabit = function() {
    habitFactory.createMore(vm.newMore, function(res) {
      $route.reload();
    });
  };

  vm.createMoreInstances = function(id) {
    habitFactory.createMoreInstances(id, function(res) {
      console.log('new instance');
    });
  };

  vm.noMoreInstances = function(id) {
    habitFactory.noMoreInstances(id, function(res) {
      console.log('missed day');
    });
  };

  vm.editMore = function(id) {
    habitFactory.editMore(id, vm.updateMore, function(res) {
      console.log('edit');
      $route.reload();
    });
  };

  /////////LESS/////////

  habitFactory.findLess(function (habits) {
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

      vm.data2[id].average = vm.data2[id].total / vm.data2[id].daysTracked.length;

      vm.data2[id].todaysCount = todaysCount(habits[id]);

      vm.data2[id].lessChartData = {
        data: []
      };

      var ins = $.map(habits[id].instances, function(value, index) {
        vm.data2[id].lessChartData.data.push({x: [index], y: [value]})
      });

    });

  });

  vm.addLessHabit = function() {
    habitFactory.createLess(vm.newLess, function(res) {
      $route.reload();
    });
  };

  vm.createLessInstances = function(id) {
    habitFactory.createLessInstances(id, function(res) {
      console.log('new instance');
    });
  };

  vm.noLessInstances = function(id) {
    habitFactory.noLessInstances(id, function(res) {
      console.log('missed day');
    });
  };

  vm.editLess = function(id) {
    habitFactory.editLess(id, vm.updateLess, function(res) {
      console.log('edit');
      $route.reload();
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
