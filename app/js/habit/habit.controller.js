angular
  .module('habitracker')
  .controller('HabitController', HabitController);

function HabitController($location, habitFactory) {
  var vm = this;

  habitFactory.findAll(function (habit) {
    vm.data = habit;
  });

  vm.addHabit = function() {
    vm.newPost.instances = 0;
    vm.newPost.days = [0];

    habitFactory.create(vm.newPost, function(res) {
      $location.path('/habit');
    });
  };

  vm.updateInstances = function (id, direction) {
    habitFactory.updateInstances(id, direction);
  };
}
