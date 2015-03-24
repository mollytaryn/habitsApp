angular
  .module('habitracker')
  .controller('HabitController', HabitController);

function HabitController($http, $location, $route, habitFactory) {
  var vm = this;

  /////////MORE/////////

  habitFactory.findMore(function (habits) {
    vm.data1 = habits;
    console.log(habits);
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

  habitFactory.findLess(function (habits) {
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
