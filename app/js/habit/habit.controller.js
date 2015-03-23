angular
  .module('habitracker')
  .controller('HabitController', HabitController);

function HabitController($http, $location, $route, habitFactory) {
  var vm = this;

  habitFactory.findMore(function (habits) {
    vm.data1 = habits;
    console.log(habits);
  });

  /////////MORE/////////

  vm.addMoreHabit = function() {
    vm.newMore.instances = 0;
    vm.newMore.days = [0];

    habitFactory.createMore(vm.newMore, function(res) {
      $route.reload();
    });
  }

  habitFactory.findLess(function (habits) {
    vm.data2 = habits;
    console.log(habits);
  });


  vm.updateMoreInstances = function (id, direction) {
    habitFactory.updateMoreInstances(id, direction);
  };

  /////////LESS/////////

  vm.addLessHabit = function() {
    vm.newLess.instances = 0;
    vm.newLess.days = [0];

    habitFactory.createLess(vm.newLess, function(res) {
      $route.reload();
    });
  }

  vm.updateLessInstances = function (id, direction) {
    habitFactory.updateLessInstances(id, direction);
  };

}
