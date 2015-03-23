angular
  .module('habitracker')
  .controller('HabitController', HabitController);

function HabitController($http, $location, $route, habitFactory) {
  var vm = this;

  habitFactory.findAll(function (habits) {
    vm.data = habits;
    console.log(habits);
  });

  vm.addHabit = function() {
    vm.newPost.instances = 0;
    vm.newPost.days = [0];

    habitFactory.create(vm.newPost, function (res) {
      $route.reload();
    });
  }

  vm.updateInstances = function (id, direction) {
    habitFactory.updateInstances(id, direction);
  };

  vm.testClick = function () {
    console.log('click');
  }

  vm.time = function() {
    var time = moment("HH:mm");
    console.log(time);
  };
}
