angular
  .module('habitracker')
  .controller('HabitController', HabitController);

function HabitController($http, $location, $route, $scope, habitFactory) {

  var vm = this;
  vm.month = new Date().getMonth() + 1;
  vm.day = new Date().getDate();
  vm.year = new Date().getFullYear();

  /////////MORE/////////

  habitFactory.findMore(function (habits) {
    vm.data1 = habits;
    console.log(habits);
  });

    habitFactory.getMoreInstancesData(function(instances) {
      vm.data3 = instances;
      console.log(instances);
    });

  // var dataArray = $.map(moreObject, function(keys) {
  //   return keys;
  //   console.log(dataArray);
  // });

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

  $scope.config = {
    tooltips: false,
    labels: false
  };

  $scope.data = {
    data: [{
      x: 'days',
      y: [1, 2, 3, 2, 6]
    }]
  };
}
