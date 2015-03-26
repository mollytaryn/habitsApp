angular
  .module('habitracker')
  .controller('HabitController', HabitController);

function HabitController($http, $location, $route, $scope, habitFactory) {

  var vm = this;
  vm.month = new Date().getMonth() + 1;
  vm.day = new Date().getDate();
  vm.year = new Date().getFullYear();
  vm.date = vm.month + '-' + vm.day;

  /////////MORE/////////

  habitFactory.findMore(function (habits) {
    vm.data1 = habits;
    console.log(habits);
  });

  habitFactory.getMoreInstancesData(function (instances) {
    vm.data3 = instances;
    vm.array = $.map(instances, function(value, index) {
      return [value];
      console.log(value)
    });
    vm.keys = $.map(instances, function(value, index) {
      return [index];
    });
    console.log(vm.keys);
    console.log(vm.array);

    $scope.config = {
      tooltips: true,
      labels: true
    };

    $scope.data = {
      data: [{
        x: 'instances per day',
        y: vm.array
      }]
    };
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

  /////////LESS/////////

  habitFactory.findLess(function(habits) {
    vm.data2 = habits;
    console.log(habits);
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
}
