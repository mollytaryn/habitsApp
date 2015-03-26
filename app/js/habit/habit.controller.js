angular
  .module('habitracker')
  .controller('HabitController', HabitController);

function HabitController($http, $location, $route, $scope, habitFactory) {
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

  // vm.instancesArray = function() {};
  // }

  /////////LESS/////////

  habitFactory.findLess(function(habits) {
    vm.data2 = habits;
    console.log(habits);
  });

  // habitFactory.getLessInstances(id, function(instances) {
  //   vm.data2 = instances;
  //   console.log(instances);
  // });

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

  $scope.config = {
    title: 'TITLE!!!',
    tooltips: false,
    labels: false
  };

  $scope.data = {
    series: ['Date'],
    data: [{
      x: 'Date',
      y: [1, 2, 3, 4, 5]
    }]
  };
}
